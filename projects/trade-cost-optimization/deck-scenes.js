const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Every trade\ncosts something."
    },
    "text": "Rebalancing a portfolio isn't free. Every trade you make costs something.",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Chase every signal exactly,\nand you trade yourself into the ground."
    },
    "text": "So if your strategy hands you a brand new target every single day, and you just chase it exactly — you'll trade yourself into the ground.",
    "type": "slide"
  },
  {
    "id": 6,
    "visual": {
      "kind": "text_slide",
      "style": "portfolio-bars"
    },
    "text": "Here's what that actually looks like. A current portfolio. An ideal target. And the gap between them, asset by asset — some need buying, some need selling.",
    "type": "slide"
  },
  {
    "id": 62,
    "visual": {
      "kind": "animation_step",
      "group": "abs_distance",
      "anim_step": 1
    },
    "text": "But \"the gap\" isn't one number yet. It's six separate deviations — some positive, some negative.",
    "type": "animation",
    "group": "abs_distance",
    "step": 1
  },
  {
    "id": 63,
    "visual": {
      "kind": "animation_step",
      "group": "abs_distance",
      "anim_step": 2
    },
    "text": "Distance doesn't care about direction. Flip the negative ones positive, and every deviation becomes a magnitude.",
    "type": "animation",
    "group": "abs_distance",
    "step": 2
  },
  {
    "id": 64,
    "visual": {
      "kind": "animation_step",
      "group": "abs_distance",
      "anim_step": 3
    },
    "text": "Add the magnitudes together, and that single sum is how \"distance\" between two portfolios actually gets measured.",
    "type": "animation",
    "group": "abs_distance",
    "step": 3
  },
  {
    "id": 3,
    "visual": {
      "kind": "text_slide",
      "style": "portfolio-flow"
    },
    "text": "The real question isn't just: what's the ideal portfolio. It's: given where I already am, how close do I actually need to get — and at what cost?",
    "type": "slide"
  },
  {
    "id": 4,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE SETUP",
      "latex": "\\begin{array}{cl}\nx_0 & \\text{current portfolio} \\\\[.5em]\n\\tilde{x} & \\text{ideal target — already given} \\\\[.5em]\nx & \\text{what we solve for}\n\\end{array}"
    },
    "text": "Three quantities. Where you currently are. The ideal target some other strategy already computed for you. And the portfolio you actually solve for — the one you actually trade to.",
    "type": "slide"
  },
  {
    "id": 5,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE OBJECTIVE",
      "latex": "\\begin{aligned}\n\\min_x \\quad & \\text{cost}(x - x_0) \\\\[.6em]\n\\text{s.t.} \\quad & \\lVert x - \\tilde{x} \\rVert \\le \\gamma\n\\end{aligned}"
    },
    "text": "So here's the actual problem, in one line. Minimize the cost of trading away from where you are — subject to landing close enough to the ideal target.",
    "type": "slide"
  },
  {
    "id": 7,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TRICK 1 · SPLIT THE ABSOLUTE VALUE",
      "content": "Costs depend on\n|x − current|."
    },
    "text": "Trick one: splitting absolute values. Trading costs depend on how far you move each asset — the absolute difference between where it is now and where it ends up.",
    "type": "slide"
  },
  {
    "id": 8,
    "visual": {
      "kind": "text_slide",
      "style": "kink-demo",
      "kicker": "THE PROBLEM",
      "latex": "\\text{cost} \\propto |x_i - x_{0,i}|"
    },
    "text": "An absolute value has a kink in it. Trade in one direction, cost rises. Trade in the other direction — cost rises just the same. A solver that only understands straight lines can't touch that directly.",
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "animation_step",
      "group": "split",
      "anim_step": 1
    },
    "text": "Here's the fix. Instead of one variable that can be positive or negative, use two — a buy amount and a sell amount, both required to be zero or positive.",
    "type": "animation",
    "group": "split",
    "step": 1
  },
  {
    "id": 10,
    "visual": {
      "kind": "animation_step",
      "group": "split",
      "anim_step": 2
    },
    "text": "On their own, these two numbers don't pin anything down. You could buy way more than you need, then sell some straight back — wasteful, but it still nets out to the right place.",
    "type": "animation",
    "group": "split",
    "step": 2
  },
  {
    "id": 101,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE TEXTBOOK FIX",
      "latex": "\\begin{aligned}\n& x_i^+ \\le M \\cdot b_i \\\\\n& x_i^- \\le M \\cdot (1-b_i) \\\\[.6em]\n& b_i \\in \\{0,1\\}\n\\end{aligned}"
    },
    "text": "The textbook fix for that is another binary — one more zero-or-one switch per asset, this time picking buy-mode or sell-mode, tied in with a big constant.",
    "type": "slide"
  },
  {
    "id": 11,
    "visual": {
      "kind": "animation_step",
      "group": "split",
      "anim_step": 3
    },
    "text": "But minimizing cost quietly does the rest of the work for you. Buying and selling the same asset in the same step only burns money — a cost-minimizing solver simply never does it, without you having to say so explicitly.",
    "type": "animation",
    "group": "split",
    "step": 3
  },
  {
    "id": 12,
    "visual": {
      "kind": "animation_step",
      "group": "split",
      "anim_step": 4
    },
    "text": "So the distance collapses to exactly the sum of the two — buy plus sell — and that sum is a perfectly straight, linear expression.",
    "type": "animation",
    "group": "split",
    "step": 4
  },
  {
    "id": 13,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "RESULT",
      "latex": "|x_i - x_{0,i}| = x_i^+ + x_i^-",
      "note": "linear — a plain solver can handle this"
    },
    "text": "One clean identity, and the kink is gone.",
    "type": "slide"
  },
  {
    "id": 14,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TRICK 2 · FIXED COSTS",
      "content": "Variable cost is easy now.\nFixed cost is not."
    },
    "text": "Trick two: fixed costs. Variable cost — cost proportional to how much you trade — is easy now, it's just that same buy-plus-sell sum, scaled.",
    "type": "slide"
  },
  {
    "id": 15,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE PROBLEM",
      "latex": "\\text{fixed cost} \\propto \\mathbb{1}\\{\\text{asset } i \\text{ traded}\\}",
      "note": "a yes/no switch — still not linear"
    },
    "text": "A fixed cost per trade needs a different kind of function — one that only asks a yes-or-no question. Did this asset get touched at all, or not? And a yes-or-no question isn't linear either.",
    "type": "slide"
  },
  {
    "id": 16,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "THE TRICK",
      "latex": "\\begin{aligned}\n& x_i^+ + x_i^- \\le z_i \\cdot \\alpha_1 \\\\[.8em]\n& z_i = 0 \\implies \\text{no trade at all} \\\\[.3em]\n& z_i = 1 \\implies \\text{free to trade, up to } \\alpha_1 \\\\[1em]\n& \\text{for } \\alpha_1 = 0.5 \\text{:}\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\text{clean, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.3,\\ 0.1,\\ 1) \\quad \\text{feasible, but wasteful}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0.2,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{net } 0 \\text{ despite } z_i = 1"
      ],
      "note": "A genuine contradiction — zᵢ = 1 with no real trade. Enforcing xᵢ⁺ · xᵢ⁻ = 0 would rule this out directly.",
      "step": 0
    },
    "text": "The fix is a binary switch per asset — zero or one — tied to the trade size by a single upper bound. Buy plus sell can't exceed the switch times alpha-one. Set the switch to zero, and no trade is possible at all. Set it to one, and you're free to trade anything up to alpha-one. Let's fix alpha-one at 0.5, and see what that actually permits.",
    "type": "slide"
  },
  {
    "id": 162,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "THE TRICK",
      "latex": "\\begin{aligned}\n& x_i^+ + x_i^- \\le z_i \\cdot \\alpha_1 \\\\[.8em]\n& z_i = 0 \\implies \\text{no trade at all} \\\\[.3em]\n& z_i = 1 \\implies \\text{free to trade, up to } \\alpha_1 \\\\[1em]\n& \\text{for } \\alpha_1 = 0.5 \\text{:}\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\text{clean, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.3,\\ 0.1,\\ 1) \\quad \\text{feasible, but wasteful}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0.2,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{net } 0 \\text{ despite } z_i = 1"
      ],
      "note": "A genuine contradiction — zᵢ = 1 with no real trade. Enforcing xᵢ⁺ · xᵢ⁻ = 0 would rule this out directly.",
      "step": 1
    },
    "text": "With the switch off, there's only one option — no trade at all.",
    "type": "slide"
  },
  {
    "id": 163,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "THE TRICK",
      "latex": "\\begin{aligned}\n& x_i^+ + x_i^- \\le z_i \\cdot \\alpha_1 \\\\[.8em]\n& z_i = 0 \\implies \\text{no trade at all} \\\\[.3em]\n& z_i = 1 \\implies \\text{free to trade, up to } \\alpha_1 \\\\[1em]\n& \\text{for } \\alpha_1 = 0.5 \\text{:}\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\text{clean, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.3,\\ 0.1,\\ 1) \\quad \\text{feasible, but wasteful}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0.2,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{net } 0 \\text{ despite } z_i = 1"
      ],
      "note": "A genuine contradiction — zᵢ = 1 with no real trade. Enforcing xᵢ⁺ · xᵢ⁻ = 0 would rule this out directly.",
      "step": 2
    },
    "text": "Turn the switch on, and a clean trade of 0.2 fits easily under the 0.5 cap.",
    "type": "slide"
  },
  {
    "id": 164,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "THE TRICK",
      "latex": "\\begin{aligned}\n& x_i^+ + x_i^- \\le z_i \\cdot \\alpha_1 \\\\[.8em]\n& z_i = 0 \\implies \\text{no trade at all} \\\\[.3em]\n& z_i = 1 \\implies \\text{free to trade, up to } \\alpha_1 \\\\[1em]\n& \\text{for } \\alpha_1 = 0.5 \\text{:}\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\text{clean, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.3,\\ 0.1,\\ 1) \\quad \\text{feasible, but wasteful}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0.2,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{net } 0 \\text{ despite } z_i = 1"
      ],
      "note": "A genuine contradiction — zᵢ = 1 with no real trade. Enforcing xᵢ⁺ · xᵢ⁻ = 0 would rule this out directly.",
      "step": 3
    },
    "text": "But so does this — buying 0.3 and selling 0.1. Same net result, more gross volume, still perfectly feasible under the constraint.",
    "type": "slide"
  },
  {
    "id": 165,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "THE TRICK",
      "latex": "\\begin{aligned}\n& x_i^+ + x_i^- \\le z_i \\cdot \\alpha_1 \\\\[.8em]\n& z_i = 0 \\implies \\text{no trade at all} \\\\[.3em]\n& z_i = 1 \\implies \\text{free to trade, up to } \\alpha_1 \\\\[1em]\n& \\text{for } \\alpha_1 = 0.5 \\text{:}\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\text{clean, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.3,\\ 0.1,\\ 1) \\quad \\text{feasible, but wasteful}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0.2,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{net } 0 \\text{ despite } z_i = 1"
      ],
      "note": "A genuine contradiction — zᵢ = 1 with no real trade. Enforcing xᵢ⁺ · xᵢ⁻ = 0 would rule this out directly.",
      "step": 4
    },
    "text": "There's a subtler catch, though. This one — buy 0.2, sell 0.2 — is feasible too. The gross sum is 0.4, safely under the 0.5 cap. But net it out, and the trade is exactly zero — zᵢ says a trade happened, but nothing actually did. That's a genuine contradiction, and cost-minimization is the only thing ruling it out — nothing in the constraint itself forbids it. Left unaddressed, that's a real problem — you'd want to guarantee xᵢ⁺ times xᵢ⁻ equals zero — that at most one of the two is ever positive — to rule this out directly, instead of leaving it entirely to the objective.",
    "type": "slide"
  },
  {
    "id": 17,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "WHY BOTHER",
      "content": "No trade too small\nto actually matter."
    },
    "text": "So what's the actual benefit? Without a minimum, a solver might place a trade so small it's basically noise — a sliver of a position that barely registers. Enforce a floor, and every trade it makes is big enough to matter. That's especially useful if you can't deal in fractional units of a position to begin with.",
    "type": "slide"
  },
  {
    "id": 161,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "ONE STEP FURTHER",
      "latex": "\\alpha_0 \\cdot z_i \\le x_i^+ + x_i^- \\le \\alpha_1 \\cdot z_i"
    },
    "text": "One more bound, and that same switch does double duty. Add a lower bound too, tied to the same zᵢ.",
    "type": "slide"
  },
  {
    "id": 166,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "ONE STEP FURTHER",
      "latex": "\\begin{aligned}\n& \\alpha_0 \\cdot {\\color{#a97423}0} \\;\\le\\; x_i^+ + x_i^- \\;\\le\\; \\alpha_1 \\cdot {\\color{#a97423}0} \\\\[.8em]\n& \\implies\\quad x_i^+ = x_i^- = 0\n\\end{aligned}"
    },
    "text": "Set zᵢ to zero, and both bounds collapse to zero. Since xᵢ⁺ and xᵢ⁻ are both required to stay non-negative, the only way their sum can be zero is if each one is zero on its own.",
    "type": "slide"
  },
  {
    "id": 167,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "ONE STEP FURTHER",
      "latex": "\\begin{aligned}\n& {\\color{#a97423}0.1} \\cdot {\\color{#a97423}1} \\;\\le\\; x_i^+ + x_i^- \\;\\le\\; {\\color{#a97423}1} \\cdot {\\color{#a97423}1} \\\\[.8em]\n& \\implies\\quad 0.1 \\le x_i^+ + x_i^- \\le 1\n\\end{aligned}"
    },
    "text": "Set zᵢ to one — say alpha-zero equals 0.1, alpha-one equals 1 — and the sum has to land strictly between the two, at least 0.1 and at most 1.",
    "type": "slide"
  },
  {
    "id": 168,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "ONE STEP FURTHER",
      "latex": "\\begin{aligned}\n& \\text{for } \\alpha_0 = 0.1,\\ \\alpha_1 = 1 \\text{:} \\\\[.3em]\n& 0.1 \\le x_i^+ + x_i^- \\le 1\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\checkmark \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{valid, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.05,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{sum} < \\alpha_0 \\text{ — infeasible}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.15,\\ 0.1,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{sum ok — net only } 0.05"
      ],
      "note": "That last one is feasible on paper — but nets out to less than the minimum you meant to enforce. More on that shortly.",
      "step": 0
    },
    "text": "Let's see what that actually allows.",
    "type": "slide"
  },
  {
    "id": 169,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "ONE STEP FURTHER",
      "latex": "\\begin{aligned}\n& \\text{for } \\alpha_0 = 0.1,\\ \\alpha_1 = 1 \\text{:} \\\\[.3em]\n& 0.1 \\le x_i^+ + x_i^- \\le 1\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\checkmark \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{valid, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.05,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{sum} < \\alpha_0 \\text{ — infeasible}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.15,\\ 0.1,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{sum ok — net only } 0.05"
      ],
      "note": "That last one is feasible on paper — but nets out to less than the minimum you meant to enforce. More on that shortly.",
      "step": 1
    },
    "text": "With the switch off, no trade at all still checks out.",
    "type": "slide"
  },
  {
    "id": 170,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "ONE STEP FURTHER",
      "latex": "\\begin{aligned}\n& \\text{for } \\alpha_0 = 0.1,\\ \\alpha_1 = 1 \\text{:} \\\\[.3em]\n& 0.1 \\le x_i^+ + x_i^- \\le 1\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\checkmark \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{valid, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.05,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{sum} < \\alpha_0 \\text{ — infeasible}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.15,\\ 0.1,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{sum ok — net only } 0.05"
      ],
      "note": "That last one is feasible on paper — but nets out to less than the minimum you meant to enforce. More on that shortly.",
      "step": 2
    },
    "text": "Switch it on, and a net trade of 0.2 is comfortably valid.",
    "type": "slide"
  },
  {
    "id": 172,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "ONE STEP FURTHER",
      "latex": "\\begin{aligned}\n& \\text{for } \\alpha_0 = 0.1,\\ \\alpha_1 = 1 \\text{:} \\\\[.3em]\n& 0.1 \\le x_i^+ + x_i^- \\le 1\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\checkmark \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{valid, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.05,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{sum} < \\alpha_0 \\text{ — infeasible}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.15,\\ 0.1,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{sum ok — net only } 0.05"
      ],
      "note": "That last one is feasible on paper — but nets out to less than the minimum you meant to enforce. More on that shortly.",
      "step": 3
    },
    "text": "But 0.05 isn't enough anymore — it falls under the 0.1 floor, so this one's flatly infeasible.",
    "type": "slide"
  },
  {
    "id": 173,
    "visual": {
      "kind": "formula_reveal_step",
      "kicker": "ONE STEP FURTHER",
      "latex": "\\begin{aligned}\n& \\text{for } \\alpha_0 = 0.1,\\ \\alpha_1 = 1 \\text{:} \\\\[.3em]\n& 0.1 \\le x_i^+ + x_i^- \\le 1\n\\end{aligned}",
      "examples": [
        "(x_i^+,\\ x_i^-,\\ z_i) = (0,\\ 0,\\ 0) \\quad \\checkmark \\quad \\text{no trade}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.2,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{valid, net } 0.2",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.05,\\ 0,\\ 1) \\quad \\checkmark \\quad \\text{sum} < \\alpha_0 \\text{ — infeasible}",
        "(x_i^+,\\ x_i^-,\\ z_i) = (0.15,\\ 0.1,\\ 1) \\quad {\\color{#b3532e}\\times} \\quad \\text{sum ok — net only } 0.05"
      ],
      "note": "That last one nets out to less than the minimum you meant to enforce — and cost-minimization won't fix it, since the floor bounds the gross sum, not the net.",
      "step": 4
    },
    "text": "And here's the problem case. Buy 0.15, sell 0.1 — the sum is 0.25, comfortably clears the 0.1 floor, so it's technically feasible. But net it out, and you've only actually traded 0.05 — less than the minimum you meant to enforce. And unlike trick one, cost-minimization doesn't save us here — the floor is on the gross sum, not the net, so even the cheapest trade that clears it can still net out below α₀.",
    "type": "slide"
  },
  {
    "id": 18,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE FULL PROBLEM",
      "latex": "\\begin{aligned}\n\\min \\quad & c_{fix} \\cdot \\sum_i z_i \\;+\\; c_{var} \\cdot \\sum_i (x_i^+ + x_i^-) \\\\[.6em]\n\\text{s.t.} \\quad & x = x_0 + x^+ - x^- \\\\\n& \\tilde{x} - x = d^+ - d^- \\\\\n& \\tfrac{1}{2}\\sum_i (d_i^+ + d_i^-) \\le \\gamma \\\\\n& z \\in \\{0,1\\}\n\\end{aligned}"
    },
    "text": "Put it all together, and every piece of this — fixed cost, variable cost, and how far you're allowed to drift from the ideal target — is now a straight line or a switch.",
    "type": "slide"
  },
  {
    "id": 19,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "RESULT",
      "content": "A Mixed Integer\nLinear Program."
    },
    "text": "A mixed integer linear program. A solver can chew through this directly — no special tricks needed to actually solve it, only to write it down.",
    "type": "slide"
  },
  {
    "id": 20,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TRICK 3 · TRACKING ERROR",
      "content": "Turnover treats every asset\nthe same."
    },
    "text": "Trick three: accounting for correlation. That distance-to-target constraint from before — turnover — treats every asset the same, no matter how they move together.",
    "type": "slide"
  },
  {
    "id": 21,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Two correlated assets\noffset each other's risk.\nTurnover can't see that."
    },
    "text": "Deviate on two assets that almost always move together, and the risk mostly cancels out. Turnover doesn't know that — it just adds up the raw distances and counts them equally either way.",
    "type": "slide"
  },
  {
    "id": 22,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE FIX",
      "latex": "\\begin{aligned}\n& \\mathit{TE}^2 = \\frac{(x-\\tilde{x})' \\Sigma (x-\\tilde{x})}{\\tilde{x}' \\Sigma \\tilde{x}} \\\\[.7em]\n& \\Sigma = \\text{the covariance matrix}\n\\end{aligned}"
    },
    "text": "A better distance measure uses the covariance matrix directly — the relative tracking error, weighted by how the assets actually co-move.",
    "type": "slide"
  },
  {
    "id": 23,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "RESULT",
      "content": "A Mixed Integer\nQuadratic Program."
    },
    "text": "But that expression is a genuinely quadratic form, not a straight line — and there's no clever split that turns it linear again.",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TRICK 4 · SLACK + CUTTING PLANES",
      "content": "Linear solvers are fast\nand everywhere.\nQuadratic solvers aren't."
    },
    "text": "Trick four: solving the quadratic — without a quadratic solver. Solvers for mixed integer linear problems are everywhere, fast, and heavily battle-tested. Solvers for the quadratic version are rarer, and usually slower.",
    "type": "slide"
  },
  {
    "id": 25,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE TRICK",
      "latex": "\\begin{aligned}\n\\min \\quad & s \\qquad \\text{instead of} \\qquad \\min \\; x'Qx \\\\\n\\text{s.t.} \\quad & x'Qx \\le s\n\\end{aligned}"
    },
    "text": "So instead of minimizing the quadratic term directly, introduce one new variable — a placeholder — and push the quadratic into a single constraint on that placeholder.",
    "type": "slide"
  },
  {
    "id": 26,
    "visual": {
      "kind": "animation_step",
      "group": "cutting_planes",
      "anim_step": 1
    },
    "text": "Here's the actual cost surface we're trying to approximate — genuinely curved, genuinely quadratic.",
    "type": "animation",
    "group": "cutting_planes",
    "step": 1
  },
  {
    "id": 27,
    "visual": {
      "kind": "animation_step",
      "group": "cutting_planes",
      "anim_step": 2
    },
    "text": "Because that curve is convex, any straight tangent line touching it at one point lies below it absolutely everywhere else. That's not a coincidence — it's what convexity means.",
    "type": "animation",
    "group": "cutting_planes",
    "step": 2
  },
  {
    "id": 28,
    "visual": {
      "kind": "animation_step",
      "group": "cutting_planes",
      "anim_step": 3
    },
    "text": "Solve with just this one tangent as your only constraint, and the solver can cheat — it can pick a point far from where the tangent touches, where the tangent badly underestimates the truth, and report a value that's too good.",
    "type": "animation",
    "group": "cutting_planes",
    "step": 3
  },
  {
    "id": 29,
    "visual": {
      "kind": "animation_step",
      "group": "cutting_planes",
      "anim_step": 4
    },
    "text": "So add a second tangent — exactly where the solver just tried to cheat. That closes the gap right there, and the combined pair hugs the true curve far more tightly.",
    "type": "animation",
    "group": "cutting_planes",
    "step": 4
  },
  {
    "id": 30,
    "visual": {
      "kind": "animation_step",
      "group": "cutting_planes",
      "anim_step": 5
    },
    "text": "Repeat a few more times, and the growing stack of straight tangent lines traces the curve almost exactly. A handful of easy linear problems, chained together, quietly solving one hard quadratic one.",
    "type": "animation",
    "group": "cutting_planes",
    "step": 5
  },
  {
    "id": 31,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "RESULT",
      "content": "One hard MIQP, solved as\na sequence of easy MILPs."
    },
    "text": "Not an approximation you settle for — a sequence that provably converges to the exact answer.",
    "type": "slide"
  },
  {
    "id": 32,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TRICK 5 · DIVERSIFICATION",
      "content": "Left alone, optimization\nconcentrates everything."
    },
    "text": "Trick five: diversification. Different problem now — not about trading costs at all, but about the ideal target itself. Left alone, mean-variance optimization loves to pile everything into just one or two assets.",
    "type": "slide"
  },
  {
    "id": 33,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE FIX",
      "latex": "\\begin{aligned}\n\\max \\quad & w'\\mu - \\varphi \\, w'\\Sigma w \\\\\n\\text{s.t.} \\quad & \\lVert w - w_{EW} \\rVert_2 \\le 1 - c_{min}\n\\end{aligned}"
    },
    "text": "The fix measures diversification as distance to the equal-weight portfolio — plain Euclidean distance — and caps how far the solution is allowed to stray from it.",
    "type": "slide"
  },
  {
    "id": 34,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "RESULT",
      "content": "Still convex.\nStill solvable directly."
    },
    "text": "That distance cap is nonlinear too — but it's still convex, and a convex constraint keeps the whole problem provably, efficiently solvable.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "animation_step",
      "group": "diversification",
      "anim_step": 1
    },
    "text": "One single dial does the work. Push it one way, and you get plain, fully concentrated Markowitz.",
    "type": "animation",
    "group": "diversification",
    "step": 1
  },
  {
    "id": 43,
    "visual": {
      "kind": "animation_step",
      "group": "diversification",
      "anim_step": 2
    },
    "text": "Push it all the way the other, and you land exactly on the equal-weight portfolio — where guessing the returns wrong stops mattering at all.",
    "type": "animation",
    "group": "diversification",
    "step": 2
  },
  {
    "id": 36,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "TRICK 6 · COMBINE COST AND RISK",
      "content": "Trade cheaply — without\nstraying too far from target."
    },
    "text": "Trick six: combining cost and risk. Take a finished target portfolio, and realize it as cheaply as possible — without straying too far from the risk profile you actually wanted.",
    "type": "slide"
  },
  {
    "id": 37,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "THE COMBINATION",
      "latex": "\\begin{aligned}\n\\min \\quad & \\tfrac12 \\sum_i c_i |w_i - w_{0,i}| \\\\\n\\text{s.t.} \\quad & \\text{tracking error} \\le \\text{cap}\n\\end{aligned}"
    },
    "text": "Minimize cost — linear, thanks to trick one. Cap the tracking error — quadratic, thanks to trick three. One objective, one constraint, two tricks reused at once.",
    "type": "slide"
  },
  {
    "id": 38,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "RESULT",
      "content": "A convex, exactly\nsolvable program."
    },
    "text": "A linear objective with one quadratic constraint — and because that constraint is convex, this solves exactly, not just approximately.",
    "type": "slide"
  },
  {
    "id": 39,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "No exchange rate to guess.\nJust a limit, and the\ncheapest way to respect it."
    },
    "text": "Why a cap on tracking error, instead of just adding it to the cost with some penalty weight? Because cost and risk measure genuinely different things — nobody can honestly guess the right exchange rate between them. A cap sidesteps that guess entirely: just say how much tracking error you can live with, and let the solver find the cheapest way to stay inside it.",
    "type": "slide"
  },
  {
    "id": 40,
    "visual": {
      "kind": "text_slide",
      "style": "recap-table"
    },
    "text": "Six tricks, six problems solved, one after another — and the underlying trick was almost always the same move, reused in a new place.",
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "Standard tricks.\nAn ordinary problem, solved properly."
    },
    "text": "None of these six needed a custom solver, and none of them needed guesswork. Every single one is a standard trick from convex optimization, applied to a very ordinary problem — moving a portfolio from where it is, to where it should be, as cheaply as it honestly can be done.",
    "type": "slide"
  }
];
