"""Generate a project's narration audio + per-scene timing.

Three providers are supported (selected via `tts.provider` in project.yaml):

- `qwen_voice_clone` (default): groups the storyline into chunks
  (~`target_words_per_chunk` words each, never splitting a scene across
  chunks) so every chunk stays well under the TTS model's generation-length
  cap while keeping prosody continuous across sentences within a chunk.
  Synthesizes each chunk with the project's voice clone, transcribes it back
  with Parakeet to recover word-level timings, and aligns those timings to
  scene boundaries via difflib -- robust to ASR misrecognitions and to
  compound words (e.g. "speech-to-text") getting split into several
  spoken/recognized words.
- `google`: synthesizes each scene individually with Google Cloud
  Text-to-Speech (a named prebuilt voice, no cloning). No ASR/alignment step
  is needed -- Google's output duration maps directly to the input text, so
  per-scene timing is read straight off the synthesized audio.
- `espeak`: synthesizes each scene individually with the local `espeak-ng`
  CLI -- offline, no GPU, no API calls. Robotic-sounding but instant; good
  for a quick placeholder pass before investing in a cloned/cloud voice. Like
  `google`, no ASR/alignment step is needed.

Writes into <project>/output/:
  - narration_chunks/ (intermediate per-chunk/per-scene wavs)
  - narration.wav (final concatenated narration)
  - scene_timing.json (scenes + per-scene start/end/duration + audio_file)
"""
import difflib
import io
import json
import re
from pathlib import Path
from xml.sax.saxutils import escape as xml_escape

import numpy as np
import soundfile as sf

from .config import ProjectConfig
from .storyline import load_storyline


def chunk_scenes(scenes: list[dict], target_words: int) -> list[list[dict]]:
    chunks: list[list[dict]] = []
    current: list[dict] = []
    current_words = 0
    for scene in scenes:
        n = len(scene["text"].split())
        if current and current_words + n > target_words:
            chunks.append(current)
            current, current_words = [], 0
        current.append(scene)
        current_words += n
    if current:
        chunks.append(current)
    return chunks


def _normalize(word: str) -> str:
    return re.sub(r"[^a-z0-9]", "", word.lower())


def _source_words(scenes: list[dict]) -> list[tuple[int, str]]:
    """(scene_id, word) pairs, splitting on whitespace and hyphens so compound
    words like 'speech-to-text' line up with how they get spoken/recognized."""
    pairs = []
    for s in scenes:
        for tok in s["text"].split():
            for sub in re.split(r"[-–—]", tok):
                if re.search(r"[A-Za-z0-9]", sub):
                    pairs.append((s["id"], sub))
    return pairs


def _asr_words(tokens: list[str], timestamps: list[float]) -> list[tuple[float, str]]:
    """Merge ASR subword tokens into words using leading-space as the word-start marker."""
    words = []
    cur_start, cur_text = None, ""
    for tok, ts in zip(tokens, timestamps):
        if tok.startswith(" ") or cur_start is None:
            if cur_start is not None:
                words.append((cur_start, cur_text))
            cur_start, cur_text = ts, tok.strip()
        else:
            cur_text += tok
    if cur_start is not None:
        words.append((cur_start, cur_text))
    return [(t, w) for t, w in words if _normalize(w)]


def _align_scene_starts(chunk_scenes_: list[dict], words: list[tuple[float, str]]) -> dict[int, float]:
    """Map scene_id -> local start time (seconds into this chunk's audio), via
    fuzzy alignment between the expected script words and the ASR words."""
    src = _source_words(chunk_scenes_)
    src_norms = [_normalize(w) for _, w in src]
    asr_norms = [_normalize(w) for _, w in words]

    matcher = difflib.SequenceMatcher(None, src_norms, asr_norms, autojunk=False)
    anchors: dict[int, int] = {}
    for block in matcher.get_matching_blocks():
        for k in range(block.size):
            anchors[block.a + k] = block.b + k

    def time_at(asr_idx: int) -> float:
        asr_idx = max(0, min(asr_idx, len(words) - 1))
        return words[asr_idx][0]

    def resolved_time(i: int) -> float:
        if i in anchors:
            return time_at(anchors[i])
        before = max((k for k in anchors if k < i), default=None)
        after = min((k for k in anchors if k > i), default=None)
        if before is None and after is None:
            return time_at(0)
        if before is None:
            return time_at(anchors[after])
        if after is None:
            return time_at(anchors[before])
        t0, t1 = time_at(anchors[before]), time_at(anchors[after])
        frac = (i - before) / (after - before)
        return t0 + frac * (t1 - t0)

    scene_first_src_idx: dict[int, int] = {}
    for idx, (scene_id, _) in enumerate(src):
        scene_first_src_idx.setdefault(scene_id, idx)

    return {scene_id: resolved_time(idx) for scene_id, idx in scene_first_src_idx.items()}


