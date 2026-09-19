# Talk "Linking MaStR and PECD" — Outline

A new, standalone video-creator project (English narration, same house style
as `weather-forecasting-renewables` Part 1/2, but not literally chained to
that series — no shared scenes/assets required). Working title only.

## Initial instructions (verbatim ask, translated/condensed)

Describe what's actually in Germany's Marktstammdatenregister (MaStR) —
not just PV and wind, but everything else too — then narrow to PV, wind,
and battery storage. For PV specifically: what does a single record
represent (is it an event, tied to a plant)? What master data survives
after filtering out maintenance-type noise: which plant, its live period
(commissioning → shutdown), technical specs, location. Then the PECD side:
there's a fine grid, but working at that granularity makes linking to MaStR
hard, so use PECD's NUTS2-level product instead — explain how the two get
matched up spatially. Repeat for wind onshore and wind offshore. Cover
which technologies PECD actually splits capacity factors into, and how
installed capacity gets assigned per technology. Cover extra plant
characteristics: co-located battery storage (helps tell whether output
feeds the grid directly or not), and whether a PV installation is a
household self-consumption case. End with the payoff: PECD capacity factor
× matched installed capacity = potential generation — and note (but defer)
that behind-the-meter and curtailment separate "potential" from what
actually reaches the grid.

## Source repos (research only, no code changes)

- `~/research/mastr-power-capacities-germany` — builds MaStR into clean
  per-technology panels. Ingests 6 renewable/storage technologies via
  `open-mastr` (wind, solar, biomass, hydro, gsgk, storage) — **not** the
  full register (no fossil/gas/nuclear coverage). ~9.04M raw rows → 8.93M
  after filtering (drop missing `commissioning_date`, `capacity_mw<=0`,
  unresolvable region — ~1.1% dropped). 235 GW total installed capacity
  across the 6 techs it covers.
- `~/research/pecd-power-validity-DE` — validates PECD v4.2 capacity
  factors against SMARD observed generation; documents PECD's actual
  product resolution and pairs it with MaStR-derived capacity panels
  (fetched pre-built from the sibling repo above, not re-derived).

Full fact-finding detail (with file:line references) is preserved in this
session's research notes; key facts distilled into the chapter mapping
below.

## Key facts that shape the story (some correct the initial mental model)

1. **A MaStR export row is a periodic snapshot, not an unbounded event
   log — and that's a real structural constraint, not just an unused
   field.** The `_extended` table this pipeline ingests has exactly *one*
   slot for "temporary shutdown start" and *one* for "resumption" per
   unit-row. Structurally, that means a single export can represent at
   most one shutdown/resumption episode per plant at a time — if a plant
   went offline for maintenance three times over its life, this snapshot
   view cannot hold all three. Two real dates persist meaningfully across
   snapshots because they don't repeat: `commissioning_date` (an anchor,
   set once) and `final_shutdown_date` (a true endpoint, set once). We
   could not fully confirm from official MaStR documentation (checked the
   portal's export docs and open-mastr's docs directly) whether a fuller
   change history exists elsewhere at the source (e.g. a per-unit
   "Datenhistorie" only visible in the web portal, separate from the bulk
   export) — worth stating as an open/unconfirmed point rather than a
   claimed fact. What *is* confirmed: MaStR does publish quarterly
   archived full snapshots (Jan 1 / Apr 1 / Jul 1 / Oct 1 each year), so a
   coarse history is reconstructable by diffing snapshots even if no
   single export row carries it directly.
2. **The maintenance-adjacent fields nobody actually filters on.** Status
   fields (`unit_operational_status`, `unit_system_status`) and the
   single-episode temporary-shutdown dates from point 1 exist in the raw
   data but the pipeline that produces clean panels doesn't branch on
   them — the real filter is just: has a commissioning date, has positive
   capacity, has a resolvable region. Worth explaining *why* this is a
   reasonable simplification given point 1, not just stating it as a fact.
