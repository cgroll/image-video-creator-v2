# LOB TCA video — outline

Storyline: limit order books & transaction cost analysis. Deck: `deck.html`,
scenes: `storyline.yaml`. Invented, round-number example book throughout
(mid $100.00, spread $0.04) for sections 1–6; real LOBSTER AAPL data
(June 21 2012, 30-min midday slice) from section 7 onward.

## Done

1. **Hook** — every trade has two prices; execution quality as the video's
   subject.
2. **Order book basics** — limit order, best bid/ask, depth, spread. Built up
   step by step on one invented example book; ends with a sell order hitting
   the bid (first trade).
3. **Data levels** — L1 vs. L2 vs. L3 on the same book; L3 order-by-order
   decomposition; quote vs. trade data (comparison cards).
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
5. **Order aggressiveness + iceberg orders**
   - Five-stage aggressiveness spectrum (Biais/Hillion/Spatt-style, from the
     lob-tca notebook): crosses spread → improves best above mid → improves
     best at/below mid → joins best → behind best.
   - Ties to fill rate / time-to-fill: more aggressive → higher fill
     probability, faster fill, worse price.
   - Iceberg/hidden orders as a special case: information protection traded
     against display priority and (often) a worse maker rebate.
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
     the filled portion alone looked like a clean win. Teases the real,
     measured version in the next section.
7. **Backtesting execution strategies — tape replay & its limits**
   (real AAPL data from here on: LOBSTER, June 21 2012, 30-min midday slice)
   - Concept: replay the historical tape event by event, see how a
     hypothetical order would have been filled against the book exactly as
     it was.
   - Concrete example #1, real book + real trades, no hidden orders: at
     12:28:15, best ask $582.98 has 300 shares resting (150 more at $583.00
     just behind it). Three real buyers, 100 shares each, claim the level in
     order — all three at $582.98. Replay it with one more 100-share market
     buy inserted first: the first two real trades don't notice, but the
     third — historically $582.98 — now fills at $583.00. **You changed the
     past.**
   - Limitation 1 — non-cascading counterfactual: inserting your own order
     invalidates the rest of the historical tape from that instant on. Real
     participants would have seen a different book and reacted differently;
     there's no way to know how, because that world never happened. A
     backtest has to assume the rest of the day plays out as recorded
     anyway.
   - Limitation 1, refined — market orders vs. resting limit orders: LOBSTER
     (like most exchange feeds) has no distinct "market order" message type,
     so the two are indistinguishable in the data. Illustrated by rewinding
     the same real book: insert your own order to clear $582.98 early, then
     replay the real order that follows — if it's a market order, it
     mechanically clears at $583.00 (assuming the trader still sends it
     worse); if it was a limit order priced at exactly $582.98, it can't
     cross anymore and just rests, unfilled. Market orders replay simpler,
     not risk-free; resting limit orders are worse still.
   - Concrete example #2, real hidden trade: a 200-share hidden sell prints
     at $584.11. Walk the *displayed* bid book instead (100 sh @ $583.98 +
     100 sh @ $583.93 → VWAP $583.955) — $0.155/share hidden-liquidity
     improvement, invisible to any backtest that only sees the public book.
   - Limitation 2 — hidden liquidity, quantified: 36.3% of trades / 36.7% of
     volume in the slice are hidden. Effective spread: $0.1019 actual vs.
     $0.1330 counterfactual (no hidden liquidity) — **+30.6%**. VWAP barely
     moves (−$0.006) — pooled/unsigned averaging cancels buy- and sell-side
     improvement out, a callback to "different metrics answer different
     questions" (section 4).
   - Recap: a backtest using only the displayed book, that assumes the tape
     doesn't react to you, systematically overstates confidence — read it
     as a pessimistic bound, not a precise prediction. Bridges to section 8:
     testing real strategies against that same real tape.

