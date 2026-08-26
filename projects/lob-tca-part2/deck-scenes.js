const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "BACKTESTING",
      "content": "How do you test a strategy\nbefore risking real money?\n"
    },
    "text": "Every metric so far has diagnosed a trade that already happened. But how do you test a strategy before risking real money on it?",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "REAL DATA",
      "content": "AAPL, June 21st 2012.\nThe real order book.\n"
    },
    "text": "From here on, it's real market data: Apple, June 21st, 2012 — the actual order book, tick by tick, exactly as it traded.",
    "type": "slide"
  },
  {
    "id": 3,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Replay the tape.\nSee what would have happened.\n"
    },
    "text": "The core idea behind a backtest: replay the historical tape event by event, and see how a hypothetical order would have been filled against the book exactly as it actually was that day. Take a real moment from that book, and everything that happened right after it.",
    "type": "slide"
  },
  {
    "id": 4,
    "visual": {
      "kind": "animation_step",
      "group": "tape_replay",
      "anim_step": 1
    },
    "text": "Here's a real moment from the tape. The best bid is $582.89. The best ask is $582.98, with 300 shares resting — and another 150 waiting one tick higher, at $583.00.",
    "type": "animation",
    "group": "tape_replay",
    "step": 1
  },
  {
    "id": 5,
    "visual": {
      "kind": "animation_step",
      "group": "tape_replay",
      "anim_step": 2
    },
    "text": "Here's exactly what happened next: three separate buyers, 100 shares each, filled in order — all three at $582.98. The level, fully claimed.",
    "type": "animation",
    "group": "tape_replay",
    "step": 2
  },
  {
    "id": 6,
    "visual": {
      "kind": "animation_step",
      "group": "tape_replay",
      "anim_step": 3
    },
    "text": "Now replay it — but insert one more order first: a 100-share market buy, right at the front of the queue, before any of the three real trades arrive. The first two real trades don't even notice — there's still enough left at $582.98. But the third one does: that level is empty by the time it arrives, so it fills at $583.00 instead. Historically, that trade cost $582.98. In this replay, it costs two cents more — purely because of an order that, in reality, never happened.",
    "type": "animation",
    "group": "tape_replay",
    "step": 3
  },
  {
    "id": 7,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "LIMITATION 1",
      "content": "Insert your order,\nand history stops being valid.\n"
    },
    "text": "That's the core problem with naively replaying history: the moment you insert your own order, the rest of that historical tape stops being strictly valid. Real participants would have seen a different book from that instant on — and there's no way to know how they'd have reacted, because that world never actually happened. A backtest has to just assume the rest of the day plays out exactly as recorded anyway.",
    "type": "slide"
  },
  {
    "id": 8,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not every aggressive order\nis equally hard to backtest.\n"
    },
    "text": "There's a nuance worth separating out, though: not every aggressive order is equally hard to backtest.",
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "animation_step",
      "group": "order_type_fork",
      "anim_step": 1
    },
    "text": "Start from that same real book: $582.89 bid. $582.98 ask, 300 shares resting. And $583.00 just behind it, with 150 more.",
    "type": "animation",
    "group": "order_type_fork",
    "step": 1
  },
  {
    "id": 10,
    "visual": {
      "kind": "animation_step",
      "group": "order_type_fork",
      "anim_step": 2
    },
    "text": "Some time later, an aggressive order arrives and clears the top of book — 300 shares at $582.98, all taken. Best ask steps up to $583.00. Whether that order was a true market order or a marketable limit order, it doesn't matter: either way, it just sweeps whatever's on top at the moment it arrives. Mechanically well-defined.",
    "type": "animation",
    "group": "order_type_fork",
    "step": 2
  },
  {
    "id": 11,
    "visual": {
      "kind": "animation_step",
      "group": "order_type_fork",
      "anim_step": 3
    },
    "text": "Now rewind — and replay it differently. Insert your own order first, earlier: it clears that same $582.98 level itself. The book already shows $583.00 as the best ask before the real order ever arrives.",
    "type": "animation",
    "group": "order_type_fork",
    "step": 3
  },
  {
    "id": 12,
    "visual": {
      "kind": "animation_step",
      "group": "order_type_fork",
      "anim_step": 4
    },
    "text": "The real order still arrives right on schedule — but now its fate depends on something the data never told you. If it was a genuine market order, the matching itself doesn't care about price: it mechanically still clears, now at $583.00 — but only if that trader would still have sent the same order at a worse price to begin with, which you're assuming, not observing. If it was actually a limit order priced at exactly $582.98, it can't cross anymore — that price doesn't exist any longer. It just sits there, resting, unfilled. Same real order. Two different fates, and neither one is a sure thing.",
    "type": "animation",
    "group": "order_type_fork",
    "step": 4
  },
  {
    "id": 13,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "LIMITATION 1, REFINED",
      "content": "Market orders replay simpler —\nnot risk-free.\n"
    },
    "text": "Market orders are simpler to replay — not risk-free. The matching itself is mechanical: whatever's on top gets swept, no downstream history required. But that still assumes the trader sends the exact same order regardless of price — and in reality, a market order that turned too expensive might never have been sent at all. A resting or partially-aggressive limit order is worse still: its fate depends on everything that happens next, which is exactly what you can no longer trust once you've changed the past. Same historical execution, two different flavors of the same problem.",
    "type": "slide"
  },
  {
    "id": 14,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "LIMITATION 2",
      "content": "Zoom out from one trade\nto the whole window.\n"
    },
    "text": "Zoom out from one trade to the whole thirty-minute window, and a second blind spot appears.",
    "type": "slide"
  },
  {
    "id": 15,
    "visual": {
      "kind": "animation_step",
      "group": "hidden_walk",
      "anim_step": 1
    },
    "text": "Here's a different kind of real trade from that same day: 200 shares, sold, printed at $584.11 — against a hidden order. No visible quote on the book sat at that price.",
    "type": "animation",
    "group": "hidden_walk",
    "step": 1
  },
  {
    "id": 16,
    "visual": {
      "kind": "animation_step",
      "group": "hidden_walk",
      "anim_step": 2
    },
    "text": "Take the hidden order away, and here's all a backtest watching only the public feed would ever see: 100 shares displayed at $583.98, another 100 at $583.93.",
    "type": "animation",
    "group": "hidden_walk",
    "step": 2
  },
  {
    "id": 17,
    "visual": {
      "kind": "animation_step",
      "group": "hidden_walk",
      "anim_step": 3
    },
    "text": "Walk that displayed book to fill the same 200 shares: 100 at $583.98, then 100 at $583.93 — a volume-weighted price of $583.955.",
    "type": "animation",
    "group": "hidden_walk",
    "step": 3
  },
  {
    "id": 18,
    "visual": {
      "kind": "animation_step",
      "group": "hidden_walk",
      "anim_step": 4
    },
    "text": "$584.11 actually happened. $583.955 is what the displayed book alone would have given. Fifteen and a half cents a share, from liquidity a backtest simply never saw.",
    "type": "animation",
    "group": "hidden_walk",
    "step": 4
  },
  {
    "id": 19,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "36.3% of trades.\n36.7% of volume. Hidden.\n"
    },
    "text": "In this slice, 36.3% of trades — 36.7% of volume — trade against hidden liquidity. A backtest reading only the displayed book is blind to more than a third of what actually happened.",
    "type": "slide"
  },
  {
    "id": 20,
    "visual": {
      "kind": "text_slide",
      "style": "hidden-liquidity-compare",
      "kicker": "HIDDEN LIQUIDITY, QUANTIFIED"
    },
    "text": "Rematch every hidden trade against the displayed book only, and average effective spread rises from just over ten cents to just over thirteen — thirty point six percent higher. VWAP, by contrast, barely moves at all: it pools buy- and sell-side improvement together, so they largely cancel out. Same underlying effect, two very differently sensitive metrics — exactly why one number never tells the whole story.",
    "type": "slide"
  },
  {
    "id": 21,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TAKEAWAY",
      "content": "Read it as a bound,\nnot a prediction.\n"
    },
    "text": "Two limitations, one message: a backtest that only sees the displayed book, and assumes the rest of the tape doesn't react to you, will systematically overstate how confident you should be in the result. Read it as a pessimistic bound, not a precise prediction.",
    "type": "slide"
  },
  {
    "id": 22,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Next: real strategies,\nput to the test.\n"
    },
    "text": "With both caveats honestly on the table, it's still the right tool for the job. Next: putting real execution strategies to exactly this test.",
    "type": "slide"
  },
  {
    "id": 23,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "VWAP",
      "content": "Trade according to\na schedule set in advance.\n"
    },
    "text": "First strategy: VWAP — Volume-Weighted Average Price. Split the parent order across the execution window according to a schedule you set in advance, based on the volume shape you expect to see — not the volume you actually see as it happens.",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "animation_step",
      "group": "vwap_strategy",
      "anim_step": 1
    },
    "text": "Here's a real nineteen-second window in AAPL. Split it into three chunks — and here's what the market actually did in each one: 100 shares in the first eight seconds, 168 in the next eight, 468 in the last three and a half.",
    "type": "animation",
    "group": "vwap_strategy",
    "step": 1
  },
  {
    "id": 25,
    "visual": {
      "kind": "animation_step",
      "group": "vwap_strategy",
      "anim_step": 2
    },
    "text": "Now here's the VWAP order: buy 300 shares total, planned in advance as 60, 90, and 150 shares across those same three chunks — twenty, thirty, fifty percent — betting that volume would build toward the end, the way it usually does.",
    "type": "animation",
    "group": "vwap_strategy",
    "step": 2
  },
  {
    "id": 26,
    "visual": {
      "kind": "animation_step",
      "group": "vwap_strategy",
      "anim_step": 3
    },
    "text": "It wasn't a bad guess, but it wasn't exact either: the market actually put sixty-four percent of its volume in that last chunk, not fifty. Each tranche still executes wherever the real market happens to be trading in its own window — $583.85, then $583.83, then $583.8254.",
    "type": "animation",
    "group": "vwap_strategy",
    "step": 3
  },
  {
    "id": 27,
    "visual": {
      "kind": "animation_step",
      "group": "vwap_strategy",
      "anim_step": 4
    },
    "text": "Blend the three tranches by their sizes, and the strategy's own average price comes out to $583.8317. The real market's volume-weighted average for the same window: $583.8298. Less than a fifth of a cent apart — a small, honest tracking error, coming entirely from the plan not quite matching how volume actually showed up.",
    "type": "animation",
    "group": "vwap_strategy",
    "step": 4
  },
  {
    "id": 28,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The goal isn't the best price.\nIt's blending in.\n"
    },
    "text": "That's the whole idea of a VWAP algorithm: not to get the best price, but to blend in — to end up close to the same average everyone else got, measured with the exact same VWAP benchmark from earlier in this video.",
    "type": "slide"
  },
  {
    "id": 29,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TWAP",
      "content": "Trade at a constant rate.\nIgnore volume entirely.\n"
    },
    "text": "Second strategy: TWAP — Time-Weighted Average Price. Split the parent order into equal-sized pieces at equal time intervals. No guess about volume at all — just a constant rate, shares per second, for the whole window.",
    "type": "slide"
  },
  {
    "id": 30,
    "visual": {
      "kind": "animation_step",
      "group": "twap_strategy",
      "anim_step": 1
    },
    "text": "Same real window, same three chunks, same real activity: 100 shares in the first 8 seconds, 168 in the next 8, 468 in the last 3.5. TWAP won't look at any of this.",
    "type": "animation",
    "group": "twap_strategy",
    "step": 1
  },
  {
    "id": 31,
    "visual": {
      "kind": "animation_step",
      "group": "twap_strategy",
      "anim_step": 2
    },
    "text": "Here's TWAP's plan: 300 shares at a constant rate — 130, 130, and 40 shares across the same three chunks, purely by how long each one lasts. No volume assumption anywhere.",
    "type": "animation",
    "group": "twap_strategy",
    "step": 2
  },
  {
    "id": 32,
    "visual": {
      "kind": "animation_step",
      "group": "twap_strategy",
      "anim_step": 3
    },
    "text": "And that's exactly the problem: the busiest chunk of the real market — 63.6% of the volume — is also the shortest one. TWAP puts just 13.3% of its order there, because it only ever looked at the clock.",
    "type": "animation",
    "group": "twap_strategy",
    "step": 3
  },
  {
    "id": 33,
    "visual": {
      "kind": "animation_step",
      "group": "twap_strategy",
      "anim_step": 4
    },
    "text": "Blend the three tranches, and TWAP's own average price comes out to $583.8381 — 0.83 cents off the real market VWAP of $583.8298. More than four times the tracking error VWAP had, on the exact same window.",
    "type": "animation",
    "group": "twap_strategy",
    "step": 4
  },
  {
    "id": 34,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Simpler to build.\nWorse fit to reality.\n"
    },
    "text": "That's the whole trade-off between the two: TWAP is simpler — no volume forecast required — but it pays for that simplicity with a worse fit to what the market actually did, especially whenever volume is genuinely uneven.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TRACKING ERROR",
      "content": "Is that gap normal —\nor just one window?\n"
    },
    "text": "How do you know if VWAP's 0.19 cents, or TWAP's 0.83 cents, is normal — or just what happened to happen on one nineteen-second window? You can't tell from a single run. You have to do it again. Many times.",
    "type": "slide"
  },
  {
    "id": 36,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE DELTA SERIES",
      "latex": "\\Delta_i = \\frac{\\text{Strategy VWAP}_i - \\text{Market VWAP}_i}{\\text{Market VWAP}_i} \\times 10000",
      "note": "One number per window, in basis points."
    },
    "text": "Define one number per window: your strategy's VWAP minus the market's VWAP, divided by the market's VWAP, times ten thousand — basis points, so it's comparable no matter what the stock's price level is.",
    "type": "slide"
  },
  {
    "id": 37,
    "visual": {
      "kind": "animation_step",
      "group": "tracking_error",
      "anim_step": 1
    },
    "text": "Run the exact same VWAP schedule on thirteen different real windows, spread across the whole trading day. Each dot is one window's deviation, in basis points.",
    "type": "animation",
    "group": "tracking_error",
    "step": 1
  },
  {
    "id": 38,
    "visual": {
      "kind": "animation_step",
      "group": "tracking_error",
      "anim_step": 2
    },
    "text": "First: the bias. Average all thirteen deviations together, and it comes out to essentially zero — about 0.0 basis points. Across enough windows, this schedule isn't systematically too expensive or too cheap.",
    "type": "animation",
    "group": "tracking_error",
    "step": 2
  },
  {
    "id": 39,
    "visual": {
      "kind": "animation_step",
      "group": "tracking_error",
      "anim_step": 3
    },
    "text": "But 'average' hides the spread. The tracking error is the standard deviation of those same deviations: 0.58 basis points. Even with zero bias, any single window can land noticeably off — that's the part correlation would never show you.",
    "type": "animation",
    "group": "tracking_error",
    "step": 3
  },
  {
    "id": 40,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "CORRELATION ≠ TRACKING",
      "content": "Perfect correlation.\nStill five cents off, every time.\n"
    },
    "text": "Here's why correlation isn't enough on its own: imagine your VWAP was exactly five cents above the market's, every single window, without exception. That series would correlate with the market at a perfect 1.0 — and still have a bias of five cents, every time. Correlation tells you if you move together. Bias and tracking error tell you how far apart you actually are.",
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Bias for direction.\nTracking error for consistency.\n"
    },
    "text": "That's the real answer: don't judge an execution algorithm from one trade. Compute the delta series across many, then report both — bias for direction, tracking error for consistency.",
    "type": "slide"
  },
  {
    "id": 42,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "POV",
      "content": "React to real volume.\nNo plan required.\n"
    },
    "text": "Third strategy: POV — Percentage of Volume. Don't plan a schedule at all. Just react: trade a fixed percentage of whatever volume the market actually produces, as it happens.",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "animation_step",
      "group": "pov_strategy",
      "anim_step": 1
    },
    "text": "Same window, same three chunks, same real activity: 100 shares, then 168, then 468.",
    "type": "animation",
    "group": "pov_strategy",
    "step": 1
  },
  {
    "id": 44,
    "visual": {
      "kind": "animation_step",
      "group": "pov_strategy",
      "anim_step": 2
    },
    "text": "POV's target: 40.76 percent of whatever trades. Since it reacts to real volume directly, its own shares land at exactly the same shape — 41, 68, 191 — the same percentages as the market itself, because that's the whole point.",
    "type": "animation",
    "group": "pov_strategy",
    "step": 2
  },
  {
    "id": 45,
    "visual": {
      "kind": "animation_step",
      "group": "pov_strategy",
      "anim_step": 3
    },
    "text": "Blend those three tranches, and the result is $583.8298 — the real market VWAP, to four decimal places. Zero tracking error, and it's not luck: matching the market's shape is the entire mechanism.",
    "type": "animation",
    "group": "pov_strategy",
    "step": 3
  },
  {
    "id": 46,
    "visual": {
      "kind": "animation_step",
      "group": "pov_strategy",
      "anim_step": 4
    },
    "text": "But that mechanism has a cost. POV doesn't know its own finish time — it only knows its percentage. If that last, busy 2.5 seconds had instead been quiet — say, only 100 shares instead of 468 — POV would have completed just 150 of its 300 shares by the time the window ends. Half the order, still working, no way to know how much longer.",
    "type": "animation",
    "group": "pov_strategy",
    "step": 4
  },
  {
    "id": 47,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Fixed finish, approximate price.\nOr exact price, open finish.\n"
    },
    "text": "That's the real trade-off between VWAP and POV: VWAP tells you your price will be close and your finish time is fixed. POV tells you your price will be almost exact — but your finish time depends entirely on a market that might not show up.",
    "type": "slide"
  },
  {
    "id": 48,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "IMPLEMENTATION SHORTFALL",
      "content": "Minimize cost and risk together —\ndon't track a benchmark.\n"
    },
    "text": "Remember the cost-versus-risk curve from when we covered order aggressiveness? It has a name: the Almgren-Chriss framework. Implementation Shortfall algorithms built on it don't try to track a benchmark like VWAP — they explicitly minimize a cost function: execution cost, which grows the faster and more aggressively you trade, plus timing risk, the cost of the price drifting away while you wait.",
    "type": "slide"
  },
  {
    "id": 49,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The real version of that trade-off,\nsame aggressiveness spectrum.\n"
    },
    "text": "We already built this trade-off once, on the invented book: execution cost when an order fills, opportunity cost when it doesn't, nearly canceling out. Here's the real, measured version — broken down by the exact same five-tier aggressiveness spectrum from earlier in this video.",
    "type": "slide"
  },
  {
    "id": 50,
    "visual": {
      "kind": "text_slide",
      "style": "is-by-aggressiveness",
      "kicker": "REAL DATA, SAME SPECTRUM"
    },
    "text": "Here's the real breakdown, filled and unfilled orders both counted, five minutes after each order arrived: fill rate, execution cost on what filled, opportunity cost on what didn't, and the total per intended share.",
    "type": "slide"
  },
  {
    "id": 51,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not a clean curve.\nThe most passive tier wins here.\n"
    },
    "text": "Notice what doesn't happen: this isn't a clean curve. Tier five — behind the best price, filled only 2.8% of the time — actually has the lowest total shortfall here, lower even than the most aggressive tier shown. Real trade-offs are messier than the tidy theoretical curve.",
    "type": "slide"
  },
  {
    "id": 52,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Solve for a trajectory.\nDon't commit to a fixed tier.\n"
    },
    "text": "That's exactly why Almgren-Chriss doesn't commit to one fixed aggressiveness tier. It solves for a trading trajectory instead — a continuous choice along that same cost-risk curve, recalibrated for the stock and the day, because the real trade-off actually moves around like this, not the clean curve we drew earlier.",
    "type": "slide"
  },
  {
    "id": 53,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "ADAPTIVE",
      "content": "Watch your own progress.\nAdjust if you fall behind.\n"
    },
    "text": "Fourth strategy: Adaptive. Don't just follow a fixed plan, and don't just react to market volume — watch your own progress, and adjust if you fall behind.",
    "type": "slide"
  },
  {
    "id": 54,
    "visual": {
      "kind": "animation_step",
      "group": "adaptive_strategy",
      "anim_step": 1
    },
    "text": "Same window, same market activity. Adaptive starts from exactly VWAP's plan: 60, 90, 150 shares — 20, 30, 50 percent.",
    "type": "animation",
    "group": "adaptive_strategy",
    "step": 1
  },
  {
    "id": 55,
    "visual": {
      "kind": "animation_step",
      "group": "adaptive_strategy",
      "anim_step": 2
    },
    "text": "But this time, the plan doesn't just execute silently. In the second chunk, the passive order only gets 55 of its planned 90 shares filled — the market simply didn't offer enough at a price it was willing to pay. That's 35 shares behind schedule.",
    "type": "animation",
    "group": "adaptive_strategy",
    "step": 2
  },
  {
    "id": 56,
    "visual": {
      "kind": "animation_step",
      "group": "adaptive_strategy",
      "anim_step": 3
    },
    "text": "Adaptive notices, and reacts: it adds that 35-share shortfall onto the third chunk's target, now 185 shares instead of 150. The real market there has plenty of volume to absorb it, and the full order gets done.",
    "type": "animation",
    "group": "adaptive_strategy",
    "step": 3
  },
  {
    "id": 57,
    "visual": {
      "kind": "animation_step",
      "group": "adaptive_strategy",
      "anim_step": 4
    },
    "text": "Blend all three chunks, and Adaptive's own average price is $583.8312 — just $0.0014 off the real market VWAP. Better than VWAP's plan alone, not quite as tight as POV's constant reaction — exactly what you'd expect from a strategy that only corrects when it notices it's off, instead of watching the market every instant.",
    "type": "animation",
    "group": "adaptive_strategy",
    "step": 4
  },
  {
    "id": 58,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "More reaction, tighter tracking —\nless certainty about the finish.\n"
    },
    "text": "Four strategies, one real window: TWAP, blind to volume, off by 0.83 cents. VWAP, guessing the shape in advance, off by 0.19. Adaptive, correcting when it falls behind, off by 0.14. POV, reacting to every print, off by essentially nothing. More reaction, tighter tracking — and less certainty about when you'll be done.",
    "type": "slide"
  },
  {
    "id": 59,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "ARRIVAL PRICE",
      "content": "Minimize slippage vs. arrival.\nTrade now, not later.\n"
    },
    "text": "Fifth strategy: Arrival Price. Minimize slippage against the price at the exact moment you decided to trade — the arrival mid. Front-load execution: less time exposed to the market, in exchange for accepting the impact cost of trading right now.",
    "type": "slide"
  },
  {
    "id": 60,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The fast end of the curve\nwe already drew.\n"
    },
    "text": "This isn't a new mechanism — it's a specific point on the curve we already drew. Arrival Price sits at the fast end of Almgren-Chriss: high expected cost, minimal timing risk, by design.",
    "type": "slide"
  },
  {
    "id": 61,
    "visual": {
      "kind": "animation_step",
      "group": "arrival_price",
      "anim_step": 1
    },
    "text": "Here's the real book the instant this order arrives: arrival mid $583.935, and the top three ask levels — 100 shares each, at $584.02, $584.03, and $584.05.",
    "type": "animation",
    "group": "arrival_price",
    "step": 1
  },
  {
    "id": 62,
    "visual": {
      "kind": "animation_step",
      "group": "arrival_price",
      "anim_step": 2
    },
    "text": "Buy all 300 shares immediately, and you walk straight through all three: 100 at $584.02, 100 at $584.03, 100 at $584.05.",
    "type": "animation",
    "group": "arrival_price",
    "step": 2
  },
  {
    "id": 63,
    "visual": {
      "kind": "animation_step",
      "group": "arrival_price",
      "anim_step": 3
    },
    "text": "Blended, that's $584.0333 — 9.83 cents above arrival mid. That's the real, certain cost of trading immediately: no schedule, no waiting, just the price the book actually offers right now.",
    "type": "animation",
    "group": "arrival_price",
    "step": 3
  },
  {
    "id": 64,
    "visual": {
      "kind": "text_slide",
      "style": "arrival-comparison",
      "kicker": "SAME BENCHMARK, ALL FIVE"
    },
    "text": "Here's the honest comparison: measure every strategy from this section against the same arrival mid, not the interval VWAP they were built to track. Arrival Price pays 9.83 cents, certain, immediately. The other four — VWAP, TWAP, POV, Adaptive — all come out roughly ten cents favorable, because the price happened to drift down over those nineteen seconds.",
    "type": "slide"
  },
  {
    "id": 65,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not proof patience wins.\nA known cost, to avoid guessing.\n"
    },
    "text": "That's not proof patience wins. The price could just as easily have drifted up, and every one of those four numbers would have flipped unfavorable. Arrival Price doesn't try to guess which way the market moves — it pays a known cost specifically to avoid needing to guess at all.",
    "type": "slide"
  },
  {
    "id": 66,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "LIQUIDITY SEEKING",
      "content": "Stay passive, continuously.\nEscalate only if you must.\n"
    },
    "text": "One more real strategy worth naming: Liquidity Seeking. Stay passively in the book continuously, hidden, pegged to track the touch — with a fallback to force the rest through as a market order if a deadline arrives and you're still short.",
    "type": "slide"
  },
  {
    "id": 67,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Every reprice sends you\nto the back of the queue.\n"
    },
    "text": "Here's the catch: to stay pegged to the touch, you have to reprice every time it moves. And every reprice sends you to the back of the queue at the new price — you lose exactly the priority that made staying there worthwhile in the first place.",
    "type": "slide"
  },
  {
    "id": 68,
    "visual": {
      "kind": "animation_step",
      "group": "liquidity_seeking",
      "anim_step": 1
    },
    "text": "On the buy side, this real window, staying pegged to the bid needed exactly one reprice: $583.85 for the first 3.7 seconds, then $583.80 — and it just held there for the remaining 14.2 seconds. Fourteen seconds of accumulated priority, for one reprice.",
    "type": "animation",
    "group": "liquidity_seeking",
    "step": 1
  },
  {
    "id": 69,
    "visual": {
      "kind": "animation_step",
      "group": "liquidity_seeking",
      "anim_step": 2
    },
    "text": "Same window, the sell side: five reprices. One of those price levels lasted fifty-two microseconds before the next one replaced it — nowhere near enough time to build any priority at all.",
    "type": "animation",
    "group": "liquidity_seeking",
    "step": 2
  },
  {
    "id": 70,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "You don't know which regime\nyou'll get, in advance.\n"
    },
    "text": "You don't know in advance which of those two you'll get. That unpredictability — not just adverse selection, not just the rebate — is itself part of the real cost of staying continuously in the book. Sometimes the market holds still for you. Sometimes it doesn't, and every reprice starts you over.",
    "type": "slide"
  }
];
