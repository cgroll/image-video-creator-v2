"""Storyline loading.

A storyline is a YAML list of scenes:

    - id: 1
      text: "Spoken narration for this scene."
      visual:
        kind: text_slide       # | animation_step | checklist_step
        style: statement       # text_slide only
        content: |             # text_slide only, optional
          Line one
          Line two

Each scene's `text` is what gets spoken (and used to recover word timings);
`visual` is passed as-is to the deck's `window.renderScene(visual)` JS
function, so its shape is really defined by the project's deck.html, not by
this framework.
"""
from pathlib import Path

import yaml


def load_storyline(path: Path) -> list[dict]:
    scenes = yaml.safe_load(path.read_text())
    if not isinstance(scenes, list):
        raise ValueError(f"{path}: expected a YAML list of scenes")
    return scenes
