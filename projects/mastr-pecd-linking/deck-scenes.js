const DECK_SCENES = [
  {
    "id": 1,
    "visual": {
      "kind": "cf_capacity_step",
      "kicker": "THE GOAL",
      "step": 1
    },
    "text": "Here's the destination, before the details. PECD hands you a capacity factor, hour by hour — a curve that moves with the weather, always somewhere between zero and one.",
    "type": "slide"
  },
  {
    "id": 2,
    "visual": {
      "kind": "cf_capacity_step",
      "kicker": "THE GOAL",
      "step": 2
    },
    "text": "Separately, MaStR tells you the installed capacity actually sitting on the ground — one number, in megawatts, for whatever slice of the fleet you're looking at.",
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
      "kicker": "ONE RECORD, ONE PLANT",
      "content": "One row in MaStR\nis one plant.\n"
    },
    "text": "Every entry in the register is one row, describing one physical unit as it actually stands right now — a live snapshot, not a log of things that happened to it. A commissioning date, and if it's been shut down, a final shutdown date, both live on that same row.",
    "type": "slide"
  },
  {
    "id": 10,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "There's a maintenance field\nattached too — [[unused]],\nand only ever one episode wide.\n"
    },
    "text": "There's also a maintenance-status field attached to each row — a temporary-shutdown flag that can only ever hold one episode at a time. It can't reliably tell the full story, and this pipeline doesn't use it: a plant currently offline for repairs still counts, with its full installed capacity.",
    "type": "slide"
  },
  {
    "id": 11,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "What's actually filtered:\n[[broken data]] — no commissioning date,\nno capacity, no location.\n~1.1% of raw rows.\n"
    },
    "text": "What actually gets filtered out has nothing to do with maintenance — it's broken data: no commissioning date, no positive capacity, or a location that can't be resolved to a region. Across the six technologies this covers, that's about one percent of raw rows, roughly 9.04 million down to 8.93 million.",
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
        "Location — down to the municipality"
      ],
      "step": 3
    },
    "text": "What's left for every surviving plant is compact: when it's live, its technical specs, and where it sits.",
    "type": "slide"
  },
  {
    "id": 13,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not a postal code —\na [[municipality key]].\n"
    },
    "text": "That location field is Germany's official municipality key, the Gemeindeschlüssel — deliberately not the postal code, because postal codes don't line up with administrative boundaries the way this key does. That distinction is what makes the next few chapters possible.",
    "type": "slide"
  },
  {
    "id": 14,
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
    "id": 15,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "PECD really does publish\na 0.25-degree grid.\nWe deliberately don't use it.\n"
    },
    "text": "PECD's underlying data really is available at a genuine 0.25-degree grid — plant-by-plant resolution, in principle. We deliberately skip it here, for two reasons: the raw download is enormous, and NUTS2-or-zone level is realistically the finest scale you can match a plant register against at this scale anyway.",
    "type": "slide"
  },
  {
    "id": 16,
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
    "id": 17,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "PEON and PEOF\naren't NUTS regions.\nA [[separate map]] entirely.\n"
    },
    "text": "PEON and PEOF are a separate, ENTSO-E-style zoning scheme — not derived from NUTS boundaries at all. They happen to tile Germany too, just along different lines. That means solar's crosswalk and wind's crosswalk have to be built two genuinely different ways.",
    "type": "slide"
  },
  {
    "id": 18,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "kicker": "WHICH WIND, EXACTLY",
      "content": "Existing fleet, not\na [[hypothetical]] future turbine.\nMatches what MaStR describes.\n"
    },
    "text": "Wind isn't one flavor either. PECD ships an 'existing fleet' capacity factor — based on real turbines actually installed, today — and, separately, a whole set of hypothetical future turbine classes: nine onshore combinations of specific power and hub height, two offshore. We deliberately use 'existing' for both, the same choice MaStR already makes for us — it describes the real fleet on the ground, not a hypothetical future one.",
    "type": "slide"
  },
  {
    "id": 19,
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
    "id": 20,
    "visual": {
      "kind": "municipality_nuts_step",
      "kicker": "LINKING PV: MUNICIPALITY TO NUTS2",
      "step": 1
    },
    "text": "Take a real example: Stuttgart, municipality key 08111000. That's just a point on the map so far — an identifier, not yet a region PECD knows anything about.",
    "type": "slide"
  },
  {
    "id": 21,
    "visual": {
      "kind": "municipality_nuts_step",
      "kicker": "LINKING PV: MUNICIPALITY TO NUTS2",
      "step": 2
    },
    "text": "The first hop uses a published Eurostat correspondence table that maps every German municipality key directly to its NUTS3 region — a standard, maintained crosswalk, not something built by hand for this project. 08111000 becomes DE111: Stuttgart, Stadtkreis.",
    "type": "slide"
  },
  {
    "id": 22,
    "visual": {
      "kind": "municipality_nuts_step",
      "kicker": "LINKING PV: MUNICIPALITY TO NUTS2",
      "step": 3
    },
    "text": "The second hop is almost trivial by comparison: a NUTS2 code is literally the first four characters of its NUTS3 code. DE111 becomes DE11 — Stuttgart's wider Regierungsbezirk, the resolution PECD's solar data actually uses.",
    "type": "slide"
  },
  {
    "id": 23,
    "visual": {
      "kind": "nuts3_choropleth_step",
      "kicker": "SOLAR CAPACITY BY NUTS3 REGION",
      "step": 1
    },
    "text": "Do that for every solar plant in the country and you get this: real installed solar capacity, summed up to all 400 of Germany's NUTS3 regions — the resolution this crosswalk has to reach before anything can be matched to PECD.",
    "type": "slide"
  },
  {
    "id": 24,
    "visual": {
      "kind": "nuts3_choropleth_step",
      "kicker": "SOLAR CAPACITY BY NUTS3 REGION",
      "step": 2
    },
    "text": "The range is wide — seventeen megawatts in the smallest region up to over 1,300 in the largest, Mecklenburgische Seenplatte, not one of the big cities. Rural, sparsely built-up regions with room for ground-mounted solar parks can easily outrank dense urban ones.",
    "type": "slide"
  },
  {
    "id": 25,
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
    "id": 26,
    "visual": {
      "kind": "peon_grid_step",
      "kicker": "LINKING WIND ONSHORE: PEON ZONES",
      "step": 1
    },
    "text": "Onshore wind plants mostly do carry real coordinates. Those get matched against a rasterized mask PECD itself publishes — the same 0.25-degree grid, repurposed here just to say which PEON zone each grid cell belongs to. Seven zones, blanketing the whole country.",
    "type": "slide"
  },
  {
    "id": 27,
    "visual": {
      "kind": "peon_grid_step",
      "kicker": "LINKING WIND ONSHORE: PEON ZONES",
      "step": 2
    },
    "text": "Most of those grid cells belong to exactly one zone. But a real minority — 145 of them — straddle a boundary, like this one: about two-thirds one zone, one-third the other.",
    "type": "slide"
  },
  {
    "id": 28,
    "visual": {
      "kind": "peon_grid_step",
      "kicker": "LINKING WIND ONSHORE: PEON ZONES",
      "step": 3
    },
    "text": "A plant sitting in that cell isn't just assigned to the nearest zone. Its capacity is fractionally split the same way the cell is: a 4 megawatt turbine here contributes about 2.7 megawatts to one zone's total and 1.3 to the other's — proportional, not winner-takes-all.",
    "type": "slide"
  },
  {
    "id": 29,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "LINKING WIND OFFSHORE: PEOF ZONES",
      "content": "No municipality\nat sea.\n"
    },
    "text": "Offshore wind skips the crosswalk problem entirely, for a simple reason.",
    "type": "slide"
  },
  {
    "id": 30,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "MaStR's own sea-location field\ndoes the job directly:\nNorth Sea or Baltic Sea.\n"
    },
    "text": "Offshore, there's no municipality to look up in the first place. MaStR instead carries its own sea-location field — North Sea or Baltic Sea — and that's used directly to assign a PEOF pseudo-region. Simpler than onshore's fractional-mask method, because there's only ever two choices.",
    "type": "slide"
  },
  {
    "id": 31,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "3 of 6 zones, empty —\nbut only under [['existing']].\nNothing was built there yet.\n"
    },
    "text": "Worth being upfront about: three of PEOF's six zones come back completely empty under 'existing' technology — not a PECD coverage gap, it turns out, but a direct consequence of that choice. The same three zones do have real values under PECD's hypothetical future-turbine technology instead: Germany simply hadn't built anything in those further-out zones yet, as of the existing fleet's reference year, so there's nothing for the 'existing' dataset to model there.",
    "type": "slide"
  },
  {
    "id": 32,
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
    "id": 33,
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
    "id": 34,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "MaStR splits solar\na [[different way]] entirely —\nby feed-in type, not rooftop vs. utility.\n"
    },
    "text": "MaStR's own categorization runs along a different axis: how a plant feeds into the grid, plus a separate installation type. Neither maps cleanly onto PECD's four categories — matching them up is a genuine reconciliation problem, not just a rename.",
    "type": "slide"
  },
  {
    "id": 35,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "DOES THIS PV UNIT HAVE A BATTERY?",
      "content": "MaStR's own answer field\nturned out to be unusable.\n"
    },
    "text": "One more thing worth knowing about a PV plant: does it have a battery sitting right next to it?",
    "type": "slide"
  },
  {
    "id": 36,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "The working method: join on\na [[shared site ID]] between\nsolar and storage units.\n"
    },
    "text": "MaStR does have a field meant to answer exactly this, but it held nonsense values in practice. The method that actually works instead joins solar and storage units on a shared site identifier — finding a real match nearly three quarters of the time.",
    "type": "slide"
  },
  {
    "id": 37,
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
    "id": 38,
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
    "id": 39,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Every hop in this video\nexists to make this\n[[one multiplication]] possible.\n"
    },
    "text": "Every crosswalk, every taxonomy reconciliation, every fractional split from the last several chapters exists to make this one line real: a capacity factor, multiplied by the matching installed capacity, summed across regions.",
    "type": "slide"
  },
  {
    "id": 40,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "kicker": "GOING EVEN MORE GRANULAR",
      "content": "Everything here stopped\nat NUTS2 or PEON/PEOF.\nThere's a [[cleaner path]].\n"
    },
    "text": "Everything in this video worked at NUTS2 or PEON and PEOF resolution. There's a genuinely cleaner path, if you're willing to pay for it.",
    "type": "slide"
  },
  {
    "id": 41,
    "visual": {
      "kind": "grid_path_step",
      "kicker": "GOING EVEN MORE GRANULAR",
      "step": 1
    },
    "text": "Wind's already halfway there. A plant's real coordinate drops into exactly one 0.25-degree grid cell — no zone, no fractional split, just that cell's own capacity factor, if you actually go get it.",
    "type": "slide"
  },
  {
    "id": 42,
    "visual": {
      "kind": "grid_path_step",
      "kicker": "GOING EVEN MORE GRANULAR",
      "step": 2
    },
    "text": "Solar mostly only has a municipality or a NUTS region to work with, not a coordinate. One option: treat it exactly like PECD treats its own zones — area-weight a region's installed capacity across every grid cell it overlaps, proportional to how much of that cell falls inside it.",
    "type": "slide"
  },
  {
    "id": 43,
    "visual": {
      "kind": "grid_path_step",
      "kicker": "GOING EVEN MORE GRANULAR",
      "step": 3
    },
    "text": "Or skip the area math entirely: a municipality's centroid is just one more point, exactly like a wind plant's coordinate. One centroid, one cell — the same trick, reused, no polygon overlap to compute at all.",
    "type": "slide"
  },
  {
    "id": 44,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Not built here —\ndata [[volume]], not correctness.\n"
    },
    "text": "None of this is built here. The real gridded download alone runs into gigabytes per variable — that's the actual reason NUTS2 and PEON and PEOF are where this project draws the line, not because the finer path doesn't exist or doesn't work.",
    "type": "slide"
  },
  {
    "id": 45,
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
    "id": 46,
    "visual": {
      "kind": "text_slide",
      "style": "statement",
      "content": "Behind-the-meter\nself-consumption, and\ngrid-congestion curtailment.\n"
    },
    "text": "Behind-the-meter self-consumption never touches the grid at all, and congestion curtailment can hold back generation that otherwise would have run. Both separate potential from observed — and both are exactly where the next video, on capacity factors to power and price, picks up.",
    "type": "slide"
  },
  {
    "id": 47,
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
    "id": 48,
    "visual": {
      "kind": "text_slide",
      "style": "thesis",
      "content": "A capacity factor\nand a capacity —\nfinally [[speaking the same language]].\n"
    },
    "text": "That's the whole point of the plumbing: a capacity factor and an installed capacity, finally speaking the same spatial language — ready to feed potential generation into whatever comes next.",
    "type": "slide"
  }
];