3. **PECD genuinely does ship a plant-by-plant-resolution grid product —
   0.25°×0.25°, confirmed on the official CDS catalog page — in addition
   to region-aggregated options (NUTS0/NUTS2/PEON/PEOF/P2ON/P2OF/SZON/
   SZOF/City).** The `pecd-power-validity-DE` repo deliberately skips the
   gridded NetCDF product and only downloads the region-aggregated one
   (`pkg/pecd_io.py`: "never the gridded NetCDF products... this project
   only consumes PECD's ready-made region-level capacity factor series"),
   consistent with that repo's general pattern of avoiding GB-scale raw
   downloads when a usable aggregate exists. So the honest framing is:
   **the grid exists, we use NUTS2/PEON/PEOF instead because of data
   volume and because it's the level MaStR capacity can realistically be
   matched to at scale** — not "PECD doesn't have a finer product."
4. **PEON/PEOF are not NUTS regions.** A separate ENTSO-E-style zone
   scheme that happens to tile Germany differently than NUTS boundaries do.
5. **Three different linking mechanisms, one per technology** (this is the
   technical heart of the video):
   - **Solar & wind onshore → NUTS3 → NUTS2**: MaStR's `municipality_key`
     (Gemeindeschlüssel/AGS — explicitly *not* the postal code) joined to
     a LAU→NUTS3 Eurostat correspondence table; NUTS2 = first 4 characters
     of the NUTS3 code.
   - **Wind onshore → PEON** (separately from the NUTS crosswalk above,
     for the finer wind-specific product): real (lon, lat) matched against
     the 0.25° PEON raster mask, with a plant's capacity **fractionally
     split across every zone with nonzero weight at its cell** — not
     nearest-point assignment.
   - **Wind offshore → PEOF**: no municipality at sea, so MaStR's own
     `sea_location` field (Nordsee/Ostsee) is used directly. Simpler
     mechanism, but worth flagging: 3 of PEOF's 6 zones are 100% NaN in
     PECD (a real, documented data gap).
6. **PECD's own technology split for solar doesn't match MaStR's
   categories.** PECD splits solar into 4 CDS technology codes: industrial
   rooftop, residential rooftop, utility fixed-tilt, utility tracking.
   MaStR's own PV categorization runs along a different axis entirely —
   feed-in type (full grid feed-in vs. partial/self-consumption) and a
   separate `installation_type` (rooftop / balcony / ground-mounted). Two
   taxonomies that don't line up one-to-one — a genuine reconciliation
   problem, not just a rename.
7. **Battery co-location**, i.e. "does this PV unit have a co-located
   battery": MaStR's own explicit field (`SpeicherAmGleichenOrt`) turned
   out to hold garbage values and was rejected; the working method is a
   join on `LokationMastrNummer` (shared site ID) between solar and
   storage units — 73.3% match rate, vs. only 42.5% via storage's own
   explicit reverse-link field. Combined with feed-in type, gives 4 PV
   categories (full_feed_in, self_consumption_with_storage,
   self_consumption_no_storage, unknown) with very different typical
   sizes (full feed-in mean 55.1 kW vs. ~9-10 kW for the two
   self-consumption categories) — a nice proxy for "utility-scale vs.
   household."
8. **The payoff formula**: `potential(t) = Σ_regions CF(t) × capacity`,
   capacity broadcast from a monthly panel to hourly (installed capacity
   only changes monthly; the capacity factor is what moves hour to hour).
   NaN capacity factors (PECD-unmodeled zones) are excluded from the sum,
   not zero-filled.
9. **What's explicitly out of scope for this video**: behind-the-meter
   self-consumption and grid-congestion curtailment separate "potential"
   from what actually reaches the grid — named as the open gap, not solved
   here (natural forward pointer to `weather-forecasting-renewables-part2`'s
   loss-stack chapter, without reusing any of its scenes).

## Draft chapter mapping (target ~30-40 scenes)

### Chapter 1 — What's actually in MaStR (~3 scenes)
Germany's public plant register, self-reported by operators, refreshed
daily. Not just PV/wind — a technology checklist reveal: solar, wind,
biomass, hydro, geothermal-adjacent (gsgk), battery storage. Then narrow:
"this story follows three of these" — PV, wind, storage highlighted, rest
dimmed.

### Chapter 2 — One record, one plant (~3 scenes)
The "is it an event?" question, answered carefully: one row per unit, a
periodic snapshot — but with a real structural catch. The temporary-
shutdown fields only have room for *one* episode per row, so a plant that
went offline for maintenance multiple times can't have all of that
history in a single export. Diagram: a plant's lifecycle as a bar from
commissioning to shutdown (or "ongoing"), with a maintenance dip shown
disappearing from the record once it's over — contrasted with quarterly
archived snapshots (Jan/Apr/Jul/Oct) as the only way to reconstruct
multiple episodes after the fact.

### Chapter 3 — Filtering out the noise (~2 scenes)
Given chapter 2's limits, the pipeline's actual filter is deliberately
simple: has a commissioning date, has positive capacity, has a resolvable
region — not branching on the unreliable status/shutdown fields.
~1.1% of raw rows dropped.

### Chapter 4 — What survives: one plant's master-data card (~2 scenes)
Live period, technical specs (capacity; PV orientation + tilt bucket),
location (municipality key, not postal code).

### Chapter 5 — What PECD actually provides (~3 scenes)
Capacity factors (0-1, dimensionless), hourly, per technology and region.
PECD does publish a real 0.25° grid — but we deliberately work at
NUTS2 (solar) / PEON (wind onshore) / PEOF (wind offshore) instead, both
for data volume and because it's the level MaStR capacity can realistically
be matched to at scale. A genuine tradeoff, made explicit, not a
limitation of PECD itself.

### Chapter 6 — Linking PV: municipality → NUTS2 (~3 scenes)
Municipality key → NUTS3 (LAU-NUTS correspondence) → NUTS2 (first 4
chars). Zoom-out map animation: one dot → its NUTS3 polygon → the NUTS2
polygon it belongs to.

### Chapter 7 — Linking wind onshore: PEON zones (~3-4 scenes)
PEON ≠ NUTS. Real coordinates matched against the 0.25° PEON raster mask;
capacity fractionally split across every zone with nonzero weight at a
plant's cell, not nearest-point. Diagram: a plant near a zone boundary
splits its capacity into weighted shares.

### Chapter 8 — Linking wind offshore: PEOF and sea location (~2-3 scenes)
No municipality at sea — MaStR's `sea_location` (Nordsee/Ostsee) used
directly. Simpler than onshore, but flag the real data gap: 3 of 6 PEOF
zones are 100% NaN in PECD.

### Chapter 9 — Two taxonomies for solar (~2-3 scenes)
PECD's 4 solar sub-technologies (industrial/residential rooftop, utility
fixed/tracker) vs. MaStR's feed-in-type/installation-type axis — they
don't map one-to-one; a genuine reconciliation problem.

