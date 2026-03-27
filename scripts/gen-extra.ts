import { writeFileSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "content", "blog");

function getDate(globalIndex: number): string {
  const d = new Date("2026-03-27");
  d.setDate(d.getDate() + Math.floor(globalIndex / 2));
  return d.toISOString().split("T")[0];
}

let idx = 175;

function write(slug: string, title: string, excerpt: string, cat: string, readTime: number, content: string) {
  const fm = `---\ntitle: "${title}"\nslug: "${slug}"\nexcerpt: "${excerpt}"\ndate: "${getDate(idx)}"\ncategory: "${cat}"\nreadTime: ${readTime}\n---`;
  writeFileSync(join(DIR, `${slug}.mdx`), fm + "\n\n" + content);
  idx++;
}

write("swimming-weather-guide", "Swimming Weather Guide — Water Temperature, UV, and Safety",
"Not sure if the water is warm enough? Here is how to read forecasts for a great swim.", "Seasonal", 4,
`## Water Temperature Comfort

| Water Temp | How It Feels | Swimwear |
|-----------|-------------|----------|
| Below 15°C | Cold — wetsuit needed | 3-4mm wetsuit |
| 15-18°C | Bracing — manageable for strong swimmers | 2-3mm wetsuit or tough it out |
| 18-22°C | Cool — refreshing on hot days | Swimsuit for most; wetsuit optional |
| 22-26°C | Comfortable — ideal for long swims | Swimsuit |
| 26-30°C | Warm — tropical paradise | Swimsuit |
| Above 30°C | Bath-like — not refreshing | Swimsuit |

## Best Swimming Weather

- **Air temperature**: 25-32°C is ideal — warm enough to dry comfortably after swimming
- **Wind**: Light breeze keeps you cool on the beach; strong wind creates chop and currents
- **UV**: Apply waterproof SPF 50+ sunscreen 20 minutes before entering water
- **Waves**: Under 1m for casual swimming; bodysurf in 1-2m waves

## Open Water Safety

- Never swim alone in open water
- Check for currents, rip tides, and water quality advisories
- Swim parallel to shore if caught in a rip current
- Cold water shock is real below 15°C — enter gradually
- Wear a bright swim cap for visibility

## Pool vs Open Water Temperature

Heated pools are typically 27-29°C year-round. Open water temperatures vary dramatically by season and location. Always check current water temps before planning an open-water swim.

---

Check water conditions on [Weather Tomorrow](/).`
);

write("festival-weather-planning", "Festival Weather Planning — Survive Rain, Heat, and Mud",
"Music festivals are at the mercy of weather. Here is how to prepare for sun, rain, and everything in between.", "Seasonal", 4,
`## The Festival Weather Challenge

Multi-day outdoor festivals mean extended weather exposure with limited shelter. Preparation is everything.

## Packing by Forecast

### If Sun Is Forecast
- Wide-brimmed hat and bandana
- SPF 50+ sunscreen (apply every 2 hours)
- Refillable water bottle (dehydration is the number one festival health issue)
- Light, breathable clothing
- Sunglasses with a strap

### If Rain Is Forecast
- Waterproof poncho (better than an umbrella — leaves hands free, no view-blocking)
- Wellies or waterproof boots (trainers become useless in mud)
- Waterproof phone case
- Bin bags (sit on them, protect belongings in tent)
- Extra socks in a dry bag

### If Cold Is Forecast
- Thermal base layers for evening
- Warm hat and gloves for late-night sets
- Sleeping bag rated for 5°C below the forecast low
- Insulated mat under your sleeping bag

## Campsite Weather Strategy

- Pitch tent on higher ground (water flows downhill)
- Face tent door away from prevailing wind
- Guy ropes matter — even in calm weather, night winds pick up
- Bring a tarp for extra rain cover over your cooking area
- Mark your tent with something distinctive — finding it at midnight in the dark is harder than you think

## Heat Safety at Festivals

- Drink water between alcoholic drinks
- Eat salty food to replace electrolytes
- Know where the medical tent is
- Take shade breaks every hour during peak sun
- Recognise heat exhaustion: dizziness, nausea, headache — move to shade and hydrate immediately

---

Check festival weather on [Weather Tomorrow](/).`
);

write("bbq-weather-guide", "BBQ Weather Guide — Perfect Conditions for Grilling Outdoors",
"The ideal BBQ day depends on more than just sunshine. Here is how wind, temperature, and humidity affect your cookout.", "Seasonal", 3,
`## Ideal BBQ Weather

| Factor | Ideal | Why |
|--------|-------|-----|
| Temperature | 22-28°C | Comfortable for hours outdoors |
| Wind | Below 15 km/h | Steady grill temperature, no ash |
| Rain | 0% | Obvious — nobody wants wet burgers |
| Humidity | 40-60% | Comfortable; low humidity dries out food faster |
| UV | Moderate | Set up in partial shade |

## How Wind Affects Your Grill

Wind is the BBQ's worst enemy. It causes:
- Uneven heat distribution across the grill
- Faster charcoal burn (wastes fuel, creates hot spots)
- Ash and sparks blowing into food and eyes
- Fire safety hazards with nearby dry material

**Solution**: Position the grill behind a windbreak (wall, hedge, or portable screen). Shield with a BBQ wind guard but never enclose completely — ventilation is essential.

## Temperature and Cooking

- **Cold weather**: Charcoal takes longer to reach cooking temperature. Use more fuel and allow extra time. Keep the lid closed to retain heat.
- **Hot weather**: Food spoilage risk — keep raw ingredients in a cooler with ice packs until cooking. Serve promptly.
- **Rain**: If light rain hits, you can continue with the lid closed (acts like an oven). Heavy rain? Move indoors.

## BBQ Safety

- Keep the grill on a stable, flat surface away from structures
- Never leave a lit grill unattended
- Keep a spray bottle of water nearby for flare-ups
- Ensure charcoal is fully extinguished before leaving
- Check fire bans during dry, hot periods — some areas prohibit outdoor grilling in drought

---

Check BBQ weather on [Weather Tomorrow](/).`
);