8. **Execution algorithms** (from the Medium post) — real AAPL data. Shared
   pattern per strategy: a short definition, then an illustration against a
   real "book over time" scenario, real trades and top-of-book included.
   - Shared scenario data source: a real 19-second AAPL window, 12:23:02–
     12:23:21 (June 21 2012). Book settles from bid $583.85/ask $584.02 to
     bid $583.80/ask $583.89 within ~8s and holds. Split into 3 time
     buckets for display; real per-bucket volume: 100 sh @ $583.85 (0–8s),
     168 sh @ $583.83 (8–16s), 468 sh @ $583.8254 (16–18.5s). Market VWAP
     for the whole window: $583.8298.
   - **VWAP** — done. Split a 300-share buy into a schedule fixed *in
     advance* (60/90/150 sh, i.e. 20/30/50%, betting volume builds toward
     the end) rather than reacting to realized volume. Real volume was more
     back-loaded than planned (63.6% vs. 50% in the last bucket), so the
     strategy's blended price ($583.8317) misses the true market VWAP
     ($583.8298) by $0.0019/share — a small, honest tracking error coming
     from the schedule not matching reality. Ties back to the VWAP
     benchmark from section 4.
   - **TWAP** — done. Same 300 shares, same 3 buckets, but split by
     duration alone (130/130/40 sh, i.e. 43.2/43.2/13.3% — a constant
     shares/second rate), no volume assumption at all. Badly underweights
     bucket C (13.3% of the order vs. 63.6% of real volume, since it's the
     shortest bucket), so its blended price ($583.8381) misses market VWAP
     by $0.0083/share — over 4× VWAP's tracking error, same window. Direct,
     visually obvious contrast with VWAP's bars on the same layout.
   - **Tracking error, explained** — done. What VWAP/TWAP showed above is
     one realized deviation per strategy, not a real statistic. Define the
     delta series Δᵢ = (strategy VWAP − market VWAP) / market VWAP × 10000
     (bps) per window; Bias = mean(Δ), Tracking Error = std(Δ). Illustrated
     on 13 real windows (same VWAP schedule, spread across the whole
     trading day, real LOBSTER data): bias ≈ 0.0 bps, tracking error =
     0.58 bps. Closes with why correlation ≠ tracking: a strategy that's
     always exactly 5 cents off would correlate at a perfect 1.0 while
     still having a large, obvious bias — correlation shows co-movement,
     not distance.
   - **POV** — done. React to realized volume instead of following a plan:
     target 40.76% (300 of 736 real shares) of whatever trades, whenever it
     trades. Own tranches land at exactly the market's own shape (41/68/191
     sh = 13.6/22.8/63.6%, same bars as "market" on the same layout), so
     blended price ($583.8298) matches market VWAP to 4 decimals —
     tracking error ≈ 0 by construction, not luck. Trade-off shown via a
     hypothetical: if the busy last bucket had instead been quiet (100 sh
     instead of 468), POV would only be 50% done by the end of the window —
     unlike VWAP/TWAP, POV doesn't know its own finish time.

   - **Implementation shortfall / Almgren-Chriss** — done. Definition:
     minimize execution cost (impact, grows with trading speed) + timing
     risk (drift while waiting), rather than tracking a benchmark — the
     real, measured version of the execution-cost-vs-opportunity-cost
     concept from section 6. Illustration: a real table, not a bucket
     diagram (different in kind — aggregate statistics, not a schedule) —
     the same 5-tier aggressiveness spectrum from section 5, at a 5-minute
     opportunity-cost horizon, computed by actually running the relevant
     ~1,350 lines of `pipeline/02_analyse_lobster.py` (order lifecycle +
     aggressiveness classification + IS breakdown) rather than
     re-deriving the logic standalone. Real numbers: fill rate 79.7% /
     26.0% / 21.2% / 2.8%, total IS/share $0.0838 / $0.0656 / $0.1134 /
     $0.0397 across tiers 2–5. Punchline: **not monotonic** — the most
     passive tier (2.8% filled) has the *lowest* total shortfall here,
     lower than the most aggressive tier shown — real trade-offs are
     messier than the clean theoretical curve, which is exactly why
     Almgren-Chriss solves for a trajectory instead of committing to one
     fixed tier.
   - **The efficient frontier, stylized** — done. Explicitly *not* fitted
     to the real data above (labeled as such) — a conceptual cost-vs-risk
     curve: FAST (high expected cost, low timing risk) at one end, SLOW
     (low expected cost, high timing risk) at the other, BALANCED in
     between, with λ (risk aversion) as the dial that picks the point.
     Closes the loop on section 8's IS/AC material: the real table showed
     *why* the trade-off matters (empirically, messily); this shows the
     actual mechanism AC uses to resolve it (a trajectory choice, not a
     fixed tier).
   - **Adaptive** — done. Starts from VWAP's exact plan (60/90/150 sh), but
     reacts to a fill shortfall: bucket B's passive tranche only fills 55
     of 90 (real liquidity limits, not a volume-shape guess), so the
     35-share gap gets carried onto bucket C's target (150 → 185, easily
     absorbed by that bucket's ample real volume). Blended price $583.8312,
     $0.0014 off market VWAP — better than VWAP's blind schedule, not as
     tight as POV's constant reaction. Closes with a 4-way leaderboard
     (TWAP $0.0083 → VWAP $0.0019 → Adaptive $0.0014 → POV $0.0000): more
     reaction to real conditions tracks tighter, at the cost of less
     certainty about the finish.

