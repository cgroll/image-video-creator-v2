const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "WHAT THIS TALK IS ABOUT",
      "content": "Agent · Harness · Context"
    },
    "text": "This talk is about three things: what an agent actually is, the harness built around it, and why context turns out to matter more than almost anything else. So let's start with the quick version — what actually is an agent?",
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
          "text": "Context and memory — what carries across steps"
        }
      ],
      "step": 1
    },
    "text": "In short: a language model.",
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
          "text": "Context and memory — what carries across steps"
        }
      ],
      "step": 2
    },
    "text": "That reasons before it acts.",
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
          "text": "Context and memory — what carries across steps"
        }
      ],
      "step": 3
    },
    "text": "Uses tools — real actions, real feedback.",
    "type": "slide"
  },
  {
    "id": 5,
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
          "text": "Context and memory — what carries across steps"
        }
      ],
      "step": 4
    },
    "text": "And keeps context and memory — what carries across steps. That's the whole recipe; you already know this part, so let's move fast.",
    "type": "slide"
  },
  {
    "id": 6,
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
    "id": 7,
    "visual": {
      "kind": "agent_loop_step",
      "kicker": "AND THE HARNESS?",
      "step": 1
    },
    "text": "All of that lives inside something bigger: the harness. Text comes in, and the model first reaches for tools — not to solve the task yet, but just to understand it: searching the repo, pulling in whatever context it's missing.",
    "type": "slide"
  },
  {
    "id": 8,
    "visual": {
      "kind": "agent_loop_step",
      "kicker": "AND THE HARNESS?",
      "step": 2
    },
    "text": "With that context in hand, it goes back to the tools a second time — now to actually act: running a search, calling bash, whatever the task needs done.",
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "agent_loop_step",
      "kicker": "AND THE HARNESS?",
      "step": 3
    },
    "text": "Only then, once it's both understood and acted, does it hand back an answer — and jots something down for memory. Whether that actually helps next session isn't guaranteed, but it's worth the attempt. Everything inside that dashed box — the model, the tool loop, the context it gathers — is what's called the harness.",
    "type": "slide"
  },
  {
    "id": 10,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "A CONSENSUS ACROSS THE FIELD",
      "content": "A decent model with a great harness\nbeats a great model with a bad harness."
    },
    "text": "This is close to a consensus line across the field right now: a decent model with a great harness beats a great model with a bad harness.",
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
      "step": 1
    },
    "text": "Take Claude Code specifically. My take on why it works so well, in two parts: first, rich, general tools — bash, grep, running real code.",
    "type": "slide"
  },
  {
    "id": 12,
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
    "id": 13,
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
    "id": 14,
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
    "id": 15,
    "visual": {
      "kind": "checklist_step",
      "kicker": "M365 COPILOT — FOUR DATABASES",
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
    "text": "Take Microsoft Copilot. To answer one question it may have to search four separate databases: Teams, Outlook, OneDrive, SharePoint — four separate systems, four separate permission models, four separate indices, before it can even start reasoning.",
    "type": "slide"
  },
  {
    "id": 16,
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
    "id": 17,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "AND THE ECONOMICS DON'T HELP",
      "content": "Flat monthly fee.\nHuge data to search, every query."
    },
    "text": "There's a second reason, beyond those four separate databases: the economics. Microsoft Copilot is sold as a flat monthly fee, but answering one question can mean searching a huge amount of organizational data — that's real token cost, on every single query.",
    "type": "slide"
  },
  {
    "id": 18,
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
    "id": 19,
    "visual": {
      "kind": "checklist_step",
      "kicker": "SWE-BENCH VERIFIED: SAME MODEL, DIFFERENT HARNESS",
      "items": [
        "Claude 4 Sonnet in EPAM AI/Run Developer Agent — 76.8%",
        "Claude 4 Sonnet in OpenHands — 70.4%",
        "Claude 4 Sonnet in mini-SWE-agent — 64.9%"
      ],
      "step": 3
    },
    "text": "So just how much does the harness matter? Here's real evidence, not just a claim: on SWE-bench Verified — probably the best-known agentic coding benchmark out there — the exact same model, Claude 4 Sonnet, scores anywhere from sixty-five to seventy-seven percent, depending purely on which harness runs it. Same model, same five hundred tasks: one harness gets seventy-six point eight percent, a well-known open-source one gets seventy point four, and the simplest baseline harness gets sixty-four point nine. Same model. Only the harness changed.",
    "type": "slide"
  },
  {
    "id": 20,
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
    "id": 21,
    "visual": {
      "kind": "checklist_step",
      "kicker": "TERMINAL-BENCH 4.0 — RETRIEVED 2026-09-05",
      "items": [
        "Codex (GPT-6 Astra) — 58.2%",
        "Claude Code (Fable 5.1) — 57.9%",
        {
          "text": "Gemini (Flash, generic scaffold — not apples to apples) — 19.1%",
          "muted": true
        }
      ],
      "step": 3
    },
    "text": "If you want actual numbers: on the current Terminal-Bench, Codex and Claude Code are essentially tied in the high fifties — GPT-6 Astra at fifty-eight point two percent, Fable 5.1 at fifty-seven point nine. Gemini's greyed out here on purpose — this isn't apples to apples: no Gemini CLI submission on this leaderboard, so the number shown is their small Flash model running through a generic third-party scaffold, the same weak baseline harness we already flagged earlier. Gemini's own CLI scores respectably elsewhere, in the sixties, so don't read this as 'Gemini is bad' — read it as 'no comparable entry yet.' Retrieved today, so treat this as a snapshot, not gospel — these move with every release.",
    "type": "slide"
  },
  {
    "id": 22,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "ONE MORE DIMENSION",
      "content": "The interface around the harness"
    },
    "text": "One more dimension worth naming: the harness isn't the whole story either. How you actually reach it — the interface wrapped around it — changes the experience just as much.",
    "type": "slide"
  },
  {
    "id": 23,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE INTERFACE MATTERS TOO",
      "items": [
        {
          "icon": "mic",
          "text": "Speech in, speech out — talk to it, don't just type"
        },
        {
          "icon": "send",
          "text": "Remote control — reach it from your phone, not just your laptop"
        },
        {
          "icon": "lock",
          "text": "Approvals — a checkpoint before risky actions, like a live web search"
        },
        {
          "icon": "branch",
          "text": "Branchable history — a tree, not just a straight line"
        }
      ],
      "step": 1
    },
    "text": "First: speech, in both directions. The same harness underneath — but you talk to it, and it talks back, instead of typing.",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE INTERFACE MATTERS TOO",
      "items": [
        {
          "icon": "mic",
          "text": "Speech in, speech out — talk to it, don't just type"
        },
        {
          "icon": "send",
          "text": "Remote control — reach it from your phone, not just your laptop"
        },
        {
          "icon": "lock",
          "text": "Approvals — a checkpoint before risky actions, like a live web search"
        },
        {
          "icon": "branch",
          "text": "Branchable history — a tree, not just a straight line"
        }
      ],
      "step": 2
    },
    "text": "Second: remote control. The exact same agent, but reachable from your phone over Telegram — not chained to one laptop, one terminal window.",
    "type": "slide"
  },
  {
    "id": 25,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE INTERFACE MATTERS TOO",
      "items": [
        {
          "icon": "mic",
          "text": "Speech in, speech out — talk to it, don't just type"
        },
        {
          "icon": "send",
          "text": "Remote control — reach it from your phone, not just your laptop"
        },
        {
          "icon": "lock",
          "text": "Approvals — a checkpoint before risky actions, like a live web search"
        },
        {
          "icon": "branch",
          "text": "Branchable history — a tree, not just a straight line"
        }
      ],
      "step": 3
    },
    "text": "Third: approvals. A checkpoint before anything risky happens — a live web search, a destructive command — instead of the agent just acting unsupervised.",
    "type": "slide"
  },
  {
    "id": 26,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE INTERFACE MATTERS TOO",
      "items": [
        {
          "icon": "mic",
          "text": "Speech in, speech out — talk to it, don't just type"
        },
        {
          "icon": "send",
          "text": "Remote control — reach it from your phone, not just your laptop"
        },
        {
          "icon": "lock",
          "text": "Approvals — a checkpoint before risky actions, like a live web search"
        },
        {
          "icon": "branch",
          "text": "Branchable history — a tree, not just a straight line"
        }
      ],
      "step": 4
    },
    "text": "And fourth: editable history. Not just one straight conversation, but a tree — branch off from any earlier point and try a different direction, without losing the original.",
    "type": "slide"
  },
  {
    "id": 27,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "NOT JUST THE MODEL",
      "content": "The harness — and the interface around it —\nmatter as much as the model."
    },
    "text": "Here's the headline from everything so far: the harness — and the interface wrapped around it — matter just as much as the model itself.",
    "type": "slide"
  },
  {
    "id": 28,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "ACCESSIBILITY MATTERS TOO",
      "content": "Data accessibility matters too —\nlocal data is the easiest to reach."
    },
    "text": "And one core piece of that worth calling out specifically: how accessible your data is changes everything too, not just the model or the harness you pick. Local data — sitting right there on disk — is about as easy as it gets to search and reason over.",
    "type": "slide"
  }
];
