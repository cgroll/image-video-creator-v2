const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "THE PROBLEM",
      "content": "Ask it something\noutside its training data.\nIt doesn't know."
    },
    "text": "Ask a large language model something that genuinely isn't in its training data, and there's no way around it — it doesn't know.",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Your only lever: what goes into\nthe [[context window]] — before you ask."
    },
    "text": "The only lever you actually have is what you put into its context window before you ask. There's no second chance at training time.",
    "type": "slide"
  },
  {
    "id": 3,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "SEARCH, THEN ANSWER",
      "content": "Find the right information.\nThen use it correctly."
    },
    "text": "That splits the whole problem into two halves: finding the right information, and using it correctly. Everything from here on is mostly about getting the first half right.",
    "type": "slide"
  },
  {
    "id": 4,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "THE SCENARIO",
      "content": "A construction project.\nPermits, trades, fire safety,\na switchgear diagram."
    },
    "text": "Picture a construction project — an energy facility, heat pumps, a switchgear diagram, tendered trades, fire-safety documents, permits. All of it searchable, in theory.",
    "type": "slide"
  },
  {
    "id": 5,
    "visual": {
      "kind": "context_fill_step",
      "kicker": "FILLING THE CONTEXT WINDOW",
      "step": 1
    },
    "text": "Take the hard case from that construction project: the switchgear diagram, and a question like 'which breaker feeds Panel 3?' Hand the model exactly the one relevant page and nothing else — and it's genuinely not obvious whether that's even enough to get the right answer.",
    "type": "slide"
  },
  {
    "id": 6,
    "visual": {
      "kind": "context_fill_step",
      "kicker": "FILLING THE CONTEXT WINDOW",
      "step": 2
    },
    "text": "Now leave that same relevant page in, but let a few unrelated pages ride along with it. The general pattern across all of this: the more unrelated material shares the context window, the more answer quality tends to slip.",
    "type": "slide"
  },
  {
    "id": 7,
    "visual": {
      "kind": "context_fill_step",
      "kicker": "FILLING THE CONTEXT WINDOW",
      "step": 3
    },
    "text": "And if the relevant page doesn't make it in at all — wrong pages instead — the answer fails, as expected. Three ways to fill the context window: perfectly, with noise added, or simply wrong.",
    "type": "slide"
  },
  {
    "id": 8,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "If it fails under the [[best]] conditions,\nno retrieval pipeline will save it."
    },
    "text": "Try all three with an easy document, and then with a genuinely hard one — like a dense electrical switchgear diagram. If it can't answer correctly even under the best possible conditions, no amount of retrieval engineering will fix that. You can't make the underlying model smarter — only feed it better.",
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "AGENTIC SEARCH",
      "content": "Give the agent every document.\nLet it read [[all]] of them. Every time."
    },
    "text": "Here's the simplest possible design: give an agent direct access to every document, and have it read all of them, every single time, for every question.",
    "type": "slide"
  },
  {
    "id": 10,
    "visual": {
      "kind": "agentic_search_step",
      "kicker": "GETTING SEARCH EFFICIENT",
      "step": 1
    },
    "text": "That's correct by construction — it can never miss anything. But it doesn't scale: every new question means re-reading the entire library from scratch, and cost grows with both.",
    "type": "slide"
  },
  {
    "id": 11,
    "visual": {
      "kind": "agentic_search_step",
      "kicker": "GETTING SEARCH EFFICIENT",
      "step": 2
    },
    "text": "First real efficiency lever: if the documents are text-searchable, let the agent search by literal keyword first. Cheap and exact — but it only finds what's phrased the way you searched for it.",
    "type": "slide"
  },
  {
    "id": 12,
    "visual": {
      "kind": "agentic_search_step",
      "kicker": "GETTING SEARCH EFFICIENT",
      "step": 3
    },
    "text": "The second lever isn't really about synonyms specifically — it's an iterative cycle: try a search term, look at what comes back, decide whether you need a different term, and search again.",
    "type": "slide"
  },
  {
    "id": 13,
    "visual": {
      "kind": "agentic_search_step",
      "kicker": "GETTING SEARCH EFFICIENT",
      "step": 4
    },
    "text": "Say that first term comes back too narrow and the right page doesn't show up. The agent doesn't stop there — it broadens to a synonym next, and that's the one that actually surfaces it.",
    "type": "slide"
  },
  {
    "id": 14,
    "visual": {
      "kind": "agentic_search_step",
      "kicker": "GETTING SEARCH EFFICIENT",
      "step": 5
    },
    "text": "The problem creeping in by this point is cost — in tokens. A plain keyword search barely costs anything, it just hands back file names, but each extra round of looking, reading, and re-searching adds up fast.",
    "type": "slide"
  },
  {
    "id": 15,
    "visual": {
      "kind": "agentic_search_step",
      "kicker": "GETTING SEARCH EFFICIENT",
      "step": 6
    },
    "text": "Embeddings earn their place as a fourth tool for two concrete reasons. They're far cheaper at the scale of a large document set than iterating keyword rounds — and for graphics specifically, they may be the only real option. Searching an image for meaning without a vision-language model is hard.",
    "type": "slide"
  },
  {
    "id": 16,
    "visual": {
      "kind": "embedding_space_step",
      "kicker": "WHAT IS AN EMBEDDING",
      "step": 1
    },
    "text": "So what is an embedding, concretely? A numeric vector that places a piece of text in a 'meaning space' — texts with similar meaning end up close together, measured by cosine similarity.",
    "type": "slide"
  },
  {
    "id": 17,
    "visual": {
      "kind": "embedding_space_step",
      "step": 2
    },
    "text": "Embed the documents and the query with the same model, and 'closest to the query' becomes a good proxy for 'most relevant'. That's the whole trick behind RAG's search half.",
    "type": "slide"
  },
  {
    "id": 18,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "INGESTION",
      "content": "Not a must-have —\njust hugely [[helpful]].\nSame idea as the back of a book."
    },
    "text": "Step back for a second: none of this strictly needs an index — you could keep reading everything, like the naive baseline from before. But keyword search and embeddings both get dramatically cheaper once one exists. Same idea as the index at the back of a book. You can build it purely on embeddings, purely on which words appear where, or both.",
    "type": "slide"
  },
  {
    "id": 19,
    "visual": {
      "kind": "ingestion_overview",
      "kicker": "THE PRE-PROCESSING STEPS"
    },
    "text": "Concretely, that index gets built from a handful of standard preprocessing steps, run on every document: OCR pulls out the raw text, a language model adds tags and a short summary, basic metadata gets attached — timestamp, file and folder name — and the content gets embedded. The rest of this chapter is each of those steps, one at a time.",
    "type": "slide"
  },
  {
    "id": 20,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "You can't grep a scanned page.\nOCR makes [[keyword search]] possible."
    },
    "text": "Plain keyword search isn't quite an 'index' in that sense, though — it needs the text already extracted first. You can't grep a scanned page. OCR is the preprocessing step that makes keyword search possible at all, and it does that job especially well on scanned, text-heavy documents with few images.",
    "type": "slide"
  },
  {
    "id": 21,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Tables and images:\nwhere extraction breaks down."
    },
    "text": "Tables and embedded images are where that extraction usually breaks down — and where most of the real engineering effort goes.",
    "type": "slide"
  },
  {
    "id": 22,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Newer models embed images\ninto the [[same]] space as text."
    },
    "text": "Newer multimodal embedding models can embed an image directly into the same vector space as the text next to it.",
    "type": "slide"
  },
  {
    "id": 23,
    "visual": {
      "kind": "embedding_fanout",
      "kicker": "SEVERAL EMBEDDINGS PER DOCUMENT"
    },
    "text": "A single document can end up with several embeddings — one per page of text, one per page as an image, one for the document as a whole. Do you average those into one representative vector, or search across all of them separately?",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Tags and summaries\ncan extend the [[index]] too."
    },
    "text": "This same preprocessing stage can make the index itself better, too. Have a language model add metadata on top of the raw text — filename, folder path, a fixed set of tags, a short summary. Embed those, or let keyword search match against them, and they can surface a chunk that the raw text alone would have missed.",
    "type": "slide"
  },
  {
    "id": 25,
    "visual": {
      "kind": "boilerplate_trap",
      "kicker": "THE BOILERPLATE TRAP"
    },
    "text": "One trap to watch for: a boilerplate privacy clause or standard appendix repeats near-identically across many documents. Once it's chunked out, it often doesn't even say which document it came from. Ask something that actually needs that context — like which project a clause belongs to — and all three chunks can end up looking about equally relevant.",
    "type": "slide"
  },
  {
    "id": 26,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "One project only —\nor compare [[across]] projects?"
    },
    "text": "One more ingestion-scoping question before moving on: do you search strictly within one project, or do you want to compare across projects — checking a new fire-safety document against what counted as best practice on an earlier job? That decides how wide the index's net gets cast.",
    "type": "slide"
  },
  {
    "id": 27,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Static documents —\nor a moving target?"
    },
    "text": "And one more: is the document collection static, or does it keep changing? That's what decides whether ingestion is a one-off job, or a recurring pipeline that detects what's new, changed, or gone.",
    "type": "slide"
  },
  {
    "id": 28,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "STORAGE & SEARCH AGENT",
      "content": "Embeddings plus metadata,\nin a vector database."
    },
    "text": "Store all of that — embeddings and metadata — in a vector database. Local to start; a hosted hybrid-search service like Azure AI Search is the realistic production target.",
    "type": "slide"
  },
  {
    "id": 29,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Embedding search. Keyword search.\nAnd: look at the [[original page]] again."
    },
    "text": "Give the agent more than one way to search: embedding search, plain keyword search over the OCR text, and the option to re-open and re-inspect the original page whenever it's unsure.",
    "type": "slide"
  },
  {
    "id": 30,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "PUTTING IT TOGETHER",
      "content": "Good indices and interface.\nIterative search, [[on top]]."
    },
    "text": "So, putting this chapter together: first, good indices and a good interface — real preparation work, done once, up front. Second, an iterative agentic search layered on top of that groundwork, not instead of it.",
    "type": "slide"
  },
  {
    "id": 31,
    "visual": {
      "kind": "chat_citations",
      "kicker": "THE UI ASPECT"
    },
    "text": "And maybe a third piece: feed results back to a human who can give feedback, with tools of varying granularity. Sometimes a reference to the source file is enough; sometimes you need the exact passage highlighted in the rendered document.",
    "type": "slide"
  },
  {
    "id": 32,
    "visual": {
      "kind": "eval_question_gen",
      "kicker": "EVALUATING WHAT YOU BUILT"
    },
    "text": "To check whether any of this actually works, build a small evaluation set: generate one question per section, then see whether search actually surfaces that section again. It's an imperfect signal — everything else defaults to 'irrelevant' — but it's a necessary starting point.",
    "type": "slide"
  },
  {
    "id": 33,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Embeddings: a clean,\n[[automatable]] yes or no."
    },
    "text": "Embeddings alone are the easy case to validate. You already know which chunk a question came from, so checking whether it lands in the top results is a clean, automatable yes or no.",
    "type": "slide"
  },
  {
    "id": 34,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Full agentic search: grep the\nagent's own [[transcript]] instead."
    },
    "text": "The full agentic search loop is harder to grade the same way. There's no single retrieval call to inspect — you're left grepping through the agent's own tool-call transcript, checking whether it ever actually looked at the right document's context.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "No ground truth to match.\nHave another model [[judge]] it."
    },
    "text": "Evaluating the final answer is harder still to automate — there's no ground-truth string to match against. The common workaround: have another language model read the question, the answer, and the source material, and judge whether it actually holds up.",
    "type": "slide"
  },
  {
    "id": 36,
    "visual": {
      "kind": "llm_judge",
      "kicker": "LLM AS A JUDGE"
    },
    "text": "That judge model scores the answer on a few concrete criteria: is it faithful to the source, is it actually grounded in the retrieved text, and is it relevant to the question that was asked.",
    "type": "slide"
  },
  {
    "id": 37,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "ASSUME YOU NEED FULL POWER",
      "content": "Assume you need everything.\nThen check what you can drop."
    },
    "text": "Start from the assumption that this hard case genuinely needs full custom power — and then check, stage by stage, whether something simpler gets you there anyway.",
    "type": "slide"
  },
  {
    "id": 38,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE LADDER",
      "items": [
        "Fully custom pipeline",
        "Azure AI Search — hybrid, managed",
        "Copilot agent + knowledge base"
      ],
      "step": 1
    },
    "text": "Stage one: fully custom — your own OCR and vision-model parsing, your own chunking and embedding choices, your own agent with its own search tools. Setting this up locally is actually the easy part these days — a coding agent like Claude Code gets you there quickly.",
    "type": "slide"
  },
  {
    "id": 39,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE LADDER",
      "items": [
        "Fully custom pipeline",
        "Azure AI Search — hybrid, managed",
        "Copilot agent + knowledge base"
      ],
      "step": 1
    },
    "text": "How much custom frontend that needs depends entirely on how much human review and UX polish the use case calls for — anywhere from a plain link back to the source, to the exact snippet highlighted inside the rendered document.",
    "type": "slide"
  },
  {
    "id": 40,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE LADDER",
      "items": [
        "Fully custom pipeline",
        "Azure AI Search — hybrid, managed",
        "Copilot agent + knowledge base"
      ],
      "step": 1
    },
    "text": "The harder question comes right after: moving the same setup into the cloud for real use — hosting the vector store, the agent, the authentication — and whether that part can be made just as simple as the local version was.",
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE LADDER",
      "items": [
        "Fully custom pipeline",
        "Azure AI Search — hybrid, managed",
        "Copilot agent + knowledge base"
      ],
      "step": 2
    },
    "text": "Stage two: hand the vector index itself to a managed service — Azure AI Search, auto-populated, with hybrid search and metadata filtering built in. No custom data pipeline to maintain, but still real infrastructure to run.",
    "type": "slide"
  },
  {
    "id": 42,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE LADDER",
      "items": [
        "Fully custom pipeline",
        "Azure AI Search — hybrid, managed",
        "Copilot agent + knowledge base"
      ],
      "step": 3
    },
    "text": "Stage three, the simplest: a Copilot agent pointed straight at a knowledge base, like a SharePoint site. Essentially no infrastructure of your own at all.",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Each step down trades away\n[[control]] — and visibility."
    },
    "text": "Each step down this ladder trades away control over chunking and embedding decisions, and visibility into why an answer came out the way it did.",
    "type": "slide"
  },
  {
    "id": 44,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not just setup cost —\n[[cost per question]] too.\nHeavy iteration adds up fast."
    },
    "text": "Compare all three stages the same practical way — and cost means more than what it takes to build. It's also the ongoing cost per question: a heavily agentic loop that iterates again and again can rack up real money on a single query. Add build time, answer quality, and latency, and that's a fair comparison across all three stages.",
    "type": "slide"
  },
  {
    "id": 45,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "WHERE YOU'D ACTUALLY START",
      "content": "Tag it. Embed it. Evaluate it. Then decide."
    },
    "text": "In practice, the pragmatic first pass looks like this: take the documents, tag them with a language model, pull embeddings, build a small evaluation set, run it locally — then decide, with actual evidence, which rung of that ladder is worth the effort.",
    "type": "slide"
  }
];
