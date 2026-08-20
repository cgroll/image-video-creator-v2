const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Every trade\ncosts something."
    },
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Chase every signal exactly,\nand you trade yourself into the ground."
    },
    "type": "slide"
  },
  {
    "id": 6,
    "visual": {
      "kind": "text_slide",
      "style": "portfolio-bars"
    },
    "type": "slide"
  },
  {
    "id": 62,
    "visual": {
      "kind": "animation_step",
      "group": "abs_distance",
      "anim_step": 1
    },
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
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "animation_step",
      "group": "split",
      "anim_step": 1
    },
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
    "type": "slide"
  },
  {
    "id": 11,
    "visual": {
      "kind": "animation_step",
      "group": "split",
      "anim_step": 3
    },
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
    "type": "slide"
  },
  {
    "id": 21,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Two correlated assets\noffset each other's risk.\nTurnover can't see that."
    },
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
    "type": "slide"
  },
  {
    "id": 26,
    "visual": {
      "kind": "animation_step",
      "group": "cutting_planes",
      "anim_step": 1
    },
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
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "animation_step",
      "group": "diversification",
      "anim_step": 1
    },
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
    "type": "slide"
  },
  {
    "id": 39,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "No exchange rate to guess.\nJust a limit, and the\ncheapest way to respect it."
    },
    "type": "slide"
  },
  {
    "id": 40,
    "visual": {
      "kind": "text_slide",
      "style": "recap-table"
    },
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "Standard tricks.\nAn ordinary problem, solved properly."
    },
    "type": "slide"
  }
];
