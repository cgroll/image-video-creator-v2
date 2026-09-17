# Talk "Vibe Coding: Context is King" — Outline

Starting point for reworking `storyline.yaml`. 35–40 min, audience: data/AI
experts in the power sector (see
`~/research/hackathon-vibe-coding-strom/PROJECT.md`, Part A).

Note: current `project.yaml` has `language: german` (drives the TTS voice
and narration script) — switch this to English once the storyline content
below is finalized.

## Through-line

It's not the model that decides how well an agent helps — it's the context.
The talk zooms this one idea through four scales:

1. **one context window** (one agent session, one repo)
2. **many of your own projects** (you personally hop between N unrelated
   repos — the fix is a shared template, not a bigger context window)
3. **a team / multiple repos for one system** (knowledge scattered across
   repos that jointly make up one deployable thing — documentation has to
   be actively maintained or it rots)
4. **an entire life** (a personal assistant whose context is your life, not
   a codebase)

## Restructuring pass: leaner opening (in progress)

Explicit request: rewrite the beginning to be sharper/terser (not necessarily
fewer scenes — individual bullet-pops read faster even at a higher scene
count than paired reveals). Full target sequence, A–I, dictated directly:

- **Chapter 0 (thesis, 3 scenes) removed entirely** per explicit instruction
  — the deck now opens directly on A. ✅ done.
- **A. Agent, in short** — bullets pop **individually** now (4 scenes, was
  2 paired scenes). ✅ done.
- **B. What counts as context** — **reworked**: collapsed from a 2-step
  paired reveal (steps 2/4) into a single scene that shows all 4 bullets at
  once (`step: 4` with no preceding partial-reveal scene). ✅ done.
- **C. The harness** — **reworked**: the agent-loop diagram now wraps
  everything except `TEXT IN` / `OUTPUT` in a dashed-border box labeled
  `HARNESS`. Inside it: `MODEL` and **two separate `TOOLS` nodes** (not one
  node reused) — `TOOLS` (grep · web search) for a first, context-gathering
  reach, and a second `TOOLS` (bash · cloud CLI · ffmpeg) for actually
  acting. The return arrow from the first `TOOLS` node is labeled
  `CONTEXT`. 3-step reveal, same cadence as before: (1) text in, model
  reaches the context-tools; (2) context returns (labeled), model reaches
  the action-tools; (3) action results return, output leaves the box. First
  attempt reused a single `TOOLS` node with 4 looping arrows around it —
  scrapped as too cluttered per feedback; splitting into two nodes plus the
  `CONTEXT` label fixed it. ✅ done.
- *(the "not just my opinion" consensus quote moved here, right after C,
  as a bridge into "so why is Claude Code specifically good at this")* ✅ done.
- **D. Why Claude Code is strong** — **rewritten**: rich tools, local
  content, "something that keeps a memory.md filled in automatically."
  Drops the previous ReAct-loop item entirely. ✅ done — the grep/repo
  diagram kept right after it as the concrete illustration.
- Then **M365 Copilot comparison** ("much harder context problem") — kept,
  moved to *after* D instead of before it. ✅ done (content unchanged,
  reordered).
- **M365 Copilot, second argument added** per explicit instruction: beyond
  the four-silo context-fragmentation problem, a separate economics
  argument — M365 Copilot is sold at a flat monthly fee, but answering one
  question can mean searching a huge volume of organizational data, which
  is real token cost per query; at that flat price it's not economically
  viable to always run the most capable (most expensive) model on every
  query, unlike a pay-per-use tool. Two new scenes inserted right after
  "VS. ONE LOCAL FOLDER" and before the SWE-bench-Pro closer: "AND THE
  ECONOMICS DON'T HELP" (statement) → "SO NOT ALWAYS THE SOTA MODEL"
  (thesis). ✅ done.
- **D. Why Claude Code is strong, trimmed to two points** per explicit
  instruction ("skip the last point"): dropped the third bullet
  ("something that keeps a memory.md filled in, automatically") from the
  "WHY CLAUDE CODE WORKS" checklist. Now a 2-step reveal instead of 3;
  narration adjusted from "in three parts" to "in two parts," and the
  second item's narration now says "and second" to close the list
  naturally. ✅ done.
