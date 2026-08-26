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
    "text": "But there's more: every one of those orders also carries its own ID and timestamp. Take the order our sell trade actually hit — order #4890, a 150-share limit order resting at $99.98. It was submitted, and sat there until our incoming sell order matched it completely — that's the exact trade we saw earlier.",
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
    "text": "Was it top of book the whole time, though? No. For its first five seconds, ninety-nine ninety-nine was still the best bid — our order was one tick behind, not yet reachable. Only once that better-priced level cleared did ninety-nine ninety-eight become the best bid, and only then was it next in line to trade. Level 3 is what lets you reconstruct that entire sequence, order by order.",
    "type": "animation",
    "group": "order_lifecycle",
    "step": 2
  },
  {
    "id": 14,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "ICEBERG ORDERS",
      "content": "Even Level 3 doesn't\nshow everything.\n"
    },
    "text": "But even Level 3 doesn't always tell the whole story. Some orders don't show their true size at all.",
    "type": "slide"
  },
  {
    "id": 15,
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
    "id": 16,
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
    "id": 17,
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
    "id": 18,
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
    "id": 19,
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
    "id": 20,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Resting size is a quote.\nA trade is something else entirely.\n"
    },
    "text": "Notice we just saw both things at once: size resting in the book, and a trade consuming part of it. Let's make that distinction precise. Everything resting — every price and size sitting in the book — is quote data. A trade is something else entirely.",
    "type": "slide"
  },
  {
    "id": 21,
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
    "id": 22,
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
    "id": 23,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "ZOOMING OUT",
      "content": "One order is one line.\nThe book is many lines at once.\n"
    },
    "text": "One order's history is one line. But the whole book is many of these lines at once — let's zoom out and watch a few quotes over the same thirty seconds, one event at a time, left to right. We start with two resting quotes already in place: the best bid at ninety-nine ninety-nine, and the best ask at a hundred-oh-two.",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 1
    },
    "text": "First event: a new ask joins the book at a hundred-oh-three — deeper than the current best ask, so it doesn't change anything at the top.",
    "type": "animation",
    "group": "book_time",
    "step": 1
  },
  {
    "id": 25,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 2
    },
    "text": "Next: a new bid joins too, at ninety-nine ninety-eight. But ninety-nine ninety-nine is still better, so this one isn't top of book yet — it's just waiting its turn.",
    "type": "animation",
    "group": "book_time",
    "step": 2
  },
  {
    "id": 26,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 3
    },
    "text": "Now a quote vanishes with no trade at all: the hundred-oh-three ask is simply withdrawn. Canceled, not filled — no execution, no print, just gone.",
    "type": "animation",
    "group": "book_time",
    "step": 3
  },
  {
    "id": 27,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 4
    },
    "text": "Here's the first trade: a sell order hits the ninety-nine ninety-nine bid and consumes it completely. That level disappears — and the best bid steps down to ninety-nine ninety-eight, the only one left.",
    "type": "animation",
    "group": "book_time",
    "step": 4
  },
  {
    "id": 28,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 5
    },
    "text": "A better price arrives: a hundred-oh-one joins the ask side. It's cheaper than a hundred-oh-two, so it briefly becomes the new best ask.",
    "type": "animation",
    "group": "book_time",
    "step": 5
  },
  {
    "id": 29,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 6
    },
    "text": "That new level gets consumed too: a buy order fully fills the hundred-oh-one ask. With it gone, the best ask reverts to a hundred-oh-two.",
    "type": "animation",
    "group": "book_time",
    "step": 6
  },
  {
    "id": 30,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 7
    },
    "text": "One last event: a sell order only partially fills the ninety-nine ninety-eight bid this time. Size remains, so the quote keeps going, unbroken — and stays top of book right to the end.",
    "type": "animation",
    "group": "book_time",
    "step": 7
  },
  {
    "id": 31,
    "visual": {
      "kind": "animation_step",
      "group": "book_time",
      "anim_step": 8
    },
    "text": "Filled completely, filled partially, or simply canceled: three endings, one picture.",
    "type": "animation",
    "group": "book_time",
    "step": 8
  },
  {
    "id": 32,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "So the trade happened.\nBut was $99.98 a good price?\n"
    },
    "text": "So the trade happened. But was ninety-nine ninety-eight actually a good price? Answering that needs a benchmark — and different benchmarks give different answers.",
    "type": "slide"
  },
  {
    "id": 33,
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
    "id": 34,
    "visual": {
      "kind": "animation_step",
      "group": "exec_quality_time",
      "anim_step": 2
    },
    "text": "Sixteen seconds pass before it fills. In between, a sell consumes the ninety-nine ninety-nine bid, and a brief hundred-oh-one ask comes and goes. By the time it's about to trade, mid has drifted down to a hundred dollars even.",
    "type": "animation",
    "group": "exec_quality_time",
    "step": 2
  },
  {
    "id": 35,
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
    "id": 36,
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
    "id": 37,
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
    "id": 38,
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
    "id": 39,
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
    "id": 40,
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
    "id": 41,
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
    "id": 42,
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
    "id": 43,
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
    "id": 44,
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
    "id": 45,
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
    "id": 46,
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
    "id": 47,
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
    "id": 48,
    "visual": {
      "kind": "animation_step",
      "group": "impact_schedule",
      "anim_step": 1
    },
    "text": "Here's what paying for immediacy actually looks like. Send 1,000 shares as a single market order, right now, and it sweeps straight through the book: 300 shares at a hundred-oh-two, 400 more at a hundred-oh-five, and 300 at a hundred-ten — a blended price of a hundred-oh-six.",
    "type": "animation",
    "group": "impact_schedule",
    "step": 1
  },
  {
    "id": 49,
    "visual": {
      "kind": "animation_step",
      "group": "impact_schedule",
      "anim_step": 2
    },
    "text": "Now split that same 1,000 shares into five smaller orders, spread across thirty seconds instead. Each one only touches the top of the book — a hundred-oh-two — because the level has time to refill before the next order arrives.",
    "type": "animation",
    "group": "impact_schedule",
    "step": 2
  },
  {
    "id": 50,
    "visual": {
      "kind": "animation_step",
      "group": "impact_schedule",
      "anim_step": 3
    },
    "text": "Same 1,000 shares, same book. A hundred-oh-six a share, right now — or a hundred-oh-two a share, spread over thirty seconds. The only thing that changed is how much time you were willing to spend.",
    "type": "animation",
    "group": "impact_schedule",
    "step": 3
  },
  {
    "id": 51,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "COST VS. RISK",
      "content": "There's more than one way\nto trade patiently.\n"
    },
    "text": "That's the idea behind splitting an order, too — not just pricing a single order less aggressively, but spreading it into many smaller ones over time, the way real execution algorithms do. Both trade the same two things against each other: execution cost, and timing risk.",
    "type": "slide"
  },
  {
    "id": 52,
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
    "id": 53,
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
    "id": 54,
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
    "id": 55,
    "visual": {
      "kind": "animation_step",
      "group": "ac_frontier",
      "anim_step": 4
    },
    "text": "Execution algorithms don't pick fast or slow by default — they pick a point on this curve based on how much risk you're willing to accept for a lower expected cost. High risk aversion pulls you toward fast; low risk aversion lets you drift slow.",
    "type": "animation",
    "group": "ac_frontier",
    "step": 4
  },
  {
    "id": 56,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TIMING RISK",
      "content": "What if the order\nnever fills at all?\n"
    },
    "text": "Both mechanisms — how aggressively you price one order, and how you spread many orders over time — are really just dials on this same curve. Wait longer, either way, and you trade execution cost for timing risk. Push that trade-off far enough, though, and a new question appears: what if you wait so long the order simply never fills at all?",
    "type": "slide"
  },
  {
    "id": 57,
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
    "id": 58,
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
    "id": 59,
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
    "id": 60,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "IMPLEMENTATION SHORTFALL",
      "content": "Execution cost, plus\nopportunity cost.\n"
    },
    "text": "Now add the two together. On the 100 shares that filled: ten cents better than arrival, favorable. On the 200 that didn't, marked to market: ten cents worse, unfavorable. Combined, they nearly cancel — the honest total cost of this order was close to zero, even though the filled portion alone looked like a clear win. That's exactly why Implementation Shortfall counts both: looking only at fills would have told the wrong story. In part two, we'll measure it for real, on actual AAPL data — and start testing execution strategies against it.",
    "type": "slide"
  }
];
