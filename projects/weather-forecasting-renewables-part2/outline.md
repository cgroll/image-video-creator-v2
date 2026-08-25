# Talk "Weather Forecasting for Renewables — Part 2: From Capacity Factors to Power and Price" — Outline

Continuation of `projects/weather-forecasting-renewables`. Part 1 ended at
"we have a weather forecast." Part 2 picks up there: how does a weather
forecast turn into a power forecast, and why does that matter for two
different, concrete use cases — sizing/planning a power system, and
forecasting residual load and price. Working title only.

Structure decision (confirmed): **one video, two acts**, sharing a common
Act 0 introduction to capacity factors/data sources, same as Part 1 used
chapters within one deck.

## Initial instructions (verbatim ask, translated/condensed)

- Go deeper on converting weather into **capacity factors**, and from
  capacity factor + installed capacity into a forecast of actually
  generated power.
- Two use cases for that generation forecast:
  1. **Power-system / grid sizing**: given an installed capacity, how bad
     can a Dunkelflaute get? What are the extreme outputs — both negative
     (shortfall) and positive (oversupply)?
  2. **Residual load → price**: use the generation forecast to get a
     better residual-load estimate, and from residual load forecast
     price.
- Source material for topic 1: `~/research/world-of-energy` — PECD-based
  analysis of possible Dunkelflauten for a given installed capacity, and
  how batteries improve the picture.
- Source material for topic 2: `~/research/pecd-replication` — residual
  load estimation methodology.
- Keep it **high-level / illustrative first**, not necessarily real data.
  Should teach: what a capacity factor is; where to get such data (PECD
  v4.2); where to get installed capacity (Marktstammdatenregister); how to
  compare against real time series (SMARD); what congestion and
  behind-the-meter add to the picture.
- For topic 2, also illustrate: predicting the merit-order curve, and how
  fossil (coal, gas) marginal cost is computed from certificates,
  emissions, and commodity prices (see world-of-energy for this too).
- End goal: understand the core concepts through good illustrations /
  animations.

## What the two source projects actually contain

**`world-of-energy`** (pipeline scripts, not yet distilled into a book
chapter — `book/markdown/index.md` there is just a topic list):

- `44_renewables_battery_tradeoff.py` — the actual Dunkelflaute analysis:
  worst 7-day low-generation window in the PECD/ERA5 record, a gap chart,
  cumulative shortfall with battery and generation-scaling scenarios;
  finds the renewable scaling factor that energy-matches demand and the
  minimum seasonal battery that implies; sweeps overbuild 2x–10x against
  required battery size and curtailment.
- `45_RE_drawdowns.py` — the general "energy drought" method: cumulative
  sum of (capacity factor − long-run mean) per technology; the maximum
  peak-to-trough decline in that balance series *is* the worst sustained
  shortfall. This is the mechanism behind "Dunkelflaute," made precise.
