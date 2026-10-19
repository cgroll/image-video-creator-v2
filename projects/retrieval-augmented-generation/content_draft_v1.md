# RAG Deep Dive — content draft v1 (rough, for review)

> STATUS: Chapters 1-5 (scenes 1-26) are now actually implemented in
> `storyline.yaml` / `deck.html`, including a first custom diagram
> (`context_fill_step`: context-window-filling experiment with a happy/
> neutral/sad outcome). Those files are the current source of truth for
> that range — this doc is now mainly the still-current plan for chapters
> 6-10, which remain text-only placeholders.

Source material: three "quantitative-thinking.com" blog posts (RAG part 1-3,
June 2025, slightly outdated) plus a long voice-dictated brainstorm from
Chris on 2026-10-19. This is a first attempt at ordering that brainstorm into
chapters/scenes. Nothing final — meant to be reordered and critiqued.

Running examples to carry through the whole deck:
- EASY case: a generic text document (e.g. a contract).
- HARD case: a complex electrical switchgear/wiring diagram.
- Business scenario for chapters 6+: construction projects — building an
  energy facility, heat pumps, a switch diagram, tendered trades (Gewerke),
  fire safety documents, permits.

---

## Chapter 1 — The setup: one shot at the context window

1. Hook: ask a model a question whose answer isn't in its training data.
   It has no way to know — knowledge cutoff / missing domain knowledge.
2. The only lever available: get the right information into the context
   window before asking. There is no second chance at training time.
3. This splits the whole problem into two halves: Search (find the right
   information) and Answer (use it correctly). Everything downstream is
   about engineering the Search half well, because Answer is only as good
   as what it's given.

## Chapter 2 — Finding the ceiling before building anything

4. Three experiments, same question, varying what's in the context window:
   (a) only the relevant snippet — best possible case;
   (b) the relevant snippet plus irrelevant noise — does quality hold up?
   (c) the wrong snippet entirely — expected failure, included as a control.
5. Run this with both the EASY and the HARD example. If the model can't
   answer correctly even under the best-case condition (a) on the HARD
   example, no amount of retrieval engineering will fix that — you cannot
   make the underlying vision/language model smarter, only feed it better.
6. Message: always check this ceiling first. It tells you whether you're
   about to solve a search problem or chase an unsolvable one.

## Chapter 3 — Agentic search: the naive baseline and the efficiency ladder

7. Naive baseline: give an agent direct access to every document and have
   it actually read through all of them for every single question. This is
   correct by construction — it can't miss anything — but it doesn't scale:
   every new question means re-reading the entire corpus from scratch, and
   cost grows with both corpus size and question volume.
8. Efficiency lever one — keyword search: if the documents are text-
   searchable, let the agent search by literal word first. Cheap, exact,
   but only finds what's phrased the way you searched for it.
9. Efficiency lever two — synonyms/word variations: have the agent (or the
   search layer) expand a search into related terms, not just the literal
   word. Still no embeddings involved, and already catches a lot more.
10. Efficiency lever three — embeddings as an additional search tool: this
    is where Retrieval Augmented Generation enters, as one more capability
    bolted onto the agent's toolbox rather than a replacement for the first
    two levers. Embeddings catch semantic/paraphrased matches that a fixed
    synonym list won't anticipate. Message for this chapter: the real goal
    is an agent that's simply good at finding things, and keyword search,
    synonym expansion, and embedding-based retrieval are three
    complementary tools toward that, each cheaper to fall back on than
    "read everything."
11. What an embedding actually is, kept short: a numeric vector placing a
    piece of text in a "meaning space," where closeness = semantic
    similarity (cosine similarity). Query and document chunks are embedded
    with the same model into the same space, so "closest to the query" ≈
    "most relevant."

## Chapter 4 — Ingestion: where the real mess lives

12. Back to the HARD example: a scanned/complex document isn't plain text.
    Extract text via OCR, plus layout/pixel positions (e.g. Azure Document
    Intelligence) — tables and embedded images are the recurring pain point.
13. Newer multimodal embedding models (e.g. "Gemma Embedding 2") can embed
    an image directly into the same vector space as text. Caveat to flag
    explicitly: these models are proven on captioned photos (cat pictures +
    "a cat" captions) — it's an open question whether that transfers to
    dense technical diagrams with their own OCR text, not a given.
14. Multiple embeddings per document: one per page's text, one per page's
    image, one for the whole document. Open question: average them into one
    representative embedding, or keep them separate and search across all?
15. Metadata enrichment via an LLM: not just the OCR text, but filename,
    folder path, a fixed/predefined tag taxonomy, and a short generated
    summary — with a verification pass (e.g. re-check the first two pages)
    to make sure nothing important was missed.
16. The generic-boilerplate trap: a privacy clause or standard appendix page
    recurs near-identically across many documents. It doesn't relate to any
    one document's actual subject, so it ends up looking "similar" to lots
    of unrelated queries — a known failure mode to call out, not solved.

## Chapter 5 — Storage and a search agent

17. Store embeddings + metadata in a vector database — local to start, Azure
    AI Search with hybrid (keyword + vector) search as the realistic target.
