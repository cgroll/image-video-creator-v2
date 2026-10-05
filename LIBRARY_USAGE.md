# Using image-video-creator from another repo

Copy this file into the project repo that will hold the video (e.g. as
`VIDEO.md` or into a `video/` subfolder). It tells an agent working in *that*
repo how to drive this framework without moving any content into this
repo's own `projects/` folder — the storyline, deck, and output all stay in
the consuming repo.

This framework (`image-video-creator-v2`, currently cloned at
`/home/chris/research/image-video-creator-v2` on this machine) turns a
written storyline + a hand-built HTML/SVG slide deck into a narrated video.
Full pipeline details: that repo's own `README.md` and `AGENTS.md`. This
file is the short version for working from *outside* it.

## The contract: three files you own, in your own repo

Pick a directory in your repo for the video (any name, any location), e.g.
`video/my-explainer/`. It needs exactly three hand-authored files:

1. **`project.yaml`** — config: title, which TTS provider, video resolution.
2. **`storyline.yaml`** — the script: a YAML list of scenes, each with
   spoken `text` and a `visual` object passed through as-is to the deck.
3. **`deck.html`** — a self-contained HTML/CSS/JS file implementing one
   global function, `window.renderScene(visual)`, that renders whatever
   `visual` shapes your storyline uses. This is the actual illustration
   work and has to be hand-built per video (copy an existing `deck.html`
   from this framework's `projects/*/deck.html` as a starting style
   library and extend it).

The framework never interprets `visual`'s contents — only your `deck.html`
does. See the framework's README, section "What you need to provide for a
new video", for the full `project.yaml`/`storyline.yaml` schema and
examples.

Everything the pipeline generates (`narration.wav`, `deck.mp4`, the final
`.mp4`, `scene_timing.json`) lands in `<your-video-dir>/output/` — gitignore
that directory in your repo, same as this framework does for its own
`projects/*/output/`.

## Invoking the tool

The `video-creator` CLI's project argument accepts a path, not just a name
under this framework's `projects/` — so you never need to move your files
into this repo. Run it with `uv run --project` pointed at the framework repo,
and the project argument pointed at your video directory:

```bash
uv run --project /home/chris/research/image-video-creator-v2 video-creator \
  /absolute/path/to/your-repo/video/my-explainer build
# or step by step: narrate / record / assemble instead of build
```

For fast iteration on the deck's visuals (no TTS, no recording — just
prev/next through scenes in a browser), regenerate the preview data the same
way:

```bash
uv run --project /home/chris/research/image-video-creator-v2 python \
  /home/chris/research/image-video-creator-v2/scripts/generate_deck_scenes.py \
  /absolute/path/to/your-repo/video/my-explainer
```

then open `your-repo/video/my-explainer/deck.html` directly in a browser.
Re-run after every `storyline.yaml` edit and reload.

Requirements on this machine either way: `ffmpeg` on `PATH`, and this
framework repo already `uv sync`'d with `uv run playwright install
chromium` done once. Nothing needs to be installed into your own repo's
environment — `uv run --project` runs everything in the framework's own
virtualenv regardless of your repo's setup.

## Choosing a TTS provider (`project.yaml`'s `tts.provider`)

- **`espeak`** — local, offline, no GPU, no account. Robotic-sounding but
  instant; the right default for a placeholder pass. No extra setup beyond
  `espeak-ng` on `PATH`.
- **`google`** — Google Cloud TTS, natural prebuilt voices. Needs Application
  Default Credentials for a GCP project with the Cloud TTS API enabled.
- **`qwen_daemon`** — sends each scene's text to an *already-running*
  Qwen3-TTS daemon over a local Unix socket (e.g. the one in the
  speech-to-speech project, started with `qwen-tts enable`) and gets audio
  back. No GPU/model load here — the daemon owns the model and a fixed
  preset speaker/language. Only works if that daemon is running on the
  *same machine* you run `video-creator` on (the socket isn't networked).
- **`qwen_voice_clone`** — a cloned voice from a short reference recording,
  needs an NVIDIA GPU. **Known limitation when used from another repo**:
  this provider looks up its voice profile under this framework's own
  `assets/voices/<name>/`, resolved as two directories above the project
  folder — that resolution assumes the project lives inside this framework
  repo's `projects/` folder. From an external repo it will look in the
  wrong place. Use `espeak`, `google`, or `qwen_daemon` instead until that
  resolution is made configurable.

## What doesn't generalize

The per-diagram illustration work inside `deck.html` — custom SVG
animations for your video's specific content — is genuinely hand-built per
video; nothing here generates that for you. The plumbing above (storyline →
timed narration → recorded deck → muxed video) is what's reusable.