### Chapter 10 — Extra plant characteristics: battery co-location (~3
scenes)
MaStR's own co-location field is unreliable; the working method joins on
a shared site ID (73.3% match vs. 42.5% via the alternative field).
Combined with feed-in type → 4 PV categories, very different typical
sizes — a proxy for utility-scale vs. household self-consumption.

### Chapter 11 — Multiply: potential generation (~2 scenes)
`potential(t) = Σ CF(t) × capacity`, capacity held monthly, broadcast to
hourly; NaN capacity factors excluded, not zero-filled. Formula reveal
slide, same idiom as Part 1/2.

### Chapter 12 — What's still missing, on purpose (~2 scenes)
Behind-the-meter self-consumption and grid-congestion curtailment
separate "potential" from what the grid actually sees — named, not solved
here. Forward pointer to Part 2's loss-stack material without reusing it.

### Conclusion — the whole chain, recapped (~2 scenes)
MaStR (scoped + filtered) → matched to PECD's region scheme, one method
per technology → multiplied by capacity factor → potential generation,
ready to feed into Part 2's Dunkelflaute/merit-order chain.

**Rough total: ~32 scenes across 12 chapters + conclusion** — fits the
"detailed, Part 1/2-style" target.

## Custom diagram candidates (visual-heavy, per Part 1/2 precedent)

