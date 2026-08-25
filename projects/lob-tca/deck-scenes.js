const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Every trade has two prices.\nThe one you see, and the one you get.\n"
    },
    "text": "Every trade has two prices — the one you see on the screen, and the one you actually get.",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "EXECUTION QUALITY",
      "content": "Your strategy decides what to buy.\nThe market decides what it costs.\n"
    },
    "text": "Your strategy decides what to buy. The market decides what it costs — and that gap is what this video is about.",
    "type": "slide"
  },
  {
    "id": 3,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "TODAY",
      "content": "The limit order book.\nWhere every price begins.\n"
    },
    "text": "To understand that gap, we start where every price begins: the limit order book.",
    "type": "slide"
  },
  {
    "id": 4,
    "visual": {
      "kind": "animation_step",
      "group": "orderbook",
      "anim_step": 1
    },
    "text": "Here's a simplified order book. Two prices define the market at any instant: the best bid — the highest price a buyer is currently willing to pay — and the best ask, the lowest price a seller will accept.",
    "type": "animation",
    "group": "orderbook",
    "step": 1
  },
  {
    "id": 5,
    "visual": {
      "kind": "animation_step",
      "group": "orderbook",
      "anim_step": 2
    },
    "text": "Neither price is alone. Behind the best bid and the best ask, more orders are queued up at slightly worse prices — that queued-up size is what we mean by market depth.",
    "type": "animation",
    "group": "orderbook",
    "step": 2
  },
  {
    "id": 6,
    "visual": {
      "kind": "animation_step",
      "group": "orderbook",
      "anim_step": 3
    },
    "text": "A real order book — even a simplified one — shows several price levels deep on each side. The deeper you look, the more size you can see waiting to trade.",
    "type": "animation",
    "group": "orderbook",
    "step": 3
  },
  {
    "id": 7,
    "visual": {
      "kind": "animation_step",
      "group": "orderbook",
      "anim_step": 4
    },
    "text": "The gap between the best bid and the best ask is called the spread. Here it's four cents. Trading immediately, right now, means paying at least that much just to cross it.",
    "type": "animation",
    "group": "orderbook",
    "step": 4
  },
  {
    "id": 8,
    "visual": {
      "kind": "animation_step",
      "group": "orderbook",
      "anim_step": 5
    },
    "text": "Now someone submits a sell order for 150 shares, priced to trade right away. It hits the best bid: 150 shares execute at ninety-nine ninety-eight, and only 200 shares remain resting at that price. That's a trade — not just a quote.",
    "type": "animation",
    "group": "orderbook",
    "step": 5
  },
  {
    "id": 9,
    "visual": {
      "kind": "animation_step",
      "group": "orderbook",
      "anim_step": 6
    },
    "text": "This whole picture is actually built from a few different kinds of market data. The simplest is Level 1 — just the best bid and the best ask, nothing else.",
    "type": "animation",
    "group": "orderbook",
    "step": 6
  },
  {
    "id": 10,
    "visual": {
      "kind": "animation_step",
      "group": "orderbook",
      "anim_step": 7
    },
    "text": "Add the price levels behind them, each with its aggregated size, and that's Level 2 — the full depth ladder we've been building this whole time.",
    "type": "animation",
    "group": "orderbook",
    "step": 7
  },
  {
    "id": 11,
    "visual": {
      "kind": "animation_step",
      "group": "orderbook",
      "anim_step": 8
    },
    "text": "Level 3 goes one step further: instead of one aggregated number per price, you see the individual orders that make it up. That 300 shares at $100.02? It's actually two separate resting orders — 100 shares and 200 shares.",
    "type": "animation",
    "group": "orderbook",
    "step": 8
  },
  {
    "id": 12,
    "visual": {
      "kind": "animation_step",
      "group": "order_lifecycle",
      "anim_step": 1
    },
    "text": "But there's more: every one of those orders also carries its own ID and timestamp. Take the order our sell trade actually hit — order number 4890, a 150-share limit order resting at $99.98. It was submitted at 09:29:47, and it sat there until our incoming sell order matched it completely at 09:30:03. That's the exact trade we saw earlier.",
    "type": "animation",
    "group": "order_lifecycle",
    "step": 1
  },
  {
    "id": 13,
    "visual": {
      "kind": "animation_step",
      "group": "order_lifecycle",
      "anim_step": 2
    },
    "text": "Was it top of book the whole time, though? No. For its first five seconds, ninety-nine ninety-nine was still the best bid — order 4890 was one tick behind, not yet reachable. Only once that better-priced level cleared did ninety-nine ninety-eight become the best bid, and only then was 4890 next in line to trade. Level 3 is what lets you reconstruct that entire sequence, order by order.",
    "type": "animation",
    "group": "order_lifecycle",
    "step": 2
  },
  {
    "id": 14,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Everything so far has been quotes.\nA trade is something else entirely.\n"
    },
    "text": "Everything we've drawn so far — every price and size resting in the book — is quote data. A trade is something else entirely.",
    "type": "slide"
  },
  {
    "id": 15,
    "visual": {
      "kind": "text_slide",
      "style": "quote-trade-compare",
      "kicker": "QUOTE DATA",
      "showTrade": false
    },
    "text": "A quote is a snapshot of the book: the best bid, the best ask, and their sizes. It updates constantly — even when nobody trades, quotes shift as orders arrive and cancel.",
    "type": "slide"
  },
  {
    "id": 16,
    "visual": {
      "kind": "text_slide",
      "style": "quote-trade-compare",
      "kicker": "QUOTE vs. TRADE",
      "showTrade": true
    },
    "text": "A trade is different: it's a record of something that already happened. Our sell order for 150 shares at ninety-nine ninety-eight — that's a trade. One price, one size, one side, one timestamp, and it can't be undone.",
    "type": "slide"
  },
  {
    "id": 17,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "ZOOMING OUT",
      "content": "One order is one line.\nThe book is many lines at once.\n"
    },
    "text": "One order's history is one line. But the whole book is many of these lines at once — let's zoom out and watch a few quotes over the same thirty seconds.",
    "type": "slide"
  },
  {
    "id": 18,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 1
    },
    "text": "Let's watch it happen, one event at a time, left to right. We start with two resting quotes already in place: the best bid at ninety-nine ninety-nine, and the best ask at a hundred-oh-two.",
    "type": "animation",
    "group": "book_time",
    "step": 1
  },
  {
    "id": 19,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 2
    },
    "text": "First event: a new ask joins the book at a hundred-oh-three — deeper than the current best ask, so it doesn't change anything at the top.",
    "type": "animation",
    "group": "book_time",
    "step": 2
  },
  {
    "id": 20,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 3
    },
    "text": "Next: a new bid joins too, at ninety-nine ninety-eight. But ninety-nine ninety-nine is still better, so this one isn't top of book yet — it's just waiting its turn.",
    "type": "animation",
    "group": "book_time",
    "step": 3
  },
  {
    "id": 21,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 4
    },
    "text": "Now a quote vanishes with no trade at all: the hundred-oh-three ask is simply withdrawn. Canceled, not filled — no execution, no print, just gone.",
    "type": "animation",
    "group": "book_time",
    "step": 4
  },
  {
    "id": 22,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 5
    },
    "text": "Here's the first trade: a sell order hits the ninety-nine ninety-nine bid and consumes it completely. That level disappears — and the best bid steps down to ninety-nine ninety-eight, the only one left.",
    "type": "animation",
    "group": "book_time",
    "step": 5
  },
  {
    "id": 23,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 6
    },
    "text": "A better price arrives: a hundred-oh-one joins the ask side. It's cheaper than a hundred-oh-two, so it briefly becomes the new best ask.",
    "type": "animation",
    "group": "book_time",
    "step": 6
  },
  {
    "id": 24,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 7
    },
    "text": "That new level gets consumed too: a buy order fully fills the hundred-oh-one ask. With it gone, the best ask reverts to a hundred-oh-two.",
    "type": "animation",
    "group": "book_time",
    "step": 7
  },
  {
    "id": 25,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 8
    },
    "text": "One last event: a sell order only partially fills the ninety-nine ninety-eight bid this time. Size remains, so the quote keeps going, unbroken — and stays top of book right to the end. Filled completely, filled partially, or simply canceled: three endings, one picture.",
    "type": "animation",
    "group": "book_time",
    "step": 8
  },
  {
    "id": 26,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "So the trade happened.\nBut was $99.98 a good price?\n"
    },
    "text": "So the trade happened. But was ninety-nine ninety-eight actually a good price? Answering that needs a benchmark — and different benchmarks give different answers.",
    "type": "slide"
  },
  {
    "id": 27,
    "visual": {
      "kind": "animation_step",
      "group": "exec_quality_time",
      "anim_step": 1
    },
    "text": "Here's the same trade, seen from the other side. A moment ago you were the seller — now imagine you're order #4890 instead, the patient buyer who was resting at $99.98. Let's mark the mid the moment it arrives: $99.99 bid, $100.02 ask, so mid is $100.005.",
    "type": "animation",
    "group": "exec_quality_time",
    "step": 1
  },
  {
    "id": 28,
    "visual": {
      "kind": "animation_step",
      "group": "exec_quality_time",
      "anim_step": 2
    },
    "text": "Sixteen seconds pass before it fills. In between, a sell consumes the ninety-nine ninety-nine bid, and a brief hundred-oh-one ask comes and goes. By the time #4890 is about to trade, mid has drifted down to a hundred dollars even.",
    "type": "animation",
    "group": "exec_quality_time",
    "step": 2
  },
  {
    "id": 29,
    "visual": {
      "kind": "animation_step",
      "group": "exec_quality_time",
      "anim_step": 3
    },
    "text": "Now slippage and effective spread are genuinely different numbers — and both favorable, this time. Against the arrival mid, two and a half cents better. Against the pre-trade mid, doubled, four cents better — exactly the negative of the quoted spread, because a resting order that makes it to the top of book earns the spread instead of paying it.",
    "type": "animation",
    "group": "exec_quality_time",
    "step": 3
  },
  {
    "id": 30,
    "visual": {
      "kind": "animation_step",
      "group": "exec_quality",
      "anim_step": 3
    },
    "text": "A third benchmark looks outward, not just at your own order: the volume-weighted average price of everything that traded in the market around the same time. A handful of other trades, weighted by their size, average out to ninety-nine, ninety-nine eighty-five for this interval.",
    "type": "animation",
    "group": "exec_quality",
    "step": 3
  },
  {
    "id": 31,
    "visual": {
      "kind": "animation_step",
      "group": "exec_quality",
      "anim_step": 4
    },
    "text": "Compare your fill to that: $99.98 against a $99.9985 benchmark — about two cents better, roughly matching the gain we saw against arrival mid. Three different questions, and this time, three consistent, favorable answers.",
    "type": "animation",
    "group": "exec_quality",
    "step": 4
  },
  {
    "id": 32,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THREE BENCHMARKS, THREE QUESTIONS",
      "items": [
        "Slippage vs. arrival mid — $0.02 favorable: how far from the price you saw?",
        "Effective spread vs. pre-trade mid, ×2 — $0.04 favorable: what did resting at the touch earn you?",
        "VWAP vs. the interval — ≈ $0.02 favorable: how did you do against the whole market?"
      ],
      "step": 1
    },
    "text": "Slippage against arrival mid: two cents favorable — how far from the price you saw when you decided, and this time, in your favor.",
    "type": "slide"
  },
  {
    "id": 33,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THREE BENCHMARKS, THREE QUESTIONS",
      "items": [
        "Slippage vs. arrival mid — $0.02 favorable: how far from the price you saw?",
        "Effective spread vs. pre-trade mid, ×2 — $0.04 favorable: what did resting at the touch earn you?",
        "VWAP vs. the interval — ≈ $0.02 favorable: how did you do against the whole market?"
      ],
      "step": 2
    },
    "text": "Effective spread against the pre-trade mid, doubled by convention: four cents favorable — exactly what resting at the best bid earned you, the instant it got hit.",
    "type": "slide"
  },
  {
    "id": 34,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THREE BENCHMARKS, THREE QUESTIONS",
      "items": [
        "Slippage vs. arrival mid — $0.02 favorable: how far from the price you saw?",
        "Effective spread vs. pre-trade mid, ×2 — $0.04 favorable: what did resting at the touch earn you?",
        "VWAP vs. the interval — ≈ $0.02 favorable: how did you do against the whole market?"
      ],
      "step": 3
    },
    "text": "And VWAP against the whole interval's volume: about two cents better — how you did compared to everyone else trading around you. Same trade, three answers — and this time, all three favor you.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "ORDER AGGRESSIVENESS",
      "content": "The price you choose\nshapes what happens next.\n"
    },
    "text": "We've measured what a trade cost after the fact. But the price you choose for your own order shapes what happens next — how likely it is to fill, and how fast.",
    "type": "slide"
  },
  {
    "id": 36,
    "visual": {
      "kind": "animation_step",
      "group": "aggressiveness",
      "anim_step": 1
    },
    "text": "Here's the book's touch again, drawn as a price ruler this time: the best ask, the mid, and the best bid — the three reference points every new order gets measured against.",
    "type": "animation",
    "group": "aggressiveness",
    "step": 1
  },
  {
    "id": 37,
    "visual": {
      "kind": "animation_step",
      "group": "aggressiveness",
      "anim_step": 2
    },
    "text": "Price a buy limit above the ask, at $100.03, and it crosses the spread immediately — it behaves like a market order and trades right away. That's the most aggressive tier there is.",
    "type": "animation",
    "group": "aggressiveness",
    "step": 2
  },
  {
    "id": 38,
    "visual": {
      "kind": "animation_step",
      "group": "aggressiveness",
      "anim_step": 3
    },
    "text": "Price it at $100.01 instead, and it beats today's best bid while staying above the midpoint — still resting in the book, but priced aggressively.",
    "type": "animation",
    "group": "aggressiveness",
    "step": 3
  },
  {
    "id": 39,
    "visual": {
      "kind": "animation_step",
      "group": "aggressiveness",
      "anim_step": 4
    },
    "text": "At $99.99, it still improves the best bid — but now it sits on the cheap side of the midpoint. Same queue position, a less aggressive price.",
    "type": "animation",
    "group": "aggressiveness",
    "step": 4
  },
  {
    "id": 40,
    "visual": {
      "kind": "animation_step",
      "group": "aggressiveness",
      "anim_step": 5
    },
    "text": "At $99.98 exactly, it doesn't improve the best bid at all — it just ties it, joining the queue instead of jumping ahead of it.",
    "type": "animation",
    "group": "aggressiveness",
    "step": 5
  },
  {
    "id": 41,
    "visual": {
      "kind": "animation_step",
      "group": "aggressiveness",
      "anim_step": 6
    },
    "text": "And behind the best price entirely, at $99.95, it simply waits — furthest from a fill of any order here. Five tiers, one spectrum: more aggressive pricing means a higher chance of filling, and filling faster. Less aggressive means the opposite. No order escapes that trade-off.",
    "type": "animation",
    "group": "aggressiveness",
    "step": 6
  },
  {
    "id": 42,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "ICEBERG ORDERS",
      "content": "Some orders don't\nshow their true size.\n"
    },
    "text": "There's one more twist a resting order can play: it doesn't have to show its true size at all.",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "animation_step",
      "group": "iceberg",
      "anim_step": 1
    },
    "text": "Here's a resting sell order: 300 shares at $100.02. From outside, on the public feed, it looks like an entirely ordinary limit order.",
    "type": "animation",
    "group": "iceberg",
    "step": 1
  },
  {
    "id": 44,
    "visual": {
      "kind": "animation_step",
      "group": "iceberg",
      "anim_step": 2
    },
    "text": "But it's an iceberg order — only 300 shares are displayed. Another 400 shares rest at the very same price, invisible until they're actually touched.",
    "type": "animation",
    "group": "iceberg",
    "step": 2
  },
  {
    "id": 45,
    "visual": {
      "kind": "animation_step",
      "group": "iceberg",
      "anim_step": 3
    },
    "text": "An incoming buy order arrives for the full 700 shares. Displayed liquidity has priority, so the visible 300 shares fill first.",
    "type": "animation",
    "group": "iceberg",
    "step": 3
  },
  {
    "id": 46,
    "visual": {
      "kind": "animation_step",
      "group": "iceberg",
      "anim_step": 4
    },
    "text": "Only once that display is exhausted does the incoming order reach the hidden 400 — filled in turn, and revealed only now.",
    "type": "animation",
    "group": "iceberg",
    "step": 4
  },
  {
    "id": 47,
    "visual": {
      "kind": "animation_step",
      "group": "iceberg",
      "anim_step": 5
    },
    "text": "The trade-off: hiding your size protects you from signaling a large order to the rest of the market — but it costs you display priority, and on many venues, a lower maker rebate too. Protection isn't free.",
    "type": "animation",
    "group": "iceberg",
    "step": 5
  },
  {
    "id": 48,
    "visual": {
      "kind": "checklist_step",
      "kicker": "AGGRESSIVENESS & ICEBERGS",
      "items": [
        "More aggressive pricing → higher fill rate, faster fill, worse price. A clean, monotonic trade-off.",
        "Iceberg orders trade information protection for display priority — and often a lower rebate."
      ],
      "step": 1
    },
    "text": "More aggressive pricing means a higher fill rate and a faster fill — at the cost of a worse price.",
    "type": "slide"
  },
  {
    "id": 49,
    "visual": {
      "kind": "checklist_step",
      "kicker": "AGGRESSIVENESS & ICEBERGS",
      "items": [
        "More aggressive pricing → higher fill rate, faster fill, worse price. A clean, monotonic trade-off.",
        "Iceberg orders trade information protection for display priority — and often a lower rebate."
      ],
      "step": 2
    },
    "text": "And an iceberg order trades that same certainty away for something else: it protects your size from the rest of the market, at the cost of priority — and often, a lower rebate.",
    "type": "slide"
  },
  {
    "id": 50,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TIMING RISK",
      "content": "What if the order\nnever fills at all?\n"
    },
    "text": "The aggressiveness spectrum has a blind spot: it tells you fill rate goes down as you get less aggressive — but it doesn't say what happens if it simply never fills.",
    "type": "slide"
  },
  {
    "id": 51,
    "visual": {
      "kind": "animation_step",
      "group": "opportunity_cost",
      "anim_step": 1
    },
    "text": "Here's a passive buy limit for 300 shares, priced well behind the best bid: $99.90, while the arrival mid is $100.00. No trade yet — just an order waiting its turn, priced for patience.",
    "type": "animation",
    "group": "opportunity_cost",
    "step": 1
  },
  {
    "id": 52,
    "visual": {
      "kind": "animation_step",
      "group": "opportunity_cost",
      "anim_step": 2
    },
    "text": "Eight seconds in, someone crosses down and hits it — but only partially. 100 of the 300 shares fill, right at $99.90. Then the market drifts upward and away; the remaining 200 shares never get another chance.",
    "type": "animation",
    "group": "opportunity_cost",
    "step": 2
  },
  {
    "id": 53,
    "visual": {
      "kind": "animation_step",
      "group": "opportunity_cost",
      "anim_step": 3
    },
    "text": "At the end of the window, give up on those 200 shares and cancel them — no trade ever happens for that part. To measure the cost anyway, mark them on paper at the prevailing mid, $100.05. Not a real trade — just the benchmark for what giving up actually cost.",
    "type": "animation",
    "group": "opportunity_cost",
    "step": 3
  },
  {
    "id": 54,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "IMPLEMENTATION SHORTFALL",
      "content": "Execution cost, plus\nopportunity cost.\n"
    },
    "text": "Now add the two together. On the 100 shares that filled: ten cents better than arrival, favorable. On the 200 that didn't, marked to market: ten cents worse, unfavorable. Combined, they nearly cancel — the honest total cost of this order was close to zero, even though the filled portion alone looked like a clear win. That's exactly why Implementation Shortfall counts both: looking only at fills would have told the wrong story. The real, measured version of it is next, on actual AAPL data.",
    "type": "slide"
  },
  {
    "id": 55,
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
    "id": 56,
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
    "id": 57,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Replay the tape.\nSee what would have happened.\n"
    },
    "text": "The core idea behind a backtest: replay the historical tape event by event, and see how a hypothetical order would have been filled against the book exactly as it actually was that day. Take a real moment from that book, and everything that happened right after it.",
    "type": "slide"
  },
  {
    "id": 58,
    "visual": {
      "kind": "animation_step",
      "group": "tape_replay",
      "anim_step": 1
    },
    "text": "Here's a real moment: 12:28:15. The best bid is $582.89. The best ask is $582.98, with 300 shares resting — and another 150 waiting one tick higher, at $583.00.",
    "type": "animation",
    "group": "tape_replay",
    "step": 1
  },
  {
    "id": 59,
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
    "id": 60,
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
    "id": 61,
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
    "id": 62,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not every aggressive order\nis equally hard to backtest.\n"
    },
    "text": "There's a nuance worth separating out, though: not every aggressive order is equally hard to backtest.",
    "type": "slide"
  },
  {
    "id": 63,
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
    "id": 64,
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
    "id": 65,
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
    "id": 66,
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
    "id": 67,
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
    "id": 68,
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
    "id": 69,
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
    "id": 70,
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
    "id": 71,
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
    "id": 72,
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
    "id": 73,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "36.3% of trades.\n36.7% of volume. Hidden.\n"
    },
    "text": "In this slice, 36.3% of trades — 36.7% of volume — trade against hidden liquidity. A backtest reading only the displayed book is blind to more than a third of what actually happened.",
    "type": "slide"
  },
  {
    "id": 74,
    "visual": {
      "kind": "text_slide",
      "style": "hidden-liquidity-compare",
      "kicker": "HIDDEN LIQUIDITY, QUANTIFIED"
    },
    "text": "Rematch every hidden trade against the displayed book only, and average effective spread rises from just over ten cents to just over thirteen — thirty point six percent higher. VWAP, by contrast, barely moves at all: it pools buy- and sell-side improvement together, so they largely cancel out. Same underlying effect, two very differently sensitive metrics — exactly why one number never tells the whole story.",
    "type": "slide"
  },
  {
    "id": 75,
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
    "id": 76,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Next: real strategies,\nput to the test.\n"
    },
    "text": "With both caveats honestly on the table, it's still the right tool for the job. Next: putting real execution strategies to exactly this test.",
    "type": "slide"
  },
  {
    "id": 77,
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
    "id": 78,
    "visual": {
      "kind": "animation_step",
      "group": "vwap_strategy",
      "anim_step": 1
    },
    "text": "Here's a real nineteen-second window: AAPL, 12:23:02 to 12:23:21. Split it into three chunks — and here's what the market actually did in each one: 100 shares in the first eight seconds, 168 in the next eight, 468 in the last three and a half.",
    "type": "animation",
    "group": "vwap_strategy",
    "step": 1
  },
  {
    "id": 79,
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
    "id": 80,
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
    "id": 81,
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
    "id": 82,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The goal isn't the best price.\nIt's blending in.\n"
    },
    "text": "That's the whole idea of a VWAP algorithm: not to get the best price, but to blend in — to end up close to the same average everyone else got, measured with the exact same VWAP benchmark from earlier in this video.",
    "type": "slide"
  },
  {
    "id": 83,
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
    "id": 84,
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
    "id": 85,
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
    "id": 86,
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
    "id": 87,
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
    "id": 88,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Simpler to build.\nWorse fit to reality.\n"
    },
    "text": "That's the whole trade-off between the two: TWAP is simpler — no volume forecast required — but it pays for that simplicity with a worse fit to what the market actually did, especially whenever volume is genuinely uneven.",
    "type": "slide"
  },
  {
    "id": 89,
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
    "id": 90,
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
    "id": 91,
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
    "id": 92,
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
    "id": 93,
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
    "id": 94,
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
    "id": 95,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Bias for direction.\nTracking error for consistency.\n"
    },
    "text": "That's the real answer: don't judge an execution algorithm from one trade. Compute the delta series across many, then report both — bias for direction, tracking error for consistency.",
    "type": "slide"
  },
  {
    "id": 96,
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
    "id": 97,
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
    "id": 98,
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
    "id": 99,
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
    "id": 100,
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
    "id": 101,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Fixed finish, approximate price.\nOr exact price, open finish.\n"
    },
    "text": "That's the real trade-off between VWAP and POV: VWAP tells you your price will be close and your finish time is fixed. POV tells you your price will be almost exact — but your finish time depends entirely on a market that might not show up.",
    "type": "slide"
  },
  {
    "id": 102,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "IMPLEMENTATION SHORTFALL",
      "content": "Minimize cost and risk together —\ndon't track a benchmark.\n"
    },
    "text": "Implementation Shortfall algorithms — the Almgren-Chriss framework — don't try to track a benchmark like VWAP. They explicitly minimize a cost function: execution cost, which grows the faster and more aggressively you trade, plus timing risk, the cost of the price drifting away while you wait.",
    "type": "slide"
  },
  {
    "id": 103,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The real version of that trade-off,\nsame aggressiveness spectrum.\n"
    },
    "text": "We already built this trade-off once, on the invented book: execution cost when an order fills, opportunity cost when it doesn't, nearly canceling out. Here's the real, measured version — broken down by the exact same five-tier aggressiveness spectrum from earlier in this video.",
    "type": "slide"
  },
  {
    "id": 104,
    "visual": {
      "kind": "text_slide",
      "style": "is-by-aggressiveness",
      "kicker": "REAL DATA, SAME SPECTRUM"
    },
    "text": "Here's the real breakdown, filled and unfilled orders both counted, five minutes after each order arrived: fill rate, execution cost on what filled, opportunity cost on what didn't, and the total per intended share.",
    "type": "slide"
  },
  {
    "id": 105,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not a clean curve.\nThe most passive tier wins here.\n"
    },
    "text": "Notice what doesn't happen: this isn't a clean curve. Tier five — behind the best price, filled only 2.8% of the time — actually has the lowest total shortfall here, lower even than the most aggressive tier shown. Real trade-offs are messier than the tidy theoretical curve.",
    "type": "slide"
  },
  {
    "id": 106,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Solve for a trajectory.\nDon't commit to a fixed tier.\n"
    },
    "text": "That's exactly why Almgren-Chriss doesn't commit to one fixed aggressiveness tier. It solves for a trading trajectory — how fast to go, moment to moment — that minimizes expected cost plus a risk penalty, recalibrated for the stock and the day, because the real trade-off actually moves around like this.",
    "type": "slide"
  },
  {
    "id": 107,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "THE EFFICIENT FRONTIER",
      "content": "Trade cost against risk,\ndirectly, on one curve.\n"
    },
    "text": "Here's the actual mechanism, stylized — not fitted to this data, just the shape of the idea. Almgren-Chriss trades expected cost directly against risk, on a single curve.",
    "type": "slide"
  },
  {
    "id": 108,
    "visual": {
      "kind": "animation_step",
      "group": "ac_frontier",
      "anim_step": 1
    },
    "text": "Every possible trading speed lands somewhere on this curve: expected execution cost on one axis, timing risk — the variance of that cost — on the other.",
    "type": "animation",
    "group": "ac_frontier",
    "step": 1
  },
  {
    "id": 109,
    "visual": {
      "kind": "animation_step",
      "group": "ac_frontier",
      "anim_step": 2
    },
    "text": "Trade fast, front-load everything, and you land up here: high expected cost, because you're paying for immediacy, but very little risk — barely any time for the price to drift against you.",
    "type": "animation",
    "group": "ac_frontier",
    "step": 2
  },
  {
    "id": 110,
    "visual": {
      "kind": "animation_step",
      "group": "ac_frontier",
      "anim_step": 3
    },
    "text": "Trade slow, spread it out, and you land down here instead: low expected cost, hardly any urgency premium — but now real risk, because you're exposed to the market for much longer.",
    "type": "animation",
    "group": "ac_frontier",
    "step": 3
  },
  {
    "id": 111,
    "visual": {
      "kind": "animation_step",
      "group": "ac_frontier",
      "anim_step": 4
    },
    "text": "Almgren-Chriss doesn't pick fast or slow by default — it picks a point on this curve based on lambda, how much risk you're willing to accept for a lower expected cost. High risk aversion pulls you toward fast; low risk aversion lets you drift slow.",
    "type": "animation",
    "group": "ac_frontier",
    "step": 4
  },
  {
    "id": 112,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not a fixed tier.\nA continuous choice, on this curve.\n"
    },
    "text": "That's the real mechanism behind the trajectory we mentioned earlier — not a fixed aggressiveness tier, but a continuous choice along exactly this curve, recalibrated for the stock, the day, and how much risk you're willing to carry.",
    "type": "slide"
  },
  {
    "id": 113,
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
    "id": 114,
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
    "id": 115,
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
    "id": 116,
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
    "id": 117,
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
    "id": 118,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "More reaction, tighter tracking —\nless certainty about the finish.\n"
    },
    "text": "Four strategies, one real window: TWAP, blind to volume, off by 0.83 cents. VWAP, guessing the shape in advance, off by 0.19. Adaptive, correcting when it falls behind, off by 0.14. POV, reacting to every print, off by essentially nothing. More reaction, tighter tracking — and less certainty about when you'll be done.",
    "type": "slide"
  },
  {
    "id": 119,
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
    "id": 120,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The fast end of the curve\nwe already drew.\n"
    },
    "text": "This isn't a new mechanism — it's a specific point on the curve we already drew. Arrival Price sits at the fast end of Almgren-Chriss: high expected cost, minimal timing risk, by design.",
    "type": "slide"
  },
  {
    "id": 121,
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
    "id": 122,
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
    "id": 123,
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
    "id": 124,
    "visual": {
      "kind": "text_slide",
      "style": "arrival-comparison",
      "kicker": "SAME BENCHMARK, ALL FIVE"
    },
    "text": "Here's the honest comparison: measure every strategy from this section against the same arrival mid, not the interval VWAP they were built to track. Arrival Price pays 9.83 cents, certain, immediately. The other four — VWAP, TWAP, POV, Adaptive — all come out roughly ten cents favorable, because the price happened to drift down over those nineteen seconds.",
    "type": "slide"
  },
  {
    "id": 125,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not proof patience wins.\nA known cost, to avoid guessing.\n"
    },
    "text": "That's not proof patience wins. The price could just as easily have drifted up, and every one of those four numbers would have flipped unfavorable. Arrival Price doesn't try to guess which way the market moves — it pays a known cost specifically to avoid needing to guess at all.",
    "type": "slide"
  },
  {
    "id": 126,
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
    "id": 127,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Every reprice sends you\nto the back of the queue.\n"
    },
    "text": "Here's the catch: to stay pegged to the touch, you have to reprice every time it moves. And every reprice sends you to the back of the queue at the new price — you lose exactly the priority that made staying there worthwhile in the first place.",
    "type": "slide"
  },
  {
    "id": 128,
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
    "id": 129,
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
    "id": 130,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "You don't know which regime\nyou'll get, in advance.\n"
    },
    "text": "You don't know in advance which of those two you'll get. That unpredictability — not just adverse selection, not just the rebate — is itself part of the real cost of staying continuously in the book. Sometimes the market holds still for you. Sometimes it doesn't, and every reprice starts you over.",
    "type": "slide"
  }
];
