import argparse
import sys
from pathlib import Path

from .config import ProjectConfig

REPO_ROOT = Path(__file__).resolve().parents[2]


def resolve_project_dir(project: str) -> Path:
    candidate = Path(project)
    if candidate.is_dir() and (candidate / "project.yaml").exists():
        return candidate.resolve()
    candidate = REPO_ROOT / "projects" / project
    if (candidate / "project.yaml").exists():
        return candidate.resolve()
    raise SystemExit(f"No project.yaml found for {project!r} (looked in ./{project} and projects/{project}/)")


def main() -> None:
    parser = argparse.ArgumentParser(prog="video-creator")
    parser.add_argument("project", help="Project name under projects/, or a path to a project directory")
    parser.add_argument("command", choices=["narrate", "record", "assemble", "build"])
    args = parser.parse_args()

    project_dir = resolve_project_dir(args.project)
    config = ProjectConfig.load(project_dir)

    timing_path = config.output_dir / "scene_timing.json"

    if args.command in ("narrate", "build"):
        from .narration import generate_narration
        timing_path = generate_narration(config)

    if args.command in ("record", "build"):
        from .recorder import record_deck
        if not timing_path.exists():
            raise SystemExit(f"{timing_path} not found -- run `narrate` first")
        video_path = record_deck(config, timing_path)

    if args.command in ("assemble", "build"):
        from .assemble import assemble_video
        import json
        video_path = config.output_dir / "deck.mp4"
        audio_path = config.output_dir / "narration.wav"
        if not video_path.exists() or not audio_path.exists():
            raise SystemExit("deck.mp4 / narration.wav not found -- run `narrate` and `record` first")
        out_path = config.output_dir / f"{project_dir.name}.mp4"
        assemble_video(video_path, audio_path, out_path)


if __name__ == "__main__":
    main()
