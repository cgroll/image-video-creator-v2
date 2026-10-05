"""Client for an externally-running Qwen3-TTS daemon, reached over its
Unix-domain socket -- e.g. the one in the speech-to-speech project
(`speech_to_speech.tts_daemon.daemon`, started via `qwen-tts enable`), which
loads the model once with a fixed preset speaker/language and serves
synthesis requests from then on.

This framework doesn't load any TTS model itself for this provider -- it
just asks an already-running, already-warmed-up daemon on the same machine
to synthesize each scene's text and hand back raw audio samples. That means
no GPU, no voice profile, and no model load time here; the daemon owns all
of that.

Deliberately reimplements the tiny socket protocol instead of importing it
from the speech-to-speech package, so this framework has no hard dependency
on that specific sibling repo -- any daemon speaking the same
`{"cmd": "synthesize", "text": ...}` ->
`{"ok": true, "audio": <base64 float32 PCM>, "sample_rate": int}` protocol
over a Unix socket works, not just that one.
"""
import base64
import json
import os
import socket

import numpy as np

DEFAULT_SOCKET_NAME = "qwen-tts.sock"

# Generation can legitimately take a while for a long scene; matches the
# client-side timeout speech-to-speech's own tts_client.py uses for the same
# call.
_SYNTHESIZE_TIMEOUT_S = 600.0
_STATUS_TIMEOUT_S = 5.0


class DaemonUnavailableError(RuntimeError):
    """Raised when the TTS daemon isn't reachable over its Unix socket."""


def default_socket_path() -> str:
    runtime_dir = os.environ.get("XDG_RUNTIME_DIR", "/tmp")
    return os.path.join(runtime_dir, DEFAULT_SOCKET_NAME)


def _send_command(sock_path: str, cmd: dict, timeout: float) -> dict | None:
    """Sends one JSON command over a fresh connection and returns the decoded
    JSON response, or None if the daemon isn't reachable (not running, a
    stale socket file, or a connection that dropped before finishing)."""
    try:
        with socket.socket(socket.AF_UNIX, socket.SOCK_STREAM) as sock:
            sock.settimeout(timeout)
            sock.connect(sock_path)
            sock.sendall(json.dumps(cmd).encode())
            sock.shutdown(socket.SHUT_WR)
            chunks = []
            while chunk := sock.recv(4096):
                chunks.append(chunk)
        data = b"".join(chunks)
        if not data:
            return None
        return json.loads(data.decode())
    except (FileNotFoundError, ConnectionRefusedError, ConnectionResetError, BrokenPipeError, OSError, json.JSONDecodeError):
        return None


def ensure_available(sock_path: str | None = None) -> None:
    """Fails fast with a clear error if the daemon isn't reachable, instead
    of letting narration.py discover that mid-storyline on the first scene."""
    sock_path = sock_path or default_socket_path()
    result = _send_command(sock_path, {"cmd": "status"}, timeout=_STATUS_TIMEOUT_S)
    if result is None:
        raise DaemonUnavailableError(
            f"Qwen TTS daemon not reachable at {sock_path!r} -- start it first "
            "(e.g. `qwen-tts enable` in the speech-to-speech project), and make "
            "sure video-creator is running on the same machine as the daemon "
            "(the socket is local, not networked)."
        )


def synthesize(text: str, sock_path: str | None = None) -> tuple[np.ndarray, int]:
    """Sends `text` to the daemon's `synthesize` command and returns
    (samples, sample_rate) as float32 mono PCM. Blocks until synthesis
    finishes. The daemon serves one request at a time -- if something else
    (e.g. the speech-to-speech voice-chat app) is using it concurrently, this
    raises rather than silently queueing."""
    sock_path = sock_path or default_socket_path()
    result = _send_command(sock_path, {"cmd": "synthesize", "text": text}, timeout=_SYNTHESIZE_TIMEOUT_S)
    if result is None:
        raise DaemonUnavailableError(
            f"Qwen TTS daemon not reachable at {sock_path!r} -- start it first "
            "(e.g. `qwen-tts enable` in the speech-to-speech project)."
        )
    if not result.get("ok"):
        raise RuntimeError(f"Qwen TTS daemon error: {result.get('error')}")
    audio_b64 = result.get("audio")
    audio = np.frombuffer(base64.b64decode(audio_b64), dtype=np.float32) if audio_b64 else np.zeros(0, dtype=np.float32)
    return audio, result.get("sample_rate") or 0