18. Give an agent several search tools: embedding search, keyword/grep
    search over the OCR text, and the ability to re-open and re-inspect the
    original page/image when it's unsure.
19. Building a mini evaluation set: generate one question per chunk/section,
    then check whether search surfaces that chunk. Flag the known weakness
    up front — everything else gets labeled "irrelevant" by default, which
    is an imperfect signal, and a short query embeds very differently from a
    long chunk (length/asymmetry mismatch).

## Chapter 6 — The business scenario, and a scoping question

20. Introduce the construction-project scenario concretely (energy facility,
    heat pumps, switch diagrams, trades, fire safety, permits).
21. Scoping question: strictly isolate retrieval per project, or allow
    cross-project lookups — e.g. checking a new fire-safety document against
    what "best practice" looked like in earlier projects?

## Chapter 7 — The ladder: assume you need full power, then check if you don't

Framing for this chapter: start from the assumption that the hard case
genuinely needs full custom power — then deliberately check, stage by
stage, whether something simpler actually gets you there too. Hard to easy,
not easy to hard.

22. Stage A — fully custom: own OCR/VLM parsing, own chunking + embedding
    choices, own agent with search tools. Local setup is the relatively
    easy part here — a coding agent like Claude Code makes standing this up
    on your own machine quick. The harder question comes right after:
    moving the same thing into the cloud for real use — and whether that
    step can be made just as simple, or whether it reintroduces most of the
    complexity (hosting the vector store, the agent runtime, auth, etc.).
    - Custom frontend, as part of Stage A, not a separate stage: whether you
      need one — and how much — depends on how much human-in-the-loop
      review and UX polish the use case actually calls for. Spectrum runs
      from "a link back to the source" to "the exact snippet highlighted in
      place in the rendered document." Worth a mention/slide, not a deep
      dive.
23. Stage B — Azure AI Search as the abstraction: auto-populated vector
    index with hybrid search and metadata filtering, agent on top. No custom
    data pipeline to maintain, but still real infrastructure to stand up and
    operate.
24. Stage C — simplest: a Copilot agent pointed at a knowledge base (e.g. a
    SharePoint site). Essentially zero infrastructure of your own.
25. What you trade going down this ladder: control over chunking/embedding
    decisions, visibility into *why* an answer was produced, and — as the
    next chapter covers — how well you can evaluate it.

## Chapter 8 — Evaluation gets harder as you simplify

26. In the custom build (Stage A/B), retrieval and generation can be
    evaluated separately: "did we find the right chunk" is a quantifiable
    yes/no (hit rate, MRR, recall), independent of "was the final answer
    good" (LLM-as-judge on faithfulness/groundedness/relevancy).
27. In Stage C (Copilot + knowledge base), that separation mostly disappears
    — you can't easily inspect or test retrieval in isolation, so you're
    pushed to end-to-end question/answer judging only. Open question, to
    flag rather than resolve on screen: how well even that can be automated
    inside Copilot Studio.
28. The practical comparison across all three stages: setup cost, build
    time, ongoing answer quality, and latency — not just "which is better"
    but "which is justified for this use case."

## Chapter 9 — One more practical fork: is the document base static?

29. Whether the knowledge base is static or constantly changing determines
    whether you need a one-off ingest or a recurring re-index pipeline, and
    how you detect added/changed/deleted source files.

## Chapter 10 — Closing: how you'd actually start this Monday morning

30. Pragmatic first pass, stated plainly: take the documents, tag them with
    an LLM, pull embeddings, build a small eval set, run it locally, check
    how long it takes and what it costs — then decide, with evidence, which
    rung of the ladder (Chapter 7) is actually justified.

---

## Open items / things to decide before turning this into a storyline.yaml

- Order of chapters 6/7: should the construction scenario (6) come before
  the ceiling test (2), so the HARD example is motivated by a real business
  need from the start, rather than introduced somewhat abstractly?
- RESOLVED: Chapter 7 is hard-to-easy on purpose — assume full custom power
  (Stage A) is needed, then check whether Stage B/C get you there anyway.
  Within Stage A, local setup (e.g. with Claude Code) is the easy part;
  moving to the cloud is flagged as the next, harder question, not yet
  answered on screen.
- RESOLVED: "custom frontend" is not its own stage — it's a bullet inside
  Stage A, scoped by how much human-in-the-loop/UX the use case needs.
- Chapter 3 (agentic search ladder) is new as of this revision — replaces
  the earlier "embeddings first, then justify why" framing. Worth checking
  it doesn't duplicate ground covered again in Chapter 4/5 once visuals are
  designed.
- Visuals are not designed yet — this is text/structure only. Diagram
  candidates: context-window experiment (3 cases), the search-efficiency
  ladder (read-everything → keyword → synonym → embeddings), embedding
  space scatter/cluster sketch, document → multiple embeddings fan-out, the
  3-stage build ladder as a literal staircase, evaluation-scope comparison
  (what's measurable at each stage).
- Total scene count (30 here) is a first pass; some will merge, some will
  split once visuals are designed.