write("picnic-weather-planning", "Picnic Weather Planning — Choose the Perfect Day and Spot",
"A great picnic depends on getting the weather right. Here is how to read forecasts and pick the ideal conditions.", "Seasonal", 3,
`## The Perfect Picnic Forecast

| Factor | Ideal | Deal-Breaker |
|--------|-------|-------------|
| Temperature | 20-27°C | Below 14°C or above 33°C |
| Rain | 0-10% chance | Above 40% |
| Wind | 5-15 km/h (gentle breeze) | Above 30 km/h |
| UV | 3-6 (moderate) | Above 10 (bring serious shade) |
| Ground | Dry for 24+ hours | Soggy from recent rain |

## Choosing Your Spot by Weather

### Sunny and Hot (Above 28°C)
- Choose a shaded spot under trees
- Near water (lake, river, coast) for cooling breezes
- Bring a sun umbrella or shade tent
- Pack a cooler with ice packs for food safety

### Warm and Pleasant (20-27°C)
- Open grassy areas are perfect
- Hilltops offer breezes and views
- Parks with both sun and shade give options
- This is the sweet spot — enjoy it

### Cool but Dry (14-20°C)
- Sheltered spots out of the wind
- South-facing slopes catch more sun
- Bring blankets for sitting and wrapping up
- Hot drinks in a thermos make cool-weather picnics special

## Food Safety by Temperature

| Air Temp | Safe Food Time (unrefrigerated) |
|---------|-------------------------------|
| Below 20°C | 4 hours |
| 20-30°C | 2 hours |
| Above 30°C | 1 hour |

Keep perishable food in a cooler with ice packs. When in doubt, throw it out.

## Picnic Weather Hacks

- Check the forecast the morning of, not the night before — accuracy is highest within 12 hours
- Ground moisture takes 24-48 hours to dry after rain — sit on a waterproof blanket
- Wind picks up in the afternoon in most locations — morning picnics are calmer
- Insects are more active in humid, still conditions — a light breeze keeps them away

---

Plan your picnic with [Weather Tomorrow](/).`
);

write("road-trip-weather-guide", "Road Trip Weather Guide — Drive Through Any Conditions Safely",
"Long drives mean driving through changing weather. Here is how to prepare for anything the road throws at you.", "Seasonal", 4,
`## Pre-Trip Weather Check

Before any road trip:
1. Check the weather for your **entire route**, not just your destination
2. Look at forecasts for each day of travel
3. Note any mountain passes, deserts, or coastal roads (microclimates)
4. Check road condition reports for your region

## Driving in Different Conditions

### Rain
- Reduce speed by 20-30%
- Increase following distance to 4+ seconds
- Turn headlights on
- Watch for hydroplaning above 80 km/h
- Avoid cruise control on wet roads

### Fog
- Use low beams (never high beams — they reflect back)
- Reduce speed significantly
- Use fog lights if available
- Follow road markings, not the car ahead
- Pull over if visibility drops below 50m

### Snow and Ice
- Reduce speed by 50%
- Brake gently and early
- Use low gears on hills
- Keep 10+ seconds of following distance
- Carry chains if crossing mountain passes

### Strong Wind
- Grip the wheel firmly with both hands
- Watch for crosswinds on exposed roads, bridges, and when passing large vehicles
- Reduce speed, especially in high-profile vehicles
- Be alert when exiting tunnels or passing gaps between buildings

### Extreme Heat
- Check tyre pressure (heat causes over-inflation)
- Ensure coolant is topped up
- Carry extra water for passengers and the engine
- Avoid driving through mirages at speed — they can mask road hazards

## Emergency Car Kit

- Water (drinking and engine coolant)
- Blanket and warm clothes
- Torch and spare batteries
- Phone charger (car and portable)
- First aid kit
- Non-perishable snacks
- Jumper cables
- Basic tool kit
- Ice scraper and de-icer (winter)

## Planning Rest Stops

- Take a 15-minute break every 2 hours of driving
- Plan stops at towns with fuel, food, and shelter
- If weather deteriorates, stop early — no destination is worth risking your safety

---

Check route weather on [Weather Tomorrow](/).`
);

console.log(`Generated 5 extra posts (indices 175-179). Grand total: 180 posts.`);