- **M365 Copilot beat, reworked** per explicit instruction: (1) don't call
  it "silos" — renamed throughout to "databases" / "fragmentation"
  (kicker: "ONE ASSISTANT, FOUR DATABASES"; the "VS. ONE LOCAL FOLDER" and
  chapter 6 callback scenes updated too, since they used the same word for
  the same concept); (2) collapsed the 2-step paired reveal into one scene
  showing all 4 items at once; (3) dropped the "— explanation" half of each
  item, keeping only the product name (`Teams`, `Outlook`, `OneDrive`,
  `SharePoint`) — the explanatory detail now lives only in the narration,
  not on-slide. ✅ done.
- **Chapter 2's "FOUR COMPARISON AXES" checklist removed entirely** per
  explicit instruction ("remove this slide") — the 4-step
  Instructions/Skills/Context/Extensibility reveal that used to open the
  tool-comparison chapter is gone; chapter 2 now goes straight from the
  "TOOL COMPARISON" title card to the Terminal-Bench numbers. Left
  unresolved: this makes chapter 2 very short (2 scenes) and the numbers
  slide now arrives with no setup explaining what's being compared — worth
  a look in a later pass. ✅ done (removal only, no replacement content).
- **Terminal-Bench numbers, access date added** per explicit instruction:
  kicker changed from "TERMINAL-BENCH, FOR WHAT IT'S WORTH" to
  "TERMINAL-BENCH — RETRIEVED 2026-08-21" (today's date), and narration
  now says "retrieved today" explicitly instead of only the vaguer
  "treat this as a snapshot, not gospel" caveat. Re-verify/re-date before
  the actual talk if numbers are re-checked closer to the date. ✅ done.
- **E. The harness + LLM benchmark** — **reworked** per explicit
  instruction ("skip the attached slide... we should add this screenshot
  comparison"). The generic "same model, standardized harness — about 20
  points lower" thesis slide (sourced from SWE-bench Pro / Scale's SEAL
  leaderboard, no specific model named) is **removed**. Replaced with a
  `checklist_step` built from a real Terminal-Bench leaderboard screenshot
  the user provided, picking out the two matched pairs that make the
  harness-matters point concrete: **Fable 5** scores 83.8% inside Claude
  Code but 80.4% inside Terminus 2 (Terminal-Bench's own standardized
  harness); **GPT-5.5** scores 83.1% inside Codex but 78.0% inside that
  same standardized harness. Same models, only the harness changed — real
  numbers, real leaderboard, not an abstract claim. Kicker: "SAME MODEL,
  DIFFERENT HARNESS." Note the swing here (~3–5 points on Terminal-Bench)
  is smaller than the old ~20-point SWE-bench Pro claim — that's expected,
  different benchmarks, and the smaller-but-real number from an actual
  screenshot was judged more credible than a bigger claim without a citable
  source on-slide. ✅ done.
- **F. How Claude Code gets its context, and how to extend it** —
  **partially reworked** per explicit instruction: the chapter-3 opening
  ("GROUNDING THE FOUR AXES" cta) is now framed around a first-person
  productivity question instead of a definitional one — kicker changed to
  "HOW DO I CUSTOMIZE THIS FURTHER?", narration now opens with "how do I
  actually customize this further, to squeeze a bigger productivity boost
  out of it?" The "FOUR AXES, FOUR PURPOSES" checklist and "WHERE'S YOUR
  BIGGEST LEVER?" closer are unchanged (they already deliver the
  context→skills→tools payoff this question sets up). Still open: the MCP
  mention (custom tools) hasn't been added yet. 🆕 partially done.
- **New scope caveat added** after "WHERE'S YOUR BIGGEST LEVER?" per
  explicit instruction: the context→skills→tools ordering assumes you're
  building new things most of the time, not running the same request over
  and over — if an agent is doing repetitive work (the example given:
  answering similar customer-support tickets all day), investing harder in
  standardized tools or skills starts to pay off instead. New scene,
  kicker "WHERE THIS HEURISTIC APPLIES," inserted right before "ONE REAL
  EXAMPLE." ✅ done.
- **G. The data-science project structure** — "context is both a steering
  tool and great for memory — this is one of my own experiences." Maps
  onto chapter 3's second half (the pipeline DAG, supervision + memory) —
  content already there, narration could lean harder into "steering tool"
  framing explicitly. 🆕 not yet reworked (existing content mostly fits).
