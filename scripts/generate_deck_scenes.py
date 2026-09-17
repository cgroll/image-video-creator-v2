#!/usr/bin/env python3
"""Regenerate <project>/deck-scenes.js from <project>/storyline.yaml, powering
deck.html's manual preview mode (open deck.html directly in a browser to
step through slides without running the full narrate/record pipeline).

Also renumbers every scene's `id:` in storyline.yaml to match its position
(1, 2, 3, ...) before generating -- so `id` never needs to be maintained by
hand. Insert, delete, or reorder scenes freely; a new scene can even omit
`id:` entirely (it gets inserted). Re-numbering is safe to do on every run
because `id` has no meaning beyond a lookup key for TTS chunk filenames and
scene_timing.json -- narration.py always regenerates those from scratch, so
nothing downstream depends on an id's value staying stable across edits.

Usage: uv run python scripts/generate_deck_scenes.py <project-name>
"""
import json
import re
import sys
from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parents[1]

_SCENE_ID_RE = re.compile(r"^- id:\s*\d+\s*$")
_INDENTED_ID_RE = re.compile(r"^  id:\s*\d+\s*$")


def renumber_ids(text: str) -> tuple[str, int]:
    """Rewrite every top-level scene's `id:` to match its 1-based position,
    inserting the key if a scene omits it. A scene boundary is any line
    starting with `-` at column 0 -- safe because nested content (block
    scalars, mapping values) is always indented further in this file.

    Handles both scene layouts found in the wild: `id:` as the scene's first
    key (`- id: N`) and `id:` on its own indented line after `text:` (e.g.
    `- text: "..."` followed by `  id: N`). In the latter case, an existing
    `  id:` line is updated in place rather than appending a second one --
    appending unconditionally would leave duplicate `id:` keys in the
    mapping (invalid YAML) every time this script re-runs on such a scene.
    """
    lines = text.split("\n")
    starts = [i for i, line in enumerate(lines) if line.startswith("-")]
    n_scenes = len(starts)
    boundaries = starts + [len(lines)]

    out = lines[: boundaries[0]] if starts else list(lines)
    for idx in range(n_scenes):
        n = idx + 1
        block = lines[boundaries[idx] : boundaries[idx + 1]]
        first_line = block[0]
        rest = block[1:]
        if _SCENE_ID_RE.match(first_line):
            out.append(f"- id: {n}")
        else:
            out.append(first_line)
            for j, line in enumerate(rest):
                if _INDENTED_ID_RE.match(line):
                    rest[j] = f"  id: {n}"
                    break
            else:
                rest = [f"  id: {n}"] + rest
        out.extend(rest)
    return "\n".join(out), n_scenes


def main() -> None:
    project = sys.argv[1]
    project_dir = REPO_ROOT / "projects" / project
    storyline_path = project_dir / "storyline.yaml"

    original = storyline_path.read_text()
    renumbered, n_scenes = renumber_ids(original)
    scenes = yaml.safe_load(renumbered)
    if len(scenes) != n_scenes or [s["id"] for s in scenes] != list(range(1, n_scenes + 1)):
        raise ValueError(
            "renumber_ids produced inconsistent ids -- storyline.yaml likely uses a "
            "scene layout this script doesn't recognize (e.g. `id:` on its own line "
            "under a bare `-`). Left the file untouched; fix manually."
        )
    if renumbered != original:
        storyline_path.write_text(renumbered)
        print(f"Renumbered ids in {storyline_path} (1..{n_scenes})")

    entries = []
    for s in scenes:
        v = s["visual"]
        entry = {"id": s["id"], "visual": v, "text": s.get("text", "")}
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