1. Technology checklist / icon grid, narrowing to PV+wind+storage
2. Plant-lifecycle timeline bar (snapshot-with-validity-window, not an
   event log)
3. Filter funnel (raw → dropped → kept)
4. Master-data card reveal (identity, live period, specs, location)
5. Region-hierarchy zoom for solar/wind-onshore's NUTS crosswalk
   (municipality dot → NUTS3 → NUTS2)
6. Fractional zone-weight split for wind onshore → PEON
7. Offshore sea-location → PEOF assignment + NaN-zone gap callout
8. Two-taxonomy mismatch diagram (PECD's 4 solar sub-techs vs. MaStR's
   feed-in/installation-type axis)
9. Location-join match-rate diagram for battery co-location
10. Final multiply formula + resulting potential-generation curve

Open question: which of these get bespoke SVG treatment vs. fold into
generic `text_slide`/`checklist_step` — decide once a first
`storyline.yaml` draft shows real pacing, same as Part 1/2.

## Status

2026-09-19: outline drafted from source-repo research (see this session's
notes for full fact list with file:line references). Two corrections made
after user pushback, both verified rather than asserted from memory:
(1) MaStR's temporary-shutdown fields hold only one episode per row — a
real structural limit, not an unused-but-harmless field, and whether a
fuller change history exists at the true source (e.g. a per-unit
"Datenhistorie" in the web portal) is explicitly left unconfirmed rather
than guessed at; (2) PECD genuinely publishes a 0.25° grid (confirmed via
the CDS catalog page), and `pecd-power-validity-DE` skips it for data
volume, not because it doesn't exist — corrected throughout the outline.

First draft built same session: `project.yaml` (English narration, same
`google`/`chris_en`/`en-US-Chirp3-HD-Achird` TTS setup as Part 1/2),
`storyline.yaml` (36 scenes across 12 chapters + conclusion, generic
`text_slide`/`checklist_step` styles only, no bespoke diagrams yet),
`deck.html` (trimmed copy of Part 2's — same CSS shell/teal-orange
palette/ICONS registry/manual-preview driver, all of Part 2's bespoke
`pv_cloud_step`/`wind_turbine_step`/etc. diagram code stripped since none
of it is topically relevant here; added one small extension over Part
2's checklist renderer — an optional `dim: true` per-item flag, used in
chapter 1's "narrow down to three technologies" beat). `deck-scenes.js`
generated via `scripts/generate_deck_scenes.py`. Verified via headless
Playwright across all 36 scenes: no console/page errors, no real overflow
(1920×1080 stable after allowing transitions to settle).

Not yet built: 9 of the 10 diagram candidates above (all still just
candidates), narration/recording (not run through the pipeline yet).

2026-09-19 (same session): user asked to open with the goal itself —
a PECD capacity-factor time series multiplied by a MaStR installed
capacity — rather than diving straight into MaStR's internals. Checked
Part 2 for something reusable first: its `weights_step` diagram is the
closest existing thing (a real CF×capacity dot-product), but makes a
different point (regional reallocation across 4 Bundesländer), so built
a new, simpler diagram instead — `cf_capacity_step` (3 steps: CF(t) curve
alone → + an installed-capacity bar → multiply into a potential(t) curve,
same shape, rescaled y-axis from 0–1 to 0–capacity, closing on the
`potential(t) = CF(t) × capacity` caption). Added as a new chapter 0,
"The goal" (4 scenes, the diagram's 3 steps + a bridging thesis scene
into chapter 1). Deck is now 39 scenes across 13 chapters + conclusion.
Verified via headless Playwright (no errors, no overflow) and screenshot
review of all 3 diagram steps.

2026-09-19 (same session, continued): two more rounds of user feedback,
both applied.

1. User questioned why maintenance data would be filtered at all, given
   one-row-per-plant — correctly spotted that the prior "filtering out
   the noise" framing implied maintenance status might be used as an
   exclusion criterion, when it isn't. Old chapters 2+3 (6 scenes: the
   "event vs. plant" question, the one-episode-per-row limit, a dedicated
   "does a plant under maintenance still count" scene, then the filter)
   collapsed into one leaner chapter 2 (3 scenes): state directly that
   one row is one plant, mention the unused maintenance field in one
   aside, then state the real filter (broken data: missing commissioning
   date/capacity/location, ~1.1% of rows) with the stats folded in.
   Chapters renumbered 3-11 down by one throughout.