- **H. The multi-repo case** — "context is helpful, both for me and for
  the agent." Maps onto chapter 5's meta-repo diagram — content already
  there. 🆕 not yet reworked (existing content mostly fits).
- **I. The global-agent case** — two things: **UI on top of the harness**,
  and **context, again** (the registry/discoverability insight). This is
  the "Future ideas: the personal-evolution scale" section below, now
  promoted from "maybe later" to part of the actual planned sequence. 🆕
  not yet built.

**Open question this raises**: chapter 2 (Codex CLI vs. Claude Code vs.
Gemini CLI, Terminal-Bench numbers) isn't mentioned anywhere in A–I. Left
in place for now, renumbered but otherwise untouched — its role in the new
flow is unresolved, not deleted. Per explicit instruction, not trimming
for length right now; that happens in a later pass.

## Current chapter sequence (49 scenes)

Chapter 0 (thesis) removed per explicit instruction — the deck now opens
directly on chapter 1, "an agent, in short." Chapter numbering below
renumbered to close the gap left by removing the old chapter 6 entirely
(see below) — old chapters 7/8 are now 6/7.

| # | Chapter | Core message | Scenes |
|---|---|---|---|
| 1 | Fundamentals + why Claude Code works | Agent = model + reasoning + tools + memory (4 individual bullet-pops, not paired); "what counts as context?" (single scene, all 4 bullets revealed at once); harness definition as a 3-step animated diagram — a `HARNESS` box holding `MODEL`, `MEMORY`, and two separate `TOOLS` nodes (context-gather, then act, with the return arrow labeled `CONTEXT`), `TEXT IN`/`OUTPUT` outside the box; external-validation quote ("not just my opinion"); why Claude Code works — **now two parts, not three** (rich tools / local content; the memory.md bullet was dropped from this list per explicit instruction), illustrated with the grep/repo-highlight diagram; **then** M365 Copilot's four-database problem ("why one AI feels more powerful," moved to after the Claude Code beat — **reworked**, see below), **plus a second reason** — M365's flat-fee economics against huge per-query search volume means it can't always run its most capable model; closes on **real leaderboard evidence, not a generic claim** — see "Terminal-Bench evidence replaces the generic 20-point claim" below | 18 |
| 2 | Tool comparison | Codex CLI vs. Claude Code vs. Gemini CLI (swapped from GitHub Copilot Agent — no public benchmark data for that exact product); the 4-axes checklist intro (Instructions/Skills/Context/Extensibility) was **removed entirely** per explicit instruction — chapter now goes straight from the tool-name intro to the Terminal-Bench numbers slide (kicker now dated: "TERMINAL-BENCH — RETRIEVED 2026-08-21"). | 2 |
| 3 | **Instructions, Tools, Skills, Context: one template in detail** (full description below) — opener reframed around "how do I customize this further?"; a scope caveat added after the context→skills→tools heuristic; the skill recipe trimmed from 4 steps to 3 | 16 |
| 4 | Repo scale: bookkeeping pattern | CLAUDE.md + PROJECT.md (a living state document) + /wrap-up — saves context-window budget, because a fresh session orients itself in seconds | 5 |
| 5 | Beyond one repo (full description below) — **the "(a) many of your own projects" callback beat (3 scenes) removed entirely** per explicit instruction; chapter now goes straight from "SCALING UP" into the "(b) one team, several repos" diagram | 6 |
| 6 | Practical tip: voice input | `parakeet-dictate` — local dictation lowers the friction of writing long, context-rich prompts | 1 |
| 7 | Conclusion | "The agent is only as good as the context it gets." **The old "Everyday-life scale: personal assistant" chapter (tax-return analogy + M365 callback, 2 scenes) and the "HACKATHON" handoff closer were both removed entirely** per explicit instruction — the deck now ends on the conclusion thesis alone, with no hackathon CTA. | 1 |

## Chapter 3 in full: Instructions, Tools, Skills, Context

Replaced the earlier Pi + Notion live demo entirely (removed per explicit
instruction — the template walkthrough below is more authentic and more
relevant to this audience than a niche third-party coding-agent demo). Two
halves:

