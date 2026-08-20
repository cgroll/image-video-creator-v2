#!/usr/bin/env python3
"""Regenerate <project>/deck-scenes.js from <project>/storyline.yaml, powering
deck.html's manual preview mode (open deck.html?manual=1 in a browser to
step through slides without running the full narrate/record pipeline).

Usage: uv run python scripts/generate_deck_scenes.py <project-name>
"""
import json
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    project = sys.argv[1]
    project_dir = REPO_ROOT / "projects" / project
    scenes = yaml.safe_load((project_dir / "storyline.yaml").read_text())

    entries = []
    for s in scenes:
        v = s["visual"]
        entry = {"id": s["id"], "visual": v}
        if v.get("kind") == "animation_step":
            entry["type"] = "animation"
            entry["group"] = v.get("group")
            entry["step"] = v.get("anim_step")
        else:
            entry["type"] = "slide"
        entries.append(entry)

    out_path = project_dir / "deck-scenes.js"
    out_path.write_text(f"const DECK_SCENES = {json.dumps(entries, indent=2, ensure_ascii=False)};\n")
    print(f"Wrote {out_path} ({len(entries)} scenes)")


if __name__ == "__main__":
    main()
