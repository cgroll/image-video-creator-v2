const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "checklist_step",
      "kicker": "AN AGENT, IN SHORT",
      "items": [
        {
          "icon": "cpu",
          "text": "A language model"
        },
        {
          "icon": "bulb",
          "text": "Reasoning — thinking before it acts"
        },
        {
          "icon": "wrench",
          "text": "Tools — real actions, real feedback"
        },
        {
          "icon": "layers",
          "text": "Memory — what carries across steps"
        }
      ],
      "step": 1
    },
    "text": "In short: a language model.",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "checklist_step",
      "kicker": "AN AGENT, IN SHORT",
      "items": [
        {
          "icon": "cpu",
          "text": "A language model"
        },
        {
          "icon": "bulb",
          "text": "Reasoning — thinking before it acts"
        },
        {
          "icon": "wrench",
          "text": "Tools — real actions, real feedback"
        },
        {
          "icon": "layers",
          "text": "Memory — what carries across steps"
        }
      ],
      "step": 2
    },
    "text": "That reasons before it acts.",
    "type": "slide"
  },
  {
    "id": 3,
    "visual": {
      "kind": "checklist_step",
      "kicker": "AN AGENT, IN SHORT",
      "items": [
        {
          "icon": "cpu",
          "text": "A language model"
        },
        {
          "icon": "bulb",
          "text": "Reasoning — thinking before it acts"
        },
        {
          "icon": "wrench",
          "text": "Tools — real actions, real feedback"
        },
        {
          "icon": "layers",
          "text": "Memory — what carries across steps"
        }
      ],
      "step": 3
    },
    "text": "Uses tools — real actions, real feedback.",
    "type": "slide"
  },
  {
    "id": 4,
    "visual": {
      "kind": "checklist_step",
      "kicker": "AN AGENT, IN SHORT",
      "items": [
        {
          "icon": "cpu",
          "text": "A language model"
        },
        {
          "icon": "bulb",
          "text": "Reasoning — thinking before it acts"
        },
        {
          "icon": "wrench",
          "text": "Tools — real actions, real feedback"
        },
        {
          "icon": "layers",
          "text": "Memory — what carries across steps"
        }
      ],
      "step": 4
    },
    "text": "And keeps memory — what carries across steps. That's the whole recipe; you already know this part, so let's move fast.",
    "type": "slide"
  },
  {
    "id": 5,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT COUNTS AS CONTEXT?",
      "items": [
        {
          "icon": "globe",
          "text": "Web search — whatever's public right now"
        },
        {
          "icon": "lock",
          "text": "Proprietary content — internal docs, tickets, chats"
        },
        {
          "icon": "folders",
          "text": "One repo, or many — code spread across projects"
        },
        {
          "icon": "filetext",
          "text": "Raw code, or an already-mapped high-level structure"
        }
      ],
      "step": 4
    },
    "text": "That last piece, context, is worth pinning down — it's not just whatever happens to be in the chat. It can be a live web search, or proprietary content nobody put on the internet: internal docs, tickets, chat history. It can span one repository, or a dozen of them at once. And it can be the raw code itself, or something better: an already-mapped high-level structure that lets you get oriented in seconds instead of reading everything.",
    "type": "slide"
  },
  {
    "id": 6,
    "visual": {
      "kind": "agent_loop_step",
      "kicker": "AND THE HARNESS?",
      "step": 1
    },
    "text": "All of that lives inside something bigger: the harness. Text comes in, and the model first reaches for tools — not to solve the task yet, but just to understand it: searching the repo, pulling in whatever context it's missing.",
    "type": "slide"
  },
  {
    "id": 7,
    "visual": {
      "kind": "agent_loop_step",
      "kicker": "AND THE HARNESS?",
      "step": 2
    },
    "text": "With that context in hand, it goes back to the tools a second time — now to actually act: running a search, calling bash, whatever the task needs done.",
    "type": "slide"
  },
  {
    "id": 8,
    "visual": {
      "kind": "agent_loop_step",
      "kicker": "AND THE HARNESS?",
      "step": 3
    },
    "text": "Only then, once it's both understood and acted, does it hand back an answer — and jots something down for memory. Whether that actually helps next session isn't guaranteed, but it's worth the attempt.",
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "NOT JUST MY OPINION",
      "content": "A decent model with a great harness\nbeats a great model with a bad harness."
    },
    "text": "And this isn't just my own opinion — it's close to a consensus line across the field right now: a decent model with a great harness beats a great model with a bad harness.",
    "type": "slide"
  },
  {
    "id": 10,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHY CLAUDE CODE WORKS",
      "items": [
        {
          "icon": "wrench",
          "text": "Rich, general tools — bash, grep, running real code"
        },
        {
          "icon": "folder",
          "text": "Local content — everything already sitting right there"
        }
      ],
      "step": 1
    },
    "text": "Take Claude Code specifically. My take on why it works so well, in two parts: first, rich, general tools — bash, grep, running real code.",
    "type": "slide"
  },
  {
    "id": 11,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHY CLAUDE CODE WORKS",
      "items": [
        {
          "icon": "wrench",
          "text": "Rich, general tools — bash, grep, running real code"
        },
        {
          "icon": "folder",
          "text": "Local content — everything already sitting right there"
        }
      ],
      "step": 2
    },
    "text": "And second: local content. Everything it needs is already sitting right there, not behind an API call.",
    "type": "slide"
  },
  {
    "id": 12,
    "visual": {
      "kind": "context_search",
      "kicker": "HOW THE HARNESS FINDS IT",
      "query": "grep -r \"login\" src/",
      "repo_label": "your-project/",
      "files": [
        {
          "path": "src/auth.py",
          "hit": true
        },
        {
          "path": "src/routes.py",
          "hit": false
        },
        {
          "path": "src/models/user.py",
          "hit": true
        },
        {
          "path": "tests/test_auth.py",
          "hit": false
        },
        {
          "path": "README.md",
          "hit": false
        }
      ]
    },
    "text": "Here's what that looks like in practice: a real search across the repo, zeroing in on exactly the files that matter — before it ever wastes context on the rest.",
    "type": "slide"
  },
  {
    "id": 13,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "WHY ONE AI FEELS MORE POWERFUL",
      "content": "Same model underneath —\na very different search problem."
    },
    "text": "Ever notice how some AI assistants just feel more capable than others, even running on comparable models? Often that's not the model talking. It's how hard the harness has to work just to find the right context.",
    "type": "slide"
  },
  {
    "id": 14,
    "visual": {
      "kind": "checklist_step",
      "kicker": "ONE ASSISTANT, FOUR DATABASES",
      "items": [
        {
          "icon": "chat",
          "text": "Teams"
        },
        {
          "icon": "mail",
          "text": "Outlook"
        },
        {
          "icon": "cloud",
          "text": "OneDrive"
        },
        {
          "icon": "doc",
          "text": "SharePoint"
        }
      ],
      "step": 4
    },
    "text": "Take Microsoft 365 Copilot. To answer one question it may have to search four separate databases: Teams, Outlook, OneDrive, SharePoint — four separate systems, four separate permission models, four separate indices, before it can even start reasoning.",
    "type": "slide"
  },
  {
    "id": 15,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "VS. ONE LOCAL FOLDER",
      "content": "One grep, one folder, no fragmentation —\na far easier search."
    },
    "text": "Compare that to a coding agent grepping one local folder of text files: no separate databases to cross, no per-item permissions to check, one search covers everything. That gap alone can make one assistant feel far more powerful than another.",
    "type": "slide"
  },
  {
    "id": 16,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "AND THE ECONOMICS DON'T HELP",
      "content": "Flat monthly fee.\nHuge data to search, every query."
    },
    "text": "There's a second reason, beyond those four separate databases: the economics. M365 Copilot is sold as a flat monthly fee, but answering one question can mean searching a huge amount of organizational data — that's real token cost, on every single query.",
    "type": "slide"
  },
  {
    "id": 17,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "SO NOT ALWAYS THE SOTA MODEL",
      "content": "At that price, not every query\ngets the most capable model."
    },
    "text": "At that price, you can't run the most capable, most expensive model on every one of those queries — it's just not economically viable. So it almost certainly doesn't always reach for the frontier model, the way a pay-per-use tool like Claude Code can afford to.",
    "type": "slide"
  },
  {
    "id": 18,
    "visual": {
      "kind": "checklist_step",
      "kicker": "SAME MODEL, DIFFERENT HARNESS",
      "items": [
        "Fable 5 in Claude Code — 83.8%",
        "Fable 5 in Terminus 2 (standardized) — 80.4%",
        "GPT-5.5 in Codex — 83.1%",
        "GPT-5.5 in Terminus 2 (standardized) — 78.0%"
      ],
      "step": 4
    },
    "text": "Here's real evidence, not just a claim: on the Terminal-Bench leaderboard, the model Fable 5 scores 83.8% running inside Claude Code — but drops to 80.4% running inside Terminus 2, Terminal-Bench's own standardized harness. GPT-5.5 shows the same pattern: 83.1% in Codex, 78.0% in that same standardized harness. Same models. Only the harness changed.",
    "type": "slide"
  },
  {
    "id": 19,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "TOOL COMPARISON",
      "content": "Codex CLI · Claude Code · Gemini CLI"
    },
    "text": "Let's look at three tools that implement the same basic idea differently: Codex CLI, Claude Code, and Gemini CLI.",
    "type": "slide"
  },
  {
    "id": 20,
    "visual": {
      "kind": "checklist_step",
      "kicker": "TERMINAL-BENCH — RETRIEVED 2026-08-21",
      "items": [
        "Codex CLI — around 83%",
        "Claude Code — around 80%",
        "Gemini CLI — around 71%"
      ],
      "step": 3
    },
    "text": "If you want actual numbers: on Terminal-Bench, Codex CLI and Claude Code are neck-and-neck in the low-to-high eighties, with Gemini CLI trailing around seventy percent — retrieved today, so treat this as a snapshot, not gospel; these move with every model release.",
    "type": "slide"
  },
  {
    "id": 21,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "HOW DO I CUSTOMIZE THIS FURTHER?",
      "content": "Instructions · Tools · Skills · Context"
    },
    "text": "So here's the real question I want to get at: how do I actually customize this further, to squeeze a bigger productivity boost out of it? Let's ground that in a real repo — my own project template — instead of a toy example.",
    "type": "slide"
  },
  {
    "id": 22,
    "visual": {
      "kind": "checklist_step",
      "kicker": "FOUR AXES, FOUR PURPOSES",
      "items": [
        {
          "icon": "doc",
          "text": "Instructions — true every session, no matter the task"
        },
        {
          "icon": "layers",
          "text": "Context — found or written, specific to this task right now"
        },
        {
          "icon": "bulb",
          "text": "Skills — how-to knowledge, loaded only when the task needs it"
        },
        {
          "icon": "wrench",
          "text": "Tools — new capability the model didn't have before"
        }
      ],
      "step": 2
    },
    "text": "Instructions are whatever's true every single session, no matter the task. Context is different — it's whatever has to be found, or already written, specifically for the task in front of you right now.",
    "type": "slide"
  },
  {
    "id": 23,
    "visual": {
      "kind": "checklist_step",
      "kicker": "FOUR AXES, FOUR PURPOSES",
      "items": [
        {
          "icon": "doc",
          "text": "Instructions — true every session, no matter the task"
        },
        {
          "icon": "layers",
          "text": "Context — found or written, specific to this task right now"
        },
        {
          "icon": "bulb",
          "text": "Skills — how-to knowledge, loaded only when the task needs it"
        },
        {
          "icon": "wrench",
          "text": "Tools — new capability the model didn't have before"
        }
      ],
      "step": 4
    },
    "text": "Skills sit in between: how-to knowledge that's too specific to keep in every session, but too reusable to look up from scratch each time. And tools are the one axis that adds genuinely new capability — which is exactly why they should be the last resort, not the first.",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "WHERE'S YOUR BIGGEST LEVER?",
      "content": "Context, then skills, then tools —\ncost goes up only when it has to."
    },
    "text": "So here's the actual heuristic I use: start with context. Reach for a skill the moment you catch yourself re-explaining the same thing twice. Build a custom tool only when a skill genuinely isn't enough.",
    "type": "slide"
  },
  {
    "id": 25,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "WHERE THIS HEURISTIC APPLIES",
      "content": "Building new things, not repeating tasks —\nthat's when this order holds."
    },
    "text": "One scope note, worth saying out loud: this assumes you're building new things most of the time, not running the same request over and over. If your agent is answering similar customer-support tickets all day, that repetition is exactly when investing harder in standardized tools or skills starts to pay off.",
    "type": "slide"
  },
  {
    "id": 26,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "ONE REAL EXAMPLE",
      "content": "My own project template, in detail"
    },
    "text": "Let's make all four concrete, in a repo I actually use: my own project template for data-driven research projects.",
    "type": "slide"
  },
  {
    "id": 27,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 1
    },
    "text": "Picture the pipeline as a small graph, driven by an agent on the left. It starts small: one data stage, feeding one piece of analysis.",
    "type": "slide"
  },
  {
    "id": 28,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 2
    },
    "text": "That analysis becomes a notebook, and the notebook becomes part of the book.",
    "type": "slide"
  },
  {
    "id": 29,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 3
    },
    "text": "A human opens the book, not the code, and checks the output — that's the supervision path.",
    "type": "slide"
  },
  {
    "id": 30,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 4
    },
    "text": "Based on what they see, they give the agent further instructions.",
    "type": "slide"
  },
  {
    "id": 31,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 5
    },
    "text": "But the agent doesn't only listen to the human — it also looks back at the book itself. That's memory.",
    "type": "slide"
  },
  {
    "id": 32,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 6
    },
    "text": "Instructions plus memory are what actually produce the next round: two more data stages, and the analysis that depends on both, folded straight back into the book.",
    "type": "slide"
  },
  {
    "id": 33,
    "visual": {
      "kind": "checklist_step",
      "kicker": "README.md VS. AGENTS.md, CONCRETELY",
      "items": [
        "README.md — \"a template for research projects\"",
        "AGENTS.md — \"never hand-edit a generated notebook\""
      ],
      "step": 2
    },
    "text": "For instructions, here's the actual split I'd use: README.md carries the pitch — what this project is, how to get started, in plain prose for a human. AGENTS.md carries the short list of things that are easy to get wrong — jupytext headers, the strip-metadata step, never hand-editing a generated notebook — written for any agent, not tied to one vendor.",
    "type": "slide"
  },
  {
    "id": 34,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "PROOF, NOT A MOCKUP",
      "content": "\"See README.md for the full explanation —\nthis file is the short list.\""
    },
    "text": "And this isn't hypothetical — the very deck you're watching right now already works exactly this way. Its own AGENTS.md opens with: see README.md for the full explanation, this file is the short list.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "checklist_step",
      "kicker": "A SKILL, CONCRETELY",
      "items": [
        "Write the script in pipeline/",
        "Add a DVC stage with deps and outs",
        "Add the notebook to the book's table of contents"
      ],
      "step": 3
    },
    "text": "For skills: the template already has one, buried in its conventions doc, that deserves to be its own on-demand file — a short recipe for adding a new pipeline stage, only ever needed the moment someone's actually doing that.",
    "type": "slide"
  },
  {
    "id": 36,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "AND TOOLS? BARELY ANY",
      "content": "bash, dvc repro, myst start —\nand a to-do: the split isn't built yet."
    },
    "text": "And tools? This template barely needs any — bash, dvc repro, and myst start already do the job, which is the whole point of putting tools last. One honest caveat, though: the README-and-AGENTS.md split I just walked through isn't built yet in the real repo — that's a to-do I'm finishing as part of preparing this very talk.",
    "type": "slide"
  },
  {
    "id": 37,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "THE MOST EXPENSIVE PROBLEM",
      "content": "Every new session re-reads the code.\nThat costs time and context window."
    },
    "text": "The same principle carries my own project workflow too. The most expensive problem when working with agents isn't the model — it's that every new session has to re-read the code from scratch.",
    "type": "slide"
  },
  {
    "id": 38,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE BOOKKEEPING PATTERN",
      "items": [
        "CLAUDE.md — loads conventions automatically",
        "PROJECT.md — a living state document, not just documentation",
        "/wrap-up — updates state at the end of a session"
      ],
      "step": 1
    },
    "text": "The fix is a simple three-part pattern. First: a CLAUDE.md that loads project-wide conventions automatically into every session.",
    "type": "slide"
  },
  {
    "id": 39,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE BOOKKEEPING PATTERN",
      "items": [
        "CLAUDE.md — loads conventions automatically",
        "PROJECT.md — a living state document, not just documentation",
        "/wrap-up — updates state at the end of a session"
      ],
      "step": 2
    },
    "text": "Second: a PROJECT.md that isn't static documentation, but a living state document — what's decided, what's open, what's next.",
    "type": "slide"
  },
  {
    "id": 40,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE BOOKKEEPING PATTERN",
      "items": [
        "CLAUDE.md — loads conventions automatically",
        "PROJECT.md — a living state document, not just documentation",
        "/wrap-up — updates state at the end of a session"
      ],
      "step": 3
    },
    "text": "And third, a wrap-up command that checks status at the end of every session and updates PROJECT.md automatically — before the context is lost.",
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "EFFECT",
      "content": "A fresh session orients itself\nin seconds, not minutes."
    },
    "text": "The effect: a fresh agent session orients itself in seconds, instead of laboriously reconstructing all the code and history first.",
    "type": "slide"
  },
  {
    "id": 42,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "SCALING UP",
      "content": "Beyond one repo"
    },
    "text": "But one repo is rarely where it stops. Two more places the same problem shows up — one size up, and one size up again.",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "repo_map_step",
      "kicker": "ONE TEAM, SEVERAL REPOS",
      "step": 1
    },
    "text": "One team's system usually isn't one repo either. Infrastructure — which itself splits into Terraform services, GitOps, and Argo Workflows — plus separate frontend, backend, and pipeline repos. Four repos, no shared view across any of them.",
    "type": "slide"
  },
  {
    "id": 44,
    "visual": {
      "kind": "repo_map_step",
      "kicker": "ONE TEAM, SEVERAL REPOS",
      "step": 2
    },
    "text": "The fix is the same idea as before, one level up: a meta-repo at the root, holding documentation and VS Code workspace configs that stitch the others together.",
    "type": "slide"
  },
  {
    "id": 45,
    "visual": {
      "kind": "repo_map_step",
      "kicker": "ONE TEAM, SEVERAL REPOS",
      "step": 3
    },
    "text": "Say you're on the data pipeline team. Your VS Code workspace only needs to pull in two of these: the pipeline code and Argo Workflows. Everything else stays out of view, and out of context.",
    "type": "slide"
  },
  {
    "id": 46,
    "visual": {
      "kind": "repo_map_step",
      "kicker": "ONE TEAM, SEVERAL REPOS",
      "step": 4
    },
    "text": "Working on infrastructure itself, the workspace only needs the infrastructure repos — Terraform, GitOps, and Argo Workflows. A different scope, same meta-repo.",
    "type": "slide"
  },
  {
    "id": 47,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "EITHER WAY",
      "content": "Without maintained docs,\nnobody sees the full picture."
    },
    "text": "Whether it's your own projects or a team's system: without documentation that's actively maintained, nobody — human or agent — ever sees the full picture.",
    "type": "slide"
  },
  {
    "id": 48,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "REDUCING FRICTION",
      "content": "Dictate instead of type —\nmore context in every prompt."
    },
    "text": "And because context-rich prompts tend to be long, it's worth thinking about how you even get them typed in — or rather, don't type them, but dictate them, locally, with no cloud involved.",
    "type": "slide"
  },
  {
    "id": 49,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "CONCLUSION",
      "content": "The agent is only as good\nas the context it gets."
    },
    "text": "In the end it comes down to one sentence that holds all of this together: an agent is only ever as good as the context it gets.",
    "type": "slide"
  }
];