## Next

   - **Arrival Price** — done. Not a new mechanism — explicitly framed as
     the FAST end of the Almgren-Chriss curve already shown. Real book walk
     at the VWAP/TWAP/POV/Adaptive window's own arrival moment (12:23:02):
     buy 300 shares immediately, through 3 real ask levels (100 sh each at
     $584.02/$584.03/$584.05) → blended $584.0333, arrival mid $583.935 →
     +$0.0983/share, certain, immediate. Benchmark-honesty punchline: all
     five strategies re-measured against this *same* arrival mid (not the
     interval VWAP the other four were built to track) — Arrival Price
     pays a certain $0.0983, while VWAP/TWAP/POV/Adaptive all land ~$0.10
     *favorable*, purely because price happened to drift down over those
     19 seconds. Explicitly **not** "patience wins" — the drift could have
     gone either way; Arrival Price pays a known cost specifically to
     avoid needing to guess which.
   - **Liquidity Seeking** — done, added from a user-challenged thesis
     (not originally in the Medium-post strategy list, but earns its place:
     a real, named strategy family in practice). Continuous passive
     presence, hidden, pegged to the touch, with an escalation fallback —
     *not* strictly dominant over scheduled strategies, because repricing
     to stay pegged sends you to the back of the queue each time, undercutting
     the priority advantage that motivated staying passive in the first
     place. Illustrated with real reprice/dwell data from the same window:
     buy side needed only 1 reprice (3.7s then 14.2s stable — real
     priority accrues); sell side, same window, saw 5 reprices, one level
     lasting just 52 microseconds (no priority ever accrues). Punchline:
     you don't know in advance which regime you'll land in — that
     unpredictability is itself a real cost, separate from adverse
     selection and rebate/fee differences.

   Remaining strategies, same shared scenario + pattern (definition,
   illustration, real numbers) — build one at a time, review each before
   the next:
   - **Dark pool seeking** — routing logic, not a scheduling algorithm;
     needs a different kind of illustration (routing decision, not a
     time/volume schedule).
   - **Smart order routing** — likewise routing-logic, probably paired with
     dark pool seeking rather than illustrated separately.

9. **Close** — the three-way execution trade-off: spread, market impact,
   timing risk. No strategy minimizes all three; choosing one means choosing
   which cost to pay.

## Reference material

- Blog post: https://medium.com/@simomenaldo/a-deep-dive-into-execution-algorithms-757d0f77c3d6
- Source data project: `~/research/lob-tca/` (LOBSTER AAPL sample,
  `pipeline/02_analyse_lobster.py`, `book/markdown/lessons_learned.md`)