2. User asked for a concrete example and a map for the municipality→NUTS2
   crosswalk chapter, reusing something from Part 2 if possible. Part 2
   has the Germany outline (`DE_OUTLINE`/`deProject`, Natural Earth
   1:110m) but no municipality/NUTS crosswalk visual — copied the
   outline/projection code in, then built a new diagram,
   `municipality_nuts_step` (3 steps: point → NUTS3 ring → NUTS2 ellipse
   growing around it), using a *real* example pulled directly from
   `mastr-power-capacities-germany`'s own LAU-NUTS correspondence table
   (`data/downloads/lau_nuts_correspondence.parquet`, row 0):
   `08111000` (Stuttgart) → `DE111` → `DE11`, confirmed against Eurostat's
   NUTS nomenclature via web search. The NUTS3/NUTS2 shapes themselves
   are illustrative circles/ellipses at Stuttgart's real coordinates, not
   surveyed Stadtkreis/Regierungsbezirk boundaries — stated as such in
   code comments. First label layout (stacked directly on the map next
   to the point) collided badly once all three labels were active at
   step 3 — fixed by moving all three into a side label stack with a
   dashed leader line back to the point, verified clean via screenshot.

Deck is now 38 scenes across 12 chapters + conclusion (net: -1 from the
chapter-2/3 merge, +3 from the new municipality/NUTS diagram replacing 2
plain-statement scenes). Two custom diagrams now built (`cf_capacity_step`,
`municipality_nuts_step`) against 8 remaining candidates from the original
list. Verified via headless Playwright, no errors/overflow.

2026-09-19 (same session, continued further): user shared 4 real
reference charts from their own notebooks (installed-capacity growth
area chart, NUTS3 solar choropleth, PEON/PEOF grid-zone maps) and asked
for JS-rebuilt versions in the deck, but first wanted a specific
conceptual question clarified: for wind onshore, does installed capacity
per PEON zone get derived from NUTS2 capacity, or some other way?

**Clarified first, verified against actual pipeline code**
(`mastr-power-capacities-germany/pipeline/07_build_wind_zone_panel.py`):
wind onshore's capacity-by-PEON-zone panel does *not* go through NUTS2 at
all — it's a fully separate, parallel pipeline straight from each plant's
real (lon, lat) + capacity, matched directly against the same 0.25°
raster mask that defines the PEON zones, fractionally split per cell.
The docstring states outright: "PECD v4.2 offers no NUTS-level spatial
aggregation for wind capacity factors (unlike solar, which joins cleanly
at NUTS2)." This corrected the storyline's implicit framing and is now
explicit in the wind-onshore chapter's narration.

**Three new diagrams built, all on real vendored data** (`data/`
directory, ~120KB total, pulled directly from the two source repos'
processed outputs, not re-derived):

1. `peon_grid_step` (3 steps) — the actual PEON raster mask (843 cells,
   7 zones, from `mastr-power-capacities-germany/data/processed/
   pecd_region_mask_peon.parquet`), colored by dominant zone per cell,
   with one real multi-zone example cell (48.25N/10.0E: DE06 67% / DE07
   33%) called out concretely, then a plant's capacity fractionally
   splitting the same way. Replaces the wind-onshore chapter's old plain
   statement scenes. 7-color categorical palette pulled from the dataviz
   skill's validated default theme (first 7 of 8 slots) — ran
   `validate_palette.js` directly: adjacent-pairs PASS in both CVD and
   normal-vision checks; all-pairs FAILs past 3 slots (expected/documented
   for >3 categories), mitigated per the skill's own guidance with a
   legend plus direct zone-code labels so identity is never color-alone.
