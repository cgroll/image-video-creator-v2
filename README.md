# image-video-creator

Turns a written storyline + a hand-built HTML/SVG slide deck into a narrated
video, spoken in a cloned voice. Extracted from the pipeline used to build
the "Voice Pipeline Turn-Taking" explainer video.

The pipeline has three stages:

1. **narrate** — synthesize the storyline's spoken text with one of three TTS
   providers (set via `tts.provider` in `project.yaml`):
   - `qwen_voice_clone` (default): a cloned voice (Qwen3-TTS voice cloning),
     transcribed back with Parakeet ASR to recover word-level timings, then
     aligned to scene boundaries.
   - `google`: Google Cloud Text-to-Speech, using a named prebuilt voice.
     Synthesized per scene; no ASR/alignment needed since each scene's
     audio duration maps directly to its timing.
   - `espeak`: the local `espeak-ng` CLI — offline, no GPU, no API calls,
     robotic-sounding but instant. Like `google`, synthesized per scene, so
     no ASR/alignment needed. Good for a quick placeholder pass.

   Either way, produces `narration.wav` + `scene_timing.json` — see
   [How narration timing is generated](#how-narration-timing-is-generated)
   below for exactly how that timing gets computed.
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

## How narration timing is generated

The short version: audio comes first, and its *measured* duration is what
drives the video, not the other way around. `narrate` fully decides how long
each scene is; `record` just replays that decision.

**1. `narrate` produces two things per scene: audio and a start time.**

For `google` and `espeak`, this is direct — each scene is synthesized as its
own separate audio call, so its duration is just "how long is this wav file".
A scene's start time is simply the running total of every prior scene's
duration ([narration.py](src/video_creator/narration.py)'s
`_generate_narration_google` / `_generate_narration_espeak`).

`qwen_voice_clone` can't do this, because scenes aren't synthesized one at a
time — they're batched into chunks of ~`target_words_per_chunk` words (see
"Notes on chunking" below) so the voice model produces natural-sounding
prosody across sentence boundaries instead of one clipped-sounding utterance
per scene. That means a chunk's audio duration is known, but *where inside
that audio* each individual scene starts is not. `_generate_narration_qwen_voice_clone`
recovers this by transcribing the synthesized chunk back with Parakeet ASR
(which returns word-level timestamps), then fuzzy-aligning the ASR's
recognized words against the storyline's expected words via
`difflib.SequenceMatcher` (`_align_scene_starts` in narration.py) — robust to
occasional misrecognitions and to compound words like "speech-to-text"
getting split differently by the ASR than by the script. The first aligned
word of each scene gives that scene's start time within the chunk; adding the
chunk's running offset gives its position in the full narration.

**2. Both paths converge on `scene_timing.json`:**

```json
{
  "scenes": [ { "id": 1, "text": "...", "visual": {...} }, ... ],
  "timing": [ { "id": 1, "start": 0.0, "end": 3.2, "duration": 3.2 }, ... ],
  "audio_file": "output/narration.wav",
  "total_seconds": 187.4
}
```

`scenes` is the full storyline content copied in verbatim; `timing` is the
newly computed start/end/duration per scene id. This file is a **generated
build artifact**, not a second hand-authored source of truth — it lives in
the gitignored `output/` directory and gets fully rewritten on every
`narrate` run. Bundling the storyline content alongside the timing exists
purely so `record` has one self-contained file to read, the same way
`deck-scenes.js` bundles storyline content for the manual-preview UI.

**3. `record` just plays the numbers back.** For each entry in `timing`, it
calls `window.renderScene(scene.visual)` in the headless browser, then waits
exactly `duration` seconds — while Playwright continuously records the
viewport ([recorder.py](src/video_creator/recorder.py)). There's no
synchronization logic left to do at this point: the wait time *is* the
audio-measured duration, so picture and sound line up automatically once
`assemble` muxes them together.

## Iterating on visuals

Running `narrate` + `record` for every small tweak is slow — TTS calls take
time (and cost, for `google`) and `record` re-drives the whole deck in a
headless browser. For working on the deck itself, use the manual preview
instead:

```bash
uv run python scripts/generate_deck_scenes.py <project-name>
```

This regenerates `projects/<name>/deck-scenes.js` from `storyline.yaml`.
Open `projects/<name>/deck.html` directly in a browser to step through every
scene with prev/next buttons and a dot per scene — no narration, no
recording, instant feedback on layout changes. Re-run the script after every
`storyline.yaml` edit and reload the page; `deck-scenes.js` is generated and
shouldn't be hand-edited. Manual browsing is the default view — the recorder
opts out of it via `?record=1` so the nav UI never shows up in the recorded
video. Press **T** (or click the "T" button) to toggle the spoken-text panel
on/off — handy while checking a scene's narration, distracting once you're
just judging layout.

To see what `visual.kind`/`style` values an existing deck already supports,
grep `RENDERERS` in `deck.html` (the style → HTML template dict) or look at
scenes already used in `storyline.yaml` for working examples.

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
- `espeak`: no profile needed — just an `espeak-ng` voice code (e.g.
  `en-us`). List available voices with `espeak-ng --voices`.

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

Or, for offline placeholder narration via `espeak-ng`:

```yaml
tts:
  provider: espeak
  espeak_voice: "en-us"
  espeak_speed: 150   # words per minute
  pause_ms: 300
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

Wrap a word or phrase in `[[double brackets]]` inside a `content` or
`items` string to highlight it on the slide (e.g. `content: "you can just
[[call]] it."`) — every project's `deck.html` renders `[[...]]` as a styled
`<span class="word-hl">`. This is for one-off, per-instance emphasis chosen
by whoever writes that line; layout-level rules that apply to every slide of
a given style (e.g. "the second line is always the accent line") stay in
`deck.html`'s CSS instead, since those aren't specific to any one scene's
text.

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