- `46_RE_ddown_jetstream.py` — ties the worst drawdown windows back to
  jet-stream/blocking patterns (nice callback to Part 1's jet-stream
  material, probably out of scope for Part 2's illustrative pass).
- `42_optimal_copper_plate_mix.py` / `55_germany_energy_battery_optimization.py`
  — PyPSA linear-programming cost-optimal capacity mix (solar/wind/battery
  /hydrogen or gas backup), Fraunhofer ISE 2024 cost assumptions.
- `43_simulate.py` — a simpler, more explainable greedy "fill first"
  battery/hydrogen dispatch simulation (no optimizer) — probably the
  better mechanism to animate than the LP solve.
- `52_lcoe_germany.py` / `53_germany_energy_mix_costs.py` /
  `54_germany_energy_battery_mix_costs.py` — LCOE and full hourly-dispatch
  merit-order-style cost simulations (renewables first, battery,
  curtailment, gas backup), Fraunhofer ISE cost basis.
- `02_download_ttf_gas.py` — TTF gas futures price series.
- `book/markdown/resources.md` — links for SRMC methodology (Montel,
  EMBER), carbon-certificate and Rotterdam-coal futures price data
  sources (investing.com), SMARD price/capture-price screenshots.

**`pecd-replication`** (already has real book chapters to draw on):

- `book/markdown/electricity_system_foundations.md` — an 11-step,
  self-contained walkthrough building up exactly the diagram this video
  needs: grid demand → residual load → potential generation → losses
  (repair / price-curtailment / congestion-curtailment) → behind-the-meter
  → gross demand. Mermaid diagrams already exist there and can be used
  directly as animation storyboards.
- `book/markdown/curtailment_system_equations.md` — the exhaustive
  equations/notation reference (battery recursion, feed-in-category
  split) behind the foundations chapter.
- `book/markdown/residual_load_walkthrough.md` — the evidence trail:
  demand regression, curtailment-curve calibration, the backtest results.
- `book/markdown/index.md` — headline results table (MAE/bias/corr for
  wind onshore/offshore/solar vs. PECD official and a naive baseline);
  the residual-load backtest halves MAE vs. a naive baseline; the honest
  finding that a plain linear regression on the same features does even
  *slightly* better than the hand-built structural model on this specific
  backtest — a good, honest "the structure earns its keep for
  understanding, even where it doesn't win on raw accuracy" beat.
- **Explicit open caveat worth carrying into the video** (foundations
  doc, Step 10): day-ahead price clears *before* redispatch, but the
  residual-load model's estimated losses bundle congestion-curtailment in
  with everything else — so "predicted residual load" isn't quite the
  same quantity as "the residual load that actually sets the price."
  Flag honestly, don't paper over — matches Part 1's pattern of being
  upfront about reanalysis being an estimate, not ground truth.

## Draft chapter mapping

### Act 0 — Capacity factor fundamentals (shared intro, ~12 scenes)

1. **Bridge from Part 1** — we ended with a weather forecast; this
   chapter is about turning that into a power forecast.
2. **What a capacity factor is** — actual output ÷ (installed capacity ×
   time); a number between 0 and ~1 that says "what fraction of nameplate
   the fleet actually delivered." Animated: a CF(t) curve and an
   installed-capacity bar combine into a generation(t) curve.
3. **PV physics: irradiance and cloud cover** — a tilted solar panel
   under a sun that dims and brightens as clouds pass over; the panel's
   output curve tracks the irradiance hitting it in real time. Chosen
   deliberately over a sun-rising/setting-behind-the-panel animation:
   sunrise/sunset and panel tilt are *deterministic astronomy*, known
   years in advance, not what makes solar hard to forecast — cloud cover
   is the actual *weather-driven, unpredictable* signal this chapter is
   about, and it's the direct link back to Part 1's ERA5/cloud material.
   (Decided in conversation 2026-08-24 — see the "Physics-of-a-single-
   plant" note below for the full reasoning and the wind-side sequel.)
4. **Wind physics: wind speed hitting a turbine** — the same beat for
   wind: varying wind speed visibly changes how fast the turbine spins,
   and its power output follows.
5. **The power curve** — the turbine's actual input/output relationship
   made explicit: near-zero output below cut-in speed, a steep ramp
   through the middle of the range, a flat rated-power plateau, then
   cut-out (storm shutdown) at the top — the same curve
   `pecdr/power_curve.py` and `pecdr/shutdown.py` implement for real
   in `pecd-replication`.
6. **One plant, fully specified** — the thesis tying the physics
   together: know one specific plant's technical details (location,
   panel orientation/tilt or turbine hub height and power curve) and the
   weather at that location, and its output follows directly from
   physics — no statistics needed.
7. **Scaling up: a whole region needs every plant's specifics** — doing
   the same thing for a country, not one plant, means knowing the
   location, orientation, and technology type of *every* installed
   plant — which is exactly what a plant register provides. Direct
   bridge into the next beat (PECD/MaStR).
8. **Where capacity-factor data comes from: PECD v4.2** — per-technology,
   per-zone time series built from ERA5 (+ Global Wind Atlas bias
   correction for wind, documented conversion chain for solar) — direct
   callback to Part 1's ERA5 chapter and to what `pecd-replication`
   already validated in detail.
9. **Where installed-capacity data comes from: Marktstammdatenregister
   (MaStR)** — Germany's public plant register, time-varying (capacity
   grows over the years), per-plant location and technology.
10. **Multiply: potential generation** — `P(t) = CF(t) × capacity(t)`.
11. **Comparing against reality: SMARD** — Germany's published actual
    generation; introduces the idea of checking a model against real
    data, and previews that potential ≠ observed.
12. **Why potential ≠ observed — the loss stack** — repair/outage losses,
    price-driven voluntary curtailment, grid-congestion curtailment, and
    behind-the-meter self-consumption (invisible to both sides of the
    ledger). Reuse the shape of `electricity_system_foundations.md`'s
    step-3/step-5 mermaid diagrams as the animation storyboard.
