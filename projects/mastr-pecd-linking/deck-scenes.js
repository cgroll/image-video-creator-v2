const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "cf_capacity_step",
      "kicker": "THE GOAL",
      "step": 1
    },
    "text": "In this video, we're looking at how weather ultimately turns into renewable generation potential — real gigawatts, not just a fraction of nameplate capacity. PECD already gives you half of that: a capacity factor for whatever the weather happens to be doing, hour by hour.",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "cf_capacity_step",
      "kicker": "THE GOAL",
      "step": 2
    },
    "text": "Separately, Germany's Marktstammdatenregister tells you the installed capacity actually sitting on the ground — one number, in megawatts, for whatever slice of the fleet you're looking at.",
    "type": "slide"
  },
  {
    "id": 3,
    "visual": {
      "kind": "cf_capacity_step",
      "kicker": "THE GOAL",
      "step": 3
    },
    "text": "Multiply the two together, and that same curve becomes potential generation — real megawatts, not a fraction. Same shape, different units.",
    "type": "slide"
  },
  {
    "id": 4,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "That's the goal.\n[[Getting there]] is the hard part.\n"
    },
    "text": "Simple in principle. The real work is making sure the capacity factor and the capacity are actually talking about the same plants, the same regions, the same moment in time — which is what the rest of this video is about.",
    "type": "slide"
  },
  {
    "id": 5,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT'S ACTUALLY IN GERMANY'S PLANT REGISTER",
      "items": [
        {
          "icon": "sun",
          "text": "Solar PV"
        },
        {
          "icon": "wind",
          "text": "Wind"
        },
        {
          "text": "Biomass"
        },
        {
          "icon": "droplet",
          "text": "Hydro"
        },
        {
          "text": "Geothermal & similar"
        },
        {
          "icon": "battery",
          "text": "Battery storage"
        }
      ],
      "step": 6
    },
    "text": "The Marktstammdatenregister — MaStR — is Germany's public register of power plants, self-reported by operators and refreshed daily. It's not just solar and wind: biomass, hydro, geothermal-adjacent technologies, and battery storage are all in there too — millions of records in total.",
    "type": "slide"
  },
  {
    "id": 6,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT'S ACTUALLY IN GERMANY'S PLANT REGISTER",
      "items": [
        {
          "icon": "sun",
          "text": "Solar PV"
        },
        {
          "icon": "wind",
          "text": "Wind"
        },
        {
          "text": "Biomass",
          "dim": true
        },
        {
          "icon": "droplet",
          "text": "Hydro",
          "dim": true
        },
        {
          "text": "Geothermal & similar",
          "dim": true
        },
        {
          "icon": "battery",
          "text": "Battery storage"
        }
      ],
      "step": 6
    },
    "text": "This story follows three of them: solar PV, wind, and battery storage — the technologies where linking to weather data is the interesting problem.",
    "type": "slide"
  },
  {
    "id": 7,
    "visual": {
      "kind": "capacity_growth_step",
      "kicker": "WHAT'S ACTUALLY IN GERMANY'S PLANT REGISTER",
      "step": 1
    },
    "text": "And it's not a small or static dataset. Wind capacity was already climbing steadily through the 2000s and 2010s.",
    "type": "slide"
  },
  {
    "id": 8,
    "visual": {
      "kind": "capacity_growth_step",
      "kicker": "WHAT'S ACTUALLY IN GERMANY'S PLANT REGISTER",
      "step": 2
    },
    "text": "Solar's real explosion is much more recent — the last few years alone roughly doubled it. Combined, wind and solar have gone from a few megawatts in 1990 to nearly 200 gigawatts today. That scale is exactly why this can't be a one-off manual matching exercise.",
    "type": "slide"
  },
  {
    "id": 9,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "OPEN-MASTR: ONE RECORD, ONE PLANT",
      "content": "One row in MaStR\nis one plant.\n"
    },
    "text": "We don't pull the raw register export ourselves — we go through open-mastr, a Python package that already parses it into convenient tables for us. In those tables, every entry is one row, describing one physical unit as it actually stands right now. A commissioning date, and if it's been shut down, a final shutdown date, both live on that same row.",
    "type": "slide"
  },
  {
    "id": 10,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "There's a maintenance field\nattached too — [[unused]].\n"
    },
    "text": "There's also a maintenance-status field on each row. We don't use it: a plant currently offline for repairs still counts, with its full installed capacity.",
    "type": "slide"
  },
  {
    "id": 11,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "What's actually filtered:\n[[broken data]] — no commissioning date,\nno capacity, no location.\n~1.1% of raw rows.\n"
    },
    "text": "What actually gets filtered out is broken data: no commissioning date, no positive capacity, or a location that can't be resolved to a region. Across the six technologies this covers, that's about one percent of raw rows, roughly 9.04 million down to 8.93 million.",
    "type": "slide"
  },
  {
    "id": 12,
    "visual": {
      "kind": "checklist_step",
      "kicker": "WHAT SURVIVES: ONE PLANT'S MASTER DATA",
      "items": [
        "Live period — commissioning to shutdown, or still ongoing",
        "Technical specs — capacity; for PV, orientation and tilt; for wind, hub height and rotor diameter",
        "Location — municipality, and lat/lon where available"
      ],
      "step": 3
    },
    "text": "What's left for every surviving plant is compact: when it was live, so you can reconstruct any historical point in time; its technical specs; and where it sits — down to the municipality, and lat/lon where it's there too, since we'll need both.",
    "type": "slide"
  },
  {
    "id": 13,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "WHAT PECD ACTUALLY PROVIDES",
      "content": "PECD doesn't give you megawatts.\nIt gives you a fraction.\n"
    },
    "text": "Flip to the other side of the multiplication. PECD is the Pan-European Climate Database — and what it hands you per technology and region is a capacity factor: a number between zero and one, hourly, saying what fraction of nameplate the weather would let you run at.",
    "type": "slide"
  },
  {
    "id": 14,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "PECD really does publish\na 0.25-degree grid.\nWe deliberately don't use it.\n"
    },
    "text": "PECD's underlying data really is available at a genuine 0.25-degree grid — plant-by-plant resolution, in principle. We deliberately skip it here. Wind would actually be fairly easy to match at that resolution, since MaStR gives real coordinates for it — but PV mostly doesn't, so matching it that granularly gets hard fast. NUTS2-and-zone level is the practical common ground — and the real reason for us specifically: aggregated regions need dramatically less data, and grid-level data over a long historical record gets enormous fast.",
    "type": "slide"
  },
  {
    "id": 15,
    "visual": {
      "kind": "checklist_step",
      "kicker": "ONE REGION SCHEME PER TECHNOLOGY",
      "items": [
        "Solar PV → NUTS2 (Eurostat's standard regions)",
        "Wind onshore → PEON zones (7 for Germany)",
        "Wind offshore → PEOF zones (6 for Germany)"
      ],
      "step": 3
    },
    "text": "And the aggregated product isn't one single scheme — it's three. Solar comes at NUTS2. Wind onshore and offshore each come in their own zone system instead.",
    "type": "slide"
  },
  {
    "id": 16,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "PEON and PEOF\naren't NUTS regions.\nA [[separate map]] entirely.\n"
    },
    "text": "PEON and PEOF are a separate, ENTSO-E-style zoning scheme — not derived from NUTS boundaries at all. They happen to tile Germany too, just along different lines. That means solar's crosswalk and wind's crosswalk have to be built two genuinely different ways.",
    "type": "slide"
  },
  {
    "id": 17,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "LINKING PV: MUNICIPALITY TO NUTS2",
      "content": "One municipality key.\nTwo hops to NUTS2.\n"
    },
    "text": "Start with solar, since it uses the simpler of the two crosswalks.",
    "type": "slide"
  },
  {
    "id": 18,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "SOLAR PV",
      "content": "Not a postal code —\na [[municipality key]].\n"
    },
    "text": "For solar, the location field MaStR actually gives us is Germany's official municipality key, the Gemeindeschlüssel — deliberately not the postal code, because postal codes don't line up with administrative boundaries the way this key does. That's what we actually have to match against PECD.",
    "type": "slide"
  },
  {
    "id": 19,
    "visual": {
      "kind": "municipality_nuts_step",
      "kicker": "LINKING PV: MUNICIPALITY TO NUTS2",
      "step": 1
    },
    "text": "Take a real example: Stuttgart, municipality key 08111000. That's just a point on the map so far — an identifier, not yet a region PECD knows anything about.",
    "type": "slide"
  },
  {
    "id": 20,
    "visual": {
      "kind": "municipality_nuts_step",
      "kicker": "LINKING PV: MUNICIPALITY TO NUTS2",
      "step": 2
    },
    "text": "The first hop uses a published Eurostat correspondence table that maps every German municipality key directly to its NUTS3 region — a standard, maintained crosswalk, not something built by hand for this project. 08111000 becomes DE111: Stuttgart, Stadtkreis.",
    "type": "slide"
  },
  {
    "id": 21,
    "visual": {
      "kind": "municipality_nuts_step",
      "kicker": "LINKING PV: MUNICIPALITY TO NUTS2",
      "step": 3
    },
    "text": "The second hop is almost trivial by comparison: a NUTS2 code is literally the first four characters of its NUTS3 code. DE111 becomes DE11 — Stuttgart's wider Regierungsbezirk, the resolution PECD's solar data actually uses.",
    "type": "slide"
  },
  {
    "id": 22,
    "visual": {
      "kind": "nuts2_choropleth_step",
      "kicker": "SOLAR CAPACITY BY NUTS2 REGION",
      "step": 1
    },
    "text": "Do that for every solar plant in the country and take it one hop further, to NUTS2, and you get this: real installed solar capacity, summed up to all 38 of Germany's NUTS2 regions — the actual resolution PECD's own solar data ships at.",
    "type": "slide"
  },
  {
    "id": 23,
    "visual": {
      "kind": "nuts2_choropleth_step",
      "kicker": "SOLAR CAPACITY BY NUTS2 REGION",
      "step": 2
    },
    "text": "The range is wide — 183 megawatts in the smallest region, Bremen, a city-state with barely any room to build, up to 8,475 in the largest, rural Brandenburg. Sparsely built-up regions with room for ground-mounted solar parks easily outrank dense urban ones.",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "LINKING WIND ONSHORE: PEON ZONES",
      "content": "Wind needs real coordinates —\nand a fractional split.\n"
    },
    "text": "Onshore wind's crosswalk is a different, more physical kind of problem.",
    "type": "slide"
  },
  {
    "id": 25,
    "visual": {
      "kind": "peon_grid_step",
      "kicker": "LINKING WIND ONSHORE: PEON ZONES",
      "step": 1
    },
    "text": "Onshore wind plants mostly do carry real coordinates. Those get matched against a rasterized mask PECD itself publishes — the same 0.25-degree grid, repurposed here just to say which PEON zone each grid cell belongs to. Seven zones, blanketing the whole country.",
    "type": "slide"
  },
  {
    "id": 26,
    "visual": {
      "kind": "peon_grid_step",
      "kicker": "LINKING WIND ONSHORE: PEON ZONES",
      "step": 2
    },
    "text": "Most of those grid cells belong to exactly one zone. But a real minority — 145 of them — straddle a boundary, like this one: about two-thirds one zone, one-third the other.",
    "type": "slide"
  },
  {
    "id": 27,
    "visual": {
      "kind": "peon_grid_step",
      "kicker": "LINKING WIND ONSHORE: PEON ZONES",
      "step": 3
    },
    "text": "A plant sitting in that cell isn't just assigned to the nearest zone. Its capacity is fractionally split the same way the cell is: a 4 megawatt turbine here contributes about 2.7 megawatts to one zone's total and 1.3 to the other's — proportional, not winner-takes-all.",
    "type": "slide"
  },
  {
    "id": 28,
    "visual": {
      "kind": "peof_grid_step",
      "kicker": "LINKING WIND OFFSHORE: PEOF ZONES"
    },
    "text": "Offshore works exactly the same way as onshore: real coordinates, matched against the same kind of fractional PEOF raster mask, split proportionally across every zone with weight at that cell. Six zones instead of PEON's seven — five in the North Sea, one covering the Baltic — but the same method, no shortcut, no separate logic to build.",
    "type": "slide"
  },
  {
    "id": 29,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "WHICH WIND, EXACTLY",
      "content": "One grid cell —\nmore than one [[answer]].\n"
    },
    "text": "Now that both wind crosswalks are actually built, it's worth asking exactly what we just matched them to. Every grid cell PECD models doesn't hold one capacity-factor value — it holds several, one per technology assumption.",
    "type": "slide"
  },
  {
    "id": 30,
    "visual": {
      "kind": "peof_tech_series_step",
      "kicker": "WHICH WIND, EXACTLY",
      "step": 1
    },
    "text": "Take a single cell out in the North Sea. PECD's 'existing' technology gives it one capacity-factor curve — the real offshore fleet, as actually installed.",
    "type": "slide"
  },
  {
    "id": 31,
    "visual": {
      "kind": "peof_tech_series_step",
      "kicker": "WHICH WIND, EXACTLY",
      "step": 2
    },
    "text": "Ask a hypothetical future-turbine question instead — a bigger, higher-hub design PECD calls SP316 HH155 — and the exact same cell, the exact same hour of weather, gives you a noticeably higher curve.",
    "type": "slide"
  },
  {
    "id": 32,
    "visual": {
      "kind": "peof_tech_series_step",
      "kicker": "WHICH WIND, EXACTLY",
      "step": 3
    },
    "text": "A third technology, SP370 HH155, pushes it higher again. Three real PECD categories, three different answers, for the same patch of ocean at the same moment.",
    "type": "slide"
  },
  {
    "id": 33,
    "visual": {
      "kind": "checklist_step",
      "kicker": "HOW PECD SPLITS WIND",
      "items": [
        "Existing fleet — today's real turbines",
        "Future onshore — 9 combinations (3 specific-power classes × 3 hub heights)",
        "Future offshore — 2 combinations (SP316 / SP370, both 155m hub height)"
      ],
      "step": 3
    },
    "text": "PECD doesn't treat wind as one technology either — it splits into an existing fleet, based on today's real turbines, and a whole family of hypothetical future turbine classes: nine onshore combinations of specific power and hub height, two offshore.",
    "type": "slide"
  },
  {
    "id": 34,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "WHICH WIND, EXACTLY",
      "content": "Existing fleet, not\na [[hypothetical]] future turbine.\nMatches what MaStR describes.\n"
    },
    "text": "We deliberately use 'existing' for both onshore and offshore, then — the same choice MaStR already makes for us, since it describes the real fleet actually on the ground, not a hypothetical future one.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "3 of 6 zones, empty —\nbut only under [['existing']].\nNothing was built there yet.\n"
    },
    "text": "That choice has a real, visible consequence: three of PEOF's six zones come back completely empty under 'existing' technology — not a PECD coverage gap, it turns out, but a direct result of picking 'existing.' The same three zones do have real values under PECD's hypothetical future-turbine technology instead: Germany simply hadn't built anything in those further-out zones yet, as of the existing fleet's reference year, so there's nothing for the 'existing' dataset to model there.",
    "type": "slide"
  },
  {
    "id": 36,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "TWO TAXONOMIES FOR SOLAR",
      "content": "PECD's solar categories\naren't MaStR's solar categories.\n"
    },
    "text": "One more wrinkle, back on the solar side — this time not about location, but about how the two datasets each categorize the same plants.",
    "type": "slide"
  },
  {
    "id": 37,
    "visual": {
      "kind": "checklist_step",
      "kicker": "HOW PECD SPLITS SOLAR",
      "items": [
        "Industrial rooftop",
        "Residential rooftop",
        "Utility, fixed-tilt",
        "Utility, tracking"
      ],
      "step": 4
    },
    "text": "PECD doesn't treat solar as one technology — it splits capacity factors into four sub-types: industrial rooftop, residential rooftop, utility-scale fixed-tilt, and utility-scale tracking.",
    "type": "slide"
  },
  {
    "id": 38,
    "visual": {
      "kind": "checklist_step",
      "kicker": "MASTR: INSTALLATION TYPE",
      "items": [
        "Rooftop (Gebäudesolaranlage) — 4.7M units",
        "Balcony (Balkonkraftwerk) — 1.5M units",
        "Ground-mounted (Freiflächensolaranlage) — ~20K units",
        "Other"
      ],
      "step": 4
    },
    "text": "MaStR's own installation-type field has just four real values. Rooftop is by far the largest group, at 4.7 million units. Balcony plug-in panels — over a million and a half of those. Ground-mounted, utility-scale installations are a tiny fraction by count, around twenty thousand. And a small catch-all 'other' bucket.",
    "type": "slide"
  },
  {
    "id": 39,
    "visual": {
      "kind": "checklist_step",
      "kicker": "MASTR: USAGE SECTOR",
      "items": [
        "Household",
        "Commerce, trade & services",
        "Agriculture",
        "Industry",
        "Public building",
        "Not recorded — ~27% of all solar plants"
      ],
      "step": 6
    },
    "text": "Usage sector has six real values — household, commerce and services, agriculture, industry, public buildings, and a catch-all 'other' — plus a genuinely large gap: about twenty-seven percent of all solar plants have no usage sector recorded at all.",
    "type": "slide"
  },
  {
    "id": 40,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "No direct match —\na [[real reconciliation rule]],\nfield by field.\n"
    },
    "text": "MaStR doesn't have a residential-versus-industrial-rooftop field, or a utility-fixed-versus-tracking field, either. The actual reconciliation — already built and validated in a sibling project — runs one explicit rule per PECD category, combining several MaStR fields at once.",
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Ground-mounted → utility.\nSplit by [[tracking]],\nnot usage sector.\n"
    },
    "text": "Ground-mounted plants map straight to PECD's utility-scale codes — split not by usage sector at all, but by a completely different field: whether the panel tracks the sun, read from a separate technical-detail table. Tracking becomes utility-tracking; everything else becomes utility-fixed.",
    "type": "slide"
  },
  {
    "id": 42,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Rooftop + balcony → residential\nor industrial, by usage sector —\nmissing sector defaults [[residential]].\n"
    },
    "text": "Rooftop and balcony plants both map to PECD's rooftop codes instead, split by usage sector: household becomes residential rooftop, any other named sector becomes industrial. A missing sector — which is nearly every balcony plant — defaults to residential, since that bucket is overwhelmingly small household installations even when unreported.",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "text_slide",
      "style": "formula",
      "kicker": "POTENTIAL GENERATION",
      "latex": "potential(t) = \\sum_{\\text{regions}} CF(t) \\times capacity",
      "note": "Capacity only changes month to month; the capacity factor is what moves hour to hour. Regions PECD doesn't model are excluded from the sum, not filled with zero."
    },
    "text": "All of that plumbing exists to make one multiplication possible: capacity factor times installed capacity, summed across every region.",
    "type": "slide"
  },
  {
    "id": 44,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Every hop in this video\nexists to make this\n[[one multiplication]] possible.\n"
    },
    "text": "Every crosswalk, every taxonomy reconciliation, every fractional split from the last several chapters exists to make this one line real: a capacity factor, multiplied by the matching installed capacity, summed across regions.",
    "type": "slide"
  },
  {
    "id": 45,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "GOING EVEN MORE GRANULAR — NOT BUILT HERE",
      "content": "Everything here stopped\nat NUTS2 or PEON/PEOF.\nThere's a [[cleaner path]].\n"
    },
    "text": "Everything in this video worked at NUTS2 or PEON and PEOF resolution. There's a genuinely cleaner path, if you're willing to pay for it.",
    "type": "slide"
  },
  {
    "id": 46,
    "visual": {
      "kind": "grid_path_step",
      "kicker": "GOING EVEN MORE GRANULAR — NOT BUILT HERE",
      "step": 1
    },
    "text": "Wind's already halfway there. A plant's real coordinate drops into exactly one 0.25-degree grid cell — no zone, no fractional split, just that cell's own capacity factor, if you actually go get it.",
    "type": "slide"
  },
  {
    "id": 47,
    "visual": {
      "kind": "grid_path_step",
      "kicker": "GOING EVEN MORE GRANULAR — NOT BUILT HERE",
      "step": 2
    },
    "text": "Solar mostly only has a municipality or a NUTS region to work with, not a coordinate. One option: treat it exactly like PECD treats its own zones — area-weight a region's installed capacity across every grid cell it overlaps, proportional to how much of that cell falls inside it.",
    "type": "slide"
  },
  {
    "id": 48,
    "visual": {
      "kind": "grid_path_step",
      "kicker": "GOING EVEN MORE GRANULAR — NOT BUILT HERE",
      "step": 3
    },
    "text": "Or skip the area math entirely: a municipality's centroid is just one more point, exactly like a wind plant's coordinate. One centroid, one cell — the same trick, reused, no polygon overlap to compute at all.",
    "type": "slide"
  },
  {
    "id": 49,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not built here —\ndata [[volume]], not correctness.\n"
    },
    "text": "None of this is built here. The real gridded download alone runs into gigabytes per variable — that's the actual reason NUTS2 and PEON and PEOF are where this project draws the line, not because the finer path doesn't exist or doesn't work.",
    "type": "slide"
  },
  {
    "id": 50,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "DOES THIS PV UNIT HAVE A BATTERY?",
      "content": "MaStR's own answer field\nturned out to be unusable.\n"
    },
    "text": "Before getting to what's still missing, one more real signal worth knowing about a PV plant: does it have a battery sitting right next to it — a first real clue about whether its output stays behind the meter or actually reaches the grid.",
    "type": "slide"
  },
  {
    "id": 51,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The working method: join on\na [[shared site ID]] between\nsolar and storage units.\n"
    },
    "text": "MaStR does have a field meant to answer exactly this, but it held nonsense values in practice. The method that actually works instead joins solar and storage units on a shared site identifier — finding a real match nearly three quarters of the time.",
    "type": "slide"
  },
  {
    "id": 52,
    "visual": {
      "kind": "checklist_step",
      "kicker": "FOUR KINDS OF PV UNIT",
      "items": [
        "Full grid feed-in — no self-consumption, avg. 55 kW",
        "Self-consumption, with battery — avg. ~9 kW",
        "Self-consumption, no battery — avg. ~10 kW",
        "Unknown feed-in type"
      ],
      "step": 4
    },
    "text": "Combined with how a plant feeds into the grid, that gives four practical categories — and their typical sizes tell their own story: full feed-in plants average fifty-five kilowatts, while the two self-consumption categories average closer to ten. A rough but useful proxy for utility-scale versus household.",
    "type": "slide"
  },
  {
    "id": 53,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Even 'household' isn't\nalways a [['prosumer']] —\n~16% show full feed-in.\n"
    },
    "text": "One nuance worth being honest about: not every household plant behaves the way you'd expect. Nearly sixteen percent of household-registered installations show up as full grid feed-in — no self-consumption at all — which alone accounts for over half of every full-feed-in plant in the country. Whether that's real leftover behavior from an earlier feed-in-tariff era, or just inconsistent registration, isn't something this data can fully answer.",
    "type": "slide"
  },
  {
    "id": 54,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "WHAT'S STILL MISSING, ON PURPOSE",
      "content": "Potential generation isn't\nwhat the grid actually [[sees]].\n"
    },
    "text": "One honest gap remains, and we're naming it rather than solving it here: this multiplication gives potential generation, not what actually reaches the grid.",
    "type": "slide"
  },
  {
    "id": 55,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Behind-the-meter\nself-consumption, and\ngrid-congestion curtailment.\n"
    },
    "text": "Behind-the-meter self-consumption never touches the grid at all, and congestion curtailment can hold back generation that otherwise would have run. Both separate potential from observed — and both are exactly where the next video, on capacity factors to power and price, picks up.",
    "type": "slide"
  },
  {
    "id": 56,
    "visual": {
      "kind": "checklist_step",
      "kicker": "THE WHOLE CHAIN",
      "items": [
        "MaStR — scoped to three technologies, filtered to what actually persists",
        "Matched to PECD's region scheme — one method per technology",
        "Multiplied by capacity factor, region by region"
      ],
      "step": 3
    },
    "text": "Start with MaStR, scoped down and filtered to what a snapshot can actually tell you. Match every plant to the region scheme its technology's capacity-factor data actually uses. Multiply, region by region.",
    "type": "slide"
  },
  {
    "id": 57,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "A capacity factor\nand a capacity —\nfinally [[speaking the same language]].\n"
    },
    "text": "That's the whole point of the plumbing: a capacity factor and an installed capacity, finally speaking the same spatial language — ready to feed potential generation into whatever comes next.",
    "type": "slide"
  }
];
