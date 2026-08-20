# image-video-creator

Turns a written storyline + a hand-built HTML/SVG slide deck into a narrated
video, spoken in a cloned voice. Extracted from the pipeline used to build
the "Voice Pipeline Turn-Taking" explainer video.

The pipeline has three stages:

1. **narrate** — synthesize the storyline's spoken text with one of two TTS
   providers (set via `tts.provider` in `project.yaml`):
   - `qwen_voice_clone` (default): a cloned voice (Qwen3-TTS voice cloning),
     transcribed back with Parakeet ASR to recover word-level timings, then
     aligned to scene boundaries.
   - `google`: Google Cloud Text-to-Speech, using a named prebuilt voice.
     Synthesized per scene; no ASR/alignment needed since each scene's
     audio duration maps directly to its timing.

   Either way, produces `narration.wav` + `scene_timing.json`.
2. **record** — drive the project's `deck.html` headlessly in Chromium
   (Playwright), stepping through scenes according to `scene_timing.json`,
   recording the browser viewport as a silent video (`deck.mp4`).
3. **assemble** — mux `deck.mp4` and `narration.wav` into the final `.mp4`
   with ffmpeg.

## Repo layout

```
assets/voices/<name>/audio.wav, text.txt   # voice profiles, shared across projects
projects/<name>/project.yaml               # per-project config
projects/<name>/storyline.yaml             # per-project script
projects/<name>/deck.html                  # per-project slide/illustration engine
projects/<name>/output/                    # generated, gitignored
src/video_creator/                         # the framework
```

## Setup

Requirements: `ffmpeg` on `PATH` and [`uv`](https://docs.astral.sh/uv/).
An NVIDIA GPU is required only for the `qwen_voice_clone` provider (the TTS
model runs on `cuda:0`); the `google` provider needs no GPU.

```bash
uv sync
uv run playwright install chromium
```

If using the `google` provider, set up Application Default Credentials for
a project with the Cloud Text-to-Speech API enabled — either
`gcloud auth application-default login`, or point
`GOOGLE_APPLICATION_CREDENTIALS` at a service-account JSON key.

## Running

```bash
uv run video-creator <project-name> build      # narrate + record + assemble
# or step by step:
uv run video-creator <project-name> narrate
uv run video-creator <project-name> record
uv run video-creator <project-name> assemble
```

`<project-name>` is a directory name under `projects/` (or a path to one).
Output lands in `projects/<project-name>/output/`.

## What you need to provide for a new video

**1. A voice.** Depends on the provider:

- `qwen_voice_clone`: a voice profile at `assets/voices/<name>/` — reusable
  across projects, usually set up once, not per video.
  - `audio.wav`: a clean reference recording, ~15-20s is plenty.
  - `text.txt`: the exact transcript of that recording.

  To add a new one: record a clip, transcribe it (e.g. with the same
  Parakeet model this framework already uses for alignment), and drop both
  files in `assets/voices/<name>/`.
- `google`: no profile needed — just a prebuilt voice name (e.g.
  `en-US-Chirp3-HD-Achird`, `en-US-Studio-O`). List available voices with
  `gcloud texttospeech voices list` or the `client.list_voices()` API.

**2. `projects/<name>/project.yaml`**

```yaml
title: "My Video"
storyline: storyline.yaml
deck: deck.html
voice: chris_en          # only used by qwen_voice_clone; ignored by google
language: english         # only used by qwen_voice_clone
video:
  width: 1920
  height: 1080
  fps: 25
tts:
  provider: qwen_voice_clone   # or "google"
  model_id: "Qwen/Qwen3-TTS-12Hz-0.6B-Base"
  target_words_per_chunk: 200   # chunk size for narration generation; see note below
```

Or, for Google Cloud Text-to-Speech:

```yaml
tts:
  provider: google
  voice_name: "en-US-Chirp3-HD-Achird"
  language_code: "en-US"
  speaking_rate: 1.0
  pause_ms: 300   # silence appended after each scene, for pacing between deck transitions
```

**3. `projects/<name>/storyline.yaml`** — the script. A YAML list of scenes:

```yaml
- id: 1
  text: "Spoken narration for this scene."
  visual:
    kind: text_slide
    style: statement
    content: |
      Line one
      Line two

- id: 2
  text: "Something about a three-step checklist."
  visual:
    kind: checklist_step
    group: usecases
    kicker: "USE CASES"
    items: ["First thing", "Second thing", "Third thing"]
    step: 1
```

`text` is what gets spoken and is what timing gets aligned against. `visual`
is passed through as-is to your deck's `window.renderScene(visual)` — this
framework does not interpret it, so its shape (which `kind`s exist, what
fields each one needs) is entirely up to the deck you write. The three kinds
above (`text_slide`, `checklist_step`, `animation_step`) are just what the
`voice-pipeline-turn-taking` project happens to use.

**4. `projects/<name>/deck.html`** — a single self-contained HTML/CSS/JS file
that is both the illustration work *and* the reusable visual style library.
The only contract the framework requires is one global JS function:

```js
window.renderScene(visual)   // visual = the scene's `visual` object from storyline.yaml
```

Everything else — text-slide styles, custom SVG diagram animations, reveal
logic — lives inside this file and is fair game to copy from an existing
project's `deck.html` and extend, so new videos stay visually consistent
with old ones. The actual per-diagram illustration work (new SVG animations
for a new video's specific technical content) does **not** generalize and
has to be built by hand each time — that's the real cost of a new video,
not the plumbing around it.

## Future ideas (not implemented)

**Animation on-screen text lives in deck.html, not storyline.yaml.** For
`animation_step` scenes, the headline/subtext text shown *in* the diagram
(e.g. "You pause — VAD notices") is currently a separate hardcoded array
inside `deck.html`'s JS, independent of the spoken `text` in
`storyline.yaml`. The two are hand-kept in sync by whoever writes the
storyline — there's no single source of truth, so they can drift. Pulling
the on-screen text into `storyline.yaml` (and having `deck.html` render
whatever it's given instead of indexing into its own array) would fix this,
but wasn't done in this first cut of the framework.

**Text slides could be generated from Markdown instead of hand-authored per
project.** The custom SVG diagram animations genuinely need real HTML/CSS/JS
— they're stateful, continuously-animated objects (segments fading,
counters ticking over, labels switching from "SPECULATIVE" to "COMMITTED"
mid-diagram), not a sequence of discrete images, and Playwright records
those live CSS transitions as they actually play. That doesn't generalize
and has to be hand-built per video.

But the plain `text_slide` styles (`statement`, `thesis`, `cta`, ...) have
no internal state — text in, styled layout out, like a reveal.js/Slidev
theme. Those *could* be authored as plain Markdown with a style tag per
slide and auto-transformed into deck markup, instead of being written by
hand into `storyline.yaml` + relying on `deck.html`'s existing style CSS.
Would make the common case (a video that's mostly statement/thesis-style
slides, with maybe one or two custom diagrams) faster to author, without
touching how the animated diagrams work.

## Notes on chunking (qwen_voice_clone only)

The TTS model has a hard generation-length cap (~2048 tokens / ~170s of
audio per call), so the full storyline can't be synthesized in one shot.
`target_words_per_chunk` controls how scenes get grouped into synthesis
calls — bigger chunks give more natural prosody across sentences (fewer,
less-abrupt voice transitions) but must stay safely under the cap. ~200
words/chunk (~70-90s of audio at this voice's pace) leaves comfortable
margin; push it much higher only if you've checked the model's actual
per-word pace first.
