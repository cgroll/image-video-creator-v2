"""Drive a project's deck.html through Chromium (Playwright), scene by scene,
according to scene_timing.json, recording the viewport as a silent video.

The driver is deliberately deck-agnostic: it only ever calls one JS function,
`window.renderScene(visual)`, passing each scene's `visual` object straight
through from the storyline. All the deck-specific dispatch (which style is a
text slide, which named animation group maps to which JS driver, ...) lives
inside the project's own deck.html, not here.
"""
import json
import shutil
from pathlib import Path

from .config import ProjectConfig


def record_deck(config: ProjectConfig, timing_path: Path) -> Path:
    from playwright.sync_api import sync_playwright

    data = json.loads(timing_path.read_text())
    scenes_by_id = {s["id"]: s for s in data["scenes"]}
    timing = data["timing"]

    clips_dir = config.output_dir / "clips"
    clips_dir.mkdir(exist_ok=True)
    video_tmp_dir = clips_dir / "_raw"
    if video_tmp_dir.exists():
        shutil.rmtree(video_tmp_dir)
    video_tmp_dir.mkdir(parents=True)

    w, h, fps = config.video.width, config.video.height, config.video.fps

    with sync_playwright() as p:
        browser = p.chromium.launch()
        context = browser.new_context(
            viewport={"width": w, "height": h},
            record_video_dir=str(video_tmp_dir),
            record_video_size={"width": w, "height": h},
        )
        page = context.new_page()
        page.goto(f"file://{config.deck}?record=1")
        page.wait_for_timeout(300)

        for t in timing:
            scene = scenes_by_id[t["id"]]
            duration_ms = int(max(t["duration"], 0.1) * 1000)
            page.evaluate("(v) => window.renderScene(v)", scene["visual"])
            print(f"scene {t['id']:>2} [{scene['visual'].get('kind', '?'):<15}] {duration_ms / 1000:.2f}s")
            page.wait_for_timeout(duration_ms)

        page.wait_for_timeout(200)
        raw_video_path = page.video.path()
        context.close()
        browser.close()

    out_path = config.output_dir / "deck.mp4"
    shutil.copy(raw_video_path, out_path)
    shutil.rmtree(video_tmp_dir)
    print(f"\nWrote {out_path}")
    return out_path