def _finalize_narration(
    config: ProjectConfig, scenes: list[dict], all_timing: list[dict],
    concatenated: list[np.ndarray], out_sr: int,
) -> Path:
    """Shared by all providers: concatenate per-chunk/per-scene audio, derive
    each scene's [start, end) from the next scene's start time, and write
    narration.wav + scene_timing.json."""
    final_audio = np.concatenate(concatenated)
    audio_out_path = config.output_dir / "narration.wav"
    sf.write(audio_out_path, final_audio, out_sr)
    print(f"\nWrote {audio_out_path} ({len(final_audio) / out_sr:.1f}s)")

    display = []
    for i, t in enumerate(all_timing):
        scene_start = t["start"]
        if i + 1 < len(all_timing):
            scene_end = all_timing[i + 1]["start"]
        else:
            scene_end = len(final_audio) / out_sr
        display.append({"id": t["id"], "start": round(scene_start, 3), "end": round(scene_end, 3), "duration": round(scene_end - scene_start, 3)})

    out = {
        "scenes": scenes,
        "timing": display,
        "audio_file": str(audio_out_path),
        "total_seconds": len(final_audio) / out_sr,
    }
    timing_out_path = config.output_dir / "scene_timing.json"
    timing_out_path.write_text(json.dumps(out, indent=2))
    print(f"Wrote {timing_out_path}")
    print(f"\nTotal narration length: {len(final_audio) / out_sr:.1f}s")
    return timing_out_path


def generate_narration(config: ProjectConfig) -> Path:
    provider = config.tts.provider
    if provider == "qwen_voice_clone":
        return _generate_narration_qwen_voice_clone(config)
    if provider == "google":
        return _generate_narration_google(config)
    if provider == "espeak":
        return _generate_narration_espeak(config)
    raise ValueError(f"Unknown tts.provider {provider!r} (expected 'qwen_voice_clone', 'google', or 'espeak')")


def _generate_narration_qwen_voice_clone(config: ProjectConfig) -> Path:
    import torch
    import onnx_asr
    from qwen_tts import Qwen3TTSModel

    scenes = load_storyline(config.storyline)
    chunks = chunk_scenes(scenes, config.tts.target_words_per_chunk)
    print(f"{len(scenes)} scenes -> {len(chunks)} chunks (target {config.tts.target_words_per_chunk} words/chunk)")
    for i, c in enumerate(chunks):
        words = sum(len(s["text"].split()) for s in c)
        print(f"  chunk {i}: scenes {c[0]['id']}-{c[-1]['id']} ({len(c)} scenes, {words} words)")

    ref_audio = str(config.voice_dir / "audio.wav")
    ref_text = (config.voice_dir / "text.txt").read_text().strip()

    print("\nLoading Qwen3-TTS voice-clone model...")
    tts_model = Qwen3TTSModel.from_pretrained(
        config.tts.model_id, device_map="cuda:0", dtype=torch.bfloat16, attn_implementation="sdpa",
    )
    print("Loading Parakeet ASR model...")
    asr_model = onnx_asr.load_model("nemo-parakeet-tdt-0.6b-v3", quantization="int8").with_timestamps()

    chunks_dir = config.output_dir / "narration_chunks"
    chunks_dir.mkdir(exist_ok=True)

    all_timing: list[dict] = []
    concatenated: list[np.ndarray] = []
    out_sr = None
    global_offset = 0.0

    for i, chunk in enumerate(chunks):
        chunk_text = " ".join(s["text"] for s in chunk)
        print(f"\nChunk {i} ({len(chunk)} scenes, {len(chunk_text.split())} words)...")

        wavs, sr = tts_model.generate_voice_clone(
            text=chunk_text, language=config.language, ref_audio=ref_audio, ref_text=ref_text,
        )
        wav = wavs[0]
        out_sr = sr
        chunk_duration = len(wav) / sr
        sf.write(chunks_dir / f"chunk_{i:02d}.wav", wav, sr)
        print(f"  synthesized {chunk_duration:.1f}s audio")

        audio_16k = wav.astype(np.float32)
        if sr != 16000:
            import librosa
            audio_16k = librosa.resample(audio_16k, orig_sr=sr, target_sr=16000)
        result = asr_model.recognize(audio_16k, sample_rate=16000)
        words = _asr_words(result.tokens, result.timestamps)
        print(f"  transcribed: {result.text!r}")

        starts = _align_scene_starts(chunk, words)
        for s in chunk:
            all_timing.append({"id": s["id"], "start": global_offset + starts[s["id"]]})

        concatenated.append(wav)
        global_offset += chunk_duration

    return _finalize_narration(config, scenes, all_timing, concatenated, out_sr)


