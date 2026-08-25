const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "We have a forecast.\nNow what?\n"
    },
    "text": "In part one we built a weather forecast — wind speed, irradiance, all the raw ingredients. This chapter is about the next step: turning that forecast into an actual number of megawatts, and eventually, a price.",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Nameplate capacity is a ceiling.\nWeather decides how close\nyou actually get to it.\n"
    },
    "text": "Every wind farm and solar park has a nameplate number stamped on it — the absolute maximum it could ever produce, running flat out, all the time. In practice, it almost never gets there.",
    "type": "slide"
  },
  {
    "id": 3,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "CAPACITY FACTOR",
      "latex": "CF(t) = \\dfrac{\\text{actual output}(t)}{\\text{installed capacity}}",
      "note": "A number between 0 and (almost) 1 — what fraction of nameplate the fleet actually delivered, hour by hour."
    },
    "text": "The number that captures that gap is the capacity factor: actual output, divided by nameplate capacity. A value near zero means the fleet is barely producing; a value near one means it's running at full tilt.",
    "type": "slide"
  },
  {
    "id": 4,
    "visual": {
      "kind": "pv_cloud_step",
      "kicker": "PV PHYSICS: IRRADIANCE AND CLOUD COVER",
      "step": 1
    },
    "text": "So what actually drives that number, minute by minute? Start with a single panel, tilted to catch the sun. Under a clear sky, it's producing close to its ceiling.",
    "type": "slide"
  },
  {
    "id": 5,
    "visual": {
      "kind": "pv_cloud_step",
      "kicker": "PV PHYSICS: IRRADIANCE AND CLOUD COVER",
      "step": 2
    },
    "text": "Now watch a thick cloud drift across. Irradiance drops fast — and the panel's own output curve drops with it, in the same instant, not on some delay.",
    "type": "slide"
  },
  {
    "id": 6,
    "visual": {
      "kind": "pv_cloud_step",
      "kicker": "PV PHYSICS: IRRADIANCE AND CLOUD COVER",
      "step": 3
    },
    "text": "As the cloud thins out, some sunlight still gets through — a partial dip, not an on-off switch. Cloud cover isn't binary, and neither is the output that follows it.",
    "type": "slide"
  },
  {
    "id": 7,
    "visual": {
      "kind": "pv_cloud_step",
      "kicker": "PV PHYSICS: IRRADIANCE AND CLOUD COVER",
      "step": 4
    },
    "text": "Once the sky clears again, output recovers just as fast. This is the actual mechanism sitting inside a capacity factor — not a fixed number, but weather, converted into power, minute by minute.",
    "type": "slide"
  },
  {
    "id": 8,
    "visual": {
      "kind": "pv_cloud_step",
      "kicker": "PV PHYSICS: IRRADIANCE AND CLOUD COVER",
      "step": 5
    },
    "text": "Orientation matters too. Replay that exact same cloudy stretch, but rotate the panel to a worse angle throughout — same weather, same ups and downs, just a lower ceiling the whole way through.",
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "pv_cloud_step",
      "kicker": "PV PHYSICS: IRRADIANCE AND CLOUD COVER",
      "step": 6
    },
    "text": "Do it again with a different panel technology instead — same weather, same four moments again — and you get a third ceiling, neither the original nor the rotated one. Capacity factor isn't just about weather; it's about the specific plant, too.",
    "type": "slide"
  },
  {
    "id": 10,
    "visual": {
      "kind": "wind_turbine_step",
      "kicker": "WIND PHYSICS: WIND SPEED HITTING A TURBINE",
      "step": 1
    },
    "text": "The same idea holds for wind. In a light breeze, the blades barely turn, and the turbine is only producing a trickle.",
    "type": "slide"
  },
  {
    "id": 11,
    "visual": {
      "kind": "wind_turbine_step",
      "kicker": "WIND PHYSICS: WIND SPEED HITTING A TURBINE",
      "step": 2
    },
    "text": "As wind speed picks up, the blades spin faster — and output climbs with it, closely tracking the wind.",
    "type": "slide"
  },
  {
    "id": 12,
    "visual": {
      "kind": "wind_turbine_step",
      "kicker": "WIND PHYSICS: WIND SPEED HITTING A TURBINE",
      "step": 3
    },
    "text": "Push wind speed high enough, and the turbine reaches its rated output — spinning at its designed maximum, producing at its nameplate ceiling.",
    "type": "slide"
  },
  {
    "id": 13,
    "visual": {
      "kind": "wind_turbine_step",
      "kicker": "WIND PHYSICS: WIND SPEED HITTING A TURBINE",
      "step": 4
    },
    "text": "But push wind too far, and the turbine has to protect itself: past a cut-out speed, it deliberately stops generating altogether — not because the wind stopped, but because it got dangerously strong.",
    "type": "slide"
  },
  {
    "id": 14,
    "visual": {
      "kind": "wind_power_curve_step",
      "kicker": "THE POWER CURVE",
      "step": 1
    },
    "text": "Put those same wind-speed effects on a proper chart, and you get a turbine's power curve: flat at zero below a cut-in speed, a steep ramp through the middle, a flat rated-power plateau, then a hard cut-out at the top — this exact shape.",
    "type": "slide"
  },
  {
    "id": 15,
    "visual": {
      "kind": "wind_power_curve_step",
      "kicker": "THE POWER CURVE",
      "step": 2
    },
    "text": "And the curve itself depends on which turbine you're looking at. A different model needs more wind to start, tops out at a different level, and shuts down at a different speed — which is exactly why a fleet-wide forecast needs to know each plant's specific turbine type, not just the wind at its location.",
    "type": "slide"
  },
  {
    "id": 16,
    "visual": {
      "kind": "fleet_map_step",
      "kicker": "FROM ONE PLANT TO A WHOLE FLEET",
      "step": 1
    },
    "text": "Notice what all of this needed: know one plant's exact location, its orientation or hub height, its turbine or panel type — combine that with the weather at that location, and physics gives you its output directly. No statistics required.",
    "type": "slide"
  },
  {
    "id": 17,
    "visual": {
      "kind": "fleet_map_step",
      "kicker": "FROM ONE PLANT TO A WHOLE FLEET",
      "step": 2
    },
    "text": "Now scale that up to an entire country. Every dot here is a plant — some capturing wind, some capturing sun — and every single one needs its own location, orientation, and technology known before you can add them all up.",
    "type": "slide"
  },
  {
    "id": 18,
    "visual": {
      "kind": "fleet_map_step",
      "kicker": "FROM ONE PLANT TO A WHOLE FLEET",
      "step": 3
    },
    "text": "Which is exactly what a plant register like MaStR provides: not an average, not an estimate — the real, specific details of every plant in the fleet. That's what makes a physically grounded regional forecast possible at all.",
    "type": "slide"
  },
  {
    "id": 19,
    "visual": {
      "kind": "fleet_snapshot_step",
      "kicker": "THE FLEET NEVER STOPS CHANGING",
      "step": 1
    },
    "text": "Here's Germany's fleet again — but MaStR doesn't just know it once. It knows it exactly, continuously, plant by plant, for whatever moment you ask.",
    "type": "slide"
  },
  {
    "id": 20,
    "visual": {
      "kind": "fleet_snapshot_step",
      "kicker": "THE FLEET NEVER STOPS CHANGING",
      "step": 2
    },
    "text": "And it keeps growing. New turbines, new panels, connecting every month — the fleet you'd need to track never stops changing.",
    "type": "slide"
  },
  {
    "id": 21,
    "visual": {
      "kind": "fleet_snapshot_step",
      "kicker": "THE FLEET NEVER STOPS CHANGING",
      "step": 3
    },
    "text": "And it keeps growing, year after year — there's no natural point where the fleet just stops changing.",
    "type": "slide"
  },
  {
    "id": 22,
    "visual": {
      "kind": "fleet_snapshot_step",
      "kicker": "THE FLEET NEVER STOPS CHANGING",
      "step": 4
    },
    "text": "Which is exactly why PECD doesn't try to track every plant forever. Instead, it freezes the real, known mix — real locations, real orientations, real technology split — into one representative pattern per region. And that mix genuinely differs from region to region: not just how much capacity, but which turbine models make it up — different rotor designs, different hub heights, in different proportions. So even identical wind can turn into a different capacity factor, region by region.",
    "type": "slide"
  },
  {
    "id": 23,
    "visual": {
      "kind": "fleet_snapshot_step",
      "kicker": "THE FLEET NEVER STOPS CHANGING",
      "step": 5
    },
    "text": "And installed capacity is a separate knob entirely: change it, and the output changes with it — no new plant details required.",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Aggregate across that pattern,\nnormalize to 0-1 —\none capacity factor per region.\n"
    },
    "text": "Aggregate across that frozen pattern and normalize between zero and one — exactly the same capacity-factor idea as before, just one number per region instead of one per plant.",
    "type": "slide"
  },
  {
    "id": 25,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "AN ASSUMPTION, TURNED INTO A DATASET",
      "content": "PECD v4.2"
    },
    "text": "And the assumption goes one step further: scale installed capacity with a similar mix, and that same regional capacity factor should still apply. Which is exactly what PECD does.",
    "type": "slide"
  },
  {
    "id": 26,
    "visual": {
      "kind": "checklist_step",
      "kicker": "PECD v4.2 — THE PAN-EUROPEAN CLIMATE DATABASE",
      "items": [
        "Capacity factor per technology — wind onshore, wind offshore, solar PV",
        "Per zone — national and sub-national regions, not just one Europe-wide number",
        "Built from ERA5 weather, bias-corrected against real turbine and panel behavior"
      ],
      "step": 1
    },
    "text": "PECD publishes capacity factors technology by technology — wind onshore, wind offshore, and solar PV each get their own time series, not one blended renewable number.",
    "type": "slide"
  },
  {
    "id": 27,
    "visual": {
      "kind": "checklist_step",
      "kicker": "PECD v4.2 — THE PAN-EUROPEAN CLIMATE DATABASE",
      "items": [
        "Capacity factor per technology — wind onshore, wind offshore, solar PV",
        "Per zone — national and sub-national regions, not just one Europe-wide number",
        "Built from ERA5 weather, bias-corrected against real turbine and panel behavior"
      ],
      "step": 2
    },
    "text": "And it's per region, not just per country — down to zones small enough to matter, since the wind blowing in one corner of a country can look nothing like the wind in another.",
    "type": "slide"
  },
  {
    "id": 28,
    "visual": {
      "kind": "checklist_step",
      "kicker": "PECD v4.2 — THE PAN-EUROPEAN CLIMATE DATABASE",
      "items": [
        "Capacity factor per technology — wind onshore, wind offshore, solar PV",
        "Per zone — national and sub-national regions, not just one Europe-wide number",
        "Built from ERA5 weather, bias-corrected against real turbine and panel behavior"
      ],
      "step": 3
    },
    "text": "Under the hood, it's the same ERA5 reanalysis from part one, run through a real physical chain — bias-corrected wind speed, hub-height extrapolation, actual power curves — and checked against how real turbines and panels actually behave.",
    "type": "slide"
  },
  {
    "id": 29,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "WHERE INSTALLED CAPACITY COMES FROM",
      "content": "Marktstammdatenregister (MaStR)"
    },
    "text": "A capacity factor alone isn't a megawatt number — you need to know how much capacity you're actually multiplying it by. For Germany, that comes from the Marktstammdatenregister, or MaStR.",
    "type": "slide"
  },
  {
    "id": 30,
    "visual": {
      "kind": "checklist_step",
      "kicker": "MARKTSTAMMDATENREGISTER (MaStR)",
      "items": [
        "Germany's own public plant register",
        "Every plant's location, technology, and capacity",
        "Time-varying — capacity grows year by year as new plants connect"
      ],
      "step": 1
    },
    "text": "MaStR is Germany's own public register of every power plant in the country — required by law, not a private data product.",
    "type": "slide"
  },
  {
    "id": 31,
    "visual": {
      "kind": "checklist_step",
      "kicker": "MARKTSTAMMDATENREGISTER (MaStR)",
      "items": [
        "Germany's own public plant register",
        "Every plant's location, technology, and capacity",
        "Time-varying — capacity grows year by year as new plants connect"
      ],
      "step": 2
    },
    "text": "For every plant it lists where it is, what technology it uses, and how much capacity it adds — the raw ingredients for turning a regional capacity factor into an actual megawatt figure.",
    "type": "slide"
  },
  {
    "id": 32,
    "visual": {
      "kind": "checklist_step",
      "kicker": "MARKTSTAMMDATENREGISTER (MaStR)",
      "items": [
        "Germany's own public plant register",
        "Every plant's location, technology, and capacity",
        "Time-varying — capacity grows year by year as new plants connect"
      ],
      "step": 3
    },
    "text": "And crucially, it's time-varying — the fleet today is not the fleet five years ago. Any honest backtest has to use the capacity that actually existed at each point in time, not today's number applied to the whole history.",
    "type": "slide"
  },
  {
    "id": 33,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "POTENTIAL GENERATION",
      "latex": "P(t) = CF(t) \\times \\text{Capacity}(t)",
      "note": "Capacity factor times installed capacity — in MW, ready to be checked against real, published generation."
    },
    "text": "Put the two together and you have potential generation: capacity factor times installed capacity, in actual megawatts — a number you can finally compare against reality.",
    "type": "slide"
  },
  {
    "id": 34,
    "visual": {
      "kind": "weights_step",
      "kicker": "SAME WEATHER, DIFFERENT WEIGHTS",
      "step": 1
    },
    "text": "Here's that same multiplication, done for real: four regions, each with its own capacity factor right now — driven purely by today's weather — and each with its own installed capacity. Multiply and add, and you get a total.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "weights_step",
      "kicker": "SAME WEATHER, DIFFERENT WEIGHTS",
      "step": 2
    },
    "text": "Now change only the weights — add a lot more capacity to the region that already has the strongest wind today. Same weather, same capacity factors, but the total jumps, because the extra capacity landed exactly where the wind already was.",
    "type": "slide"
  },
  {
    "id": 36,
    "visual": {
      "kind": "weights_step",
      "kicker": "SAME WEATHER, DIFFERENT WEIGHTS",
      "step": 3
    },
    "text": "Which is the whole mechanism in one line: total output is capacity factor times installed capacity, summed across every region — a dot product between what the weather is doing and what you've actually built.",
    "type": "slide"
  },
  {
    "id": 37,
    "visual": {
      "kind": "regional_weights_step",
      "kicker": "TWO TECHNOLOGIES, NOT ONE",
      "step": 1
    },
    "text": "One thing that chart glossed over: a region doesn't really have one capacity factor — it has one per technology. Wind and solar see completely different weather, so give each its own icon on the map, sized by installed capacity, and watch the same mechanism play out with two dimensions instead of one.",
    "type": "slide"
  },
  {
    "id": 38,
    "visual": {
      "kind": "regional_weights_step",
      "kicker": "TWO TECHNOLOGIES, NOT ONE",
      "step": 2
    },
    "text": "Now reallocate: grow wind capacity in Brandenburg, where wind is already decent today, and grow solar capacity in Bavaria, where the sun is out. Same weather everywhere, but total renewable output climbs by half, just from moving capacity to where today's weather already favors it.",
    "type": "slide"
  },
  {
    "id": 39,
    "visual": {
      "kind": "regional_weights_step",
      "kicker": "TWO TECHNOLOGIES, NOT ONE",
      "step": 3
    },
    "text": "The mechanism hasn't changed — just the number of dimensions. Total output is still capacity factor times installed capacity, summed up — now over every region and every technology, not just one.",
    "type": "slide"
  },
  {
    "id": 40,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "CHECKING AGAINST REALITY",
      "content": "SMARD"
    },
    "text": "So how good is that potential-generation number? Germany's grid operators publish the real thing, hour by hour, on SMARD — the natural place to check.",
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Potential ≠ observed.\nThe gap is the interesting part.\n"
    },
    "text": "Line them up, and potential generation almost never matches observed generation exactly. There's a gap — sometimes small, sometimes large — and that gap is worth understanding, not averaging away.",
    "type": "slide"
  },
  {
    "id": 42,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHY POTENTIAL ≠ OBSERVED",
      "items": [
        {
          "icon": "wrench",
          "text": "Repair & outages — technical unavailability, independent of price or grid"
        },
        "Price curtailment — voluntarily switched off when prices go negative",
        "Congestion curtailment — grid operators order a cutback to relieve a bottleneck",
        "Behind-the-meter — self-consumed power the grid never even sees"
      ],
      "step": 1
    },
    "text": "Some of that gap is just outages — a turbine down for repair, a cable fault, scheduled maintenance. Nothing to do with weather or the market, just plants that aren't available.",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHY POTENTIAL ≠ OBSERVED",
      "items": [
        {
          "icon": "wrench",
          "text": "Repair & outages — technical unavailability, independent of price or grid"
        },
        "Price curtailment — voluntarily switched off when prices go negative",
        "Congestion curtailment — grid operators order a cutback to relieve a bottleneck",
        "Behind-the-meter — self-consumed power the grid never even sees"
      ],
      "step": 2
    },
    "text": "Some of it is voluntary: when prices go negative, it can be cheaper to simply switch off than to pay to feed power into the grid.",
    "type": "slide"
  },
  {
    "id": 44,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHY POTENTIAL ≠ OBSERVED",
      "items": [
        {
          "icon": "wrench",
          "text": "Repair & outages — technical unavailability, independent of price or grid"
        },
        "Price curtailment — voluntarily switched off when prices go negative",
        "Congestion curtailment — grid operators order a cutback to relieve a bottleneck",
        "Behind-the-meter — self-consumed power the grid never even sees"
      ],
      "step": 3
    },
    "text": "Some of it isn't voluntary at all: when a local grid bottleneck can't carry all the available power, the operator orders specific plants to cut back — congestion curtailment, expected to grow as more renewables come online faster than the grid does.",
    "type": "slide"
  },
  {
    "id": 45,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHY POTENTIAL ≠ OBSERVED",
      "items": [
        {
          "icon": "wrench",
          "text": "Repair & outages — technical unavailability, independent of price or grid"
        },
        "Price curtailment — voluntarily switched off when prices go negative",
        "Congestion curtailment — grid operators order a cutback to relieve a bottleneck",
        "Behind-the-meter — self-consumed power the grid never even sees"
      ],
      "step": 4
    },
    "text": "And some of it was never lost at all — it just never touched the public grid. Rooftop solar that a household uses itself is real generation, invisible to both the published generation figure and the published demand figure.",
    "type": "slide"
  },
  {
    "id": 46,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Potential generation is a ceiling —\nnot a prediction of what\nactually reaches the grid.\n"
    },
    "text": "Four sources of gap, one lesson: potential generation is a ceiling, not a prediction. What actually reaches the grid is always potential, minus some mix of these losses. With that in mind, the first thing this lets us do is plan.",
    "type": "slide"
  },
  {
    "id": 47,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "How much capacity\nis enough?\n"
    },
    "text": "First use case: sizing. If you're planning a power system — how much wind, how much solar, how much storage — you need to know the worst case you're actually designing for.",
    "type": "slide"
  },
  {
    "id": 48,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Pick a capacity mix.\nReplay it against history.\nSee what you get.\n"
    },
    "text": "The exercise itself is simple: pick an installed-capacity mix, and replay it against the entire historical capacity-factor record. Every real weather year the record covers becomes a candidate stress test for that exact fleet.",
    "type": "slide"
  },
  {
    "id": 49,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "THE WORST CASE, PRECISELY DEFINED",
      "content": "Dunkelflaute"
    },
    "text": "In German, this worst case has a name everyone already knows: Dunkelflaute — a dark lull, low wind and low sun at the same time, for days on end.",
    "type": "slide"
  },
  {
    "id": 50,
    "visual": {
      "kind": "checklist_step",
      "kicker": "DUNKELFLAUTE, PRECISELY DEFINED",
      "items": [
        "Track a running balance: capacity factor minus its long-run average, summed over time",
        "The worst peak-to-trough drop in that balance is the worst sustained shortfall on record"
      ],
      "step": 1
    },
    "text": "To find it precisely rather than just eyeballing a bad week, track a running balance: at every hour, take the capacity factor and subtract its long-run average, then keep a running sum of that difference over time.",
    "type": "slide"
  },
  {
    "id": 51,
    "visual": {
      "kind": "checklist_step",
      "kicker": "DUNKELFLAUTE, PRECISELY DEFINED",
      "items": [
        "Track a running balance: capacity factor minus its long-run average, summed over time",
        "The worst peak-to-trough drop in that balance is the worst sustained shortfall on record"
      ],
      "step": 2
    },
    "text": "The worst Dunkelflaute in the record is then just the biggest peak-to-trough drop in that running balance — the deepest, longest stretch of below-average weather the data has ever seen. A precise, reproducible number, not a vibe.",
    "type": "slide"
  },
  {
    "id": 52,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Demand keeps going.\nGeneration just... doesn't.\n"
    },
    "text": "Zoom into that specific window and the picture is stark: demand keeps running as normal, while available renewable generation drops and just stays down, day after day, with nothing but a thin trickle getting through.",
    "type": "slide"
  },
  {
    "id": 53,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The same fleet also has\nan oversupply extreme —\nnot just a shortfall one.\n"
    },
    "text": "And it cuts both ways. The same exercise on the other side of the distribution finds the opposite extreme: a stretch of such strong wind and sun that generation would massively overshoot demand — an oversupply problem, not a shortfall one.",
    "type": "slide"
  },
  {
    "id": 54,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "STORAGE CHANGES THE PICTURE",
      "content": "Batteries"
    },
    "text": "A fixed capacity mix alone can't do much about either extreme. Add storage, and the picture changes — batteries can move surplus power from the good hours into the bad ones.",
    "type": "slide"
  },
  {
    "id": 55,
    "visual": {
      "kind": "checklist_step",
      "kicker": "A BATTERY IN THE LOOP",
      "items": [
        {
          "icon": "battery",
          "text": "Surplus hours — charge the battery until it's full"
        },
        {
          "icon": "bolt",
          "text": "Deficit hours — discharge first, fall back on gas only once it's empty"
        }
      ],
      "step": 1
    },
    "text": "The simplest way to picture it: whenever there's more renewable generation than demand, charge the battery until it's full — no optimizer, no lookahead, just fill it while you can.",
    "type": "slide"
  },
  {
    "id": 56,
    "visual": {
      "kind": "checklist_step",
      "kicker": "A BATTERY IN THE LOOP",
      "items": [
        {
          "icon": "battery",
          "text": "Surplus hours — charge the battery until it's full"
        },
        {
          "icon": "bolt",
          "text": "Deficit hours — discharge first, fall back on gas only once it's empty"
        }
      ],
      "step": 2
    },
    "text": "Whenever demand outruns generation, discharge the battery first, and only fall back on gas — or on unmet demand — once it's empty. Over a Dunkelflaute window, that state of charge visibly drains, night after night, until the weather finally turns.",
    "type": "slide"
  },
  {
    "id": 57,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "More overbuild,\nless battery needed —\na real, quantifiable trade-off.\n"
    },
    "text": "So how much battery is actually enough? Run the same sizing exercise across a range of overbuild factors — two times, five times, ten times today's renewable capacity — and the required battery size and curtailment both shrink as the overbuild grows.",
    "type": "slide"
  },
  {
    "id": 58,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "This answers \"what to build.\"\nNot \"what tomorrow looks like.\"\n"
    },
    "text": "Which is really the whole point of this chapter: it's a planning question, not a forecast. It tells you what to build, not what tomorrow will look like. For that, the second half of this story needs a different quantity entirely — residual load.",
    "type": "slide"
  },
  {
    "id": 59,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "From megawatts\nto euros.\n"
    },
    "text": "Second use case: forecasting. Not what to build, but what tomorrow's grid — and tomorrow's price — will actually look like.",
    "type": "slide"
  },
  {
    "id": 60,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Residual load: what's left of demand\nonce wind and solar\nhave done what they can.\n"
    },
    "text": "Start from the same potential-generation forecast as before, but now subtract it from demand instead of just checking it. What's left is residual load — the part of demand that weather-driven renewables can't cover, and that dispatchable plants have to.",
    "type": "slide"
  },
  {
    "id": 61,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "RESIDUAL LOAD",
      "latex": "ResidualLoad(t) = D(t) - \\big(P_{wind}(t) + P_{pv}(t)\\big)",
      "note": "What dispatchable plants — coal, gas, imports — have to cover once weather-driven renewables have done their part."
    },
    "text": "Written out, it's just demand minus wind and solar generation — but that difference is arguably the more economically interesting number, since it's residual load, not total demand, that actually drives price.",
    "type": "slide"
  },
  {
    "id": 62,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "HOW PRICE ACTUALLY GETS SET",
      "content": "The merit order curve"
    },
    "text": "So how does a residual-load number turn into a price? Through the merit order — the mechanism day-ahead electricity markets actually use to set price.",
    "type": "slide"
  },
  {
    "id": 63,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE MERIT ORDER CURVE",
      "items": [
        "Dispatchable plants queue up, cheapest marginal cost first",
        "Residual load sweeps across that queue — wherever it stops sets the price"
      ],
      "step": 1
    },
    "text": "Every dispatchable power plant queues up in order of marginal cost, cheapest first — renewables near zero, then lignite, then coal, then gas, then oil, each plant only running if the ones cheaper than it aren't enough.",
    "type": "slide"
  },
  {
    "id": 64,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE MERIT ORDER CURVE",
      "items": [
        "Dispatchable plants queue up, cheapest marginal cost first",
        "Residual load sweeps across that queue — wherever it stops sets the price"
      ],
      "step": 2
    },
    "text": "Residual load then sweeps across that queue from the cheap end — and wherever it runs out, that plant's marginal cost becomes the price everyone pays, including plants running well below it.",
    "type": "slide"
  },
  {
    "id": 65,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "A fossil plant's marginal cost\nisn't fixed — it moves with\nfuel and carbon prices.\n"
    },
    "text": "Which raises the obvious next question: what actually sets one of those plants' place in the queue? For a coal or gas plant, marginal cost isn't fixed — it moves with commodity markets.",
    "type": "slide"
  },
  {
    "id": 66,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "SHORT-RUN MARGINAL COST",
      "latex": "SRMC = \\dfrac{\\text{fuel price} + \\text{carbon price} \\times \\text{emission factor}}{\\text{efficiency}}",
      "note": "What it actually costs a gas or coal plant to generate one more megawatt-hour — fuel plus carbon, per unit of efficiency."
    },
    "text": "It comes down to three ingredients: the fuel price — gas from the TTF hub, coal from Rotterdam — plus the price of a carbon certificate times how much CO2 that plant emits per unit of fuel, all divided by how efficiently the plant turns fuel into electricity.",
    "type": "slide"
  },
  {
    "id": 67,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Shift carbon or gas prices enough,\nand coal and gas\nswap places in the queue.\n"
    },
    "text": "And because gas and coal have different emission factors and efficiencies, a change in carbon or gas prices doesn't just shift the whole curve up or down — it can flip the order, pushing gas ahead of coal or back behind it. Traders call that point the coal-gas switching price, and it's a real, closely watched threshold.",
    "type": "slide"
  },
  {
    "id": 68,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Forecasted residual load\nmeets a forecasted merit order —\nand that crossing point is a price.\n"
    },
    "text": "Put the two halves together: forecast tomorrow's residual load from weather, forecast tomorrow's merit-order curve from fuel and carbon prices, and where they cross is an illustrative day-ahead price forecast — the same chain, end to end, from wind speed to euros per megawatt-hour.",
    "type": "slide"
  },
  {
    "id": 69,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Day-ahead price clears\nbefore congestion is resolved.\nOur residual load already assumes it is.\n"
    },
    "text": "One honest caveat before closing this chapter: Germany's day-ahead auction clears before grid operators intervene for congestion, but the residual-load model above already has congestion-driven curtailment baked into its loss estimate. Separating the two cleanly is still an open problem — worth stating plainly, not glossing over.",
    "type": "slide"
  },
  {
    "id": 70,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "Weather → capacity factor → power\n→ residual load → price.\nOne chain, start to finish.\n"
    },
    "text": "Which closes the loop all the way back to part one. Weather becomes a capacity factor, a capacity factor times installed capacity becomes a generation forecast, generation subtracted from demand becomes residual load, and residual load run through a merit order becomes a price. One forecasting chain, start to finish.",
    "type": "slide"
  }
];
