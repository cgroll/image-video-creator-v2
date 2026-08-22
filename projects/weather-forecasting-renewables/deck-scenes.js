const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "Renewable power\nis weather,\nconverted.\n"
    },
    "text": "Solar panels, wind turbines, hydro dams — all three convert weather into electricity. Which means their output is only ever as predictable as the forecast feeding it.",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THREE TECHNOLOGIES, THREE WEATHER DRIVERS",
      "items": [
        {
          "icon": "sun",
          "text": "Solar PV — irradiance and cloud cover"
        },
        {
          "icon": "wind",
          "text": "Wind — wind speed and direction at hub height"
        },
        {
          "icon": "droplet",
          "text": "Hydro — precipitation, snowmelt, river inflow"
        }
      ],
      "step": 1
    },
    "text": "Solar needs irradiance — how much sunlight actually reaches the panel, which cloud cover can cut by most of that in minutes.",
    "type": "slide"
  },
  {
    "id": 3,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THREE TECHNOLOGIES, THREE WEATHER DRIVERS",
      "items": [
        {
          "icon": "sun",
          "text": "Solar PV — irradiance and cloud cover"
        },
        {
          "icon": "wind",
          "text": "Wind — wind speed and direction at hub height"
        },
        {
          "icon": "droplet",
          "text": "Hydro — precipitation, snowmelt, river inflow"
        }
      ],
      "step": 2
    },
    "text": "Wind needs wind speed and direction — not at the ground, but up at hub height, a hundred meters or more in the air.",
    "type": "slide"
  },
  {
    "id": 4,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THREE TECHNOLOGIES, THREE WEATHER DRIVERS",
      "items": [
        {
          "icon": "sun",
          "text": "Solar PV — irradiance and cloud cover"
        },
        {
          "icon": "wind",
          "text": "Wind — wind speed and direction at hub height"
        },
        {
          "icon": "droplet",
          "text": "Hydro — precipitation, snowmelt, river inflow"
        }
      ],
      "step": 3
    },
    "text": "And hydro needs precipitation, further upstream and further back in time — snowmelt and river inflow that show up weeks after the weather that caused them.",
    "type": "slide"
  },
  {
    "id": 5,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "No forecast, no balance:\nreserves get wasted,\nor generation gets curtailed.\n"
    },
    "text": "Grid operators have to balance supply and demand every minute of every day. If they can't forecast how much solar and wind will show up, they either over-provision reserves, or they curtail — and both cost money.",
    "type": "slide"
  },
  {
    "id": 6,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "ERA5 — the reference dataset\nfor global weather\n"
    },
    "text": "So where do these forecasts start from? Usually from ERA5 — ECMWF's fifth-generation reanalysis, and the closest thing the field has to a reference dataset for what the weather actually was, anywhere on Earth, at any hour since 1940.",
    "type": "slide"
  },
  {
    "id": 7,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "Real stations sit\nwherever people built them.\n"
    },
    "text": "Here's the problem it solves. Real weather stations sit wherever people happened to build them — dense in cities, sparse over oceans, almost absent over the poles and high mountains. That's not a grid, it's whatever infrastructure history left behind.",
    "type": "slide"
  },
  {
    "id": 8,
    "visual": {
      "kind": "era5_obs_stations_step",
      "kicker": "THE RAW OBSERVING NETWORK",
      "step": 1
    },
    "text": "This is what that actually looks like: real land-station locations, from NOAA's own network archive. Dense across Europe, the US, India, Japan — wherever people and infrastructure already were. Almost empty across the Amazon, the Sahara, Siberia, Antarctica.",
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "era5_obs_stations_step",
      "kicker": "THE RAW OBSERVING NETWORK",
      "step": 2
    },
    "text": "Add the ocean — buoys, and the fixed arrays that watch the tropics — and you get the other half of the picture: sparse, clustered along a handful of shipping and research routes, with huge gaps in between. Two completely different networks, neither one a grid. ERA5's job is to turn both of these into that one regular grid at once.",
    "type": "slide"
  },
  {
    "id": 10,
    "visual": {
      "kind": "checklist_step",
      "kicker": "ERA5, IN SHORT",
      "items": [
        "One regular grid — about 31 km, covering the whole planet",
        "Hourly data, going back to 1940",
        "Built by blending stations, ships, buoys, satellites, radiosondes"
      ],
      "step": 1
    },
    "text": "ERA5 turns that mess into one regular grid — roughly 31 kilometers between grid points, covering the entire planet, ocean and pole included.",
    "type": "slide"
  },
  {
    "id": 11,
    "visual": {
      "kind": "checklist_step",
      "kicker": "ERA5, IN SHORT",
      "items": [
        "One regular grid — about 31 km, covering the whole planet",
        "Hourly data, going back to 1940",
        "Built by blending stations, ships, buoys, satellites, radiosondes"
      ],
      "step": 2
    },
    "text": "And it's hourly, going back to 1940 — over eighty years of a consistent, gridded weather record.",
    "type": "slide"
  },
  {
    "id": 12,
    "visual": {
      "kind": "checklist_step",
      "kicker": "ERA5, IN SHORT",
      "items": [
        "One regular grid — about 31 km, covering the whole planet",
        "Hourly data, going back to 1940",
        "Built by blending stations, ships, buoys, satellites, radiosondes"
      ],
      "step": 3
    },
    "text": "Every one of those grid points is built by blending together everything available at that time: land stations, ships, buoys, satellites, weather balloons — dozens of irregular observation types, harmonized into one consistent product.",
    "type": "slide"
  },
  {
    "id": 13,
    "visual": {
      "kind": "era5_globe_step",
      "kicker": "SEEN FROM SPACE: THE REDUCED GAUSSIAN GRID",
      "step": 1
    },
    "text": "Zoom in on that grid, and it's not actually a plain rectangle. ERA5's native grid is a reduced Gaussian grid: rows of latitude, evenly spaced pole to pole, but with fewer points per row as you approach the poles — so points stay roughly evenly spaced in real distance, not in degrees.",
    "type": "slide"
  },
  {
    "id": 14,
    "visual": {
      "kind": "era5_globe_step",
      "kicker": "SEEN FROM SPACE: THE REDUCED GAUSSIAN GRID",
      "step": 2
    },
    "text": "Unroll that sphere, and the same grid spreads out into the flat, rectangular map everyone recognizes — coastlines included.",
    "type": "slide"
  },
  {
    "id": 15,
    "visual": {
      "kind": "era5_globe_step",
      "kicker": "SEEN FROM SPACE: THE REDUCED GAUSSIAN GRID",
      "step": 3
    },
    "text": "Near the equator, that's on the order of 31 kilometers between neighboring points — thinning out, row by row, on the way to each pole.",
    "type": "slide"
  },
  {
    "id": 16,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "WHAT YOU ACTUALLY DOWNLOAD",
      "content": "Regridded to a plain,\nequidistant 0.25° grid.\n"
    },
    "text": "In practice, though, you'll rarely touch that native grid directly. The Copernicus Climate Data Store regrids ERA5 onto a plain, equidistant quarter-degree latitude-longitude grid before handing it to you — which is the simpler picture from a few minutes ago. Now you've seen both sides of it.",
    "type": "slide"
  },
  {
    "id": 17,
    "visual": {
      "kind": "era5_regular_grid",
      "kicker": "WHAT YOU ACTUALLY DOWNLOAD"
    },
    "text": "Plot that regridded product on the same map, and every row has exactly the same number of points, evenly spaced in longitude — no thinning toward the poles like the native grid. That's what 'equidistant' actually looks like.",
    "type": "slide"
  },
  {
    "id": 18,
    "visual": {
      "kind": "checklist_step",
      "kicker": "SOME KEY SURFACE VARIABLES",
      "items": [
        "2m temperature",
        "10m wind — u and v components",
        "Surface solar radiation downwards",
        "Total precipitation",
        "Mean sea level pressure"
      ],
      "step": 5
    },
    "text": "A handful of the variables that matter most for our purposes: 2-meter temperature, 10-meter wind as u and v components, surface solar radiation downwards, total precipitation, and mean sea level pressure. Notice how directly these map onto the three renewable drivers from chapter one.",
    "type": "slide"
  },
  {
    "id": 19,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not just the surface:\n37 pressure levels,\n1000 hPa down to 1 hPa.\n"
    },
    "text": "ERA5 isn't just a surface product, either. It stores the atmosphere on 37 pressure levels — from 1000 hectopascals near the ground, up to 1 hectopascal, near the edge of the stratosphere.",
    "type": "slide"
  },
  {
    "id": 20,
    "visual": {
      "kind": "era5_column_step",
      "kicker": "ONE GRID POINT, MANY HEIGHTS",
      "step": 1
    },
    "text": "Every one of those grid points, in fact, isn't a single value. Take any point on the map —",
    "type": "slide"
  },
  {
    "id": 21,
    "visual": {
      "kind": "era5_column_step",
      "kicker": "ONE GRID POINT, MANY HEIGHTS",
      "step": 2
    },
    "text": "— and it's really a whole vertical column: the same latitude and longitude, repeated at each of those 37 pressure levels, from the surface up toward the edge of the stratosphere.",
    "type": "slide"
  },
  {
    "id": 22,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Near the surface, today barely\npredicts tomorrow. Higher up,\nsome patterns hold for weeks.\n"
    },
    "text": "Not every level behaves the same way, either. Near the surface, today's weather is barely a hint of tomorrow's — noisy, fast-changing. But higher up, some large-scale patterns can lock in place for a week or more, and that persistence is where a lot of real forecast skill comes from.",
    "type": "slide"
  },
  {
    "id": 23,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "The jet stream:\na river of fast air\nnear the tropopause.\n"
    },
    "text": "One landmark feature you can actually see in those upper levels: the jet stream — a fast, narrow river of air near the tropopause that steers storm tracks and large-scale weather patterns, and which matters directly for wind energy at altitude.",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "jet_stream_step",
      "kicker": "JET STREAM: ZONAL VS. BLOCKED FLOW",
      "step": 1
    },
    "text": "Most of the time, that river runs pretty close to straight — a smooth, fast current sweeping west to east across the Atlantic and into Europe.",
    "type": "slide"
  },
  {
    "id": 25,
    "visual": {
      "kind": "jet_stream_step",
      "kicker": "JET STREAM: ZONAL VS. BLOCKED FLOW",
      "step": 2
    },
    "text": "But it doesn't always stay that way. The flow can amplify into a big wave — bulging north in one place, plunging south in another — and that's the wave that actually reshapes the weather underneath it.",
    "type": "slide"
  },
  {
    "id": 26,
    "visual": {
      "kind": "jet_stream_step",
      "kicker": "JET STREAM: ZONAL VS. BLOCKED FLOW",
      "step": 3
    },
    "text": "Here's the part that matters for persistence: if that wave stalls instead of moving through — a blocking pattern, like Scandinavian blocking or a negative NAO — the cold air trapped in its southward dip can sit over the same stretch of Europe for days, even weeks. It's a pattern you can see coming, days in advance, at these upper levels — even while the surface weather underneath keeps changing hour to hour.",
    "type": "slide"
  },
  {
    "id": 27,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "ERA5 is a reconstruction —\nan estimate, not a raw reading,\neverywhere on the grid.\n"
    },
    "text": "Here's the part that surprises people: ERA5 is not a direct measurement at every grid point. Most of the globe was never physically observed at that exact time and place. ERA5 is a reconstruction — a best estimate.",
    "type": "slide"
  },
  {
    "id": 28,
    "visual": {
      "kind": "checklist_step",
      "kicker": "HOW A REANALYSIS IS BUILT",
      "items": [
        "A short-range forecast — the 'background'",
        "Corrected using whatever real observations exist nearby",
        "The blend — the 'analysis' — becomes that hour's ERA5 grid"
      ],
      "step": 1
    },
    "text": "The recipe: start from a short-range forecast — the 'background' — produced by physically integrating the atmosphere forward a few hours from the last analysis.",
    "type": "slide"
  },
  {
    "id": 29,
    "visual": {
      "kind": "checklist_step",
      "kicker": "HOW A REANALYSIS IS BUILT",
      "items": [
        "A short-range forecast — the 'background'",
        "Corrected using whatever real observations exist nearby",
        "The blend — the 'analysis' — becomes that hour's ERA5 grid"
      ],
      "step": 2
    },
    "text": "Then correct that background using whatever real observations happen to exist nearby, weighted by how much you trust each one.",
    "type": "slide"
  },
  {
    "id": 30,
    "visual": {
      "kind": "checklist_step",
      "kicker": "HOW A REANALYSIS IS BUILT",
      "items": [
        "A short-range forecast — the 'background'",
        "Corrected using whatever real observations exist nearby",
        "The blend — the 'analysis' — becomes that hour's ERA5 grid"
      ],
      "step": 3
    },
    "text": "The result of that correction — the 'analysis' — becomes that hour's ERA5 grid. Repeat, hour after hour, for eighty-plus years, and you get the dataset.",
    "type": "slide"
  },
  {
    "id": 31,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "Predict, then correct —\nthe same idea as a Kalman filter.\n"
    },
    "text": "If that predict-then-correct rhythm sounds familiar, it should — it's the same core idea as a Kalman filter: a physics-based prediction step, followed by an update step that folds in noisy observations, weighted by their uncertainty. ERA5's real system, 4D-Var, is far more elaborate than a textbook Kalman filter, but the intuition carries over cleanly.",
    "type": "slide"
  },
  {
    "id": 32,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THAT 'CORRECT' STEP, IN THREE PARTS",
      "items": [
        "Quality control — catch bad readings",
        "Spatial blending — interpolate between stations",
        "Temporal smoothing — look both ways in time"
      ],
      "step": 3
    },
    "text": "That 'correct' step is actually three things happening at once: catching bad readings, blending the good ones into the field, and — because a reanalysis has the luxury of hindsight — looking both forward and backward in time to smooth the result.",
    "type": "slide"
  },
  {
    "id": 33,
    "visual": {
      "kind": "era5_qc_step",
      "kicker": "1. CATCH THE BAD READINGS",
      "step": 1
    },
    "text": "First, quality control. Take a handful of nearby readings for the same variable — most cluster close to what the background expects.",
    "type": "slide"
  },
  {
    "id": 34,
    "visual": {
      "kind": "era5_qc_step",
      "kicker": "1. CATCH THE BAD READINGS",
      "step": 2
    },
    "text": "One doesn't. Compared against the background and its neighbors, it's flagged as suspect — a stuck sensor, a transcription error, a miscalibrated instrument, whatever the cause.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "era5_qc_step",
      "kicker": "1. CATCH THE BAD READINGS",
      "step": 3
    },
    "text": "It gets excluded from this analysis, and the rest — the trusted readings — feed forward into the next step.",
    "type": "slide"
  },
  {
    "id": 36,
    "visual": {
      "kind": "era5_interp_step",
      "kicker": "2. BLEND OBSERVATIONS INTO THE FIELD",
      "step": 1
    },
    "text": "Second, spatial blending. The background is a smooth field — the model's best prior guess — but the real observations scattered across it don't sit exactly on that curve.",
    "type": "slide"
  },
  {
    "id": 37,
    "visual": {
      "kind": "era5_interp_step",
      "kicker": "2. BLEND OBSERVATIONS INTO THE FIELD",
      "step": 2
    },
    "text": "So the field bends to absorb each one — pulled toward every trusted observation, weighted by distance and by how much that observation is trusted — while relaxing back to the background shape everywhere else. That's the 'analysis.'",
    "type": "slide"
  },
  {
    "id": 38,
    "visual": {
      "kind": "era5_window_step",
      "kicker": "3. LOOK BOTH WAYS IN TIME",
      "step": 1
    },
    "text": "Third — and this is the part that makes it a reanalysis, not a real-time forecast: a live system only ever has the past to work with. That's a Kalman filter — strictly forward-looking, because the future genuinely hasn't happened yet.",
    "type": "slide"
  },
  {
    "id": 39,
    "visual": {
      "kind": "era5_window_step",
      "kicker": "3. LOOK BOTH WAYS IN TIME",
      "step": 2
    },
    "text": "A reanalysis is built years later, so 'the future' relative to any given hour is already on record. ERA5 uses a 12-hour 4D-Var window — observations from both before and after each analysis time, pulled in together. That symmetric look-both-ways property is what makes this a Kalman smoother, not just a filter.",
    "type": "slide"
  },
  {
    "id": 40,
    "visual": {
      "kind": "era5_window_step",
      "kicker": "3. LOOK BOTH WAYS IN TIME",
      "step": 3
    },
    "text": "One consequence: accuracy isn't uniform across that window — it's smallest right in the middle, exactly where an hour has the most neighbors on both sides pulling it into place.",
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "text_slide",
      "style": "image",
      "kicker": "DECADES OF STEADY PROGRESS",
      "src": "images/owid-forecast-accuracy.jpg",
      "alt": "Line chart: accuracy of 3-, 5-, 7-, and 10-day weather forecasts, 1981-2018, Northern and Southern Hemisphere, Our World in Data",
      "citation": "ECMWF data, via Our World in Data (Hannah Ritchie, CC BY) — ourworldindata.org/weather-forecasts"
    },
    "text": "So has all of that actually paid off? Here's ECMWF's own error record, decades of it — a 3-day forecast today is about as accurate as a 1-day forecast was in the early 1980s, and even 7-day forecasts are approaching that same 'highly accurate' bar.",
    "type": "slide"
  },
  {
    "id": 42,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Is a new model actually good?\nYou need a standardized\nway to check.\n"
    },
    "text": "But raw historical improvement isn't the whole story. How do you actually know whether a brand-new weather model is any good?",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "GOOGLE RESEARCH'S ANSWER",
      "content": "WEATHERBENCH 2"
    },
    "text": "Google Research's answer is WeatherBench 2 — a standardized benchmark built specifically so different weather models can be compared on equal footing.",
    "type": "slide"
  },
  {
    "id": 44,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT IT STANDARDIZES",
      "items": [
        "Common metrics — RMSE, ACC, and CRPS for ensembles",
        "Common ground truth and baselines — ERA5, and HRES",
        "A public leaderboard — AI models against physics-based NWP"
      ],
      "step": 1
    },
    "text": "It fixes the metrics — RMSE, anomaly correlation, and CRPS for ensemble forecasts — so nobody can quietly pick the metric that flatters their model.",
    "type": "slide"
  },
  {
    "id": 45,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT IT STANDARDIZES",
      "items": [
        "Common metrics — RMSE, ACC, and CRPS for ensembles",
        "Common ground truth and baselines — ERA5, and HRES",
        "A public leaderboard — AI models against physics-based NWP"
      ],
      "step": 2
    },
    "text": "It fixes the ground truth and the baselines — ERA5 as reality, HRES as the classical-model benchmark to beat.",
    "type": "slide"
  },
  {
    "id": 46,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT IT STANDARDIZES",
      "items": [
        "Common metrics — RMSE, ACC, and CRPS for ensembles",
        "Common ground truth and baselines — ERA5, and HRES",
        "A public leaderboard — AI models against physics-based NWP"
      ],
      "step": 3
    },
    "text": "And it publishes all of it as an open leaderboard, AI models sitting right next to physics-based numerical weather prediction, so progress in the field is something you can actually see, not just claim.",
    "type": "slide"
  },
  {
    "id": 47,
    "visual": {
      "kind": "text_slide",
      "style": "image",
      "kicker": "REAL NUMBERS, REAL LEADERBOARD",
      "src": "images/weatherbench2-leaderboard.jpg",
      "alt": "Heatmap table: RMSE for geopotential, temperature, humidity, and wind vector across 1-10 day lead times, for IFS HRES, IFS ENS, and several AI/hybrid weather models, colored by percent difference vs IFS HRES",
      "citation": "WeatherBench 2 (Google Research) deterministic leaderboard — sites.research.google/weatherbench, retrieved 2026-08-22"
    },
    "text": "And this is what that leaderboard actually looks like — RMSE for geopotential, temperature, humidity, and wind, across lead times from one day out to ten, colored by percent difference against the classical IFS HRES baseline. Notice how quickly the newer AI and hybrid models pull ahead of both HRES and climatology, especially at longer lead times. Treat this as a snapshot, not gospel — leaderboards like this move fast.",
    "type": "slide"
  },
  {
    "id": 48,
    "visual": {
      "kind": "text_slide",
      "style": "image",
      "kicker": "OPERATIONAL PROOF: AI OVERTAKES PHYSICS",
      "src": "images/ecmwf-ifs-aifs-acc-skill.png",
      "alt": "Line chart: ECMWF IFS and AIFS anomaly correlation coefficient for 500hPa geopotential height, 12-month running mean, 2005-2024, at D+3/D+5/D+7/D+10 lead times, Northern and Southern Hemisphere, with AIFS shown as dashed lines outperforming solid IFS lines from its 2022 launch onward",
      "citation": "Bauer (2024), \"What if? Numerical weather prediction at the crossroads,\" arXiv:2407.03787, Fig. 1"
    },
    "text": "And that's not just a leaderboard snapshot — it's a two-decade operational record. Every line here is ECMWF's own skill score for the same variable, tracked for twenty years; the dashed lines are AIFS, its AI-based model, and from the moment it launched, it's matched or beaten the physics-based IFS at every lead time shown.",
    "type": "slide"
  },
  {
    "id": 49,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "NVIDIA'S TOOLKIT",
      "content": "earth2studio"
    },
    "text": "So how do you actually get your hands on one of these AI models and run it yourself? NVIDIA's answer is earth2studio — an open-source Python library built for exactly that.",
    "type": "slide"
  },
  {
    "id": 50,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT IT GIVES YOU",
      "items": [
        "A zoo of pretrained AI weather models — FourCastNet, GraphCast, Pangu-Weather, and more",
        "A consistent interface against standard grids like ERA5",
        "Built-in tools for perturbations, diagnostics, and ensembles"
      ],
      "step": 1
    },
    "text": "First, a zoo of pretrained AI weather models, ready to run out of the box — FourCastNet, GraphCast, Pangu-Weather, and others.",
    "type": "slide"
  },
  {
    "id": 51,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT IT GIVES YOU",
      "items": [
        "A zoo of pretrained AI weather models — FourCastNet, GraphCast, Pangu-Weather, and more",
        "A consistent interface against standard grids like ERA5",
        "Built-in tools for perturbations, diagnostics, and ensembles"
      ],
      "step": 2
    },
    "text": "Second, a consistent interface against standard grids like ERA5, so swapping one model for another doesn't mean rewriting your data pipeline.",
    "type": "slide"
  },
  {
    "id": 52,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT IT GIVES YOU",
      "items": [
        "A zoo of pretrained AI weather models — FourCastNet, GraphCast, Pangu-Weather, and more",
        "A consistent interface against standard grids like ERA5",
        "Built-in tools for perturbations, diagnostics, and ensembles"
      ],
      "step": 3
    },
    "text": "And third, built-in tools for perturbations, diagnostics, and — the topic we're headed toward next — ensembles.",
    "type": "slide"
  },
  {
    "id": 53,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The atmosphere is chaotic —\nsmall errors grow fast.\n"
    },
    "text": "One forecast, by itself, isn't enough. The atmosphere is a chaotic system — tiny errors in today's initial conditions grow into large differences a week out.",
    "type": "slide"
  },
  {
    "id": 54,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "Perturb, then run many.\nThe spread is the uncertainty.\n"
    },
    "text": "The fix: don't run one forecast, run dozens. Perturb the initial conditions, sometimes the model weights too, and let each member evolve independently. How much they disagree — the spread — is itself the forecast's uncertainty estimate.",
    "type": "slide"
  },
  {
    "id": 55,
    "visual": {
      "kind": "text_slide",
      "style": "image",
      "kicker": "WHAT THE SPREAD LOOKS LIKE",
      "src": "images/ecmwf-ens-meteogram.jpg",
      "alt": "ECMWF ENS meteogram for Reading, UK: box-and-whisker ensemble spread over a 10-day lead time for cloud cover, precipitation, wind speed, and temperature, with the control forecast overlaid",
      "citation": "ECMWF ENS meteogram, CC BY 4.0 — ecmwf.int"
    },
    "text": "Here's what that actually looks like for one location — an ECMWF ensemble meteogram. Each box is the spread across every perturbed member at that moment in time: a wide box means the members disagree, a narrow one means they're confident.",
    "type": "slide"
  },
  {
    "id": 56,
    "visual": {
      "kind": "text_slide",
      "style": "image",
      "kicker": "THE SAME IDEA, FOR A CYCLONE'S PATH",
      "src": "images/google-weather-lab-cyclone.jpg",
      "alt": "Google Weather Lab: dozens of ensemble cyclone tracks near Taiwan and the Northern Mariana Islands, colored by wind intensity, converging toward a tropical cyclone",
      "citation": "Google Weather Lab (Google DeepMind, WeatherNext 2) — deepmind.google/science/weathernext"
    },
    "text": "For something like a tropical cyclone, that same idea plays out in space, not just in a chart — this is Google's Weather Lab, tracing dozens of possible storm paths from its WeatherNext 2 model. Every colored line is one plausible future; where they bunch together, the forecast is confident, and where they fan out, it isn't.",
    "type": "slide"
  },
  {
    "id": 57,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Probabilistic forecasts support\nrisk-aware decisions: how much\nreserve to hold, when to bid.\n"
    },
    "text": "For renewables, that spread isn't academic — it's directly actionable: how much reserve capacity to hold, and how confidently to bid generation into tomorrow's market.",
    "type": "slide"
  },
  {
    "id": 58,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Classical numerical weather\nprediction: hours, on a\ndedicated supercomputer.\n"
    },
    "text": "None of this is free. Classical numerical weather prediction — solving the physics equations directly — takes hours on a dedicated supercomputer, for a single forecast.",
    "type": "slide"
  },
  {
    "id": 59,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "Seconds to minutes,\non a single A100.\n"
    },
    "text": "The AI weather models we just talked about flip that completely — the same forecast, seconds to minutes, on a single A100 GPU.",
    "type": "slide"
  },
  {
    "id": 60,
    "visual": {
      "kind": "text_slide",
      "style": "cta",
      "kicker": "TRY IT WITHOUT LOCAL SETUP",
      "content": "NVIDIA LAUNCHABLE"
    },
    "text": "And you don't even need your own GPU to try this: NVIDIA Launchable gives you a one-click, reproducible A100 environment in the browser, preconfigured with tools like earth2studio.",
    "type": "slide"
  },
  {
    "id": 61,
    "visual": {
      "kind": "text_slide",
      "style": "image",
      "kicker": "ONE CLICK, ONE A100",
      "src": "images/nvidia-launchable.jpg",
      "alt": "NVIDIA Launchable page for the earth2studio container, showing an A100 (80GB) instance, GitHub repo, exposed JupyterLab port, and a Deploy Launchable button",
      "citation": "brev.nvidia.com/launchable/deploy?launchableID=env-3Gt9XuRpJeu94JllbDC92JyW4hA"
    },
    "text": "Here's an actual one — a Launchable that deploys earth2studio straight onto an A100, no environment setup on your end at all. Click deploy, and a few minutes later you've got a JupyterLab tunnel into a GPU that's ready to run these models.",
    "type": "slide"
  },
  {
    "id": 62,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "Better forecasts,\nbetter renewable integration.\n"
    },
    "text": "Which brings it full circle. Better weather forecasts mean better renewable integration — less waste, less curtailment, and a grid that can actually trust the sun and the wind.",
    "type": "slide"
  }
];
