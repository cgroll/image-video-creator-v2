from dataclasses import dataclass, field
from pathlib import Path

import yaml


@dataclass
class VideoConfig:
    width: int = 1920
    height: int = 1080
    fps: int = 25


@dataclass
class TTSConfig:
    provider: str = "qwen_voice_clone"  # "qwen_voice_clone" | "google" | "espeak"

    # qwen_voice_clone
    model_id: str = "Qwen/Qwen3-TTS-12Hz-0.6B-Base"
    target_words_per_chunk: int = 200

    # google (Google Cloud Text-to-Speech)
    voice_name: str = "en-US-Chirp3-HD-Achird"
    language_code: str = "en-US"
    speaking_rate: float = 1.0
    pause_ms: int = 300

    # espeak (local, offline, no GPU -- quick placeholder narration)
    espeak_voice: str = "en-us"
    espeak_speed: int = 150  # words per minute


@dataclass
class ProjectConfig:
    project_dir: Path
    repo_root: Path
    title: str
    storyline: Path
    deck: Path
    voice: str
    language: str
    video: VideoConfig = field(default_factory=VideoConfig)
    tts: TTSConfig = field(default_factory=TTSConfig)

    @classmethod
    def load(cls, project_dir: Path) -> "ProjectConfig":
        data = yaml.safe_load((project_dir / "project.yaml").read_text())
        # projects/<name>/ -> repo root is two levels up
        repo_root = project_dir.parent.parent
        return cls(
            project_dir=project_dir,
            repo_root=repo_root,
            title=data["title"],
            storyline=project_dir / data.get("storyline", "storyline.yaml"),
            deck=project_dir / data.get("deck", "deck.html"),
            voice=data["voice"],
            language=data.get("language", "english"),
            video=VideoConfig(**data.get("video", {})),
            tts=TTSConfig(**data.get("tts", {})),
        )

    @property
    def voice_dir(self) -> Path:
        return self.repo_root / "assets" / "voices" / self.voice

    @property
    def output_dir(self) -> Path:
        out = self.project_dir / "output"
        out.mkdir(exist_ok=True)
        return out