**(a) What each axis is actually *for*** — not just definitions, but
purpose: Instructions = true every session regardless of task; Context =
found or written, specific to the task right now; Skills = how-to
knowledge, loaded only on demand; Tools = genuinely new capability. Closes
with the practical heuristic (added per explicit request, grounded in
Chris's own stated view that Claude's strengths — general tools via bash,
strong local context-parsing — are both things the harness already gives
you, not things a user personally improves): **start with context, reach
for a skill when you catch yourself re-explaining the same thing, build a
custom tool only when a skill genuinely isn't enough.** Cost escalates only
as needed; this also maps directly onto chapter 2's four axes
(Instructions + Context + Skills = cheap and compounding, Extensibility =
expensive and narrow).

**(b) Grounding all four in one real repo**: `project-book-template-dvc`,
walked through concretely rather than abstractly —
- **Context**: `visual.kind: pipeline_dag_step` in `deck.html` — a small
  directed acyclic graph with an explicit **agent** node (brain icon, warm
  fill) on the far left driving the whole thing. Reworked three times
  across follow-up feedback; now a 6-step sequential reveal rather than a
  simultaneous one, and each dynamic edge is explicitly labeled:
  **(1)** `AGENT` → `data 1` → `analysis 1` only — the graph starts
  minimal; **(2)** `analysis 1` → `THE BOOK` (white, gold ring, book icon);
  **(3)** `THE BOOK` → `HUMAN` (eye icon), labeled **SUPERVISION** — a
  person inspects the book, and this edge stays visible for the rest of
  the diagram; **(4)** a dashed gold curve from `HUMAN` arcing over the top
  back to `AGENT`, labeled **INSTRUCTIONS**; **(5)** that curve is hidden
  and replaced by a *different* dashed curve, from `THE BOOK` back to
  `AGENT`, labeled **MEMORY** — the same book, now shown feeding the agent
  directly; **(6)** the memory curve hides too, and `data 2`, `data 3`,
  `analysis 2` fold into the graph (fed by both new data nodes), closing
  back into the book — the consequence of steps 4–5, not simultaneous with
  them. The `SUPERVISION` and `MEMORY` labels sitting near each other in
  the graph is the direct answer to "indicate the human is a supervisor
  based on the book, while the book is also the agent's memory."
  Implementation note: cumulative elements use `data-step` (`s <= n`,
  same idiom as `checklist_step`); the two mutually-exclusive feedback
  curves use a new `data-only-step` attribute (`s === n` exactly) so they
  can appear and disappear independently rather than only accumulating.
  Two real bugs found and fixed this round, beyond the earlier ones:
  (1) the SVG's height (820px, from the previous version's wide curve
  bows) made total slide content tall enough that centering pushed the
  kicker up into the eyebrow text — fixed by routing both feedback curves
  as flatter arcs over the top (`AGENT`↔`HUMAN` and `AGENT`↔`THE BOOK`
  now use nearly identical high, flat-topped cubic curves instead of one
  going under the whole diagram), which incidentally also shrank the
  needed canvas back to 720px; (2) the first attempt at both feedback
  curves technically connected the right nodes but drifted close enough to
  intermediate nodes (`analysis 1`, `data 1`, `data 3`) to visually read as
  clipping through them — caught by hand-checking bezier midpoints against
  node bounding circles, not just eyeballing a screenshot, since the error
  was subtle enough to look plausible at a glance.
  Earlier superseded versions: (a) data 1/2/3 all present from the start
  with data 2→analysis 1 also wired in (a fan-in graph, not sequential);
  no agent node; human's feedback created a placeholder node directly. (b)
  Agent node added, single simultaneous step 4 for both feedback curves
  and all three new nodes together, one curve routed under the whole
  cluster (the version that both overlapped the eyebrow and clipped
  `data 3`).
- **Instructions**: the proposed README.md/AGENTS.md split, now with real
  quoted content instead of a generic description (`README.md — "a
  template for research projects"`, `AGENTS.md — "never hand-edit a
  generated notebook"`), plus the same proof-point as before — this deck's
  own `AGENTS.md` already works this way.