13. **Congestion & behind-the-meter, briefly** — one slide each; enough
    to know the terms exist and roughly what they mean, not a deep dive
    (that's `pecd-replication`'s own residual-load chapter's job).

**Physics-of-a-single-plant note (added 2026-08-24, from conversation):**
user asked whether PV physics should be illustrated with a sun rising and
setting behind a tilted panel, or more directly via solar radiation and
cloud cover. Recommendation given and accepted: cloud cover, because the
chapter's actual point is that capacity factor is weather-driven and
*unpredictable* — sunrise/sunset/tilt is deterministic geometry, not
weather. User then extended the idea into a full 4-beat mini-sequence:
PV cloud-cover animation → wind-speed-hitting-turbine animation → the
power curve → the "one fully-specified plant gives you physics-exact
output; a whole region needs every plant's specifics" thesis, which is
now items 3-7 above (inserted before the pre-existing PECD/MaStR beats,
items 8-9).

### Act I — Sizing a power system: Dunkelflauten and extremes (~8-10 scenes)

14. **The sizing exercise** — pick an installed-capacity mix, replay it
    against the historical capacity-factor record, get a generation time
    series. A planning tool, not a forecast.
15. **Defining Dunkelflaute precisely** — cumulative sum of (capacity
    factor − long-run mean); the worst peak-to-trough drop in that curve
    *is* the worst sustained shortfall (`45_RE_drawdowns.py`'s method) —
    turns a vague word into a measurable, reproducible quantity.
16. **What the worst window actually looks like** — a gap chart: demand
    vs. available generation over the worst 7-day window found in the
    record.
17. **Extremes both directions** — not just shortfall: an oversupply /
    curtailment-risk extreme too, for the same installed-capacity choice.
18. **Batteries change the picture** — animate a battery's state of
    charge filling and draining across the Dunkelflaute window
    (`43_simulate.py`'s greedy dispatch is the clean, explainable
    mechanism — cleaner to animate than the PyPSA LP solve).
19. **How much battery is enough?** — sweep chart: required battery size
    and curtailment vs. overbuild factor (2x–10x renewables), from
    `44_renewables_battery_tradeoff.py`.
20. **Act I closing thought** — this whole chapter answers "how much
    capacity/storage do I need," a planning question — not yet "what will
    tomorrow's price be," which is Act II.

### Act II — From power to price: residual load and merit order (~10-12 scenes)

21. **Recap: residual load** — demand minus weather-driven renewable
    generation; bridges from Act 0's potential-generation forecast.
22. **The merit-order curve** — dispatchable plants stacked cheapest
    marginal cost first; demand (residual load) sweeps across the stack;
    the intersection sets price.
23. **What sets a fossil plant's marginal cost** — fuel price (TTF gas,
    Rotterdam coal) + carbon-certificate price (EU ETS) × the plant's
    emission factor, divided by efficiency → €/MWh short-run marginal
    cost (SRMC). Animated cost-stack build-up for one gas plant.
24. **The merit order curve moves** — as gas, coal, and carbon prices
    shift relative to each other, plants reorder in the stack (the
    coal/gas "switching price" — a real, well-known phenomenon, good
    concrete hook).
25. **Putting it together** — forecasted residual load meets the
    (forecasted) merit-order curve → an illustrative day-ahead price.
26. **Honest caveat: this isn't quite the right residual load for
    price** — day-ahead clears pre-redispatch, but the residual-load
    model's loss estimate bundles congestion-curtailment in with
    everything else; flagged as open in `pecd-replication` itself, not
    swept under the rug here either.
27. **Closing: the whole chain** — weather → capacity factor → potential
    generation → residual load → merit order → price, one forecasting
    pipeline, Parts 1 and 2 combined.

## Scope decisions worth naming, not hiding

- **Hydro** gets a passing mention as weather-driven but isn't modeled in
  detail in either source project — same scope choice
  `electricity_system_foundations.md` makes explicitly. State it, don't
  pretend otherwise.
- **Illustrative, not a real backtest.** Per the initial ask: build the
  concepts first with clean, possibly synthetic or lightly-real example
  curves, not a full reproduction of either source project's actual
  validated numbers. Real headline numbers (e.g. the residual-load
  backtest's MAE improvement, the wind/solar correlation table) can be
  *cited* as evidence the approach works, without every chart needing to
  be the real underlying data.
- **Keep any real-data charts light** — subsampled/illustrative rather
  than full-resolution reproductions, consistent with how Part 1's
  diagrams were built.

## Open questions

- **Which custom diagrams get built vs. reused generic slide styles?**
  Candidates, roughly in the same spirit as Part 1's 7 custom SVG
  diagrams:
  1. **PV physics: cloud cover over a tilted panel** — sun dims/brightens
     as clouds pass, panel's output curve tracks it live. First custom
     diagram being built (2026-08-24).
  2. **Wind physics: wind speed hitting a turbine** — varying wind speed
     visibly changes blade rotation speed and output.
  3. **The power curve** — cut-in / ramp / rated plateau / cut-out, made
     explicit as its own beat, probably right after #2.
  4. CF(t) × capacity → generation(t) multiply animation
  5. Data-source pipeline diagram (PECD + MaStR → generation; SMARD as a
     validation check)
  6. Loss-stack diagram (potential → repair/price-curtailment/congestion
     losses → observed, + BTM branching to the demand side)
  7. Dunkelflaute drawdown chart with worst-window highlight
  8. Battery SoC fill/drain animation over the Dunkelflaute window
  9. Overbuild-factor vs. required-battery-size sweep chart
  10. Merit-order stack diagram with a sweeping demand line
  11. Marginal-cost build-up diagram (fuel + carbon×emission factor ÷
      efficiency → SRMC) for coal and gas side by side

  That's 11 candidates against Part 1's 7 — worth trimming once the
  storyline's actual pacing is known; some (e.g. #5) might fold into a
  simpler generic checklist/statement slide instead of a bespoke SVG.
- **Target length?** Part 1 landed at 62 scenes. Two acts plus a shared
  intro, per the chapter mapping above, sketches to roughly 20-25 scenes
  — shorter than Part 1, but confirm that's the right size once a first
  `storyline.yaml` draft exists.
- **Any real numbers to cite as evidence, and from where?** Candidates:
  `pecd-replication`'s wind/solar accuracy table and residual-load
  backtest MAE improvement (both already verified, published numbers in
  that project's own book) — reused as citations here, not recomputed.

## Status

First `storyline.yaml` + `project.yaml` + `deck.html` built
(2026-08-24) — 43 scenes across 7 chapters + conclusion, using only
existing generic slide styles (`text_slide` statement/thesis/cta/formula,
`checklist_step`), no bespoke SVG diagrams yet. `deck.html` is a trimmed
copy of Part 1's — same CSS shell, icon registry, and generic renderers,
but with all of Part 1's ERA5-specific diagram code stripped out (not
topically relevant here). Verified via headless Playwright: no JS
errors, no overflow across all scenes.

Now adding the physics-of-a-single-plant sequence (chapter mapping items
3-7 above) as new scenes plus the first custom diagrams. Building in
order: PV cloud-cover-over-panel first, then the wind-turbine speed
animation, then the power curve.

**PV diagram built (2026-08-24)** — `visual.kind: pv_cloud_step`, 4
scenes (storyline ids 4-7). One real bug caught by user review of a
screenshot: the panel was tilted the wrong way (its catching face
pointed away from the sun, not toward it) — the rod extended to the
*right* of its ground pivot with a *negative* rotation, which puts the
outward-facing normal up-and-left while the sun sits up-and-right. Fixed
by mirroring both the rect's local extent (now extends *left* of the
pivot) and the rotation sign (now positive) together — flipping only
one alone produces a different, still-wrong orientation, since the rod
direction and its face normal are locked at 90° to each other. General
lesson for any future tilted/rotated SVG element in this deck: verify
which way a rotated shape's *face* points (not just that it "looks
tilted"), ideally by reasoning about the desired normal vector, not just
eyeballing the rod angle.

**Wind turbine diagram built (2026-08-24)** — `visual.kind:
wind_turbine_step`, 4 scenes (storyline ids 8-11): light breeze → wind
picks up → strong wind at rated output → storm cut-out (blades visibly
stop/dim, output drops to near zero). Mechanically different from the
PV diagram: instead of discrete opacity/position steps, the blades and
three rows of wind-direction chevrons are *continuously running* CSS
keyframe animations (`wind-spin`, `wind-flow`) whose *duration* (speed)
changes per step — cut-out is `animation-play-state: paused` plus a
dimmed opacity, not a fourth discrete state. This step's 4-point arc
(cut-in → ramp → rated → cut-out) already previews the dedicated power
curve diagram (item 5, not yet built) — that one should make the x-axis
literally wind speed (not just step sequence) to make the relationship
explicit rather than implicit.

All storyline ids renumbered again after each insertion — the file is
now 51 scenes across 9 chapters + conclusion (chapters renumbered too).
Both diagrams verified via headless Playwright (no JS errors, no
overflow) and screenshot review after each build.

**PV extended to 6 steps + power curve built (2026-08-24, same
session)** — user asked for two more additions: for PV, a comparison
showing orientation and panel technology also change the output ceiling
(not just weather); for wind, the actual power curve, again showing
turbine *type* changes the curve.

- `pv_cloud_step` extended from 4 to 6 steps. Steps 5-6 hold the sun/sky
  clear (a new `PV_SUN_LEVEL` array drives rays/sun opacity, held flat)
  while the panel itself changes — step 5 rotates it to a poor angle via
  a JS/CSS-driven `transform: rotate()` (previously a static SVG
  attribute, now dynamic so it can transition), step 6 swaps its fill
  color to represent a different cell technology. A separate `PV_LEVEL`
  array (captured output, decoupled from `PV_SUN_LEVEL`) drives the
  panel's glow and the output chart, so the chart visibly diverges from
  "what the sun is doing" starting at step 5 — the point being made
  directly: same sunlight, different capture. The chart's last two
  points/segments render dashed and in the warm accent color (`.compare`
  class) to visually flag "this part isn't weather anymore."
- New diagram `wind_power_curve_step` (2 steps, its own chapter 4): a
  proper wind-speed-on-x-axis, power-on-y-axis chart — cut-in, a
  smoothstep ramp, a rated plateau, a sharp cut-out — matching real
  turbine power-curve shape. Step 2 overlays a second turbine type
  (different cut-in/rated/cut-out values) as a dashed line, making
  "turbine type changes the curve" a direct visual comparison rather
  than a claim. Pure discrete fade-in reveal (no continuous animation,
  unlike the other two physics diagrams) — same idiom as Part 1's
  `era5_qc_step`/`era5_window_step`.

Deck is now 55 scenes across 10 chapters. Both additions verified via
headless Playwright (no errors, no overflow) and screenshot review.

**PV comparison mechanism reworked per user feedback (2026-08-24, same
session)**: the first version of steps 5-6 extended the chart with 2
*new* x-positions to the right of the original 4 (a 6-point timeline).
User liked the panel-tilt animation but flagged the chart approach:
instead of new points, replay the *same* 4 x-positions/moments with a
*second* curve showing what the energy would have been there under a
different panel. Reworked accordingly — `pvChartX` reverted to spacing
only 4 points (curve A, unchanged weather-driven reference, exactly as
originally built); a new dashed curve B shares those same 4 x positions,
scaled by an orientation factor (step 5, ×0.55) or technology factor
(step 6, ×0.80) applied to curve A's own values — so curve B visibly
tracks the *same* dips at the *same* moments, just at a different
height, making "same weather, different ceiling" a direct visual
comparison rather than a timeline continuation. Curve B's points morph
smoothly between the two factors when moving 5→6 (dual `data-y-orient`/
`data-y-type` attributes + CSS transition on `cy`, same idiom as
`era5-dot`'s ortho/flat duality in Part 1). Panel tilt/color-swap
animation kept exactly as before — that part didn't need to change.

**Germany fleet-map diagram built (2026-08-24, same session)** — outline
items 6-7 (the "one plant, fully specified" / "scaling to a region"
bridge), now its own chapter 5, `visual.kind: fleet_map_step`, 3 scenes
(storyline ids 16-18). A real Germany outline (Natural Earth 1:110m,
extracted from the shared `../../assets/geo/era5-grid-data.js`'s
`WORLD_SUBPATHS_FULL[203]` — identified by matching bounding box against
Germany's known extent, not reloaded wholesale, just its ~58 points
copied inline) with:
1. one highlighted plant + an info card ("LOCATION / ORIENTATION-HUB-
   HEIGHT / TURBINE-OR-PANEL-TYPE + weather → exact output") — the "one
   plant, fully specified" thesis, directly calling back to the PV/wind
   physics chapters just before it.
2. ~23 more plants fading in across the map — wind (teal) biased
   north/coastal, solar (warm) biased south/east, matching Germany's
   real renewable geography (illustrative city-proxy coordinates, not
   real MaStR records — stated as such in the code comment).
3. a closing caption bridging to MaStR, which the deck already covers in
   the chapter right after this one.

Pure discrete fade-in reveal (`[data-step]` toggle), same idiom as the
power-curve diagram — no continuous animation needed. One real layout
bug caught by screenshot review and fixed: the step-3 caption
(`y="660"`) collided with the legend (`y≈662-668`) since both sat near
the bottom edge of a 700-tall viewBox — fixed by growing the SVG to 740
and moving the caption to `y="720"`, clearing separation.

Deck is now 58 scenes across 11 chapters. Verified via headless
Playwright + screenshot review, no errors/overflow.

**Assumption → PECD + dot-product diagram built (2026-08-24, same
session)**: user asked for two more additions, both now in place.

1. **"An assumption that makes a region computable"** (new chapter 6,
   4 scenes, ids19-22) — reframes PECD's whole methodology as a
   hypothetical first ("what if, instead, we assumed a representative
   spatial/orientation/technology mix per region, aggregated and
   normalized 0-1, and assumed that scaling capacity with a similar mix
   scales output the same way?"), *then* reveals "which is exactly what
   PECD does" as the payoff — reusing the existing `cta` style, just
   moved and reworded (kicker now "AN ASSUMPTION, TURNED INTO A
   DATASET"). The old standalone PECD cta scene was merged into this
   reveal rather than kept as a separate, now-redundant scene.
2. **"Same weather, different weights"** (new chapter 8, 3 scenes, ids
   31-33, `weights_step`) — the dot-product mechanic the user was unsure
   how to illustrate, prototyped and landed on: four real Bundesländer
   (Schleswig-Holstein, Niedersachsen, Bayern, Brandenburg), each a
   fixed capacity-factor bar (driven by an illustrative weather
   snapshot, never changes) paired with an installed-capacity bar (the
   "weight" — animates between steps) and a per-region contribution
   readout (CF×Capacity); a total bar on the right sums all four. Step 2
   triples Schleswig-Holstein's capacity (already the highest-CF region
   that snapshot) — total jumps 24.8→36.3 GW, directly demonstrating
   that *where* added capacity lands matters, not just how much. Step 3
   closes with the literal formula as an on-canvas caption:
   `Total(t) = Σ CFᵢ(t) × Capacityᵢ`. Capacity bars/values/total morph
   via the same dual-attribute + CSS-transition idiom as the PV
   comparison curve and the fleet map's dots.

Both diagrams hit the *same* class of bug on first build — a step-3
closing caption colliding with region/legend labels already occupying
that vertical band — fixed the same way both times (grow the SVG's
height, push the caption down). Worth remembering as a recurring risk
in this deck: **multi-step diagrams that accumulate content downward
need their final caption's position checked against whatever labels
already landed there, not just placed at a fixed y from the top.**

Deck is now 64 scenes across 13 chapters. Verified via headless
Playwright + screenshot review (including the specific step-3 collision
class of bug above), no errors/overflow.

**"Two technologies, not one" built (2026-08-24, same session)** — user
flagged that the weights bar chart implicitly treated each region as
having one blended capacity factor, when really every region has one
*per technology*. New chapter 9, 3 scenes, `regional_weights_step`:
the same 4 Bundesländer as the bar chart, now on the Germany map (reuses
`DE_OUTLINE`/`deProject` from the fleet-map diagram, not redefined), each
with its own wind CF and solar CF, and a wind-turbine icon + sun icon
whose *scale* (area-proportional, `sqrt(capacity/10GW)`) encodes
installed capacity per technology. Step 2 grows wind capacity in
Brandenburg and solar capacity in Bavaria — both already the best-CF
region for that technology that snapshot — total renewable output climbs
32.0→48.0 GW, generalizing the same "where capacity lands matters" point
across two dimensions (region × technology) instead of one. Icon scale
and the total bar/value morph via the same dual-attribute + CSS-
transition idiom used throughout (`data-scale-a`/`data-scale-b`, etc.).

**Same caption-collision bug class, caught proactively this time but
still needed two rounds to actually fix**: first attempt at step 3 hit
the identical failure as the fleet map and the weights chart (closing
caption colliding with the legend). Fix attempt #1 just grew the canvas
height again (700→800) without checking the *effect on the top* —
which introduced a *new* bug: at 800px tall, the centered flex content
column pushed the kicker text up into the eyebrow row. Fix #2 abandoned
"just grow it more" and instead copied the fleet map's *already-proven*
exact coordinates (legend at y=662/668, caption at y=720, canvas height
740) rather than re-deriving new ones. **Updated lesson**: when a
diagram in this deck needs a bottom-of-canvas caption/legend layout,
copy the fleet map's proven 740-height/662-720 coordinates directly
instead of picking new numbers per diagram — growing canvas height is
not a free fix, since #content is vertically centered in a fixed 1080px
stage and a too-tall diagram collides with the eyebrow at the top
instead.

Deck is now 67 scenes across 14 chapters. Verified via headless
Playwright + screenshot review (both the step-3 collision and the
top-of-canvas collision), no errors/overflow.

**"The fleet never stops changing" built (2026-08-24, same session)** —
user gave two corrections/additions at once: (1) the old "representative
mix" scene (then id20) said "not the real ones, a plausible one," which
was factually backwards — PECD's assumption is the *actual* known fleet,
frozen at a point in time, not an invented plausible pattern; (2) wanted
an illustration (near the fleet-map chapter) showing the fleet's plant
count changing over time, motivating *why* a frozen representative
pattern is used instead of continuously re-deriving every plant's exact
spec.

Solved both with one new 4-step diagram, `fleet_snapshot_step`, replacing
the old 4-scene "assumption" chapter's first two (now-redundant) scenes:
new chapter 6 "The fleet never stops changing" (ids19-22), followed by a
trimmed 2-scene chapter 7 "An assumption that makes a region computable"
(ids23-24, just the aggregate/normalize line + the PECD reveal, since
the new diagram now carries the "representative pattern" explanation).

1. Step 1: the *exact same* 24 dots from the fleet-map diagram (reusing
   `DE_WIND_PLANTS`/`DE_PV_PLANTS`, not redefined) — "2024 — KNOWN
   EXACTLY, PLANT BY PLANT," 104 GW.
2. Step 2: 6 more dots fade in at new locations — "2028 — STILL
   GROWING," 142 GW — directly showing the count/capacity changing.
3. Step 3: all 30 individual dots fade out; 4 wind+sun icon pairs (reusing
   `rwWindIconSVG`/`rwSunIconSVG` from the regional-weights diagram, not
   redefined) fade in at the same Bundesländer used there — "FROZEN: ONE
   REPRESENTATIVE PATTERN PER REGION" — a real snapshot held fixed, not
   an invented one.
4. Step 4: closing caption — "CF comes from weather + the frozen
   pattern. Capacity is a separate knob — change it, get a new output"
   — the CF/capacity orthogonality point, plus (in the narration) that
   different regions get different CF from the same weather because
   each region's real mix differs.

Needed one non-monotonic reveal (dots appear at steps 1-2, then
disappear at steps 3-4) that the deck's usual cumulative `[data-step]`
toggle can't express — handled with a small dedicated apply-state
function (`fleetSnapshotApplyState`) alongside the generic toggle for
the parts that *are* monotonic (regional icons, caption).

**Layout fix applied proactively this time**: reused the fleet map's
proven coordinates (canvas height 740, bottom caption at y=720) directly
from the start, per the lesson recorded after the third collision in the
regional-weights diagram — no collision this time, confirmed via
screenshot on the first attempt.

Deck is now 69 scenes across 15 chapters. Verified via headless
Playwright + screenshot review of all 4 steps, no errors/overflow.

**Fleet-snapshot diagram extended (2026-08-24, same session)** — two
follow-up requests on the just-built chapter:

1. **Extend the growth motif to a third stage, and drop all concrete
   numbers.** `fleet_snapshot_step` went from 4 steps to 5: growth is now
   three stages (steps 1-3, dots accumulating: original 24 → +6 → +6
   more) before freezing into the regional pattern (step 4) and closing
   (step 5). The "104 GW"/"142 GW" counter was removed entirely — no
   digit anywhere in the diagram now, just qualitative status text
   ("TODAY," "THE FLEET GROWS...," "...AND KEEPS GROWING"). The growing
   dot count alone carries the "always changing, always more" message.
2. **Make the frozen regional pattern visually show real technology
   differences, not identical icons.** The generic `rwWindIconSVG()`
   reused from the regional-weights diagram was replaced with a new
   parametrized `fsTurbineIconSVG(bladeCount, bladeLen, towerLen)` — each
   of the 4 regions now gets a genuinely different turbine glyph:
   Schleswig-Holstein tall/large (3 blades), Niedersachsen medium (3
   blades), Bayern short/small (3 blades), Brandenburg a distinct 4-blade
   rotor. Narration for step 4 now explicitly says the pattern "genuinely
   differs from region to region: different turbine models, different
   rotor designs, different hub heights," landing the point the user
   asked for: identical wind can still produce a different capacity
   factor because the underlying fleet mix differs.

**Real bug caught and fixed via screenshot review**: the 4-blade
turbine's naive evenly-spaced angles (starting at -90°) put one blade
pointing straight down, exactly overlapping the tower line drawn there
— it rendered as a plain "+" rather than a recognizable 4-blade rotor.
Fixed by offsetting the start angle for even blade counts by half a
blade-spacing (`-90 + (360/bladeCount)/2`), so no blade ever aligns with
the tower; odd counts (3 blades) keep the original -90° start. General
lesson for any future evenly-spaced radial icon in this deck: check
whether the count divides evenly into a angle that collides with a fixed
reference line (here, straight down), not just that the shape "looks
about right" at a glance.

Also cleaned up a pre-existing cosmetic artifact spotted while editing:
a duplicated `# ====...` separator line above the chapter 6 header,
left over from an earlier script-based chapter insertion.

Deck is now 70 scenes across 15 chapters (chapter structure unchanged,
just chapter 6 growing from 4 to 5 scenes). Verified via headless
Playwright + screenshot review of all 5 steps, no errors/overflow.

**Freeze step reworked to wind-only fleet-mix clusters (2026-08-24, same
session)** — user refined the freeze step further: keep it wind-only for
this example (drop the paired sun icon), and instead of one turbine icon
per region, show a small *cluster* of several turbines per region with a
different mix — directly illustrating "different regions have different
fleet mixes," not just "different regions have a different single
turbine type." `FS_REGIONS` now carries a `mix: [...]` array of 4
turbine specs per region (from four size presets — `T_LARGE`/`T_MEDIUM`/
`T_SMALL`/`T_FOUR`) instead of one shared spec; a new `FS_CLUSTER_OFFSETS`
lays them out in a 2×2 grid per region. Mixes: Schleswig-Holstein mostly
large turbines, Rheinland-Pfalz a medium-leaning mix, Bayern mostly
small, Brandenburg a mix including the distinct 4-blade variant. Had to
widen the cluster spacing once (from ±18/±16px to ±26/±22px offsets)
after confirming via DOM inspection that all 16 icons *were* rendering
correctly but were visually crowded enough at the tighter spacing to
blur together in a screenshot — a legibility fix, not a functional bug
(verified count/positions directly via `querySelectorAll` before
concluding it wasn't a rendering defect).

**User also asked, mid-edit, to swap Niedersachsen for Rheinland-Pfalz
"generally"** — applied consistently across all three region-based
diagrams that share this same 4-Bundesländer set (`weights_step`'s
`WT_REGIONS`, `regional_weights_step`'s `RW_REGIONS`, and this diagram's
`FS_REGIONS`), not just the one being edited, since keeping the same 4
regions consistent across every diagram in the deck is what makes them
read as one continuous story. Rheinland-Pfalz sits southwest, giving a
noticeably better compass spread (north/southwest/south/east) than the
previous Schleswig-Holstein + Niedersachsen pairing, which were both
northerly and close together.

Deck is still 70 scenes across 15 chapters (no scene count change, only
step 4's visual/narration content changed). Verified via headless
Playwright, screenshot review, and direct DOM position inspection — no
errors/overflow.

**Third distinct rotor shape added (2026-08-24, same session)** — user
pointed out that despite 4 size presets, only 2 *shapes* actually existed
(3-blade at three sizes, plus the 4-blade), not 3. Added a `T_TWO` preset
(`{ blades: 2, bladeLen: 13, towerLen: 16 }`) — the existing angle-offset
logic already handled it correctly with no changes needed (even blade
counts get a half-spacing start-angle offset, so 2 blades land at 0°/180°
— a horizontal line through the hub, reading as a distinct "T" shape,
not overlapping the tower). Wired into Rheinland-Pfalz's and Bayern's
mixes so the third shape is visible in more than one place. Map now
shows all three genuinely different rotor designs at a glance: the
standard 3-blade "Y", Brandenburg's 4-blade "X", and the new 2-blade "T".

Deck is still 70 scenes across 15 chapters (visual-only change, no new
scenes). Verified via headless Playwright + screenshot, no errors/
overflow.

**Varied icon count per region added (2026-08-24, same session)** —
regions now differ in fleet *size* too, not just mix: Schleswig-Holstein
5 turbines, Rheinland-Pfalz 3, Bayern and Brandenburg 4 each. Since the
old code indexed a single fixed 4-slot `FS_CLUSTER_OFFSETS` array by
position, this needed per-count layouts instead of a generic grid
formula — `FS_CLUSTER_LAYOUTS` maps `{3: [...], 4: [...], 5: [...]}`,
each hand-placed for visual balance (3 is a triangle — one on top, two
below — rather than a lopsided 2+1 leftover row). The region label's
y-offset is now computed from each layout's actual max vertical extent
(`Math.max(...layout.map(dy))`) instead of a fixed constant, so the
5-turbine cluster's taller layout doesn't collide with its own label.

Deck is still 70 scenes across 15 chapters (visual-only change). Verified
via headless Playwright + screenshot, no errors/overflow.

Next: the original diagram candidates from the Open Questions section
(loss-stack, Dunkelflaute drawdown, battery SoC, overbuild sweep,
merit-order stack, marginal-cost build-up) remain — the physics-of-a-
single-plant arc (PV, wind, power curve, fleet map, fleet-over-time,
assumption→PECD, dot-product weights, per-technology weights) is now
complete.
