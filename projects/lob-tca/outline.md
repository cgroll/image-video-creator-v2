# LOB TCA video — Part 1 outline

Storyline: limit order books & transaction cost analysis. Deck: `deck.html`,
scenes: `storyline.yaml`. Invented, round-number example book throughout
(mid $100.00, spread $0.04).

Split into two videos (2026-08-26) — this project is **Part 1**. Part 2
(backtesting + execution algorithms, real AAPL data) lives in
`projects/lob-tca-part2/`, sharing this same `deck.html`. See that
project's `outline.md` for its own scene list.

## Done

1. **Hook** — every trade has two prices; execution quality as the video's
   subject.
2. **Order book basics** — limit order, best bid/ask, depth, spread. Built up
   step by step on one invented example book; ends with a sell order hitting
   the bid (first trade).
3. **Data levels** — L1 vs. L2 vs. L3 on the same book; L3 order-by-order
   decomposition; quote vs. trade data (comparison cards).
   - **Iceberg orders** — introduced right after L3, as a direct twist on it:
     even order-by-order data doesn't show everything, since an iceberg
     displays only part of its own size. A 700-share incoming buy clears the
     visible 300 first, then reaches the hidden 400, revealed only once
     touched. Trade-off: information protection vs. display priority (and
     often a worse maker rebate).
   - **3b. The book over time** — several quotes drawn as lines with a
     lifespan (appear → filled / partially filled / canceled), trades as the
     events that shorten them, and a derived top-of-book line. Chronological,
     event-by-event playback.
4. **Measuring execution quality** — slippage, effective spread, VWAP.
   - Instant-fill case (arrival mid = pre-trade mid, ×2 convention).
   - Order #4890 case with real dwell time — arrival mid vs. pre-trade mid
     genuinely diverge because the market moved during the wait.
   - VWAP benchmark against a small market trade tape.
   - Recap checklist: three benchmarks, three questions.
5. **Order aggressiveness, and the cost/risk trade-off behind it**
   - Five-stage aggressiveness spectrum (Biais/Hillion/Spatt-style, from the
     lob-tca notebook): crosses spread → improves best above mid → improves
     best at/below mid → joins best → behind best.
   - Ties to fill rate / time-to-fill: more aggressive → higher fill
     probability, faster fill, worse price. Illustrated with a per-tier
     dwell-time animation (horizontal lines, x-axis = time in book, growing
     longer for less aggressive tiers; the most passive tier trails off into
     a dashed "may never fill" ending).
   - **The cost/risk frontier, stylized**: the aggressiveness spectrum is one
     way to trade patiently — pricing a single order less aggressively.
     Splitting a large order into a schedule of smaller ones over time is
     the other. Both are just dials on the same underlying curve: execution
     cost vs. timing risk. Not yet named "Almgren-Chriss" here — that label
     is introduced later, in Part 2, as an explicit callback to this curve,
     once real numbers are on the table. Closes by asking the question
     section 6 answers: what if you wait so long the order simply never
     fills?
6. **The risk of not filling at all — bridge to Implementation Shortfall**
   (still the invented book)
   - A 300-share passive order (behind best, from the aggressiveness
     spectrum) partially fills — 100 shares at $99.90 — before the market
     drifts away and leaves the remaining 200 unfilled.
   - The 200 unfilled shares are given up on and marked, on paper only (no
     real trade), at the prevailing mid — that's opportunity cost. Genuinely
     different from "canceled, then completed immediately," which is just
     delayed execution cost, not opportunity cost, since the order still
     ends up 100% filled either way.
   - Recap: execution cost (realized, on the 100 that filled: −$10,
     favorable) + opportunity cost (paper, on the 200 that didn't: +$10,
     unfavorable) nearly cancel — Implementation Shortfall ≈ $0, even though
     the filled portion alone looked like a clean win. Closes Part 1 with an
     explicit pointer to Part 2, where it gets measured for real on actual
     AAPL data.

## Reference material

- Blog post: https://medium.com/@simomenaldo/a-deep-dive-into-execution-algorithms-757d0f77c3d6
- Source data project: `~/research/lob-tca/` (LOBSTER AAPL sample,
  `pipeline/02_analyse_lobster.py`, `book/markdown/lessons_learned.md`)