- **Skills**: the "adding a new pipeline stage" recipe, already sitting in
  `contribution_conventions.md`, presented as what an on-demand skill file
  would look like. **Trimmed from 4 steps to 3** per explicit instruction
  ("skip point 2") — dropped "add a path property to `pkg/paths.py`";
  narration adjusted from "four-step recipe" to "short recipe."
- **Tools**: acknowledged as barely needed here (bash, `dvc repro`,
  `myst start`) — the concrete instance of "tools are the last resort."
  Paired with the honest caveat that the README/AGENTS split isn't built
  yet in the real repo.

## Chapter 5 in full: Beyond one repo

**Beat (a), "many of your own projects," removed entirely** per explicit
instruction — the 3-scene callback ("You hop between a dozen projects…" →
"THE FIX" → "SAME TEMPLATE, EVERY PROJECT") is gone. The chapter now goes
straight from the "SCALING UP" intro card into beat (b) below. (For
context: (a) had been a *callback* rather than a fresh explanation —
chapter 3 already did the README/AGENTS/DVC walkthrough in depth — so its
removal doesn't lose any content that isn't already covered elsewhere;
what's lost is just the explicit "apply that shape to every project"
bridge line.)

**(b) One team's system, several repos** — kept, now the chapter's only
beat. A 4-step
`visual.kind: repo_map_step` diagram (HTML/CSS grid, same approach as the
pipeline diagram), reworked once per follow-up feedback to establish the
fragmentation problem *before* revealing the fix:
- **Step 1** — the bare repos, no meta-repo yet: an `infrastructure` group
  box containing three sub-repos (`terraform-services`, `gitops`,
  `argo-workflows`), plus standalone `frontend`, `backend`, and `pipelines`
  boxes — four repos, no shared view across any of them.
- **Step 2** — the **meta-repo** fades in above (warm-colored box holding
  "Documentation" and "VS Code workspaces" chips), and a top border appears
  on the repos row connecting them to it — the fix, one level up from
  chapter 3's single-project template.
- **Step 3** — the pipeline team's workspace: `pipelines` and
  `argo-workflows` highlighted, everything else dimmed to ~28% opacity —
  a scoped VS Code workspace that only pulls in what that role needs.
- **Step 4** — the infra team's workspace: only the three infra sub-repos
  (`terraform-services`, `gitops`, `argo-workflows`) highlighted —
  corrected per feedback from an earlier version that highlighted
  *everything* for this step (on the assumption infra work needs the whole
  system in view); the current version scopes it to just the infra repos
  themselves, matching the same "only what this role needs" logic as
  step 3.

The meta-repo/VS Code-workspace mechanism was specified directly (individual
boxes for infra/frontend/backend/pipelines, infra splitting into
terraform-services/gitops/argo-workflows, a root meta-repo holding docs and
workspace configs that compose different subsets per role).

## The "fancy illustration": agent-loop hub diagram (chapter 1)

`visual.kind: agent_loop_step` in `deck.html` (icons: `brain`, `terminal`,
`check`, plus reused `chat`), a 3-step reveal (same accumulation idiom as
`checklist_step`), connected by arrows with a small dot that actually
travels the path (SVG `animateMotion`, triggered per step, not autoplayed).

**Reworked** per explicit instruction: everything except `TEXT IN` and
`OUTPUT` now sits inside a dashed-border box labeled `HARNESS`
(`AL_HARNESS_BOX`, rendered behind the nodes, always visible). The model
uses tools twice, for two different reasons, and that's now two separate
`TOOLS` nodes rather than one node reused — **(1)** `TEXT IN` appears,
arrow into `MODEL`, then `MODEL` reaches the first `TOOLS` node (captioned
`grep · web search`) to gather context it's missing; **(2)** that context
flows back — the return arrow is labeled `CONTEXT` — while `MODEL`
simultaneously reaches a second, distinct `TOOLS` node (captioned
`bash · cloud CLI · ffmpeg`) to actually act; **(3)** the action's results
return, and only then does `OUTPUT` appear, outside the box.

