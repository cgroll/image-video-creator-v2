# Talk "Weather Forecasting for Renewables" — Outline

Starting point for `storyline.yaml`. Working title only — revisit once the
narrative is locked down.

## Initial instructions (verbatim ask)

- explain the importance of weather for power generation of renewables (PV,
  wind, hydro)
- explain what ERA5 is (regular grid on earth, harmonized data from measured
  stations that are not regularly distributed), variables of ERA5: mention
  some important ones, different pressure levels, jet stream
- ERA5 is an estimated reconstruction of weather based on some observations
  (-> similar to Kalman filter?)
- earth2studio to run weather models
- ensemble models
- run it on A100 eg with nvidia launchable
- how to evaluate whether a weather model is good or not (google weather
  bench 2)

## Draft chapter mapping

Not final — a first attempt at ordering the bullets above into a talk arc.

1. **Why weather matters for renewables** — PV needs irradiance/cloud cover,
   wind needs wind speed & direction at hub height, hydro needs
   precipitation & snowmelt/runoff. Grid operators need forecasts to balance
   supply and demand and to trade.
2. **ERA5, the reference dataset** — regular global lat/lon grid; blends
   station, ship, buoy, satellite, radiosonde observations that are
   themselves irregularly distributed; a few key variables (2m temperature,
   10m wind, surface solar radiation, precipitation, mean sea level
   pressure); pressure levels (not just the surface); the jet stream as a
   concrete example of an upper-air feature.
3. **How ERA5 is actually built** — it's a *reconstruction*, not a direct
   measurement everywhere: a short-range background forecast is corrected by
   real observations to produce the "analysis." Intuition bridge: this is
   the same predict/update idea as a Kalman filter (with the caveat that the
   real system, 4D-Var, is more elaborate).
4. **Running weather models: earth2studio** — NVIDIA's Python library for
   running AI weather models (FourCastNet, GraphCast, Pangu-Weather, etc.)
   against standard gridded initial conditions.
5. **Ensemble models** — the atmosphere is chaotic, so one forecast isn't
   enough; perturb initial conditions/weights, run many forecasts, use the
   spread as an uncertainty estimate. Tie back to renewables: probabilistic
   forecasts support risk-aware grid operation and trading.
6. **Compute: A100s and NVIDIA Launchable** — AI weather models run
   inference in seconds-to-minutes on a single A100 vs. hours on a
   supercomputer for classical NWP; Launchable as a one-click reproducible
   GPU environment to try this without local setup.
7. **Evaluating models: WeatherBench 2** — Google Research's standardized
   benchmark; common metrics (RMSE, ACC, CRPS for ensembles), common
   baselines (ERA5 as ground truth, HRES), a leaderboard comparing AI models
   against physics-based NWP.

## Open questions

- Audience and target length? (unspecified so far — assume a technical
  audience similar to the vibe-coding-context talk until told otherwise)
- Which AI weather model(s), if any, get a dedicated slide vs. a passing
  mention?
- Whether to build bespoke diagrams (ERA5 grid-vs-stations, Kalman
  filter predict/update, ensemble spread fan chart) or lean on the existing
  generic slide styles for the first draft.

## Status

First `storyline.yaml` draft used only the existing generic slide styles
(`text_slide` statement/thesis/cta, `checklist_step`) — no bespoke SVG
diagrams. Since then, one custom diagram has been added:

**Built: ERA5 grid globe → flat-map unroll** (scenes 11–13, `visual.kind:
era5_globe_step`). A reduced Gaussian grid (N=24 Gauss-Legendre latitudes,
756 points, longitude count thinning toward the poles as
`round(48*cos(lat))`) rendered on a sphere via an orthographic projection,
which morphs into an equirectangular flat map with real country outlines —
hand-rolled SVG/JS, no 3D engine or geo library. Mechanism: country
outlines and grid points are each projected two ways (orthographic /
equirectangular) from the same point lists, and the browser's native CSS
`d`-property and `cx`/`cy` transitions interpolate between the two smoothly
(both projections share identical path structure, so no runtime spherical
clipping is needed — the world outline was pre-clipped to the front
hemisphere once, at data-build time, for a fixed camera angle
`GLOBE_CAMERA = {lon0:10, lat0:15}`). Implementation lives in
`deck.html`'s `era5-*` CSS classes and `setEra5GlobeStep`/`buildEra5GlobeSVG`
functions.

Data: `assets/geo/era5-grid-data.js` (vendored, ~220KB) — world country
outlines from Natural Earth 1:110m Admin 0 Countries (public domain, via
github.com/nvkelso/natural-earth-vector), point-decimated (rings capped at
~80 points). Gaussian grid coordinates were generated directly from
`numpy.polynomial.legendre.leggauss`, not sourced externally.

Two separate country-outline sets, not one: `WORLD_SUBPATHS_CLIPPED`
(pre-clipped to the front hemisphere for the fixed camera; Antarctica and
French Southern/Antarctic Lands excluded — they only produced disconnected
slivers near the visibility horizon) drives the globe phase and its morph;
`WORLD_SUBPATHS_FULL` (every country, complete rings, flat coordinates
only) cross-fades in as the clipped set fades out, so the finished flat map
shows the *entire* world rather than only whatever was front-facing on the
globe. First version used only the clipped set for both phases, which left
the flat map cut off at the old globe's horizon (caught by user review of a
screenshot) — the two-layer cross-fade fixed it.

**Grid design confirmed correct, not a bug**: user initially read the
flat map (sparse dots near the poles, dense at the equator) as backwards,
expecting a *regular* lat-lon grid's signature instead (equidistant on the
flat map, bunching near the poles on a globe). Talked through the physics:
a *reduced* Gaussian grid deliberately drops points per row toward the
poles specifically so real (km) spacing stays roughly constant at every
latitude — the opposite of a regular grid, and the entire reason "reduced"
grids exist. User confirmed after the explanation: keep the reduced-grid
depiction as built.

**Built: reanalysis mechanics, three diagrams** (chapter 3, scenes 29-36) —
expands "predict, then correct" into what the correction step actually
involves, replacing the placeholder "Kalman-filter predict/update loop"
candidate below:
1. `era5_qc_step` — quality control: a background band, a row of
   observations, one outlier gets flagged then excluded.
2. `era5_interp_step` — spatial blending: a real Gaussian-weighted
   correction bends a smooth background curve toward scattered
   observations (actual math, not a hand-drawn approximation), relaxing
   back to the background shape away from any observation.
3. `era5_window_step` — the temporal window: contrasts a real-time system
   (Kalman *filter*, backward-looking only) against a reanalysis (Kalman
   *smoother*, symmetric window) — ERA5 specifically uses 12-hour 4D-Var
   windows, with accuracy smallest in the middle of each window (both
   facts verified against ECMWF's own documentation, not assumed).

Remaining candidate for a follow-up pass:

1. Ensemble spread (one deterministic line vs. a fan of perturbed runs) —
   note chapter 5 already got two *real* ensemble visuals this session
   (ECMWF meteogram, Google Weather Lab cyclone tracks — see below), so
   this hand-rolled version may no longer be needed.