2. `capacity_growth_step` (2 steps) — real annual Germany wind+solar
   installed capacity, 1990-2026, computed directly from
   `capacity_events.parquet` (live-as-of-Dec-31 each year, summed
   plant-by-plant) — not the user's original chart re-embedded, but
   independently recomputed from the same source table, matching its
   shape closely. Added as new scenes in chapter 1 (MaStR overview) as
   concrete evidence of scale.
3. `nuts3_choropleth_step` (2 steps) — real solar installed capacity by
   NUTS3 region (400 regions), joining `capacity_events.parquet` against
   Eurostat's actual NUTS boundary geometries
   (`mastr-power-capacities-germany/data/downloads/nuts_regions.geojson`,
   simplified via `geopandas.simplify(0.04)` from ~9,463 to ~5,201
   boundary points, ~86KB vendored). Sequential single-hue (warm/orange)
   ramp, light→dark by capacity, per the dataviz skill's magnitude rule.
   Real headline fact surfaced: highest region is Mecklenburgische
   Seenplatte (1,312 MW) — a rural region, not a big city, a nice
   concrete "installed capacity isn't about density" beat. Added right
   after the Stuttgart municipality→NUTS2 chapter as the "zoom out to the
   whole country" payoff.

All three verified via headless Playwright (no errors) and direct
screenshot review; one real layout bug caught and fixed on
`peon_grid_step` before storyline wiring — the step-3 callout box
(capacity-split numbers) was first positioned near the example cell and
collided with the DE07 zone label sitting right behind it; fixed by
moving the callout to the open space right of the map with a dashed
leader line back to the cell, mirroring the pattern already proven in
`municipality_nuts_step`.

Deck is now 42 scenes across 12 chapters + conclusion. Five custom
diagrams now built (`cf_capacity_step`, `municipality_nuts_step`,
`peon_grid_step`, `capacity_growth_step`, `nuts3_choropleth_step`)
against 5 remaining candidates from the original 10 (offshore
sea-location callout, the two-taxonomy solar mismatch, the battery
co-location match-rate diagram, and the final multiply/what's-missing
beats are all still plain text_slide/checklist scenes).

2026-09-19 (same session, continued further still): first full pipeline
run — `uv run video-creator mastr-pecd-linking build` (narrate via
google/en-US-Chirp3-HD-Achird, record via Playwright, assemble) —
succeeded end to end on the first try, no errors. `output/
mastr-pecd-linking.mp4`, ~576s (9.6 min), 1920×1080.

After watching it, two follow-up questions from the user, both verified
against real data/docs before answering (not from memory):

1. **Does PEOF really have unmodeled zones, as the video claims?**
   Confirmed directly against the downloaded PECD data itself
   (`pecd-power-validity-DE/data/processed/
   pecd_wind_offshore_capacity_factors.parquet`): of the 6 PEOF zone
   columns, `DE013_OFF`/`DE014_OFF`/`DE015_OFF` are 100% NaN across the
   entire time series; only `DE011_OFF`/`DE012_OFF`/`DE02_OFF` carry real
   values. Matches the video's claim exactly.
2. **Does PECD have multiple wind technologies too, like solar's 4
   sub-types?** Yes, and more elaborate than solar's — verified against
   PECD v4.2's actual product user guide (ECMWF Confluence), not
   inferred: an "existing fleet" option (WindPowerNet 2020 database —
   what this project uses, onshore code 30 / offshore code 20) plus a
   separate set of hypothetical future-turbine combinations (9 onshore:
   3 specific-power classes × 3 hub heights, codes 31-39; 2 offshore:
   codes 21-22), each further split by "resource grade" (ReGrA = best
   10% of sites, ReGrB = next 10-50%) — a site-quality axis, independent
   of turbine hardware. Resolved a loose end from earlier research: the
   repo's `resource_grade_b` choice for the existing fleet isn't
   arbitrary — the PUG states ReGrB is the *only* grade existing-fleet
   data is published under; ReGrA only applies to the future-turbine
   options. New chapter-4 scene added ("WHICH WIND, EXACTLY") stating
   this explicitly — the existing-fleet choice mirrors MaStR's own
   description of today's real fleet, not a hypothetical future one, the
   same framing already used for the grid-vs-aggregate choice.