First attempt reused a single `TOOLS` node with four arrows looping in and
out of it — correctly wired but visually cluttered (per feedback: "zu
unübersichtlich"). Fixed by splitting into two nodes stacked vertically to
the right of `MODEL` (context-tools above, action-tools below) and adding
the `CONTEXT` arrow label — each of the two tool trips now reads as a
distinct, labeled round trip instead of a tangle around one circle. Bezier
control points for all six arrows were hand-checked (quadratic-curve
midpoint math, not just eyeballing a screenshot) against the `TOOLS`
captions' bounding boxes and the flat `MODEL`→`OUTPUT` line, since an
earlier flat-line version visibly crossed straight through the tools
caption text.

**Two more follow-up fixes**, both per explicit feedback on a screenshot:
(1) the `CONTEXT` label originally sat wedged in the pocket between the
outbound arrow (`MODEL`→context-`TOOLS`) and the return arrow, reading as
ambiguous. Fixed by re-shaping both curves — the outbound arrow now arcs
higher (control point moved from y:160 to y:130) and the return arrow was
changed from a near-straight line into a gentler, distinctly separate arc
— then placing the label in the resulting clear gap, above the return
arc specifically rather than between the two. (2) the `memory` node,
dropped in the first rework, was **added back** per explicit instruction:
it now sits inside the harness box, below `MODEL`, and appears at the same
step as `OUTPUT` (both fire on the diagram's 3rd/final step) — carrying
the same "clear structure → fast next session" caption as the original
pre-rework version. Its arrow from `MODEL` is routed left and around
`MODEL`'s own label text (control point pulled to x:370, well clear of the
label's ~460–580 span) rather than straight down through it, which a naive
vertical line would have crossed.

**Don't oversell memory**, per explicit instruction: the original caption
("clear structure → fast next session") stated the benefit as a given.
Changed to "might help next session — no guarantee," and the step-3
narration now says the same thing out loud ("whether that actually helps
next session isn't guaranteed, but it's worth the attempt") rather than
asserting it silently through the visual alone.

## Bugs found and fixed by actually screenshotting (not just trusting the code)

This class of bug recurred three times across this session — worth noting
as a pattern: several CSS rules for slide text (`.thesis-line`, `.checklist
.item`, `.cta-domain`) had no `max-width`, so unusually long content simply
ran off the 1920px canvas instead of wrapping.
- `.thesis-line` — fixed by shortening one slide's content and adding
  `max-width:1700px`.
- `.checklist` — fixed by adding `max-width:1650px` and shortening one
  slide's quoted content.
- Two more suspected overflows (`.cta-domain` on the chapter-3 opener, one
  long checklist item) turned out to be **false alarms** — the manual-mode
  speaker panel is only ~97% opaque, so long content sitting near/under it
  looks clipped in preview but is actually fine in the real (non-manual)
  render. Confirmed by rendering scenes directly via `window.renderScene()`
  without `?manual=1` before touching anything further. Worth remembering:
  always verify against the true render, not the preview-panel view, before
  "fixing" an apparent overflow.
- Separately: arrow `<path>` elements in the agent-loop diagram were
  invisible at first — the reveal-toggle logic added `.active` to the
  wrapping `<g>`, but the CSS rule targeted `.al-arrow.active` on the
  `<path>` itself. And the memory node's label/caption initially sat past
  the SVG's height and were silently clipped.

## Research pass (web search on "harness," coding-agent evaluations, current leaderboards)

- Definition/visualization confirmed consistent with chapter 1 (harness =
  tools + loop + context; Claude Code's actual described cycle is "Gather →
  Act → Verify," matching the diagrams) — no changes needed there.
- Added the cross-source consensus quote ("a decent model with a great
  harness beats a great model with a bad harness") after the harness
  definition.
- Added a real number to close chapter 1: on SWE-bench Pro, the same model
  scores ~20 points lower on a standardized harness than on its vendor's
  tuned one (Scale's SEAL leaderboard) — replaced a more generic
  "benchmarks test the task" closer with actual evaluation evidence.
  **Superseded per explicit instruction** — see "Terminal-Bench evidence
  replaces the generic 20-point claim" below; the SWE-bench Pro number is
  no longer on any slide.
- Surfaced and resolved an inconsistency: chapter 2's original trio (GitHub
  Copilot Agent / Claude Code / Pi Coding Agent) isn't what public
  benchmarks track — swapped to Codex CLI / Claude Code / Gemini CLI.
- Caveat carried into the narration itself, not just this doc: leaderboard
  numbers move fast and some pages couldn't be fully verified live
  (JS-rendered, rate-limited) — chapter 2's numbers slide says "treat this
  as a snapshot, not gospel." Re-verify exact percentages close to the
  actual talk date.

## Chapter I (planned): the personal-evolution / global-agent scale

Promoted from "maybe later" to part of the actual planned sequence (item I
above) — not implemented yet, but no longer just a maybe. Two things to
mention per explicit instruction: **UI on top of the harness**, and
**context, again**. Length is explicitly not a constraint while this stays
unbuilt; trimming happens later, closer to the actual cut.

**The core idea**: recast the talk's weakest chapters (6 and 7) using
Chris's own real setup as proof, instead of a hypothetical. A personal
complexity ladder, autobiographical rather than invented:
single data-science repo → the multi-repo problem at work (already
chapter 5) → extending the harness with a custom UI (remote Telegram
access, speech-to-speech) → a single access point to the whole laptop,
organized as topic silos (personal knowledge base, energy projects, the
data-science template, the speech-to-speech setup, Telegram reminders, GCP
inspection tools, a podcast-transcription tool, a personal document
database, this explanatory-video-creator).

**The thesis this should actually be built around** (sharper than "look at
my setup," per discussion): *if the agent doesn't already know something
exists, it will rebuild it.* Two ways to fix that — (a) tell it manually
every time (costs tokens, easy to forget), or (b) give it a standing
registry, loaded via system instructions, that names each silo and points
to that silo's own entry point, which in turn points deeper as needed.
This is the same "context, then skills, then tools" heuristic from
chapter 3, one level up: a registry entry is the cheapest possible thing
in that hierarchy (a few lines, always loaded) and it's what makes
everything else in every silo discoverable at scale instead of rebuilt.

**A second, separate idea worth its own beat**: nested swappability.
Swapping the *model* under a *harness* is common and easy (provider-agnostic
harnesses like Pi Coding Agent already do this, per chapter 2). Swapping
the *harness* under a *UI* is the same idea one layer up — but harder,
because different harnesses own different session-storage formats; a UI
that wants to swap backends either needs harness-specific adapters or has
to keep its own external state store. Worth pinning down precisely (not
just asserted) before it goes on a slide, since it's the kind of claim a
technical audience will push on.

**Where this likely lands**: the "everyday-life scale: personal assistant"
chapter (the hypothetical tax-return assistant + borrowed M365 Copilot
example) was **removed entirely** per explicit instruction — it no longer
exists in the deck at all, not even as a placeholder. This section's plan
still applies, just with nothing to "replace" now: build the real
registry-of-silos setup as the "an entire life" proof from scratch, landing
wherever the personal-evolution scale ends up sequenced. The
voice-input chapter (now chapter 6, "I use local dictation") gets folded
into the custom-UI beat — the Telegram speech-to-speech setup is a direct
escalation of the same friction-reducing idea, not a separate topic.
Chapter 5's "multi-repo problem at work" step already exists and just
needs a callback, not new content.

## Open items

1. **Refactor `project-book-template-dvc` for real** before the talk —
   split `contribution_conventions.md` into README.md + AGENTS.md, so
   chapter 3 shows an actual repo state rather than a proposed one. Named
   openly on-slide as a to-do in the meantime.
2. **Timing**: ~40 min budget, now at 49 scenes (down from a peak of 62
   earlier in this session, after trimming chapter 0, the old chapter 6,
   the "many of your own projects" callback, the four-comparison-axes
   checklist, and the hackathon closer) — trimming is happening
   incrementally via explicit instruction rather than a single dedicated
   pass; re-time once narration/recording exists. Chapter 3 is still the
   newest and least rehearsed — worth timing it specifically, since it's
   dense (four concepts × concrete examples).
3. Still open from earlier: does the order Fundamentals → Tool comparison →
   Chapter 3 (instructions/tools/skills/context) still feel right, or would
   chapter 3 land better positioned right after chapter 1 (since both are
   about mechanism), before the tool comparison?
4. **No hackathon handoff anymore**: the closing "HACKATHON" CTA scene was
   removed per explicit instruction, so the deck now ends on the
   conclusion thesis alone ("the agent is only as good as the context it
   gets"). If this deck is still meant to lead into the hackathon session,
   worth deciding whether a handoff belongs back in some form, or whether
   that's intentionally now out of scope for this deck.
