"""Mux the recorded (silent) deck video with the narration audio track."""
import subprocess
from pathlib import Path


def assemble_video(video_path: Path, audio_path: Path, out_path: Path) -> Path:
    cmd = [
        "ffmpeg", "-y",
        "-i", str(video_path),
        "-i", str(audio_path),
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-preset", "medium", "-crf", "20",
        "-c:a", "aac", "-b:a", "160k",
        "-shortest",
        str(out_path),
    ]
    subprocess.run(cmd, check=True)
    print(f"Wrote {out_path}")
    return out_path
