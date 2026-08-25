const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Talking to an AI can be\ngenuinely powerful."
    },
    "text": "Talking to an AI can be genuinely powerful.",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "checklist_step",
      "group": "usecases",
      "kicker": "USE CASES",
      "items": [
        "Brainstorming on a walk",
        "Speaking instructions while vibe-coding",
        "Steering a robot — no keyboard to type on"
      ],
      "step": 1
    },
    "text": "Brainstorming out loud, on a walk.",
    "type": "slide"
  },
  {
    "id": 3,
    "visual": {
      "kind": "checklist_step",
      "group": "usecases",
      "kicker": "USE CASES",
      "items": [
        "Brainstorming on a walk",
        "Speaking instructions while vibe-coding",
        "Steering a robot — no keyboard to type on"
      ],
      "step": 2
    },
    "text": "Speaking instructions instead of typing them, while you're vibe-coding.",
    "type": "slide"
  },
  {
    "id": 4,
    "visual": {
      "kind": "checklist_step",
      "group": "usecases",
      "kicker": "USE CASES",
      "items": [
        "Brainstorming on a walk",
        "Speaking instructions while vibe-coding",
        "Steering a robot — no keyboard to type on"
      ],
      "step": 3
    },
    "text": "Or steering a robot — where there's no keyboard to type on in the first place.",
    "type": "slide"
  },
  {
    "id": 5,
    "visual": {
      "kind": "text_slide",
      "style": "pipeline-basic"
    },
    "text": "And speech-to-speech is actually simple to build: speech-to-text, an LLM as the agent in the middle, text-to-speech. Three models, stitched together.",
    "type": "slide"
  },
  {
    "id": 6,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "This already exists as a streaming API\nyou can just call."
    },
    "text": "This already exists as a streaming API you can just call — Google's Streaming API, OpenAI's Realtime API.",
    "type": "slide"
  },
  {
    "id": 7,
    "visual": {
      "kind": "text_slide",
      "style": "pipeline-cloud"
    },
    "text": "But there's a catch: you're sending raw audio back and forth, and you don't have full control over the agent sitting in the middle.",
    "type": "slide"
  },
  {
    "id": 8,
    "visual": {
      "kind": "text_slide",
      "style": "pipeline-local"
    },
    "text": "The alternative: run speech-to-text and text-to-speech locally. Only text ever leaves the device.",
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "A lot of that logic\nis on you."
    },
    "text": "But now, if you want it to actually feel good to use, a lot of that logic is on you. Luckily, Huggingface already did the work and open-sourced a reference build — there's a lot to learn about what a good user experience actually takes, just from looking closely at it.",
    "type": "slide"
  },
  {
    "id": 10,
    "visual": {
      "kind": "text_slide",
      "style": "pause"
    },
    "text": "We need one more component for a smooth pipeline: voice activity detection, or VAD. It's a lightweight classifier that listens to the audio and flags when a stretch of silence looks like a pause.",
    "type": "slide"
  },
  {
    "id": 11,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Wait for one big block of audio,\nand you're staring at silence."
    },
    "text": "And that brings us to the first problem: latency. Wait for one big block of audio, and transcription only starts once you're already done talking. Huggingface solves this part without even needing VAD.",
    "type": "slide"
  },
  {
    "id": 12,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "So instead: chunk it,\nkeep re-transcribing in the background."
    },
    "text": "So instead: chunk it, and keep re-transcribing in the background while you're still speaking.",
    "type": "slide"
  },
  {
    "id": 13,
    "visual": {
      "kind": "animation_step",
      "group": "chunk_transcribe",
      "anim_step": 1
    },
    "text": "Audio comes in as a stream, cut into fixed-size chunks.",
    "type": "animation",
    "group": "chunk_transcribe",
    "step": 1
  },
  {
    "id": 14,
    "visual": {
      "kind": "animation_step",
      "group": "chunk_transcribe",
      "anim_step": 2
    },
    "text": "A second chunk arrives, still no transcript yet.",
    "type": "animation",
    "group": "chunk_transcribe",
    "step": 2
  },
  {
    "id": 15,
    "visual": {
      "kind": "animation_step",
      "group": "chunk_transcribe",
      "anim_step": 3
    },
    "text": "Two chunks in, and the first transcript catches up — transcribing them took about as long as this third chunk took to arrive.",
    "type": "animation",
    "group": "chunk_transcribe",
    "step": 3
  },
  {
    "id": 16,
    "visual": {
      "kind": "animation_step",
      "group": "chunk_transcribe",
      "anim_step": 4
    },
    "text": "A fourth chunk comes in, same story.",
    "type": "animation",
    "group": "chunk_transcribe",
    "step": 4
  },
  {
    "id": 17,
    "visual": {
      "kind": "animation_step",
      "group": "chunk_transcribe",
      "anim_step": 5
    },
    "text": "The second transcript catches up too. The fifth chunk is still just audio — nobody's transcribed it yet, because you're still speaking.",
    "type": "animation",
    "group": "chunk_transcribe",
    "step": 5
  },
  {
    "id": 18,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Now the LLM needs to be fast too.\nThis is where VAD actually comes in."
    },
    "text": "Now that speech-to-text is fast, we also need the LLM's response to be fast. That's where Huggingface uses a smart trick — and this is where VAD actually comes in.",
    "type": "slide"
  },
  {
    "id": 19,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 1
    },
    "text": "Here's what that looks like under the hood. You start speaking, and speech-to-text starts re-transcribing everything every half second — not waiting for a pause, just running on a fixed clock.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 1
  },
  {
    "id": 20,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 2
    },
    "text": "You pause. Just thirty-two milliseconds of silence — far shorter than a real pause needs to be.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 2
  },
  {
    "id": 21,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 3
    },
    "text": "But that's already enough to fire a speculative reply, based on whatever's been said so far.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 3
  },
  {
    "id": 22,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 4
    },
    "text": "You keep talking. The grace window was still open, so that's allowed.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 4
  },
  {
    "id": 23,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 5
    },
    "text": "The speculative reply gets thrown away — but the transcript never stopped. Only the guess was wasted.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 5
  },
  {
    "id": 24,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 6
    },
    "text": "A real pause. Thirty-two milliseconds fires again.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 6
  },
  {
    "id": 25,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 7
    },
    "text": "A new speculative reply fires immediately, this time based on the full sentence.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 7
  },
  {
    "id": 26,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 8
    },
    "text": "Nothing interrupts it. A full second of silence passes, uninterrupted.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 8
  },
  {
    "id": 27,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 9
    },
    "text": "The gate opens. The reply was already sitting there, ready.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 9
  },
  {
    "id": 28,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_speculative",
      "anim_step": 10
    },
    "text": "Speech starts almost immediately — because the LLM's answer was already there, waiting, and now it streams straight into text-to-speech too.",
    "type": "animation",
    "group": "pipeline_speculative",
    "step": 10
  },
  {
    "id": 29,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Don't wait for the full reply either.\nStream tokens straight into speech."
    },
    "text": "And the very last piece: don't wait for the LLM's full reply either. Stream tokens straight into text-to-speech as they're generated.",
    "type": "slide"
  },
  {
    "id": 30,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "HUGGINGFACE REAL-TIME PIPELINE",
      "content": "Fast conversation.\nBad for thinking out loud."
    },
    "text": "That's the Huggingface real-time pipeline — and for this use case, it's genuinely great UX: a fast, low-latency conversation. But it's a bad fit for long pauses, for actually thinking out loud — and that's often exactly my use case.",
    "type": "slide"
  },
  {
    "id": 31,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "I manually decide when to hand the turn over —\nand run my own agent, not a general-purpose one."
    },
    "text": "So here's the alternative I actually use instead: I manually decide when to hand the turn over — and I run my own, personal agent in the middle, rather than a general-purpose one.",
    "type": "slide"
  },
  {
    "id": 32,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 1
    },
    "text": "Here's how that actually works. You start speaking.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 1
  },
  {
    "id": 33,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 2
    },
    "text": "You pause. VAD notices — a chunk boundary gets marked and the transcription starts with the existing audio.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 2
  },
  {
    "id": 34,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 3
    },
    "text": "You keep talking, while that first chunk finishes transcribing in the background — speech-to-text always lags a little behind.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 3
  },
  {
    "id": 35,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 4
    },
    "text": "You decide you're done, and press send — no VAD needed here. The manual trigger fires on its own, whether or not a pause was ever detected. Which means you can record audio with pauses built right into it — exactly what happens to me when I'm still sorting out my thoughts, using an AI agent as a sparring partner.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 4
  },
  {
    "id": 36,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 5
    },
    "text": "One more transcription to catch up on — the last stretch of audio still has to go through speech-to-text before anything can be sent.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 5
  },
  {
    "id": 37,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 6
    },
    "text": "Both chunks arrive at the LLM together.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 6
  },
  {
    "id": 38,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 7
    },
    "text": "The reply starts streaming. First token out — but nothing's spoken yet, text-to-speech needs a little buffer before it can start.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 7
  },
  {
    "id": 39,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 8
    },
    "text": "Speech catches up, one token behind.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 8
  },
  {
    "id": 40,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 9
    },
    "text": "Streaming continues, still one step behind.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 9
  },
  {
    "id": 41,
    "visual": {
      "kind": "animation_step",
      "group": "pipeline_steps",
      "anim_step": 10
    },
    "text": "And the last word is spoken. No more tokens coming — text-to-speech just finishes what it already has.",
    "type": "animation",
    "group": "pipeline_steps",
    "step": 10
  },
  {
    "id": 42,
    "visual": {
      "kind": "text_slide",
      "style": "wakeword"
    },
    "text": "For the best experience, you need a bit more logic still — take wake word detection, for example. It's a small, always-on model listening for nothing but a single trigger phrase — \"Hey Google,\" \"Alexa\" — cheap enough to run continuously, without waking the rest of the pipeline.",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "text_slide",
      "style": "bargein-interrupt"
    },
    "text": "Then there's barge-in: interrupting the reply before it's finished. You need a signal for that.",
    "type": "slide"
  },
  {
    "id": 44,
    "visual": {
      "kind": "text_slide",
      "style": "bargein-button"
    },
    "text": "The easy way is a push button — press it, and the assistant stops talking.",
    "type": "slide"
  },
  {
    "id": 45,
    "visual": {
      "kind": "text_slide",
      "style": "echo-overlap"
    },
    "text": "Otherwise, the signal is just you speaking again. But that means detecting your voice while the speaker is still playing the reply back — harder than it sounds.",
    "type": "slide"
  },
  {
    "id": 46,
    "visual": {
      "kind": "text_slide",
      "style": "echo-compare"
    },
    "text": "On headphones, that's not a problem. Without them, you need real acoustic echo cancellation hardware.",
    "type": "slide"
  },
  {
    "id": 47,
    "visual": {
      "kind": "text_slide",
      "style": "wakeword-mini"
    },
    "text": "Or you sidestep the echo problem entirely: use a wake word again, so the assistant can tell your voice apart from its own.",
    "type": "slide"
  },
  {
    "id": 48,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "I wrote the whole walkthrough down."
    },
    "text": "After building something like this myself, I ended up writing the whole walkthrough down — partly just so I could keep the current logic straight in my own head. It's all there in detail, in text, on my blog.",
    "type": "slide"
  },
  {
    "id": 49,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "content": "quantitative-thinking.com"
    },
    "text": "It contains a full writeup and the interactive walkthroughs — link in the comments.",
    "type": "slide"
  }
];