def _generate_narration_google(config: ProjectConfig) -> Path:
    """Synthesize each scene individually with Google Cloud Text-to-Speech.

    Unlike the voice-clone provider, Google's output duration corresponds
    directly to the input text, so no ASR re-transcription/alignment is
    needed -- each scene's start time is just the running total of prior
    scenes' durations. A short SSML <break> is appended after each scene's
    text so the deck gets a brief pause between scene transitions.
    """
    from google.cloud import texttospeech

    scenes = load_storyline(config.storyline)
    print(f"{len(scenes)} scenes -> Google Cloud TTS (voice={config.tts.voice_name}, language={config.tts.language_code})")

    client = texttospeech.TextToSpeechClient()
    voice = texttospeech.VoiceSelectionParams(
        language_code=config.tts.language_code, name=config.tts.voice_name,
    )
    audio_config = texttospeech.AudioConfig(
        audio_encoding=texttospeech.AudioEncoding.LINEAR16,
        speaking_rate=config.tts.speaking_rate,
    )

    chunks_dir = config.output_dir / "narration_chunks"
    chunks_dir.mkdir(exist_ok=True)

    all_timing: list[dict] = []
    concatenated: list[np.ndarray] = []
    out_sr = None
    global_offset = 0.0

    for scene in scenes:
        ssml = f'<speak>{xml_escape(scene["text"])}<break time="{config.tts.pause_ms}ms"/></speak>'
        response = client.synthesize_speech(
            input=texttospeech.SynthesisInput(ssml=ssml), voice=voice, audio_config=audio_config,
        )

        wav, sr = sf.read(io.BytesIO(response.audio_content), dtype="float32")
        if out_sr is None:
            out_sr = sr
        elif sr != out_sr:
            raise RuntimeError(f"Google TTS returned sample rate {sr}, expected {out_sr} (previous scenes)")

        sf.write(chunks_dir / f"scene_{scene['id']:03d}.wav", wav, sr)
        duration = len(wav) / sr
        print(f"  scene {scene['id']}: {duration:.2f}s")

        all_timing.append({"id": scene["id"], "start": global_offset})
        concatenated.append(wav)
        global_offset += duration

    return _finalize_narration(config, scenes, all_timing, concatenated, out_sr)


def _generate_narration_espeak(config: ProjectConfig) -> Path:
    """Synthesize each scene individually with the local espeak-ng CLI.

    Like the google provider, no ASR/alignment step is needed -- espeak-ng
    writes one WAV file per scene, so each scene's duration is read straight
    off the synthesized audio. A block of silence is appended after each
    scene's audio for pacing between deck transitions (espeak-ng has no
    built-in SSML <break> support in plain-text mode).
    """
    import subprocess

    scenes = load_storyline(config.storyline)
    print(f"{len(scenes)} scenes -> espeak-ng (voice={config.tts.espeak_voice}, speed={config.tts.espeak_speed}wpm)")

    chunks_dir = config.output_dir / "narration_chunks"
    chunks_dir.mkdir(exist_ok=True)

    all_timing: list[dict] = []
    concatenated: list[np.ndarray] = []
    out_sr = None
    global_offset = 0.0

    for scene in scenes:
        wav_path = chunks_dir / f"scene_{scene['id']:03d}.wav"
        subprocess.run(
            [
                "espeak-ng", "-v", config.tts.espeak_voice, "-s", str(config.tts.espeak_speed),
                "-w", str(wav_path), scene["text"],
            ],
            check=True,
        )

        wav, sr = sf.read(wav_path, dtype="float32")
        if out_sr is None:
            out_sr = sr
        elif sr != out_sr:
            raise RuntimeError(f"espeak-ng returned sample rate {sr}, expected {out_sr} (previous scenes)")

        silence = np.zeros(int(sr * config.tts.pause_ms / 1000), dtype=np.float32)
        wav_with_pause = np.concatenate([wav, silence])
        print(f"  scene {scene['id']}: {len(wav) / sr:.2f}s")

        all_timing.append({"id": scene["id"], "start": global_offset})
        concatenated.append(wav_with_pause)
        global_offset += len(wav_with_pause) / sr

    return _finalize_narration(config, scenes, all_timing, concatenated, out_sr)
