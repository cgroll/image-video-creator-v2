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
  },
  {
    "id": 29,
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
    "id": 30,
    "visual": {
      "kind": "checklist_step",
      "kicker": "FOUR AXES, FOUR PURPOSES",
      "items": [
        {
          "icon": "doc",
          "text": "Instructions — true every session, no matter the task",
          "subitems": [
            {
              "icon": "lock",
              "text": "Closed consumer app — the system prompt is entirely hidden"
            },
            {
              "icon": "wrench",
              "text": "Claude Code — closed-source, but a separate flag can append or replace it"
            },
            {
              "icon": "eye",
              "text": "Pi Coding Agent — fully open source, read and override directly"
            }
          ]
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
      "step": 1
    },
    "text": "Let's look at four dimensions we actually have some influence over — four things we can shape to our advantage. First, instructions: whatever's true every single session, no matter the task.",
    "type": "slide"
  },
  {
    "id": 31,
    "visual": {
      "kind": "checklist_step",
      "kicker": "FOUR AXES, FOUR PURPOSES",
      "items": [
        {
          "icon": "doc",
          "text": "Instructions — true every session, no matter the task",
          "subitems": [
            {
              "icon": "lock",
              "text": "Closed consumer app — the system prompt is entirely hidden"
            },
            {
              "icon": "wrench",
              "text": "Claude Code — closed-source, but a separate flag can append or replace it"
            },
            {
              "icon": "eye",
              "text": "Pi Coding Agent — fully open source, read and override directly"
            }
          ]
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
      "step": 1,
      "expand": {
        "index": 0,
        "count": 3
      }
    },
    "text": "One layer down, worth naming: how much you can actually touch 'Instructions' varies a lot. Sometimes you get direct, editable access to it; sometimes you don't — and how locked that layer is turns out to be a spectrum. In a closed consumer app, it's entirely hidden. Claude Code sits in the middle: closed-source, but it gives you a separate, official flag to append to, or even fully replace, that system prompt for a session. A fully open harness like Pi Coding Agent goes further still — the whole thing is public source on GitHub, readable and overridable directly. Though even there, the underlying model weights and the provider's own guardrails stay locked no matter what.",
    "type": "slide"
  },
  {
    "id": 32,
    "visual": {
      "kind": "checklist_step",
      "kicker": "FOUR AXES, FOUR PURPOSES",
      "items": [
        {
          "icon": "doc",
          "text": "Instructions — true every session, no matter the task",
          "subitems": [
            {
              "icon": "lock",
              "text": "Closed consumer app — the system prompt is entirely hidden"
            },
            {
              "icon": "wrench",
              "text": "Claude Code — closed-source, but a separate flag can append or replace it"
            },
            {
              "icon": "eye",
              "text": "Pi Coding Agent — fully open source, read and override directly"
            }
          ]
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
    "text": "Second, context is different — it's whatever has to be found, or already written, specifically for the task in front of you right now.",
    "type": "slide"
  },
  {
    "id": 33,
    "visual": {
      "kind": "checklist_step",
      "kicker": "FOUR AXES, FOUR PURPOSES",
      "items": [
        {
          "icon": "doc",
          "text": "Instructions — true every session, no matter the task",
          "subitems": [
            {
              "icon": "lock",
              "text": "Closed consumer app — the system prompt is entirely hidden"
            },
            {
              "icon": "wrench",
              "text": "Claude Code — closed-source, but a separate flag can append or replace it"
            },
            {
              "icon": "eye",
              "text": "Pi Coding Agent — fully open source, read and override directly"
            }
          ]
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
      "step": 3
    },
    "text": "Skills sit in between: how-to knowledge that's too specific to keep in every session, but too reusable to look up from scratch each time.",
    "type": "slide"
  },
  {
    "id": 34,
    "visual": {
      "kind": "checklist_step",
      "kicker": "FOUR AXES, FOUR PURPOSES",
      "items": [
        {
          "icon": "doc",
          "text": "Instructions — true every session, no matter the task",
          "subitems": [
            {
              "icon": "lock",
              "text": "Closed consumer app — the system prompt is entirely hidden"
            },
            {
              "icon": "wrench",
              "text": "Claude Code — closed-source, but a separate flag can append or replace it"
            },
            {
              "icon": "eye",
              "text": "Pi Coding Agent — fully open source, read and override directly"
            }
          ]
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
    "text": "And tools are the one axis that adds genuinely new capability.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "WHERE'S YOUR BIGGEST LEVER?",
      "content": "Context, then skills, then tools"
    },
    "text": "So here's the actual heuristic I use: start with context. Reach for a skill the moment you catch yourself re-explaining the same thing twice. Build a custom tool only when a skill genuinely isn't enough.",
    "type": "slide"
  },
  {
    "id": 36,
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
    "id": 37,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "ONE REAL EXAMPLE",
      "content": "My data science project template"
    },
    "text": "Let's make all four concrete, in a repo I actually use: my own project template for data science projects — a DVC-orchestrated pipeline that publishes straight to a research book.",
    "type": "slide"
  },
  {
    "id": 38,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 1
    },
    "text": "Picture the pipeline as a small graph, driven by an agent on the left. It starts small: one data stage, feeding one piece of analysis.",
    "type": "slide"
  },
  {
    "id": 39,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 2
    },
    "text": "That analysis becomes a notebook, and the notebook becomes part of the book.",
    "type": "slide"
  },
  {
    "id": 40,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 3
    },
    "text": "A human opens the book, not the code, and checks the output — that's the supervision path.",
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 4
    },
    "text": "Based on what they see, they give the agent further instructions.",
    "type": "slide"
  },
  {
    "id": 42,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 5
    },
    "text": "But the agent doesn't only listen to the human — it also looks back at the book itself. That's memory.",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "pipeline_dag_step",
      "kicker": "THE PIPELINE, AS A GRAPH",
      "step": 6
    },
    "text": "Instructions plus memory are what actually produce the next round: two more data stages, and the analysis that depends on both, folded straight back into the book.",
    "type": "slide"
  },
  {
    "id": 44,
    "visual": {
      "kind": "checklist_step",
      "kicker": "MY TEMPLATE, TO BE EXPLICIT",
      "items": [
        {
          "icon": "layers",
          "text": "A dedicated data pipeline, orchestrated by DVC"
        },
        {
          "icon": "loop",
          "text": "dvc.yaml: what always rebuilds on change vs. what persists untouched"
        },
        {
          "icon": "filetext",
          "text": "Analysis as markdown + Jupyter kernel cells (jupytext)"
        },
        {
          "icon": "cloud",
          "text": "Figures saved separately, re-embedded, published to GitHub Pages"
        }
      ],
      "step": 4
    },
    "text": "One thing worth naming explicitly: the project template I actually use is pretty specific, not some generic scaffold. There's a dedicated data pipeline, orchestrated by DVC — and dvc.yaml spells out exactly which outputs always rebuild the moment an upstream script or dependency changes, versus which ones — the raw, often rate-limited downloads — are marked to persist untouched instead of being silently re-fetched. On top of that sits the analysis layer: markdown files with embedded Jupyter kernel cells, which save their figures out to separate image files and then re-embed those images back in, so the whole thing commits cleanly to git and publishes straight to GitHub Pages.",
    "type": "slide"
  },
  {
    "id": 45,
    "visual": {
      "kind": "checklist_step",
      "kicker": "SPLITTING CONTEXT ACROSS FILES",
      "items": [
        {
          "icon": "doc",
          "text": "README.md — the pitch: what this is, where results are, how to set up"
        },
        {
          "icon": "wrench",
          "text": "AGENTS.md — the real entry point: conventions, gotchas, contributing"
        },
        {
          "icon": "layers",
          "text": "PROJECT.md — living state: current status, next steps, lessons learned"
        }
      ],
      "step": 1
    },
    "text": "All of that predefined structure obviously has to be written down somewhere — for human contributors just as much as for AI agents. Here's how I'd actually split it across files. README.md is the on-ramp for a human — what this is, where to see the results, how to set it up and browse them yourself.",
    "type": "slide"
  },
  {
    "id": 46,
    "visual": {
      "kind": "checklist_step",
      "kicker": "SPLITTING CONTEXT ACROSS FILES",
      "items": [
        {
          "icon": "doc",
          "text": "README.md — the pitch: what this is, where results are, how to set up"
        },
        {
          "icon": "wrench",
          "text": "AGENTS.md — the real entry point: conventions, gotchas, contributing"
        },
        {
          "icon": "layers",
          "text": "PROJECT.md — living state: current status, next steps, lessons learned"
        }
      ],
      "step": 2
    },
    "text": "AGENTS.md is the real entry point — it's what actually loads automatically every session — so it carries the conventions, the gotchas, the testing and infrastructure details: whoever, or whatever, is doing the actual contributing.",
    "type": "slide"
  },
  {
    "id": 47,
    "visual": {
      "kind": "checklist_step",
      "kicker": "SPLITTING CONTEXT ACROSS FILES",
      "items": [
        {
          "icon": "doc",
          "text": "README.md — the pitch: what this is, where results are, how to set up"
        },
        {
          "icon": "wrench",
          "text": "AGENTS.md — the real entry point: conventions, gotchas, contributing"
        },
        {
          "icon": "layers",
          "text": "PROJECT.md — living state: current status, next steps, lessons learned"
        }
      ],
      "step": 3
    },
    "text": "And PROJECT.md is the living state: what's the current status, what's next, what got learned along the way.",
    "type": "slide"
  },
  {
    "id": 48,
    "visual": {
      "kind": "checklist_step",
      "kicker": "INSIDE README: A SHORT LADDER",
      "items": [
        {
          "icon": "eye",
          "text": "See the results — a direct link, no setup needed"
        },
        {
          "icon": "terminal",
          "text": "Set it up yourself — environment, then browse or reproduce"
        },
        {
          "icon": "book",
          "text": "Contribute — a short pointer; the real rules live in AGENTS.md"
        }
      ],
      "step": 3
    },
    "text": "Inside README specifically, I'd think of it as a short ladder: first, where to see the results with zero setup. Then, how to set it up yourself. And only then, briefly, how to contribute — with the real mechanics living in AGENTS.md, not duplicated here.",
    "type": "slide"
  },
  {
    "id": 49,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "STRUCTURE VS. CONTENT",
      "content": "AGENTS.md stays the same.\nPROJECT.md and the book don't."
    },
    "text": "One more distinction worth making clear: AGENTS.md describes the shape of the project — the pipeline, the structure, the conventions — and that stays the same across every project built from this template. PROJECT.md and the book are the opposite: they hold this project's actual results — status, findings, what the book says — and that's different every single time.",
    "type": "slide"
  },
  {
    "id": 50,
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
    "id": 51,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "AND TOOLS? BARELY ANY",
      "content": "bash, dvc repro, myst start —\ntools are the last resort, not the first."
    },
    "text": "And tools? This template barely needs any — bash, dvc repro, and myst start already do the job, which is the whole point of putting tools last.",
    "type": "slide"
  },
  {
    "id": 52,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "THE MOST EXPENSIVE PROBLEM",
      "content": "Every new session re-reads the code.\nThat costs time and context window."
    },
    "text": "This isn't just about one template, though — my day-to-day project workflow runs into the same cost. The most expensive problem when working with agents isn't the model — it's that every new session has to re-read the code from scratch.",
    "type": "slide"
  },
  {
    "id": 53,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE BOOKKEEPING PATTERN",
      "items": [
        "AGENTS.md — loads conventions automatically",
        "PROJECT.md — a living state document, not just documentation",
        "A wrap-up skill — checks and updates state at the end of a session"
      ],
      "step": 3
    },
    "text": "The fix is a simple three-part pattern: the AGENTS.md and PROJECT.md split from before, plus one new piece — a wrap-up skill that checks status at the end of every session and updates PROJECT.md, before the context is lost.",
    "type": "slide"
  },
  {
    "id": 54,
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
    "id": 55,
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
    "id": 56,
    "visual": {
      "kind": "repo_map_step",
      "kicker": "ONE TEAM, SEVERAL REPOS",
      "step": 1
    },
    "text": "One team's system usually isn't one repo either. Infrastructure — which itself splits into Terraform services, GitOps, and Argo Workflows — plus separate frontend, backend, and pipeline repos. Four repos, no shared view across any of them.",
    "type": "slide"
  },
  {
    "id": 57,
    "visual": {
      "kind": "repo_map_step",
      "kicker": "ONE TEAM, SEVERAL REPOS",
      "step": 2
    },
    "text": "The fix is the same idea as before, one level up: a meta-repo at the root, holding documentation and VS Code workspace configs that stitch the others together.",
    "type": "slide"
  },
  {
    "id": 58,
    "visual": {
      "kind": "repo_map_step",
      "kicker": "ONE TEAM, SEVERAL REPOS",
      "step": 3
    },
    "text": "Say you're on the data pipeline team. Your VS Code workspace only needs to pull in two of these: the pipeline code and Argo Workflows. Everything else stays out of view, and out of context.",
    "type": "slide"
  },
  {
    "id": 59,
    "visual": {
      "kind": "repo_map_step",
      "kicker": "ONE TEAM, SEVERAL REPOS",
      "step": 4
    },
    "text": "Working on infrastructure itself, the workspace only needs the infrastructure repos — Terraform, GitOps, and Argo Workflows. A different scope, same meta-repo.",
    "type": "slide"
  },
  {
    "id": 60,
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
    "id": 61,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "MAINTAINED DOCS, AUTOMATED",
      "content": "A tool can build that map for you —\nautomatically, every session."
    },
    "text": "This doesn't have to be entirely manual, either. Tools like Graft go in a similar direction, automatically: it builds a linked map of the codebase — what each part does, how it connects — so the agent doesn't rediscover it from zero every session.",
    "type": "slide"
  },
  {
    "id": 62,
    "visual": {
      "kind": "checklist_step",
      "kicker": "SAME MODEL, WITH A MAP",
      "items": [
        "Cold Claude Code — 54% resolved",
        "Claude Code with a code map (Graft) — 66% resolved"
      ],
      "step": 2
    },
    "text": "On SWE-bench Verified, same model both times: fifty-four percent resolved cold, sixty-six percent with that map already built — twelve points, before the agent even starts exploring.",
    "type": "slide"
  },
  {
    "id": 63,
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