Deck is now 43 scenes across 12 chapters + conclusion. Verified via
headless Playwright, no errors/overflow.

2026-09-19 (same session, continued further still): while a background
verification ran, user asked a design question — how would you push the
whole potential-generation calculation to full 0.25° grid resolution
instead of stopping at NUTS2/PEON/PEOF? Answered without building
anything yet: wind is already halfway there (MaStR gives real
coordinates — point-in-cell needs no fractional split, unlike the
current PEON-zone approach); solar only has municipality/NUTS-level
location, so it needs either (a) area-weighting a region across
overlapping grid cells (the same technique PECD's own PEON/PEOF masks
already use, just applied to admin polygons) or (b) municipality
centroid coordinates, sourced separately (not in any of the three repos
today), placed directly like a wind plant — no area math needed, same
trick reused. Noted the real reason nobody's built this: the actual
gridded CF product is never downloaded anywhere in this project's
source repos, only the region-aggregated one (GB-scale download).

Then, back on the PEOF gap: user pushed on whether "3 of PEOF's 6 zones
are empty" might just be an artifact of *which* PECD technology
parameter got requested, not a real PECD limitation — a sharp catch,
since `pecd-power-validity-DE`'s download script literally copied
`pecd-replication`'s exact request (technology 20, resource_grade_b), so
the earlier "independently confirmed" framing didn't actually hold up.
Tested directly against the live CDS API rather than continuing to
speculate: requested wind_offshore_capacity_factor at PEOF with
technology 21 (a hypothetical future turbine class) instead of 20
("existing fleet") — **all 6 zones came back with real data**, including
the 3 that are 100% NaN under technology 20. Cross-checked the empty
zones' coordinates against the vendored PEOF mask: all three sit in the
North Sea, further offshore than the zones that do have data. Conclusion:
the "gap" is specific to the "existing fleet" technology choice, not a
PECD-wide limitation — Germany simply hadn't built anything in those
further-out zones as of the existing-fleet reference year, so there's
nothing there for a fleet-based dataset to model, while the future-tech
variant simulates a hypothetical turbine everywhere regardless of what's
actually built. Corrected the offshore chapter's closing scene to state
this precisely instead of the vaguer "PECD data gap" framing.

**New chapter 11, "Going even more granular," built** (5 scenes,
`grid_path_step`, 3-step custom diagram): a thesis intro, then the
diagram illustrating both paths just discussed — wind's direct
point-in-cell placement, solar's area-weighted-region option, solar's
municipality-centroid option — closing on a statement that this is
deliberately not built here, for data-volume reasons, not because it's
wrong. Explicitly schematic/illustrative geometry, not real PECD grid
data (stated as such in code comments) — unlike this project's other
diagrams, which all use vendored real data, there's no real gridded
product on hand to visualize. One real bug caught and fixed before this
was usable: the grid's own cell outlines were essentially invisible
(`var(--grid)` against the page background, near-zero contrast) and
point labels overlapped the highlighted cell's corner — fixed by
switching to `var(--fg-dim)` at partial opacity for gridlines and
repositioning labels below their cell instead of diagonally offset.

Deck is now 48 scenes across 13 chapters + conclusion. Six custom
diagrams built total (`cf_capacity_step`, `municipality_nuts_step`,
`peon_grid_step`, `capacity_growth_step`, `nuts3_choropleth_step`,
`grid_path_step`). Verified via headless Playwright, no errors/overflow.

Next: user review of the updated storyline, then a re-run of the full
pipeline once further edits settle, and a decision on which of the
remaining diagram candidates (offshore sea-location callout, battery
co-location match-rate diagram) actually get built.
