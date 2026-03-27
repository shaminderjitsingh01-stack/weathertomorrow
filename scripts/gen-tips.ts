import { writeFileSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "content", "blog");
const F = (c: number) => Math.round(c * 9 / 5 + 32);

function getDate(globalIndex: number): string {
  const d = new Date("2026-03-27");
  d.setDate(d.getDate() + Math.floor(globalIndex / 2));
  return d.toISOString().split("T")[0];
}

let idx = 55; // Start after 55 city guides

function write(slug: string, title: string, excerpt: string, readTime: number, content: string) {
  const fm = `---\ntitle: "${title}"\nslug: "${slug}"\nexcerpt: "${excerpt}"\ndate: "${getDate(idx)}"\ncategory: "Weather Tips"\nreadTime: ${readTime}\n---`;
  writeFileSync(join(DIR, `${slug}.mdx`), fm + "\n\n" + content);
  idx++;
}

// ============= RAIN PROBABILITY (7 posts) =============

function rainProb(pct: number, verdict: string, advice: string, analogy: string) {
  write(`${pct}-percent-chance-of-rain`, `${pct}% Chance of Rain — ${verdict}`, `What does a ${pct}% chance of rain actually mean? We explain the science, what to expect, and whether you need an umbrella.`, 3,
`## What Does ${pct}% Chance of Rain Mean?

When a weather forecast says there is a **${pct}% chance of rain**, it means that ${pct} out of 100 times the same atmospheric conditions occur, it rains in your area. It does not mean it will rain for ${pct}% of the day, nor that ${pct}% of the area will see rain.

Think of it this way: ${analogy}

## Should You Carry an Umbrella?

${advice}

## How Forecasters Calculate Rain Probability

Meteorologists combine two factors:

1. **Confidence** — How certain they are that rain-producing conditions exist.
2. **Coverage** — What percentage of the forecast area is expected to see rain.

The probability of precipitation (PoP) is their product. If a forecaster is 80% confident and expects 50% coverage, the PoP is 0.8 × 0.5 = **40%**.

## Common Misconceptions

- **It will rain for ${pct}% of the day** — Wrong. PoP says nothing about duration.
- **${pct}% of the area will get wet** — Not quite. Coverage is an input, not the output.
- **The forecast is ${pct}% accurate** — No. Accuracy and probability are different things.

## Practical Decision Guide

| Probability | Outdoor Plans | What to Bring |
|-------------|---------------|---------------|
| 0-20% | Go ahead confidently | Nothing extra |
| 30-40% | Likely fine, minor risk | Compact umbrella |
| 50-60% | Could go either way | Rain jacket |
| 70-80% | Expect rain at some point | Full rain gear |
| 90-100% | Rain is almost certain | Waterproofs, backup plan |

## The Bottom Line

A ${pct}% chance of rain means: **${verdict.toLowerCase()}**. ${pct <= 30 ? "You are probably safe to leave the umbrella at home." : pct <= 50 ? "It is worth having an umbrella in your bag, just in case." : pct <= 70 ? "Plan for rain but do not cancel your day — showers may be brief." : "Plan for wet weather and have an indoor backup ready."}

---

Check your city's rain forecast on [Weather Tomorrow](/) for the latest hourly predictions.`);
}

rainProb(10, "Barely a Thought", "At 10%, rain is highly unlikely. You can confidently leave the umbrella at home. Enjoy your day without weather worries.", "if you flipped a coin 10 times, rain would show up just once.");
rainProb(20, "Probably Dry", "A 20% chance means rain is possible but improbable. Most people skip the umbrella at this level, and most of the time they are right.", "it is like rolling a 1 on a six-sided die — possible, but you would not bet on it.");
rainProb(30, "A Small Risk", "At 30%, there is a real but small chance of rain. Tossing a compact umbrella in your bag is a low-effort insurance policy.", "roughly the odds of drawing a face card from a shuffled deck.");
rainProb(50, "A Coin Flip", "Fifty-fifty. This is where the decision gets interesting. If your plans are outdoors and hard to reschedule, bring rain gear. If you are flexible, take the chance.", "literally a coin toss — heads it rains, tails it does not.");
rainProb(70, "Rain Is Likely", "At 70%, the odds favour rain. Carry an umbrella or rain jacket. If you have outdoor plans, consider a backup option.", "if you drew a ball from a bag of 10, seven of them would say rain.");
rainProb(80, "Expect Wet Weather", "An 80% chance means you should plan for rain. Wear a waterproof layer and have indoor alternatives ready. Leaving the umbrella home would be optimistic.", "four out of five scenarios end with rain. The deck is stacked against dry weather.");
rainProb(90, "Rain Is Almost Certain", "At 90%, rain is virtually guaranteed. Dress for wet weather, protect your electronics, and embrace the rain rather than fighting it.", "nine out of ten times, the sky delivers. If this were a test, rain would get an A.");

// ============= WHAT TO WEAR (9 posts) =============

function whatToWear(tempC: number, label: string, feel: string, layers: string[], accessories: string[], avoid: string[], activities: string) {
  const tempF = F(tempC);
  write(`what-to-wear-in-${label}-weather`, `What to Wear in ${tempC}°C (${tempF}°F) Weather`, `Practical clothing guide for ${tempC}°C weather: what layers to choose, fabrics that work, and mistakes to avoid.`, 3,
`## How ${tempC}°C (${tempF}°F) Feels

${feel}

## Recommended Layers

${layers.map(l => `- ${l}`).join("\n")}

## Accessories

${accessories.map(a => `- ${a}`).join("\n")}

## What to Avoid

${avoid.map(a => `- ${a}`).join("\n")}

## Best Fabrics for ${tempC}°C

${tempC <= 0 ? "Merino wool, fleece, and down insulation are your best friends. Look for moisture-wicking base layers that keep sweat away from your skin. Outer shells should be windproof and waterproof." : tempC <= 10 ? "Wool, fleece, and softshell fabrics balance warmth with breathability. A wind-resistant outer layer makes a big difference when the breeze picks up." : tempC <= 20 ? "Cotton, light wool, and blended fabrics work well. The key is layering so you can adjust as the day warms up or cools down." : "Linen, cotton, and moisture-wicking synthetics keep you cool. Avoid polyester that traps heat. Loose fits allow airflow around your body."}

## Activity Considerations

${activities}

## Quick Reference

| Condition | Recommendation |
|-----------|---------------|
| Temperature | ${tempC}°C (${tempF}°F) |
| Layers | ${layers.length} |
| Key piece | ${layers[0]} |
| Footwear | ${tempC <= 0 ? "Insulated waterproof boots" : tempC <= 15 ? "Closed-toe shoes or ankle boots" : "Breathable sneakers or sandals"} |

---

Check tomorrow's temperature for your city on [Weather Tomorrow](/) to plan your outfit.`);
}

whatToWear(-10, "minus-10c", "At -10°C, exposed skin can develop frostbite within 30 minutes in windy conditions. The air stings your lungs when you breathe deeply. This is serious cold that demands proper preparation.",
  ["Heavy insulated parka or down jacket", "Thermal base layer (merino wool or synthetic)", "Mid-layer fleece or wool sweater", "Insulated waterproof winter boots", "Thick wool or thermal socks"],
  ["Insulated gloves or mittens (mittens are warmer)", "Warm hat that covers your ears", "Scarf or balaclava to protect your face", "Hand and toe warmers for extended outdoor time"],
  ["Cotton — it absorbs moisture and makes you colder", "Thin fashion jackets without insulation", "Regular sneakers or leather shoes with no traction"],
  "Walking is fine if dressed properly. Running generates heat quickly so you can get away with one fewer layer. Waiting at bus stops or outdoor events requires maximum insulation since you are stationary."
);

whatToWear(-5, "minus-5c", "Noticeably cold. Your breath is clearly visible. Puddles are frozen, and any wind makes it feel significantly colder. You need proper winter clothing, but it is manageable with the right gear.",
  ["Warm winter coat (insulated or down)", "Thermal or wool base layer top and bottom", "Fleece or wool mid-layer", "Insulated or lined winter boots", "Warm socks — wool or thermal blend"],
  ["Lined gloves", "Warm hat or beanie", "Scarf for your neck and chin"],
  ["Lightweight jackets without insulation", "Cotton hoodies as your only warm layer", "Shoes without ankle support on icy surfaces"],
  "Short outdoor walks are comfortable with proper gear. For extended outdoor time like skiing or hiking, add an extra layer and pack hand warmers. Indoor-to-outdoor transitions require easy-to-remove layers."
);

whatToWear(0, "0c", "Right at freezing point. Water turns to ice, puddles are slushy, and your breath is visible. It feels cold, but with the right layers you can stay comfortable for hours outdoors.",
  ["Winter coat — insulated, not just a fashion shell", "Long-sleeve base layer (thermal or merino)", "Mid-layer sweater or fleece", "Warm trousers or jeans with thermals underneath", "Ankle boots with grip soles"],
  ["Gloves (touchscreen-compatible ones are practical)", "Beanie or warm headband", "Light scarf"],
  ["Going out in just a hoodie", "Thin cotton socks", "Smooth-soled shoes that slip on ice"],
  "Walking and light hiking are comfortable for most people. If you are active and generating body heat, you may want to unzip your coat. For standing still at outdoor markets or events, add an extra layer."
);

whatToWear(5, "5c", "Cool and brisk. You feel the cold on your cheeks and hands, but your core stays warm with a good jacket. Mornings and evenings feel noticeably colder than midday.",
  ["Medium-weight jacket or insulated coat", "Long-sleeve shirt or light sweater underneath", "Jeans, chinos, or lined trousers", "Closed-toe shoes or light boots"],
  ["Light gloves for early mornings", "Beanie or headband if it is windy", "A scarf adds warmth without bulk"],
  ["Shorts or thin trousers", "Sandals or open-toed shoes", "Relying on just a t-shirt and jacket without a mid-layer"],
  "Great temperature for walking, hiking, and sightseeing. You stay warm while moving. For sedentary activities like watching outdoor sports, add an extra sweater layer."
);

whatToWear(10, "10c", "Cool but pleasant. Comfortable for walking, but you will want a jacket, especially in shade or wind. Sitting outside at a cafe might feel chilly without an extra layer.",
  ["Light to medium jacket or a thick cardigan", "Long-sleeve shirt or thin sweater", "Jeans, trousers, or a long skirt", "Closed-toe shoes or sneakers"],
  ["Light scarf for breezy conditions", "Sunglasses if sunny"],
  ["Heavy winter coats (too warm when walking)", "Just a t-shirt unless the sun is strong and there is no wind"],
  "Ideal for walking tours, cycling, and light hiking. You generate enough body heat to stay comfortable with minimal layers. Outdoor dining is fine in the sun but bring a layer for shade."
);

whatToWear(25, "25c", "Warm and pleasant — what most people consider ideal weather. Comfortable in short sleeves during the day, though evenings might call for a light layer.",
  ["T-shirt or light cotton shirt", "Shorts, a skirt, or light trousers", "Light dress for a versatile option", "Breathable sneakers or comfortable sandals"],
  ["Sunglasses", "Sunscreen SPF 30+", "A light cardigan for air-conditioned interiors"],
  ["Heavy fabrics like denim jackets", "Dark colours that absorb heat", "Tight-fitting synthetic fabrics that trap sweat"],
  "Perfect for almost every outdoor activity. Running, cycling, hiking, and sightseeing are all comfortable. If you are sitting in direct sun for a long time, seek shade occasionally and stay hydrated."
);

whatToWear(30, "30c", "Properly hot. You will sweat during any physical activity. Shade and hydration become important. Air-conditioned spaces feel like a relief when you step inside.",
  ["Lightweight cotton or linen shirt", "Loose-fitting shorts or a flowy skirt", "Light sundress", "Breathable sandals or ventilated sneakers"],
  ["Wide-brimmed hat or cap", "High-SPF sunscreen (reapply every 2 hours)", "Sunglasses with UV protection", "Refillable water bottle"],
  ["Jeans or heavy trousers", "Dark tight-fitting clothes", "Synthetic fabrics that do not breathe", "Skipping sunscreen"],
  "Take it easy during the hottest part of the day (noon to 3pm). Morning and late afternoon are best for outdoor activities. Swimming, water sports, and shaded walks are ideal."
);

whatToWear(35, "35c", "Very hot. The heat is inescapable outdoors. Direct sunlight feels intense on your skin. You need sun protection, light fabrics, and plenty of water.",
  ["Lightest possible cotton or linen clothing in white or pale colours", "Loose-fitting shorts or a long flowy skirt (long fabric can actually be cooler)", "Moisture-wicking athletic wear if exercising"],
  ["Wide-brimmed sun hat — essential, not optional", "SPF 50+ sunscreen applied generously", "Quality sunglasses", "Refillable insulated water bottle to keep drinks cold", "Cooling towel for outdoor activities"],
  ["Wearing dark colours that absorb solar radiation", "Tight clothing that restricts airflow", "Going without sunscreen even for short exposures", "Wearing heavy shoes when sandals would work"],
  "Limit strenuous outdoor activity to early morning or evening. Midday heat can cause heat exhaustion. Swimming, snorkelling, and air-conditioned museums are your best friends. Always carry water."
);

whatToWear(40, "40c", "Extreme heat. This is dangerous territory for prolonged outdoor exposure. The air itself feels like an oven. Heat-related illness is a real risk without proper precautions.",
  ["Ultra-light, loose-fitting white or cream clothing", "Linen is the best fabric — it breathes and wicks moisture", "Minimal layers — a single loose shirt and shorts or a light dress"],
  ["Wide-brimmed sun hat with neck shade", "SPF 50+ sunscreen reapplied hourly", "UV-blocking sunglasses", "Insulated water bottle with ice", "Portable fan or cooling spray", "Electrolyte tablets for hydration"],
  ["Any dark-coloured clothing", "Synthetic fabrics that trap heat", "Being outdoors without head covering", "Heavy footwear when lighter options exist", "Skipping water because you are not thirsty (thirst lags behind dehydration)"],
  "Stay indoors during peak heat (11am-4pm). If you must be outside, stay in shade, rest often, and drink water before you feel thirsty. Watch for signs of heat stroke: dizziness, nausea, confusion. This is not weather for casual outdoor plans."
);

// ============= WEATHER CONCEPTS (17 posts) =============

function concept(slug: string, title: string, excerpt: string, content: string) {
  write(slug, title, excerpt, 4, content);
}

concept("wind-chill-explained", "Wind Chill Explained — How Cold It Really Feels",
"What is wind chill, how is it calculated, and why does wind make cold weather feel even colder? A plain-English guide.",
`## What Is Wind Chill?

Wind chill is the perceived decrease in temperature felt by your body when wind combines with cold air. A thermometer might read -5°C, but if the wind is blowing at 30 km/h, your skin loses heat as fast as it would at -13°C in calm conditions.

## How Wind Chill Works

Your body constantly radiates a thin layer of warm air against your skin. In calm conditions, this insulating layer stays put. Wind strips it away, forcing your body to work harder to maintain its core temperature.

The faster the wind, the quicker the warm layer disappears, and the colder you feel.

## Wind Chill Chart

| Air Temp | 10 km/h | 20 km/h | 30 km/h | 40 km/h |
|----------|---------|---------|---------|---------|
| 0°C | -3°C | -5°C | -7°C | -8°C |
| -5°C | -9°C | -12°C | -14°C | -15°C |
| -10°C | -15°C | -18°C | -21°C | -23°C |
| -15°C | -21°C | -25°C | -28°C | -30°C |

## Frostbite Risk

Wind chill below **-27°C** can cause frostbite on exposed skin within 10-30 minutes. Cover every patch of skin and limit time outdoors.

## Practical Tips

- Check both the temperature and wind chill before going outside in winter
- Wind chill only affects living things and water — it does not make your car engine colder
- Dress in windproof outer layers; even a light shell over a fleece blocks heat loss dramatically
- Shelter behind buildings, trees, or terrain to reduce wind exposure

---

Check wind speed and feels-like temperature on [Weather Tomorrow](/).`
);

concept("humidity-vs-temperature", "Humidity vs Temperature — Why Both Matter",
"Understanding how humidity and temperature interact to determine how hot or cold weather actually feels on your body.",
`## Why Temperature Alone Is Not Enough

A day at 30°C in the desert feels completely different from 30°C in the tropics. The difference is humidity — the amount of water vapour in the air.

## How Humidity Affects How You Feel

Your body cools itself by sweating. When sweat evaporates from your skin, it carries heat away. In humid air, there is already so much moisture that sweat evaporates slowly — or not at all. You stay hot and clammy.

In dry air, sweat evaporates quickly and efficiently, so the same temperature feels much more comfortable.

## Relative Humidity Guide

| Humidity | Comfort Level |
|----------|---------------|
| Below 30% | Very dry — may cause dry skin, chapped lips |
| 30-50% | Ideal comfort zone |
| 50-70% | Noticeable — slightly muggy on warm days |
| 70-80% | Uncomfortable in heat — sweat does not evaporate well |
| Above 80% | Oppressive — even moderate temps feel exhausting |

## The Heat Index

Meteorologists combine temperature and humidity into the **heat index** (or feels-like temperature). At 32°C with 70% humidity, the heat index can reach 41°C — a dangerous level.

## Cold Weather and Humidity

Humidity matters in winter too. Humid cold air feels more penetrating than dry cold because moist air conducts heat away from your body faster.

## Practical Takeaway

Always check both temperature and humidity (or the feels-like reading) before planning outdoor activities. A 28°C day at 80% humidity is harder on your body than 32°C at 30% humidity.

---

See feels-like temperature for any city on [Weather Tomorrow](/).`
);

concept("dew-point-explained", "Dew Point Explained — The Real Comfort Metric",
"Dew point is a better indicator of comfort than relative humidity. Learn what it means and why meteorologists prefer it.",
`## What Is Dew Point?

The dew point is the temperature at which air becomes saturated and water vapour condenses into dew, fog, or clouds. A higher dew point means more moisture in the air.

## Why Dew Point Beats Humidity

Relative humidity changes throughout the day as temperature shifts. The same amount of moisture gives 90% humidity at dawn but 40% by afternoon. Dew point stays constant, making it a more reliable comfort gauge.

## Dew Point Comfort Scale

| Dew Point | How It Feels |
|-----------|-------------|
| Below 10°C | Dry, very comfortable |
| 10-15°C | Comfortable, pleasant |
| 16-18°C | Slightly noticeable |
| 19-21°C | Starting to feel sticky |
| 22-24°C | Muggy, uncomfortable for most |
| Above 24°C | Oppressive, tropical |

## How Dew Point Forms Fog and Dew

When the air temperature drops to the dew point, moisture condenses. This is why dew appears on grass in the morning (ground cools to the dew point overnight) and why fog forms in valleys (cool air pools and reaches saturation).

## Practical Uses

- **Exercise planning**: A dew point above 20°C makes strenuous outdoor exercise risky
- **Travel comfort**: Tropical destinations often have dew points above 24°C year-round
- **Home comfort**: Indoor dew points above 16°C may require dehumidification

---

Check current dew point and comfort levels on [Weather Tomorrow](/).`
);

concept("barometric-pressure-weather", "Barometric Pressure and Weather — What the Numbers Mean",
"How atmospheric pressure affects weather, why falling pressure means storms, and how to read a barometer.",
`## What Is Barometric Pressure?

Barometric (atmospheric) pressure is the weight of the air column above you. It is measured in hectopascals (hPa) or millibars (mb) — they are the same unit. Standard sea-level pressure is **1013.25 hPa**.

## How Pressure Predicts Weather

- **Rising pressure** → air is sinking → clouds disperse → fair weather ahead
- **Falling pressure** → air is rising → clouds form → rain or storms likely
- **Steady pressure** → current conditions will persist

## Reading the Numbers

| Pressure (hPa) | Typical Conditions |
|----------------|--------------------|
| Above 1030 | Clear skies, dry, calm |
| 1013-1030 | Fair weather |
| 1000-1013 | Unsettled, clouds building |
| Below 1000 | Storms, rain, strong wind |
| Below 980 | Severe storm or hurricane |

## Why Changes Matter More Than Absolutes

A reading of 1005 hPa can mean different things. What matters is the **trend**. If pressure dropped from 1020 to 1005 over 12 hours, a storm is approaching. If it has been steady at 1005, conditions are stable.

## Pressure and Altitude

Pressure decreases with altitude. At 1,500m elevation, normal pressure might read only 845 hPa. Weather stations adjust readings to sea-level equivalents for comparison.

## Practical Tips

- Check pressure trend arrows on weather apps, not just the current value
- Rapidly falling pressure (more than 5 hPa in 3 hours) warns of approaching severe weather
- Some people experience headaches when pressure drops quickly

---

Track pressure changes on [Weather Tomorrow](/).`
);

concept("how-to-read-weather-map", "How to Read a Weather Map — A Beginner's Guide",
"Weather maps look complicated, but they follow simple rules. Learn to read fronts, pressure systems, and isobars in five minutes.",
`## The Basics

A weather map (synoptic chart) shows atmospheric pressure patterns, fronts, and precipitation across a region at a specific time. Once you know the symbols, you can predict local weather better than most apps.

## Isobars — The Contour Lines

Those curvy lines are **isobars** — lines of equal pressure. Think of them like contour lines on a hiking map, but for air pressure.

- **Closely spaced isobars** = strong pressure gradient = windy
- **Widely spaced isobars** = weak gradient = calm

## High and Low Pressure Systems

- **H (High)** — sinking air, clear skies, calm winds. Clockwise rotation in the Northern Hemisphere.
- **L (Low)** — rising air, clouds, rain. Counter-clockwise rotation in the Northern Hemisphere. (Reversed in the Southern Hemisphere.)

## Weather Fronts

| Symbol | Type | What It Brings |
|--------|------|----------------|
| Blue triangles | Cold front | Sharp temperature drop, heavy but brief rain |
| Red semicircles | Warm front | Gradual warming, light prolonged rain |
| Alternating | Occluded front | Mixed conditions, extended cloud |
| Opposing symbols | Stationary front | Lingering cloud and drizzle |

## Reading Wind Direction

Wind flows roughly parallel to isobars, slightly angled toward low pressure. In the Northern Hemisphere, if you stand with your back to the wind, low pressure is to your left.

## Putting It Together

1. Find your location on the map
2. Check if a front is approaching
3. Note the nearest H or L centre
4. Look at isobar spacing for wind strength
5. Check the direction everything is moving (weather generally moves west to east)

---

Get a simplified daily forecast on [Weather Tomorrow](/).`
);

concept("weather-app-accuracy", "How Accurate Are Weather Apps?",
"We compare weather app accuracy across different time horizons and explain why forecasts get less reliable over time.",
`## The Short Answer

Modern weather apps are remarkably accurate for the next 1-3 days. Beyond that, accuracy drops steadily. By day 10, forecasts are only slightly better than climatological averages.

## Accuracy by Time Horizon

| Forecast Window | Temperature Accuracy | Rain Accuracy |
|-----------------|---------------------|---------------|
| Today | ±1°C | 85-95% |
| Tomorrow | ±1-2°C | 80-90% |
| 3 days | ±2-3°C | 70-80% |
| 5 days | ±3-4°C | 60-70% |
| 7 days | ±4-5°C | 50-60% |
| 10+ days | ±5°C+ | Little better than guessing |

## Why Forecasts Get Worse Over Time

Weather is a **chaotic system**. Tiny differences in initial conditions amplify over time. Edward Lorenz called this the butterfly effect. After about 10 days, those tiny uncertainties have grown so large that specific predictions become meaningless.

## Which Apps Are Most Accurate?

Studies consistently show that apps powered by the **European Centre for Medium-Range Weather Forecasts (ECMWF)** tend to perform best globally. The US **Global Forecast System (GFS)** is a close second.

Most consumer apps blend multiple models. The best ones weight models dynamically based on which has been performing best in your region.

## How to Get the Best Forecast

- Check the forecast the evening before, not three days out
- Look at hourly breakdowns rather than daily summaries
- Compare two or three apps if an important event depends on weather
- Pay more attention to temperature forecasts (more reliable) than rain timing (less reliable)

---

[Weather Tomorrow](/) uses the latest forecast models updated hourly.`
);

concept("weather-radar-explained", "Weather Radar Explained — How It Works",
"How weather radar detects rain, snow, and storms in real time. A simple guide to reading radar maps.",
`## How Weather Radar Works

A weather radar station sends out pulses of microwave energy. When those pulses hit raindrops, snowflakes, or hail, some energy bounces back. The radar measures the returned signal to determine what precipitation is out there.

## What the Colours Mean

Radar maps use colour scales to show precipitation intensity:

| Colour | Meaning |
|--------|---------|
| Green (light) | Light rain or drizzle |
| Green (dark) | Moderate rain |
| Yellow | Heavy rain |
| Orange | Very heavy rain |
| Red | Intense rainfall, possible flooding |
| Purple/Magenta | Extreme — hail, severe thunderstorm |

## Types of Weather Radar

- **Reflectivity** — Shows where precipitation is and how heavy it is (the standard coloured map)
- **Doppler velocity** — Shows whether precipitation is moving toward or away from the radar, crucial for detecting rotation in storms (tornados)
- **Dual-polarisation** — Sends both horizontal and vertical pulses to distinguish rain from hail, snow, and debris

## Reading a Radar Loop

Radar animations show you:
- Which direction storms are moving
- How fast they are travelling
- Whether storms are growing or weakening
- When rain will reach your location

## Radar Limitations

- Radar beams travel in straight lines, so the curve of the Earth creates blind spots far from stations
- Mountains can block radar signals
- Very light drizzle or high-altitude virga (rain that evaporates before reaching ground) may not show clearly

---

Get real-time weather updates on [Weather Tomorrow](/).`
);

concept("weather-forecast-accuracy-limits", "How Far Ahead Can Weather Be Predicted?",
"The science behind forecast limits: why 10 days is the practical ceiling and what that means for planning.",
`## The Theoretical Limit

Due to the chaotic nature of the atmosphere, **specific weather forecasts become unreliable beyond about 10-14 days**. This is not a technology problem — it is a fundamental property of fluid dynamics.

## Current Practical Accuracy

| Timeframe | What You Can Trust |
|-----------|--------------------|
| 0-3 days | Specific temps, rain timing, wind |
| 4-7 days | General trends, warm vs cold, wet vs dry |
| 8-14 days | Broad patterns only (warmer/cooler than average) |
| 15-30 days | Probabilistic outlooks, not specific forecasts |
| Seasonal | General tendencies driven by ocean patterns (El Niño, etc.) |

## Why the Limit Exists

The atmosphere is a chaotic system. Two nearly identical starting states can diverge completely after about two weeks. Even with perfect observations (which we do not have), this chaos sets a hard ceiling on prediction.

## What Has Improved

Modern forecasts have gained about one day of skill per decade since the 1980s. Today's 5-day forecast is as accurate as a 3-day forecast was in the 1990s. This comes from better satellite data, more computing power, and smarter mathematical models.

## What About AI Weather Models?

Machine learning models like Google DeepMind's GraphCast and Huawei's Pangu-Weather show promising results, sometimes matching or beating traditional models for medium-range forecasts. But they face the same chaos limit — they predict better within the window, they cannot extend it.

## Practical Advice

- Trust hourly details for the next 48 hours
- Use 3-7 day forecasts for general planning (pack for rain, dress warm)
- Treat 10+ day outlooks as rough guidance, not commitments
- Re-check forecasts daily as your event approaches

---

See the most up-to-date forecasts on [Weather Tomorrow](/).`
);

concept("heat-index-explained", "Heat Index Explained — When Heat Gets Dangerous",
"The heat index combines temperature and humidity to show how hot it really feels. Learn the danger thresholds.",
`## What Is the Heat Index?

The heat index (or apparent temperature) shows what the temperature **feels like** when humidity is factored in. At 33°C with 70% humidity, the heat index can reach 41°C — well into the danger zone.

## Why It Matters

Your body cools itself by sweating. When humidity is high, sweat cannot evaporate efficiently, and your core temperature rises. The heat index captures this effect.

## Heat Index Danger Scale

| Heat Index | Risk Level | Symptoms |
|------------|-----------|----------|
| 27-32°C | Caution | Fatigue possible with prolonged exposure |
| 33-39°C | Extreme Caution | Heat cramps, exhaustion possible |
| 40-51°C | Danger | Heat exhaustion likely, heat stroke possible |
| Above 51°C | Extreme Danger | Heat stroke highly likely |

## Heat Index Table

| Temp \\ Humidity | 40% | 50% | 60% | 70% | 80% |
|----------|------|------|------|------|------|
| 27°C | 27°C | 27°C | 28°C | 29°C | 30°C |
| 30°C | 30°C | 31°C | 33°C | 35°C | 38°C |
| 33°C | 34°C | 36°C | 38°C | 42°C | 48°C |
| 36°C | 39°C | 42°C | 47°C | 54°C | — |

## Staying Safe

- Hydrate before you feel thirsty — thirst means you are already dehydrated
- Take breaks in shade or air conditioning every 30 minutes
- Wear light, loose, light-coloured clothing
- Check on elderly neighbours and pets
- Never leave children or animals in parked cars

---

Check the feels-like temperature on [Weather Tomorrow](/).`
);

concept("weather-watch-vs-warning", "Weather Watch vs Warning — What Is the Difference?",
"A watch means conditions are possible. A warning means they are imminent. Understanding the difference could save your life.",
`## The Simple Rule

- **Watch** = Be aware. Conditions are favourable for severe weather. **Prepare.**
- **Warning** = Take action. Severe weather is happening or about to happen. **Act now.**

## Watch — Time to Prepare

A watch is issued hours before severe weather is expected. It covers a large area. This is your time to:

- Review your emergency plan
- Charge devices
- Gather supplies (water, torch, medications)
- Monitor forecasts for updates
- Know where your shelter is

## Warning — Time to Act

A warning means severe weather has been detected on radar or reported by observers. It covers a smaller, more specific area. You should:

- Move to your safe place immediately
- Stay away from windows
- Follow official instructions
- Do not drive through flooded roads

## Types of Alerts

| Event | Watch | Warning |
|-------|-------|---------|
| Thunderstorm | Conditions favour storms | Severe storm detected |
| Tornado | Tornadoes possible in area | Tornado spotted or on radar |
| Hurricane | Hurricane may affect area in 48h | Hurricane expected in 36h |
| Flood | Flooding possible | Flooding occurring or imminent |
| Winter storm | Heavy snow/ice possible | Heavy snow/ice expected |

## Advisory vs Watch vs Warning

An **advisory** sits below a watch — it means weather may cause inconvenience (e.g., light snow making roads slippery) but is not life-threatening.

## Where to Get Alerts

- National weather services push alerts through phone emergency systems
- Weather apps with notification features
- NOAA Weather Radio (USA)
- Local radio and TV stations

---

Stay informed with accurate forecasts on [Weather Tomorrow](/).`
);

concept("reading-cloud-types", "Reading Cloud Types — What Clouds Tell You About Weather",
"Learn to identify the main cloud types and what each one means for upcoming weather.",
`## Why Clouds Matter

Clouds are the atmosphere's mood ring. Their shape, height, and colour reveal what the air is doing — and what weather is coming next.

## High Clouds (Above 6,000m)

| Cloud | Appearance | Weather Signal |
|-------|------------|----------------|
| Cirrus | Thin wispy streaks | Fair weather now; front may be approaching |
| Cirrostratus | Thin sheet, halo around sun/moon | Rain likely within 12-24 hours |
| Cirrocumulus | Small rippled patches | Unsettled weather on the way |

## Mid-Level Clouds (2,000-6,000m)

| Cloud | Appearance | Weather Signal |
|-------|------------|----------------|
| Altostratus | Grey sheet, sun dimly visible | Rain approaching within hours |
| Altocumulus | Grey/white puffs in rows | Fair weather; thunderstorms possible if morning |

## Low Clouds (Below 2,000m)

| Cloud | Appearance | Weather Signal |
|-------|------------|----------------|
| Stratus | Flat grey blanket | Drizzle or overcast, dull day |
| Stratocumulus | Lumpy grey layer | Dry but cloudy |
| Nimbostratus | Thick dark grey | Steady rain or snow |

## Vertical Development Clouds

| Cloud | Appearance | Weather Signal |
|-------|------------|----------------|
| Cumulus | Puffy white cotton balls | Fair weather (when small) |
| Cumulonimbus | Towering anvil-shaped | Thunderstorms, heavy rain, possible hail |

## Quick Forecast Rules

- Thickening and lowering clouds = worsening weather
- Clouds breaking up and rising = improving weather
- Tall, rapidly growing clouds = storms likely within hours
- Wispy high clouds moving fast = wind and possibly rain coming

---

Check if rain is forecast for your city on [Weather Tomorrow](/).`
);

concept("red-sky-weather-meaning", "Red Sky at Night — Does This Weather Saying Actually Work?",
"The science behind the oldest weather proverb and which traditional sayings have real meteorological backing.",
`## The Saying

"Red sky at night, sailor's delight. Red sky in the morning, sailor's warning."

## Does It Work?

**Yes — in mid-latitude regions where weather moves west to east.** This saying has genuine meteorological backing and has been used by sailors for over 2,000 years.

## The Science

- **Red sky at night**: The setting sun (in the west) illuminates dust and moisture particles in the atmosphere to the west. For the sky to appear red, the air to the west must be dry and clear — meaning fair weather is approaching from that direction.
- **Red sky in the morning**: The rising sun (in the east) lights up moisture-laden air to the east, meaning the good weather has already passed and wet weather is moving in from the west.

## Other Weather Sayings That Work

| Saying | Verdict | Why |
|--------|---------|-----|
| "Ring around the moon, rain or snow soon" | ✓ Often true | Ice crystals in cirrostratus clouds create halos; these clouds often precede fronts |
| "When dew is on the grass, rain will never come to pass" | ✓ Mostly true | Dew forms on clear, calm nights — conditions that often persist into the next day |
| "Swallows flying low, rain is on the way" | ✓ Has merit | Insects fly lower in humid air; swallows follow their food |
| "Cows lying down means rain" | ✗ Myth | Cows lie down for many reasons unrelated to weather |

## Limitations

The red sky rule works best in temperate regions between 30° and 60° latitude where prevailing westerlies drive weather patterns. In the tropics, where weather can come from any direction, it is less reliable.

---

See tomorrow's forecast on [Weather Tomorrow](/) — no proverbs needed.`
);

concept("weather-and-headaches", "Weather and Headaches — Is There a Connection?",
"Many people blame the weather for their headaches. Here is what science actually says about barometric pressure, temperature, and migraines.",
`## The Short Answer

**Yes, there is a real connection.** Multiple studies have found that changes in barometric pressure, temperature, and humidity can trigger headaches and migraines in susceptible people.

## Which Weather Changes Trigger Headaches?

| Trigger | Mechanism |
|---------|-----------|
| Falling barometric pressure | May cause expansion of blood vessels in the brain |
| Rapid temperature changes | The body's stress response can trigger tension headaches |
| High humidity | Can cause dehydration and sinus pressure |
| Bright sunlight or glare | Photosensitive migraine trigger |
| Strong winds | Carrying allergens and changing pressure |

## What the Research Shows

A study published in the journal *Neurology* found that a 5 hPa drop in barometric pressure within 24 hours increased migraine risk by about 6%. Another study in *Internal Medicine* linked temperature drops of 5°C or more to increased emergency room visits for headaches.

## Who Is Most Affected?

- People with a history of migraines
- Those with sinus conditions
- People with joint conditions (similar pressure sensitivity)
- About 50-60% of migraine sufferers report weather as a trigger

## What You Can Do

- Track your headaches alongside weather data to identify your personal triggers
- Stay hydrated — dehydration amplifies weather-related headaches
- Wear sunglasses on bright days
- Consider taking preventive medication before known trigger days
- Maintain a consistent sleep schedule regardless of weather

## The Nuance

Weather is rarely the sole cause. It is more often a contributing factor that, combined with stress, poor sleep, or dehydration, tips the balance.

---

Monitor weather changes with [Weather Tomorrow](/).`
);

concept("weather-and-mood", "How Weather Affects Your Mood — The Science",
"Sunshine lifts your spirits and grey skies bring you down. But the relationship between weather and mood is more complex than you think.",
`## The Sunshine-Mood Connection

Sunlight triggers serotonin production in the brain. Serotonin is the neurotransmitter linked to feelings of wellbeing and happiness. This is why sunny days genuinely make most people feel better.

## Seasonal Affective Disorder (SAD)

In higher latitudes, reduced winter daylight can cause **SAD** — a form of depression affecting roughly 5% of adults. Symptoms include low energy, oversleeping, carbohydrate cravings, and social withdrawal.

## How Different Weather Affects Mood

| Weather | Typical Effect |
|---------|---------------|
| Sunny, 20-25°C | Peak mood, energy, and motivation |
| Overcast, mild | Neutral — most people are unaffected |
| Rainy, grey | Lower mood for some, cozy for others |
| Extreme heat (35°C+) | Irritability, aggression increase |
| Cold, dark winter days | Higher rates of depression and SAD |
| Humid, no wind | Lethargy, reduced concentration |

## The Research

A study in *Psychological Science* found that temperature had the strongest effect on mood — specifically, higher temperatures (up to a point) correlated with better moods. But above about 30°C, positive mood declined and aggression increased.

## It Is Not Just About Sunshine

- **Barometric pressure drops** are linked to lower mood
- **Wind** can increase anxiety and irritability
- **Air quality** (haze, pollution) negatively affects mental state
- **Nature exposure** in any weather improves mood — the outdoors itself matters

## Practical Tips

- Get outside for at least 20 minutes of daylight daily, even when overcast
- Use a light therapy lamp during dark winter months
- Exercise outdoors — the mood benefit is stronger than indoor exercise
- Do not blame weather entirely; it is one input among many

---

Plan your best days with [Weather Tomorrow](/).`
);

concept("weather-and-sleep", "How Weather Affects Your Sleep Quality",
"Temperature, humidity, light, and storms all influence how well you sleep. Here is what the science says and how to adapt.",
`## The Ideal Sleeping Conditions

Sleep research consistently points to a bedroom temperature of **16-19°C (60-67°F)** as optimal. Your core body temperature naturally drops at night, and a cool room supports this process.

## How Different Weather Affects Sleep

| Condition | Effect on Sleep |
|-----------|-----------------|
| Hot, humid nights | Difficulty falling asleep, more wake-ups, less deep sleep |
| Cold nights | Easier to sleep if you have adequate bedding |
| Storms (thunder) | Can wake light sleepers; some find rain sounds soothing |
| High pressure, clear | Generally better sleep quality |
| Long summer daylight | Delayed sleep onset without blackout curtains |
| Short winter days | Earlier drowsiness, potential oversleeping |

## Heat and Sleep

When nighttime temperatures stay above **24°C**, sleep quality drops significantly. The body struggles to dump excess heat, leading to restlessness, reduced REM sleep, and frequent awakenings.

## Humidity and Sleep

Optimal sleeping humidity is **30-50%**. Above 60%, the air feels clammy, and below 30%, you may wake up with a dry throat or congested nose.

## Light and Circadian Rhythm

In summer, extended daylight delays melatonin production. In winter, early darkness can make you sleepy too early. Both disrupt your circadian rhythm.

## Practical Tips for Weather-Proof Sleep

- Use a fan or air conditioning when nights exceed 22°C
- Invest in blackout curtains for summer or high-latitude locations
- Use a dehumidifier in humid climates
- Keep a window slightly open in cool weather for fresh air circulation
- Rain and thunder sounds can be calming — try a white noise app if real storms wake you

---

Check tonight's temperature on [Weather Tomorrow](/).`
);

// ============= WEATHER PHENOMENA (30 posts) =============

function phenomenon(slug: string, title: string, excerpt: string, content: string) {
  write(slug, title, excerpt, 4, content);
}

phenomenon("what-causes-thunder-lightning", "What Causes Thunder and Lightning?",
"The science behind thunderstorms: how electrical charges build in clouds and why lightning is hotter than the surface of the sun.",
`## How Lightning Forms

Inside a cumulonimbus cloud, updrafts and downdrafts cause ice crystals and water droplets to collide violently. These collisions separate electrical charges — positive charges rise to the top of the cloud, negative charges accumulate at the bottom.

When the charge difference becomes strong enough, the air between them (or between the cloud and the ground) breaks down, creating a conductive channel. A massive electrical discharge — lightning — bridges the gap in milliseconds.

## Why We Hear Thunder

Lightning superheats the air around it to **30,000°C** — five times hotter than the surface of the sun. This extreme heating causes the air to expand explosively, creating a shockwave. That shockwave is thunder.

## Why Thunder Rumbles

If lightning were a single point, you would hear one sharp crack. But a lightning bolt is a long, jagged channel. Sound from the nearest part reaches you first, followed by sound from further sections, creating the rolling rumble.

## Lightning Facts

- A single bolt carries up to **1 billion volts**
- Lightning strikes Earth about **100 times per second**
- The average bolt is 3-5 km long but can extend over 100 km
- Lightning can strike the same place repeatedly — the Empire State Building is hit about 25 times per year

## The 30-30 Rule for Safety

- If the time between seeing lightning and hearing thunder is **less than 30 seconds**, seek shelter
- Stay inside for at least **30 minutes** after the last thunder

---

Track storm forecasts on [Weather Tomorrow](/).`
);

phenomenon("how-hurricanes-form", "How Hurricanes Form — From Tropical Wave to Category 5",
"The step-by-step process that turns a cluster of thunderstorms over warm ocean water into one of nature's most powerful forces.",
`## Ingredients for a Hurricane

1. **Warm ocean water** — at least 26°C to a depth of 50 metres
2. **Atmospheric instability** — warm, moist air rising rapidly
3. **Low wind shear** — consistent winds at different altitudes so the storm structure is not torn apart
4. **Distance from the equator** — at least 5° latitude so the Coriolis effect can start rotation

## The Formation Process

**Stage 1: Tropical Disturbance** — A cluster of thunderstorms organises over warm water, often starting as an African easterly wave crossing the Atlantic.

**Stage 2: Tropical Depression** — Sustained winds reach 62 km/h. The system develops a closed circulation. It gets a number.

**Stage 3: Tropical Storm** — Winds reach 63-118 km/h. The storm gets a name. Rain bands spiral outward.

**Stage 4: Hurricane** — Winds exceed 119 km/h. An eye forms at the centre — a calm, clear column surrounded by the most intense winds (the eyewall).

## The Saffir-Simpson Scale

| Category | Wind Speed | Damage |
|----------|-----------|--------|
| 1 | 119-153 km/h | Minimal — roof tiles, tree branches |
| 2 | 154-177 km/h | Moderate — roofs, small trees |
| 3 | 178-208 km/h | Extensive — structural damage |
| 4 | 209-251 km/h | Extreme — severe structural damage |
| 5 | 252+ km/h | Catastrophic — total destruction |

## Why Hurricanes Weaken

Hurricanes lose power when they move over cool water, encounter wind shear, or make landfall (cut off from their warm-water fuel source).

---

Monitor tropical weather on [Weather Tomorrow](/).`
);

phenomenon("how-tornadoes-form", "How Tornadoes Form — Nature's Most Violent Storms",
"From supercell thunderstorms to funnel clouds: how tornadoes develop, where they strike, and why they are so destructive.",
`## What Is a Tornado?

A tornado is a violently rotating column of air extending from a thunderstorm to the ground. Wind speeds can exceed 480 km/h in the strongest tornadoes, making them the most intense atmospheric phenomenon on Earth.

## How They Form

Most significant tornadoes are born from **supercell thunderstorms** — massive rotating storms with a persistent updraft called a mesocyclone.

1. **Wind shear** creates horizontal rotation in the lower atmosphere
2. A strong **updraft** tilts this rotation vertical
3. The rotating column tightens and accelerates (like a spinning ice skater pulling in their arms)
4. A **funnel cloud** descends; when it touches the ground, it becomes a tornado

## The Enhanced Fujita Scale

| Rating | Wind Speed | Damage |
|--------|-----------|--------|
| EF0 | 105-137 km/h | Light — broken branches |
| EF1 | 138-178 km/h | Moderate — roofs peeled |
| EF2 | 179-218 km/h | Considerable — homes unroofed |
| EF3 | 219-266 km/h | Severe — walls collapsed |
| EF4 | 267-322 km/h | Devastating — homes levelled |
| EF5 | 322+ km/h | Incredible — structures swept away |

## Tornado Alley

The central United States (Texas to South Dakota) sees the most tornadoes globally, due to the collision of warm Gulf air with cold Canadian air and dry Rocky Mountain air. But tornadoes can occur anywhere, including Bangladesh, Argentina, and parts of Europe.

## Safety

- Move to the lowest interior room (basement or interior bathroom)
- Cover yourself with a mattress or heavy blankets
- Stay away from windows
- If in a car, drive at right angles to the tornado's path — do not try to outrun it

---

Stay weather-aware with [Weather Tomorrow](/).`
);

phenomenon("what-is-el-nino", "What Is El Niño? How It Changes Global Weather",
"El Niño reshuffles weather patterns worldwide. Learn what it is, how it forms, and what it means for your region.",
`## The Basics

El Niño is a climate pattern that occurs when **sea surface temperatures in the central and eastern Pacific Ocean become unusually warm**. It is one half of ENSO — the El Niño-Southern Oscillation — and typically occurs every 2-7 years, lasting 9-12 months.

## What Happens During El Niño

Normally, trade winds blow warm water westward across the Pacific, keeping the eastern Pacific (off South America) cool. During El Niño, these trade winds weaken. Warm water spreads eastward, disrupting atmospheric circulation patterns globally.

## Global Effects

| Region | El Niño Impact |
|--------|---------------|
| Western US | Wetter, stormier winters |
| Southeast US | Cooler, wetter winters |
| South America (west) | Heavy rain, flooding |
| Australia & Indonesia | Drought, bushfire risk |
| India | Weaker monsoon, less rainfall |
| East Africa | Increased rainfall |
| Northern Europe | Milder winters |

## Economic Impact

El Niño affects agriculture, fisheries, and energy worldwide. The 2015-16 El Niño caused an estimated $5.7 billion in damage globally. Peruvian fisheries collapse during strong events as warm water drives away cold-water fish.

## How It Is Monitored

Scientists track sea surface temperatures in four Pacific regions (Niño 1+2, 3, 3.4, and 4). An El Niño is declared when the Niño 3.4 region is 0.5°C or more above average for at least five consecutive months.

---

See how global patterns affect your local weather on [Weather Tomorrow](/).`
);

phenomenon("what-is-la-nina", "What Is La Niña? The Cool Counterpart to El Niño",
"La Niña brings cooler Pacific waters and flips global weather patterns. Learn how it differs from El Niño and what it means.",
`## What Is La Niña?

La Niña is the opposite phase of ENSO. While El Niño warms the central and eastern Pacific, **La Niña cools these same waters below average**. Strengthened trade winds push warm water further west, bringing cold, nutrient-rich water to the surface off South America.

## Global Effects

| Region | La Niña Impact |
|--------|---------------|
| Western US | Drier, warmer winters |
| Southeast US | Warmer, drier |
| Northern US | Colder, snowier |
| Australia | Wetter, flooding risk |
| India | Stronger monsoon |
| South America (west) | Drier conditions |
| East Africa | Drought risk |
| Atlantic Hurricane Season | More active |

## La Niña vs El Niño

| | El Niño | La Niña |
|---|---------|---------|
| Pacific temps | Warmer than average | Cooler than average |
| Trade winds | Weaken | Strengthen |
| Australia | Drought | Floods |
| Atlantic hurricanes | Fewer | More |

## Duration

La Niña events tend to last longer than El Niño, sometimes persisting for two or three consecutive years (a "double-dip" or "triple-dip" La Niña).

## Why It Matters for You

La Niña's influence on the jet stream shifts storm tracks, affecting rainfall and temperature patterns across entire continents. Knowing the current ENSO state helps you understand why your winter might be unusually wet, dry, warm, or cold.

---

See your local forecast on [Weather Tomorrow](/).`
);

phenomenon("why-sky-is-blue", "Why Is the Sky Blue? The Science Explained Simply",
"The answer involves sunlight, air molecules, and a phenomenon called Rayleigh scattering. Here is how it works.",
`## The Short Answer

Sunlight contains all colours of the rainbow. When it enters Earth's atmosphere, **blue light is scattered more than other colours** because it travels in shorter, smaller waves that bounce off gas molecules more easily. This scattered blue light reaches your eyes from all directions, making the sky appear blue.

## Rayleigh Scattering

This phenomenon is called **Rayleigh scattering**, named after Lord Rayleigh who explained it in the 1870s. It states that shorter wavelengths of light are scattered more efficiently by small particles (like nitrogen and oxygen molecules).

Blue light has a wavelength of about 450nm — shorter than green (520nm), yellow (580nm), or red (700nm). It scatters roughly 5.5 times more than red light.

## Why Not Violet?

Violet light has an even shorter wavelength than blue, so it should scatter even more. There are two reasons we see blue, not violet:

1. Sunlight contains more blue than violet light
2. Our eyes are more sensitive to blue than violet

## Why Sunsets Are Red

At sunset, sunlight travels through much more atmosphere to reach you. By the time it arrives, most of the blue light has already scattered away, leaving red and orange wavelengths to dominate. This is also why the sun itself looks redder near the horizon.

## Other Sky Colours

- **White sky**: Heavy haze or thin cloud scatters all wavelengths equally
- **Grey sky**: Thick clouds block most light
- **Green sky**: Rare, associated with severe thunderstorms filtering light through hail-filled clouds

---

See today's sky conditions on [Weather Tomorrow](/).`
);

phenomenon("what-causes-rainbows", "What Causes Rainbows? The Complete Explanation",
"Rainbows are not just beautiful — they are a physics lesson painted across the sky. Here is exactly how they form.",
`## How Rainbows Form

A rainbow appears when sunlight enters a raindrop, **refracts** (bends), **reflects** off the back of the drop, and **refracts again** as it exits. Different colours bend at slightly different angles, spreading white light into the visible spectrum.

## The Colour Order

From outside to inside: **Red, Orange, Yellow, Green, Blue, Indigo, Violet** (remember ROY G BIV). Red bends the least and appears on the outer edge; violet bends the most and appears on the inner edge.

## Conditions Needed

- **Sun behind you** — you must face away from the sun
- **Rain or moisture in front of you** — the drops act as tiny prisms
- **Sun at a low angle** — rainbows appear when the sun is below 42° above the horizon, which is why they are more common in late afternoon

## Double Rainbows

A secondary rainbow forms when light reflects **twice** inside each raindrop. The second bow is fainter and has its colour order reversed (violet on the outside). The dark band between the two bows is called **Alexander's dark band**.

## Rainbow Facts

- Every rainbow is actually a full circle — you see a semi-circle because the ground cuts off the bottom half
- From an aeroplane, you can sometimes see a complete circular rainbow
- No two people see the exact same rainbow — each observer sees light from different raindrops
- Moonbows (lunar rainbows) exist but appear white to the naked eye because the light is too faint for colour receptors

---

Check rain forecasts on [Weather Tomorrow](/) — you might spot a rainbow.`
);

phenomenon("how-snow-forms", "How Snow Forms — From Water Vapour to Snowflake",
"Snowflakes are not frozen raindrops. They grow directly from water vapour in a delicate crystallisation process high in the clouds.",
`## Snow vs Frozen Rain

A common misconception is that snow is frozen rain. In reality, snowflakes form through a completely different process. Rain freezes; snow crystallises.

## The Formation Process

1. **Water vapour** rises into a cloud where temperatures are below freezing
2. The vapour encounters a tiny **ice nucleus** — often a speck of dust, pollen, or bacteria
3. Water vapour deposits directly onto the nucleus as ice (skipping the liquid phase)
4. The ice crystal grows into a hexagonal structure as more vapour attaches
5. The snowflake falls when it becomes heavy enough, continuing to grow on its descent

## Why Snowflakes Are Hexagonal

Water molecules bond at 120° angles due to their molecular structure. This produces six-sided symmetry in every ice crystal, from simple plates to elaborate branching stars.

## Types of Snowflakes

| Temperature | Crystal Type |
|-------------|-------------|
| 0 to -3°C | Thin plates |
| -3 to -8°C | Needles and columns |
| -8 to -12°C | Plates and sectors |
| -12 to -16°C | Stellar dendrites (classic star shapes) |
| Below -16°C | Plates and columns again |

## Are All Snowflakes Unique?

Simple snowflakes (small plates and needles) can look identical. But complex stellar dendrites have so many variables (temperature, humidity, wind during their 30-60 minute descent) that two identical ones are statistically near impossible.

## Snow-to-Liquid Ratio

Fresh fluffy snow at -10°C has a ratio of about 15:1 (15cm of snow melts to 1cm of water). Wet snow near 0°C can be as low as 5:1.

---

See snow forecasts on [Weather Tomorrow](/).`
);

phenomenon("what-causes-fog", "What Causes Fog? Types, Formation, and When to Expect It",
"Fog is simply a cloud at ground level. Learn how the four main types form and why some cities are foggier than others.",
`## What Is Fog?

Fog is a cloud that forms at or near ground level, reducing visibility to less than 1 kilometre. It consists of tiny water droplets (or ice crystals in extreme cold) suspended in the air.

## Types of Fog

### Radiation Fog
Forms on clear, calm nights when the ground radiates heat and cools the air above it to its dew point. Common in valleys and low-lying areas. Burns off after sunrise.

### Advection Fog
Forms when warm, moist air moves over a cold surface. Classic example: San Francisco fog, where warm Pacific air meets the cold California Current. Can persist for days.

### Upslope Fog
Forms when moist air is pushed up a hillside or mountain slope, cooling as it rises until it reaches saturation.

### Evaporation Fog (Steam Fog)
Forms when cool air passes over warm water. The water evaporates into the cold air, immediately condensing. Looks like steam rising from a lake on a cold morning.

## Foggiest Places on Earth

| Location | Annual Fog Days |
|----------|----------------|
| Grand Banks, Newfoundland | 200+ |
| Point Reyes, California | 200+ |
| Namib Desert coast | 180+ |
| London, UK | 45-50 |
| San Francisco, USA | 50-60 |

## Fog and Safety

- Driving: use low-beam headlights (high beams reflect back), reduce speed, increase following distance
- Aviation: fog is the leading weather cause of airport delays and closures
- Maritime: fog horns and radar are essential — historically, fog caused many shipwrecks

---

Check visibility forecasts on [Weather Tomorrow](/).`
);

phenomenon("what-is-jet-stream", "What Is the Jet Stream? How It Shapes Your Weather",
"The jet stream is a river of fast-moving air 10km above your head. It steers storms, separates warm from cold, and affects your daily forecast.",
`## What Is the Jet Stream?

The jet stream is a narrow band of strong wind in the upper atmosphere (around 9-12 km altitude), flowing from west to east. Wind speeds typically range from 150-300 km/h, sometimes exceeding 400 km/h.

## Why It Exists

The jet stream forms at the boundary between cold polar air and warm tropical air. The temperature contrast drives the wind. The Earth's rotation bends the flow eastward.

## How It Affects Weather

The jet stream acts as a boundary — warm air sits to its south, cold air to its north (in the Northern Hemisphere).

- When the jet stream dips south (**trough**), it pulls cold air with it → your region gets colder, stormier
- When the jet stream bulges north (**ridge**), warm air pushes in → your region gets warmer, drier
- Storms travel along the jet stream like boats on a river

## Jet Stream and Flights

- Flying eastbound with the jet stream can cut an hour or more off transatlantic flights
- Flying westbound against it adds time and fuel
- Turbulence is common near the edges of the jet stream

## Seasonal Changes

| Season | Jet Stream Position |
|--------|-------------------|
| Winter | Shifts south, becomes stronger (bigger temperature contrast) |
| Summer | Shifts north, becomes weaker |

## Climate Change Impact

Research suggests that warming Arctic temperatures are weakening the jet stream, causing it to become wavier. These larger waves can lock weather patterns in place — leading to prolonged heat waves, cold spells, and droughts.

---

See how weather patterns affect your city on [Weather Tomorrow](/).`
);

phenomenon("how-hail-forms", "How Hail Forms — Ice From a Summer Sky",
"Hail falls from warm-weather thunderstorms, not winter clouds. Learn how stones of ice grow inside towering storm clouds.",
`## The Paradox

Hail almost always falls during **warm weather** — in summer thunderstorms, not winter snowstorms. This seems counterintuitive, but hailstones need something winter clouds do not have: powerful updrafts.

## The Formation Process

1. Raindrops are swept upward by strong **updrafts** inside a cumulonimbus cloud
2. At high altitude (often above 6,000m), temperatures are well below freezing — the drops freeze into ice pellets
3. The pellets fall, pick up more water, get swept up again, and freeze another layer
4. This cycle repeats, adding layers of ice like an onion
5. When the hailstone becomes too heavy for the updraft to support, it falls to the ground

## Hailstone Size

| Size | Comparison | Updraft Needed |
|------|-----------|----------------|
| < 1 cm | Pea | 35 km/h |
| 2.5 cm | Golf ball | 85 km/h |
| 5 cm | Tennis ball | 115 km/h |
| 7.5 cm | Baseball | 140 km/h |
| 10+ cm | Softball | 160+ km/h |

## Hail Records

The largest hailstone ever recorded in the US fell in Vivian, South Dakota in 2010: **20 cm in diameter** and weighing nearly 900 grams.

## Hail Damage

Large hail causes billions of dollars in damage annually — denting cars, shattering windshields, destroying crops, and damaging roofs. In extreme cases, hail can injure or kill people and animals.

## Protection

- Move vehicles under cover when hail is forecast
- Stay indoors and away from windows during hailstorms
- If caught outside, protect your head and seek shelter immediately

---

Check for storm warnings on [Weather Tomorrow](/).`
);

phenomenon("what-causes-wind", "What Causes Wind? Atmospheric Pressure Explained",
"Wind is simply air moving from high pressure to low pressure. Learn why it blows, how speed is measured, and what makes it change direction.",
`## The Simple Answer

Wind is caused by **differences in atmospheric pressure**. Air naturally flows from areas of high pressure to areas of low pressure, just as water flows downhill. The greater the pressure difference over a given distance, the stronger the wind.

## What Creates Pressure Differences?

**Uneven heating of Earth's surface.** Land heats faster than water. Dark surfaces absorb more heat than light ones. The equator receives more solar energy than the poles. These temperature differences create pressure differences, which create wind.

## The Coriolis Effect

On a non-rotating Earth, wind would blow straight from high to low pressure. But Earth's rotation deflects moving air:
- **Right** in the Northern Hemisphere
- **Left** in the Southern Hemisphere

This is why wind spirals around pressure systems rather than flowing straight into them.

## Wind Speed Scales

| Beaufort Scale | Speed (km/h) | Description |
|---------------|-------------|-------------|
| 0 | 0 | Calm |
| 3 | 12-19 | Gentle breeze |
| 6 | 39-49 | Strong breeze |
| 8 | 62-74 | Gale |
| 10 | 89-102 | Storm |
| 12 | 118+ | Hurricane force |

## Local Wind Patterns

- **Sea breezes**: Land heats faster than water during the day, creating onshore winds
- **Land breezes**: At night, the land cools faster, reversing the flow
- **Valley winds**: Air warms in valleys during the day and flows upslope
- **Katabatic winds**: Cold, dense air drains downslope at night

---

Check wind speed forecasts on [Weather Tomorrow](/).`
);

phenomenon("types-of-clouds-guide", "Types of Clouds — A Complete Visual Guide",
"From wispy cirrus to towering cumulonimbus, learn to identify the 10 main cloud types and what they reveal about the weather.",
`## The 10 Main Cloud Types

Clouds are classified by their **altitude** and **shape**. The system was invented by Luke Howard in 1803 and remains essentially unchanged.

## High Clouds (6,000m+)

- **Cirrus** — Thin, wispy streaks made entirely of ice crystals. Usually indicate fair weather but can signal a warm front approaching within 24 hours.
- **Cirrocumulus** — Small, high puffs arranged in rippled patterns. Relatively rare and indicate atmospheric instability.
- **Cirrostratus** — A thin, translucent sheet that often produces a halo around the sun or moon. Usually means rain within 12-24 hours.

## Mid-Level Clouds (2,000-6,000m)

- **Altostratus** — Grey or blue-grey sheet covering the sky. The sun appears as if behind frosted glass. Light rain or snow often follows.
- **Altocumulus** — White or grey puffs in layers or rows. On a warm, humid morning, they can signal afternoon thunderstorms.

## Low Clouds (below 2,000m)

- **Stratus** — Flat, featureless grey layer. Produces drizzle or light rain. The classic overcast sky.
- **Stratocumulus** — Lumpy grey or white masses in rolls or patches. Common worldwide; usually no significant rain.
- **Nimbostratus** — Thick, dark, rain-bearing layer. Produces steady, prolonged rain or snow.

## Vertical Development Clouds

- **Cumulus** — Puffy white cotton-ball clouds. Small cumulus ("fair-weather cumulus") indicate pleasant conditions. Large, tall cumulus can develop into storms.
- **Cumulonimbus** — The king of clouds. Towering up to 15,000m with an anvil-shaped top. Produces thunderstorms, heavy rain, hail, lightning, and sometimes tornadoes.

## Quick Identification Tips

- Flat and layered = "stratus" family
- Puffy and heaped = "cumulus" family
- "Alto" prefix = mid-level
- "Cirro" prefix = high-level
- "Nimbo" or "nimbus" = rain-producing

---

Look up at the sky and check conditions on [Weather Tomorrow](/).`
);

phenomenon("weather-fronts-explained", "What Is a Weather Front? Cold, Warm, and Occluded",
"Weather fronts are boundaries between air masses. Understanding them helps you predict temperature changes, rain, and wind shifts.",
`## What Is a Weather Front?

A weather front is the **boundary between two different air masses** — one warm, one cold. Because these air masses have different temperatures, humidity, and densities, interesting weather happens where they meet.

## Cold Front

A cold front occurs when a mass of cold air advances and pushes under warmer air.

- **Before**: Warm, humid, possibly hazy
- **During**: Rapid temperature drop, heavy rain or thunderstorms, gusty winds
- **After**: Cooler, drier, clearing skies

Cold fronts move fast (up to 50 km/h) and produce sharp, short-lived weather changes.

## Warm Front

A warm front occurs when warm air slides up and over retreating cold air.

- **Before**: Increasing clouds (cirrus → altostratus → nimbostratus), gradual pressure drop
- **During**: Light to moderate rain over a wide area, fog possible
- **After**: Warmer temperatures, clearing skies, higher humidity

Warm fronts move slowly and produce prolonged, lighter precipitation.

## Occluded Front

When a fast-moving cold front catches up to a warm front, it lifts the warm air entirely off the ground. This creates an occluded front with characteristics of both — extended cloud, mixed precipitation, and complex wind shifts.

## Stationary Front

When neither air mass advances, the front stalls. Stationary fronts bring lingering clouds, drizzle, and grey skies that can persist for days.

## How to Spot an Approaching Front

| Sign | Likely Front |
|------|-------------|
| Rapidly building clouds from the west | Cold front |
| High clouds slowly thickening | Warm front |
| Sudden wind direction change | Front just passed |
| Barometric pressure dropping steadily | Front approaching |

---

Watch for fronts in your forecast on [Weather Tomorrow](/).`
);

phenomenon("monsoon-explained", "Monsoon Explained — How Seasonal Rains Work",
"Monsoons are seasonal wind reversals that bring life-sustaining rains to billions of people. Learn how they form and where they strike.",
`## What Is a Monsoon?

A monsoon is a **seasonal reversal of wind direction** that brings a dramatic shift from dry to wet conditions. Contrary to popular belief, monsoon does not mean heavy rain — it means a seasonal wind shift that often brings rain.

## How Monsoons Form

1. In summer, land heats faster than the ocean, creating a low-pressure zone over the continent
2. Moist ocean air rushes inland to fill this low pressure
3. As this air rises over the hot land, it cools and releases massive amounts of rain
4. In winter, the process reverses — cold, dry air flows from the continent to the ocean

## Major Monsoon Regions

| Region | Wet Season | Dry Season |
|--------|-----------|------------|
| South Asia (India) | June-September | October-May |
| Southeast Asia | May-October | November-April |
| West Africa | June-September | October-May |
| Northern Australia | November-March | April-October |
| East Asia | June-August | September-May |

## The Indian Monsoon

The Indian monsoon is the most studied and impactful. It provides **70-80% of India's annual rainfall** and directly affects the livelihoods of over a billion people. Agriculture, water supply, and the economy all depend on it.

## Monsoon Impacts

- **Positive**: Replenishes reservoirs, enables farming, recharges groundwater
- **Negative**: Flooding, landslides, waterborne disease, infrastructure damage

## Is the Monsoon Changing?

Climate research suggests monsoons are becoming more variable — with more intense bursts of rain separated by longer dry spells. Total rainfall may not change dramatically, but the pattern is becoming less predictable.

---

Track rain forecasts on [Weather Tomorrow](/).`
);

phenomenon("polar-vortex-explained", "Polar Vortex Explained — Why Cold Air Plunges South",
"When the polar vortex weakens, Arctic air escapes south and temperatures plummet. Here is the science behind winter's most dramatic events.",
`## What Is the Polar Vortex?

The polar vortex is a large area of **low pressure and cold air** that circulates around the Arctic (and Antarctic) pole. It sits in the stratosphere, about 15-50 km above the surface, and is always there — not just during cold snaps.

## How It Normally Works

When the polar vortex is strong, it keeps cold air locked tightly around the pole. The jet stream flows in a relatively straight west-to-east path, acting as a fence between Arctic and mid-latitude air.

## What Happens When It Weakens

Sometimes the vortex **weakens and wobbles**, often triggered by sudden stratospheric warming events. When this happens:

1. The jet stream becomes wavy
2. Arctic air spills south through the waves
3. Mid-latitude regions experience extreme cold snaps
4. Meanwhile, the Arctic may actually warm up temporarily

## Famous Polar Vortex Events

The January 2019 event sent temperatures in Chicago to -30°C (-22°F) with wind chills below -50°C. Schools, businesses, and mail delivery shut down across the Midwest.

## Is Climate Change Making It Worse?

This is an active area of research. Some scientists hypothesise that rapid Arctic warming is weakening the polar vortex more frequently, leading to more extreme cold outbreaks in mid-latitudes. Others argue the evidence is not yet conclusive.

## What It Means for You

When weather reports mention the polar vortex, prepare for a significant cold snap lasting several days to a week. Stock up on supplies, protect pipes, and dress for extreme cold.

---

Monitor cold weather alerts on [Weather Tomorrow](/).`
);

phenomenon("atmospheric-rivers-explained", "Atmospheric Rivers — Rivers in the Sky",
"Atmospheric rivers transport more water than the Amazon. When they hit land, they can bring beneficial rain or catastrophic flooding.",
`## What Is an Atmospheric River?

An atmospheric river (AR) is a long, narrow corridor of moisture in the atmosphere, typically 400-600 km wide and over 2,000 km long. It carries water vapour from the tropics toward the poles, often producing extreme rainfall when it makes landfall.

## How Much Water?

A strong atmospheric river can transport **7.5-15 times the average flow of the Mississippi River** as water vapour. When this moisture hits mountains and is forced upward, it condenses into rain or snow — sometimes dumping 50-100mm in a single day.

## The AR Scale

| Category | Strength | Impact |
|----------|----------|--------|
| AR-1 | Weak | Beneficial rain |
| AR-2 | Moderate | Mostly beneficial, some risk |
| AR-3 | Strong | Balance of benefit and hazard |
| AR-4 | Extreme | Primarily hazardous |
| AR-5 | Exceptional | Catastrophic flooding risk |

## Where They Hit

- **Western North America**: The "Pineapple Express" brings tropical Pacific moisture to California, Oregon, and British Columbia
- **Western Europe**: Atlantic atmospheric rivers bring heavy rain to the UK, Portugal, and Norway
- **East Asia**: Similar features affect Japan and Korea

## Beneficial vs Destructive

Atmospheric rivers provide **30-50% of California's annual precipitation** and are essential for filling reservoirs and building snowpack. But the strongest events cause devastating floods, landslides, and billions in damage.

---

Track precipitation forecasts on [Weather Tomorrow](/).`
);

phenomenon("frost-formation-explained", "How Frost Forms — Clear Night Science",
"Why frost appears on clear, calm nights and what it means for gardeners, drivers, and weather watchers.",
`## What Is Frost?

Frost forms when surfaces cool below 0°C and water vapour in the air deposits directly as ice crystals on those surfaces. It is not frozen dew — frost forms through **deposition** (vapour to ice, skipping liquid).

## Conditions for Frost

- **Clear skies**: Clouds act like a blanket, trapping heat. Without them, heat radiates into space and surfaces cool rapidly.
- **Calm wind**: Wind mixes air and prevents surfaces from cooling below the air temperature. Calm nights allow ground-level cooling.
- **Dew point near or below freezing**: If the air is dry, there is not enough moisture to form frost even if it is cold enough.

## Types of Frost

- **Hoar frost**: The classic white, feathery crystals on grass, cars, and fences. Beautiful and photogenic.
- **Rime frost**: Forms when supercooled water droplets in fog freeze on contact with surfaces. Creates thick, white coatings on windward sides.
- **Black frost**: Not actually visible ice — it is when temperatures drop below freezing without frost forming (too dry). Dangerous for plants because it kills tissue without warning.

## Frost and Gardening

| Frost Level | Temperature | Plant Impact |
|-------------|-----------|--------------|
| Light frost | 0 to -2°C | Tender plants damaged |
| Moderate frost | -2 to -5°C | Most annuals killed |
| Hard frost | Below -5°C | Hardy plants at risk |

## Frost Protection Tips

- Cover tender plants with fleece or cloches before nightfall
- Water soil in the afternoon — moist soil releases more heat overnight
- Plant frost-sensitive species near walls or under trees for radiant heat protection
- Park your car in a garage or under a tree to reduce windshield frost

---

Check overnight low temperatures on [Weather Tomorrow](/).`
);

phenomenon("sea-breeze-land-breeze", "Sea Breeze vs Land Breeze — How Coastal Winds Work",
"Coastal weather follows a daily wind cycle driven by the sun. Learn why breezes blow onshore by day and offshore by night.",
`## The Daily Cycle

If you have spent time near the coast, you have probably noticed a pattern: wind blows from the sea during the day and from the land at night. This is not random — it is physics.

## Sea Breeze (Daytime)

1. The sun heats the land faster than the ocean (land has lower heat capacity)
2. Hot air over the land rises, creating a low-pressure zone
3. Cooler, denser air from over the sea rushes in to fill the gap
4. This onshore wind is the **sea breeze**

Sea breezes typically start mid-morning and peak in the afternoon. They can extend 20-50 km inland and drop coastal temperatures by 5-10°C compared to areas further inland.

## Land Breeze (Nighttime)

1. After sunset, land cools faster than the ocean
2. The ocean is now relatively warmer, with rising air above it
3. Cooler air from the land flows toward the sea
4. This offshore wind is the **land breeze**

Land breezes are generally weaker than sea breezes because the temperature contrast at night is smaller.

## Why It Matters

- **Sailors and surfers**: Sea breezes create afternoon chop; mornings are glassier
- **Coastal cities**: Sea breezes keep coastal neighbourhoods cooler than inland suburbs
- **Fog**: Land breezes can push warm air over cool water, triggering offshore fog
- **Thunderstorms**: Sea breeze convergence zones (where two coastlines' breezes meet) can trigger afternoon thunderstorms in places like Florida

---

Check coastal wind conditions on [Weather Tomorrow](/).`
);

phenomenon("why-deserts-are-hot", "Why Are Deserts So Hot During the Day (and Cold at Night)?",
"Deserts experience some of the most extreme temperature swings on Earth. The answer lies in humidity, clouds, and sand.",
`## The Extreme Swings

The Sahara Desert can reach **50°C during the day** and plummet to **5°C at night** — a swing of 45 degrees in just 12 hours. No other environment on Earth experiences such dramatic daily temperature changes.

## Why Deserts Get So Hot

1. **No cloud cover**: Clear skies let solar radiation reach the ground unfiltered
2. **Dry air**: Without moisture to absorb and scatter sunlight, more energy reaches the surface
3. **Low vegetation**: Plants cool the air through transpiration; desert soil absorbs and re-radiates heat
4. **Sand and rock**: These materials heat up quickly under direct sun

## Why Deserts Get So Cold at Night

The same factors that make deserts hot during the day make them cold at night:

1. **No clouds**: Nothing to trap the day's heat — it radiates straight into space
2. **Dry air**: Water vapour is a greenhouse gas; without it, heat escapes rapidly
3. **Sand cools quickly**: It has low thermal capacity and loses heat fast

## Desert Temperature Records

| Desert | Record High | Record Low | Location |
|--------|-----------|-----------|----------|
| Sahara | 56.7°C | -11°C | Libya / Algeria |
| Mojave | 56.7°C | -9°C | Death Valley |
| Gobi | 45°C | -40°C | Mongolia |
| Atacama | 40°C | -25°C | Chile |

## Humid vs Dry Heat

This is why "it's a dry heat" matters. At 40°C with 10% humidity (desert), your sweat evaporates instantly, cooling you effectively. At 40°C with 80% humidity (tropical), sweat cannot evaporate, making it far more dangerous.

---

Compare desert and tropical forecasts on [Weather Tomorrow](/).`
);

phenomenon("why-mountains-are-cold", "Why Are Mountains Cold When They Are Closer to the Sun?",
"Mountains are closer to the sun yet colder. The answer involves air pressure, density, and how the atmosphere actually works.",
`## The Counterintuitive Question

Mount Everest is 8,849m closer to the sun than sea level. Yet its summit averages -36°C. Why does not proximity to the sun make it warmer?

## The Answer: Air Pressure

The atmosphere is heated primarily from the **bottom up**, not the top down. Here is how:

1. Sunlight passes through the atmosphere and heats the Earth's surface
2. The surface radiates heat back into the air
3. At higher altitudes, there are fewer air molecules to absorb and trap this heat
4. Less air pressure also means air expands and cools

## The Lapse Rate

Temperature drops roughly **6.5°C for every 1,000m of altitude gain**. This is called the environmental lapse rate. So at 3,000m, it is about 19.5°C colder than at sea level.

| Altitude | Temp Drop from Sea Level |
|----------|-------------------------|
| 1,000m | -6.5°C |
| 2,000m | -13°C |
| 3,000m | -19.5°C |
| 5,000m | -32.5°C |
| 8,849m (Everest) | -57.5°C |

## Why the Sun Does Not Help

The extra 8.8 km of closeness to the sun is negligible — the sun is 150 million km away. Being 0.000006% closer makes zero measurable difference.

## Pressure and Boiling Point

Lower pressure at altitude also affects cooking: water boils at lower temperatures (around 85°C at 4,500m), meaning food takes longer to cook.

## Mountain Weather Considerations

- Temperature drops rapidly — always pack warm layers for hikes
- UV radiation increases about 10-12% per 1,000m — sunburn risk is higher
- Weather changes faster in mountains as air is forced upward, cooling and forming clouds

---

Plan mountain trips with [Weather Tomorrow](/).`
);

phenomenon("thunderstorm-safety", "Thunderstorm Safety — What to Do Before, During, and After",
"Lightning kills more people annually than hurricanes or tornadoes. Here is how to stay safe when storms strike.",
`## Before the Storm

- Check the forecast and be aware of thunderstorm risk
- Identify safe shelter: a substantial building or hard-topped vehicle
- Secure outdoor furniture and bring pets inside
- Charge your phone in case of power outages

## The 30-30 Rule

**If the time between lightning and thunder is less than 30 seconds, go inside. Stay inside for 30 minutes after the last thunder.**

Lightning can strike up to 16 km from the rain core — so-called "bolts from the blue."

## During the Storm

### Indoors
- Stay away from windows, doors, and porches
- Avoid water — do not shower, wash dishes, or use plumbing
- Unplug sensitive electronics (or use surge protectors)
- Use a battery-powered radio for weather updates

### If Caught Outside
- Do NOT shelter under isolated trees (the worst place to be)
- Move to the lowest point — a ditch or valley
- Crouch low with feet together, minimising ground contact
- Avoid open fields, hilltops, and bodies of water
- Drop metal objects (golf clubs, umbrellas, fishing rods)

## Lightning First Aid

If someone is struck by lightning:
- They do NOT carry a charge — it is safe to touch them
- Call emergency services immediately
- Start CPR if they have no pulse
- Lightning strike victims can often be revived if treated quickly

## After the Storm

- Wait 30 minutes after the last lightning before going outside
- Watch for downed power lines and flooding
- Check on neighbours, especially elderly people

---

Track storms in real time on [Weather Tomorrow](/).`
);

phenomenon("lightning-facts-myths", "Lightning Facts and Myths — What Is Actually True?",
"Lightning never strikes twice? Rubber tyres protect you? Let us separate lightning fact from dangerous fiction.",
`## Myths Debunked

### "Lightning never strikes the same place twice"
**FALSE.** Lightning frequently strikes the same place, especially tall structures. The Empire State Building is hit about 25 times per year.

### "Rubber tyres protect you in a car"
**PARTIALLY FALSE.** The car's metal body conducts lightning around you (a Faraday cage effect), not the tyres. Convertibles and fibreglass-bodied vehicles offer no protection.

### "If it is not raining, you are safe"
**FALSE.** Lightning can strike 16 km from the nearest rainfall. Many lightning deaths occur under clear skies.

### "Metal attracts lightning"
**FALSE.** Lightning strikes the tallest point, not the most metallic. However, metal conducts electricity, so holding a metal object makes injuries worse if struck.

### "Lying flat on the ground is the safest position"
**FALSE.** Ground currents from nearby strikes spread outward. Lying flat increases your contact with the ground. Crouching on the balls of your feet is safer.

## Surprising Facts

- Lightning is **5 times hotter** than the surface of the sun (30,000°C vs 5,500°C)
- A single bolt contains enough energy to toast 100,000 slices of bread
- Lightning creates **ozone** — that fresh smell after a thunderstorm
- About **2,000 people are killed** by lightning worldwide each year
- Men are struck 4-5 times more often than women (likely due to outdoor occupation and recreation patterns)
- Lightning can and does travel through plumbing and phone lines indoors

## The Safest Places

1. A large enclosed building
2. A hard-topped metal vehicle
3. Away from windows, plumbing, and electronics

---

Get storm alerts on [Weather Tomorrow](/).`
);

phenomenon("weather-vs-climate", "Weather vs Climate — What Is the Difference?",
"Weather is what you wear today. Climate is what you have in your wardrobe. Understanding the distinction matters more than ever.",
`## The Simple Distinction

- **Weather** is the state of the atmosphere at a specific time and place — temperature, rain, wind, clouds right now.
- **Climate** is the average weather pattern over a long period (typically 30 years) for a region.

As the saying goes: "Climate is what you expect. Weather is what you get."

## Why the Difference Matters

A single cold day does not disprove global warming, just as a single hot day does not prove it. Climate is the trend; weather is the noise.

## Key Differences

| | Weather | Climate |
|---|---------|---------|
| Timeframe | Hours to days | Decades to centuries |
| Scale | Local | Regional to global |
| Predictability | Up to ~10 days | Trends are predictable |
| Variability | High, day-to-day | Slow, gradual changes |
| Examples | "It's raining today" | "London averages 106 rainy days per year" |

## Climate Shapes Weather

Climate determines what is normal for a region. Weather is the variation around that normal. A city with a tropical climate will have warm, humid weather most days — but the specific temperature and rainfall on any given day is weather.

## Climate Change and Weather

Climate change does not cause individual weather events, but it **loads the dice**. A warming climate makes heat waves more likely, intense rainfall events more common, and some drought regions drier. The weather you experience is still variable, but the baseline has shifted.

---

Check today's weather on [Weather Tomorrow](/).`
);

phenomenon("heat-waves-explained", "Heat Waves Explained — What Causes Them and Why They Kill",
"Heat waves are the deadliest weather events in many countries. Learn what drives them and how to stay safe.",
`## What Is a Heat Wave?

There is no universal definition, but a heat wave is generally a prolonged period (two or more days) of abnormally high temperatures for a given region. What counts as a heat wave in Finland would be a normal summer day in Dubai.

## What Causes Heat Waves?

Most heat waves are caused by **high-pressure systems (heat domes)** that park over a region. These systems:

1. Trap hot air underneath like a lid
2. Suppress cloud formation and rain
3. Push the jet stream northward, cutting off cooler air
4. Allow the ground to heat progressively each day without overnight cooling

## Why Heat Waves Are Deadly

Heat kills more people than hurricanes, tornadoes, and floods combined in many countries. The danger is:

- **Cumulative**: Each consecutive hot day adds stress; the body cannot recover overnight
- **Invisible**: Unlike storms, heat offers no dramatic visual warning
- **Disproportionate**: The elderly, children, outdoor workers, and those without AC are most vulnerable

## Heat Wave Safety

- **Hydrate constantly** — do not wait until you are thirsty
- **Stay indoors** during peak heat (11am-4pm)
- **Never leave people or pets** in parked cars
- **Check on vulnerable neighbours** daily
- **Recognise heat stroke signs**: confusion, hot dry skin, rapid pulse — this is a medical emergency

## Heat Stroke vs Heat Exhaustion

| | Heat Exhaustion | Heat Stroke |
|---|----------------|-------------|
| Skin | Cool, clammy | Hot, dry |
| Temperature | Below 40°C | Above 40°C |
| Mental state | Tired, nauseous | Confused, delirious |
| Action | Cool down, hydrate | **Call emergency services** |

---

Monitor extreme heat alerts on [Weather Tomorrow](/).`
);

phenomenon("cold-snaps-explained", "Cold Snaps — What Causes Sudden Temperature Drops",
"When temperatures plummet overnight, a cold snap has arrived. Learn what drives these events and how to prepare.",
`## What Is a Cold Snap?

A cold snap is a rapid and significant drop in temperature, often 10-20°C within 24 hours. Unlike gradual seasonal cooling, cold snaps arrive suddenly and can catch people off guard.

## What Causes Cold Snaps?

The most common cause is an **Arctic air outbreak** — when the polar jet stream dips south, allowing frigid Arctic air to spill into lower latitudes.

Other triggers include:
- **Cold fronts**: A mass of cold air displacing warm air
- **Polar vortex disruption**: Weakening of the polar vortex sends cold air southward
- **Radiational cooling**: Clear skies and calm winds after a front passes allow temperatures to plummet overnight

## Impact

- **Pipes can freeze and burst** if temperatures drop below -5°C in poorly insulated buildings
- **Road black ice** forms when temperatures drop below freezing after rain
- **Plants suffer frost damage** when cold snaps hit during growing season
- **Energy demand spikes** as heating systems work overtime
- **Hypothermia risk** for homeless populations and outdoor workers

## How to Prepare

- Insulate exposed water pipes before winter
- Keep emergency supplies: blankets, torch, bottled water, food
- Check on elderly or vulnerable neighbours
- Bring pets indoors
- Let taps drip slightly to prevent pipe freezing
- Keep your car's fuel tank at least half full during cold snaps

---

Get overnight low temperature alerts on [Weather Tomorrow](/).`
);

phenomenon("sandstorms-explained", "Sandstorms Explained — Formation, Danger, and Safety",
"Sandstorms can reduce visibility to zero and strip paint from cars. Learn how they form and how to survive one.",
`## What Is a Sandstorm?

A sandstorm (or dust storm) occurs when strong winds lift loose sand and dust particles from dry ground and carry them through the air. Severe sandstorms can create a wall of dust hundreds of metres high that turns day into night.

## How They Form

1. **Strong winds** (usually from thunderstorm outflows or pressure gradients) blow over dry, unvegetated land
2. Sand particles bounce off the ground (**saltation**), dislodging finer dust
3. Fine dust rises high into the air while heavier sand stays near the ground
4. The storm advances as a dense wall, sometimes travelling hundreds of kilometres

## Where Sandstorms Occur

| Region | Peak Season |
|--------|------------|
| Sahara Desert | Spring, early summer |
| Arabian Peninsula | March-August |
| Gobi Desert | Spring |
| US Southwest | Summer monsoon |
| Australia (inland) | Summer |

## Health Risks

- **Respiratory problems**: Fine dust penetrates deep into lungs
- **Eye damage**: Sand particles can scratch corneas
- **Reduced visibility**: Driving becomes extremely dangerous
- **Contaminated water**: Dust settles on water sources

## Safety During a Sandstorm

- Get inside a building or vehicle immediately
- If caught outside, cover your nose and mouth with a wet cloth
- Protect your eyes with sealed goggles or wrap-around glasses
- If driving, pull over, turn off the engine, close all vents, and wait it out
- Do not try to outrun a sandstorm in a vehicle

---

Monitor weather conditions on [Weather Tomorrow](/).`
);

phenomenon("typhoon-vs-hurricane", "Typhoon vs Hurricane — What Is the Difference?",
"They are the same storm with different names. The distinction is purely geographical. Here is the full breakdown.",
`## The Short Answer

Typhoons and hurricanes are **the same type of storm** — tropical cyclones with sustained winds above 119 km/h. The only difference is where they occur:

- **Hurricane**: Atlantic Ocean and Northeast Pacific
- **Typhoon**: Northwest Pacific
- **Cyclone**: South Pacific and Indian Ocean

## Why Different Names?

Different maritime cultures named these storms independently. When the World Meteorological Organization standardised the terminology, they kept the regional names for clarity.

## Are There Any Real Differences?

While the storms are technically identical, there are some statistical tendencies:

| | Hurricanes (Atlantic) | Typhoons (NW Pacific) |
|---|----------------------|----------------------|
| Average per year | 7 | 26 |
| Peak season | June-November | May-November |
| Strongest on record | 295 km/h (Allen, 1980) | 315 km/h (Haiyan, 2013) |
| Warm water area | Smaller basin | Largest warm water basin |
| Average intensity | Lower | Higher |

The Pacific is larger and warmer, so typhoons tend to be more frequent and occasionally more intense than Atlantic hurricanes.

## The Saffir-Simpson Scale

Both typhoons and hurricanes use wind speed for classification, though the specific scales differ slightly between agencies.

| Category | Wind Speed |
|----------|-----------|
| 1 | 119-153 km/h |
| 2 | 154-177 km/h |
| 3 (Major) | 178-208 km/h |
| 4 | 209-251 km/h |
| 5 | 252+ km/h |

## Super Typhoons

The Northwest Pacific also uses the term "super typhoon" for storms with winds exceeding 240 km/h. There is no equivalent "super hurricane" designation in the Atlantic.

---

Monitor storm forecasts on [Weather Tomorrow](/).`
);

phenomenon("weather-satellites-explained", "How Weather Satellites Work — Eyes in the Sky",
"Weather satellites orbit Earth capturing images, measuring moisture, and tracking storms. Here is how they make forecasts possible.",
`## Two Types of Weather Satellites

### Geostationary Satellites
- Orbit at **35,786 km** above the equator
- Match Earth's rotation, so they hover over the same spot
- Provide continuous monitoring of weather over one region
- Update images every 5-15 minutes
- Examples: GOES (US), Himawari (Japan), Meteosat (Europe)

### Polar-Orbiting Satellites
- Orbit at **850 km** altitude, circling pole-to-pole
- Cover the entire globe every 12 hours (overlapping orbits)
- Pass over any point twice daily
- Closer orbit means higher-resolution images
- Examples: NOAA satellites, Suomi NPP, MetOp

## What They Measure

| Instrument | What It Detects |
|-----------|----------------|
| Visible imager | Cloud cover, fog, smoke (daytime only) |
| Infrared sensor | Cloud top temperatures, night-time storms |
| Water vapour channel | Moisture in the atmosphere |
| Microwave sounder | Temperature and humidity profiles through clouds |
| Lightning mapper | Lightning frequency and location |

## How Satellites Improve Forecasts

Satellites provide the **initial conditions** that weather models need to make predictions. Without satellite data, forecast accuracy would drop by about 2 days — today's 5-day forecast would only be as good as a 3-day forecast.

## Satellite Images Explained

- **Visible**: Shows clouds as white against dark ground — like a black-and-white photo from space
- **Infrared**: Shows temperature — cold (high) clouds are bright, warm ground is dark. Works day and night.
- **Water vapour**: Shows moisture in the middle atmosphere — useful for tracking jet stream patterns and dry air intrusion

---

See satellite-informed forecasts on [Weather Tomorrow](/).`
);

// ============= CLIMATE & ENVIRONMENT (15 posts) =============

concept("urban-heat-islands", "Urban Heat Islands — Why Cities Are Hotter Than the Countryside",
"Cities can be 5-10°C warmer than surrounding rural areas. Here is why, and what urban planners are doing about it.",
`## What Is the Urban Heat Island Effect?

An urban heat island (UHI) is a metropolitan area that is significantly warmer than its surrounding rural areas. The temperature difference is most pronounced at night, when cities can be **5-10°C warmer** than the nearby countryside.

## Why Cities Are Hotter

1. **Dark surfaces**: Asphalt roads and tar roofs absorb solar radiation and re-radiate it as heat
2. **Reduced vegetation**: Trees and grass cool air through evapotranspiration; concrete does not
3. **Waste heat**: Cars, air conditioners, and industry all release heat
4. **Canyon effect**: Tall buildings trap heat and block wind, reducing cooling
5. **Less evaporation**: Impermeable surfaces prevent water from pooling and evaporating

## The Numbers

| City | UHI Intensity (typical night) |
|------|------------------------------|
| Tokyo | +8-10°C |
| New York | +5-8°C |
| London | +4-7°C |
| Singapore | +4-7°C |
| Phoenix | +5-10°C |

## Health Impact

UHIs amplify heat waves, increasing heat-related illness and death. The most vulnerable — elderly, children, outdoor workers, and people without air conditioning — are disproportionately affected.

## Solutions Being Implemented

- **Green roofs and walls**: Vegetation cools buildings through shade and evapotranspiration
- **Cool roofs**: Light-coloured or reflective roofing materials
- **Urban tree canopy**: Shade from trees can reduce surface temperatures by 10-15°C
- **Permeable paving**: Allows water to soak in and evaporate, cooling the air
- **Urban parks**: Large green spaces act as cooling islands within the city

---

Check city temperatures on [Weather Tomorrow](/).`
);

concept("climate-change-weather-patterns", "Climate Change and Changing Weather Patterns",
"How a warming planet is making heat waves hotter, rainfall heavier, and weather patterns more extreme.",
`## The Big Picture

Earth's average surface temperature has risen about **1.1°C since pre-industrial times**. While that sounds small, it represents an enormous amount of extra energy in the climate system — energy that is reshaping weather patterns worldwide.

## What Is Changing

### More Intense Heat Waves
A warmer baseline means heat waves start from a higher point. Events that were once-in-50-year occurrences are now happening every 5-10 years.

### Heavier Rainfall Events
A warmer atmosphere holds **7% more moisture per 1°C of warming**. When it rains, there is more water to dump. Extreme rainfall events have increased in frequency and intensity globally.

### Longer Droughts
While total global precipitation may not change dramatically, its distribution is shifting. Wet regions are getting wetter, dry regions drier, and the gaps between rain events are growing in many areas.

### Stronger Tropical Cyclones
Warmer ocean water provides more fuel for hurricanes and typhoons. While the total number of storms may not increase, the proportion reaching Category 4-5 intensity is growing.

## Attribution Science

Modern climate science can now calculate how much more likely a specific weather event was due to climate change. For example, the 2021 Pacific Northwest heat dome was found to be "virtually impossible" without human-caused warming.

## What This Means for Daily Life

- Check heat advisories more frequently in summer
- Expect more variable rainfall — both more flooding and more drought
- Building codes and infrastructure need updating for new weather extremes
- Weather forecasts become even more important for planning

---

Stay informed with daily forecasts on [Weather Tomorrow](/).`
);

concept("air-quality-index-guide", "Air Quality Index Explained — Your AQI Guide",
"The AQI tells you how clean or polluted the air is. Learn what the numbers mean and when to limit outdoor activity.",
`## What Is AQI?

The Air Quality Index is a standardised scale that communicates how polluted the air is and what health effects might occur. It measures key pollutants including ground-level ozone, particulate matter (PM2.5 and PM10), carbon monoxide, sulphur dioxide, and nitrogen dioxide.

## AQI Scale

| AQI Range | Level | Health Guidance |
|-----------|-------|----------------|
| 0-50 | Good | Air quality is satisfactory; no risk |
| 51-100 | Moderate | Acceptable; sensitive groups may notice effects |
| 101-150 | Unhealthy for Sensitive Groups | Active children, asthmatics, elderly should reduce outdoor exertion |
| 151-200 | Unhealthy | Everyone should reduce prolonged outdoor exertion |
| 201-300 | Very Unhealthy | Everyone should avoid outdoor exertion |
| 301-500 | Hazardous | Health emergency; stay indoors |

## PM2.5 — The Key Number

PM2.5 refers to particulate matter smaller than 2.5 micrometres. These tiny particles penetrate deep into your lungs and even enter your bloodstream. PM2.5 is the primary driver of AQI readings in most cities.

## What Worsens Air Quality?

- **Traffic**: Vehicle exhaust is the top urban polluter
- **Wildfires**: Can send AQI above 300 hundreds of kilometres away
- **Industrial emissions**: Factories and power plants
- **Weather**: Temperature inversions trap pollution near the ground
- **Agriculture**: Crop burning and ammonia from fertilisers

## Practical Tips

- Check AQI before outdoor exercise, especially if you have asthma
- Use N95 or KF94 masks when AQI exceeds 150
- Keep windows closed on high-AQI days
- Run an air purifier with a HEPA filter indoors
- Exercise indoors when AQI exceeds 100

---

Plan outdoor activities with [Weather Tomorrow](/).`
);

concept("pollen-forecast-guide", "Pollen Forecast Guide — Managing Allergy Season",
"When pollen counts spike, millions of people suffer. Learn what drives pollen seasons, which counts matter, and how weather affects allergies.",
`## How Pollen Forecasts Work

Pollen forecasts predict airborne pollen levels based on plant phenology (growth cycles), weather conditions, and historical data. Counts are measured in grains per cubic metre of air.

## Pollen Season Calendar

| Season | Primary Pollen | Months |
|--------|---------------|--------|
| Early Spring | Tree pollen (birch, oak, cedar) | February-April |
| Late Spring | Grass pollen | May-July |
| Summer-Fall | Weed pollen (ragweed) | July-October |
| Variable | Mould spores | Year-round, peak in damp periods |

## Weather and Pollen

| Weather Condition | Effect on Pollen |
|-------------------|-----------------|
| Warm, dry, windy | Highest pollen — wind carries it far |
| After rain | Pollen drops temporarily (washed out) |
| During rain | Thunderstorm asthma risk — rain breaks pollen into finer particles |
| Cool, damp | Lower pollen levels |
| High humidity | Moulds increase, tree/grass pollen decreases |

## Pollen Count Levels

| Level | Grains/m³ (grass) | Symptoms |
|-------|-------------------|----------|
| Low | 0-29 | Minimal for most people |
| Moderate | 30-59 | Sensitive individuals affected |
| High | 60-149 | Most allergy sufferers symptomatic |
| Very High | 150+ | Severe symptoms likely |

## Practical Tips

- Check pollen counts in the morning before opening windows
- Pollen is highest in the early morning (5-10 am) — exercise later
- Shower and change clothes after outdoor activity
- Keep car and home windows closed on high-count days
- Dry laundry indoors during peak season

---

Check daily weather and plan around conditions on [Weather Tomorrow](/).`
);

concept("uv-radiation-guide", "UV Radiation — How the Sun Affects Your Skin",
"The UV Index tells you how quickly you can burn. Learn what the numbers mean, when to protect yourself, and why altitude and reflection matter.",
`## What Is UV Radiation?

Ultraviolet radiation is invisible energy from the sun that reaches Earth's surface. It is divided into UVA (ages skin) and UVB (burns skin). Both contribute to skin cancer risk.

## Understanding the UV Index

| UV Index | Level | Time to Burn (fair skin) |
|----------|-------|-------------------------|
| 1-2 | Low | 60+ minutes |
| 3-5 | Moderate | 30-45 minutes |
| 6-7 | High | 15-25 minutes |
| 8-10 | Very High | 10-15 minutes |
| 11+ | Extreme | Under 10 minutes |

## Factors That Increase UV

- **Altitude**: UV increases ~10% per 1,000m elevation
- **Snow**: Reflects up to 80% of UV rays (nearly doubling exposure)
- **Water**: Reflects 10-30% of UV
- **Sand**: Reflects 15-25% of UV
- **Time of day**: 60% of daily UV falls between 10am and 2pm
- **Latitude**: Closer to the equator = higher UV year-round
- **Clouds**: Thin clouds let through up to 80% of UV (you can burn on cloudy days)

## Protection Guidelines

| UV Index | Action |
|----------|--------|
| 1-2 | Sunglasses on bright days |
| 3-5 | Sunscreen, hat, sunglasses |
| 6-7 | Sunscreen SPF 30+, seek shade at midday |
| 8-10 | Avoid midday sun, SPF 50+, protective clothing |
| 11+ | Stay indoors 10am-4pm if possible |

## Sunscreen Guide

- Apply 20 minutes before sun exposure
- Use at least SPF 30 (SPF 50 for fair skin or high UV)
- Reapply every 2 hours, and immediately after swimming
- Do not rely on sunscreen alone — combine with shade, hats, and clothing

---

Check the UV index for your city on [Weather Tomorrow](/).`
);

concept("ocean-currents-weather", "How Ocean Currents Affect Weather and Climate",
"Ocean currents are invisible rivers that regulate temperatures, drive rainfall, and shape climates thousands of miles from the coast.",
`## The Ocean-Atmosphere Connection

Oceans absorb about **90% of the excess heat** trapped by greenhouse gases. Ocean currents redistribute this heat around the globe, profoundly affecting weather patterns on every continent.

## Major Ocean Currents and Their Effects

| Current | Type | Climate Effect |
|---------|------|---------------|
| Gulf Stream | Warm | Keeps Western Europe 5-10°C warmer than equivalent latitudes |
| California Current | Cold | Gives San Francisco cool summers and fog |
| Humboldt Current | Cold | Makes Peru's coast cool and dry; rich fishing |
| Kuroshio | Warm | Warms Japan's south coast |
| Antarctic Circumpolar | Cold | Isolates Antarctica, keeping it frozen |

## How Currents Drive Weather

### Warm Currents
- Warm the air above them, increasing evaporation
- Bring mild, moist weather to nearby coasts
- Example: The Gulf Stream keeps London's winters mild despite being at the same latitude as Calgary

### Cold Currents
- Cool the air, reducing evaporation
- Often create fog where warm air meets cold water
- Can create coastal deserts (Atacama Desert sits next to the cold Humboldt Current)

## The Thermohaline Circulation

The "global conveyor belt" is a deep-ocean circulation system driven by differences in water temperature and salinity. It takes about 1,000 years for water to complete one cycle. This system distributes heat globally and is crucial for climate stability.

## Climate Change Concern

Scientists are monitoring whether melting Arctic ice could disrupt the thermohaline circulation by adding fresh water to the North Atlantic, potentially weakening the Gulf Stream and dramatically changing European climate.

---

Explore weather patterns on [Weather Tomorrow](/).`
);

concept("weather-and-aviation", "Weather and Aviation — Why Flights Get Delayed",
"Bad weather causes about 70% of flight delays. Learn which conditions ground planes and what pilots watch for.",
`## Why Weather Delays Happen

Aviation operates on thin margins of safety. Conditions that are merely inconvenient on the ground can be dangerous at 10,000 metres and 900 km/h.

## Weather Conditions That Affect Flights

| Condition | Impact |
|-----------|--------|
| Fog (visibility < 200m) | Delays landings, diverts flights |
| Thunderstorms | Lightning risk, severe turbulence, hail |
| Strong crosswinds (> 60 km/h) | Landings difficult or impossible |
| Ice and snow | Runway closures, de-icing delays |
| Volcanic ash | Engines can fail; airspace closed |
| Turbulence | Uncomfortable; severe turbulence can injure |

## Turbulence Types

- **Convective**: From thunderstorms — often avoidable with radar
- **Clear-air turbulence (CAT)**: Near jet streams, invisible to radar — this is the kind that surprises
- **Mountain wave**: Wind flowing over mountains creates oscillating waves
- **Wake turbulence**: From other aircraft — managed by spacing rules

## De-Icing

Aircraft must be free of ice before takeoff because even a thin layer of ice changes the wing's shape, reducing lift. De-icing fluid has a "holdover time" — if snow continues, the plane may need re-treatment, causing delays.

## How Airlines Manage Weather

- Route around storms using weather radar
- Delay departures to wait for conditions to improve
- Hold aircraft in the air (circling) until conditions allow landing
- Divert to alternate airports when conditions deteriorate
- Ground flights preemptively for safety (thunderstorms, hurricanes)

## What You Can Do

- Book morning flights — weather delays compound throughout the day
- Check your route's weather, not just your departure and arrival cities
- Have travel insurance for weather-related disruptions

---

Check airport weather on [Weather Tomorrow](/).`
);

concept("history-weather-forecasting", "The History of Weather Forecasting — From Folk Wisdom to Supercomputers",
"Humans have tried to predict weather for thousands of years. Here is how we went from cloud watching to petaflop-scale computing.",
`## Ancient Weather Prediction

- **Babylonians** (650 BC) used cloud patterns and astrology
- **Aristotle** (340 BC) wrote *Meteorologica*, the first systematic study of weather
- **Sailors** developed rules from observation: "Red sky at night, sailor's delight"
- **Farmers** relied on animal behaviour, plant responses, and seasonal patterns

## The Scientific Revolution

| Year | Milestone |
|------|-----------|
| 1643 | Torricelli invents the barometer |
| 1714 | Fahrenheit creates the mercury thermometer |
| 1802 | Howard classifies cloud types |
| 1835 | Coriolis describes the effect of Earth's rotation on wind |
| 1854 | First weather forecast published (Admiral FitzRoy, UK) |
| 1904 | Bjerknes proposes weather prediction through mathematics |

## The Modern Era

| Year | Milestone |
|------|-----------|
| 1950 | First computer weather forecast (ENIAC) |
| 1960 | TIROS-1: first weather satellite |
| 1966 | First geostationary weather satellite |
| 1975 | European Centre for Medium-Range Weather Forecasts (ECMWF) founded |
| 1990s | Doppler radar networks deployed |
| 2000s | Ensemble forecasting becomes standard |
| 2020s | AI weather models emerge (GraphCast, Pangu-Weather) |

## How Modern Forecasts Are Made

1. **Observation**: Satellites, radar, weather stations, ocean buoys, weather balloons, aircraft, and ships collect data
2. **Data assimilation**: Observations are combined into a 3D model of the current atmosphere
3. **Numerical prediction**: Supercomputers solve atmospheric physics equations forward in time
4. **Post-processing**: Statistical methods correct known model biases
5. **Human expertise**: Meteorologists interpret model output and issue forecasts

## What Is Next?

AI models are now competitive with traditional physics-based models for many forecast types, running in seconds instead of hours. The future likely involves hybrid systems combining physics understanding with machine learning.

---

Get modern, accurate forecasts on [Weather Tomorrow](/).`
);

concept("weather-superstitions-science", "Weather Superstitions — Which Ones Have Real Science Behind Them?",
"Groundhog Day, woolly bear caterpillars, and aching joints. We investigate which folk weather beliefs actually hold up.",
`## Superstitions That Work

### "Red sky at night, sailor's delight"
**Verdict: Mostly true** in mid-latitudes. Red sunsets indicate dry air approaching from the west.

### "Ring around the moon means rain"
**Verdict: Often true.** The ring (halo) is caused by ice crystals in cirrostratus clouds, which frequently precede warm fronts and rain.

### "Crickets can tell the temperature"
**Verdict: True.** Count a cricket's chirps in 14 seconds and add 40 to get the temperature in Fahrenheit. Cricket metabolism is directly tied to air temperature.

### "Swallows flying low means rain"
**Verdict: Somewhat true.** Insects fly lower in humid, low-pressure air. Swallows follow their food source.

## Superstitions That Do Not Work

### "Groundhog Day predictions"
**Verdict: No better than chance.** Analysis of Punxsutawney Phil's predictions shows roughly 50% accuracy — the same as flipping a coin.

### "Woolly bear caterpillars predict winter severity"
**Verdict: False.** Their band width relates to their age and growing conditions, not future weather.

### "Cows lying down means rain is coming"
**Verdict: No evidence.** Cows lie down to rest, chew cud, or because the ground is comfortable. No correlation with rain has been demonstrated.

### "You can smell rain before it arrives"
**Verdict: Partially true — but for the wrong reason.** Petrichor (the smell before rain) is caused by oils released from soil and ozone from lightning. You are smelling the storm's arrival, not predicting it.

## The Lesson

Folk weather wisdom often contains a kernel of truth based on centuries of observation. The best ones relate to observable atmospheric phenomena (clouds, sky colour, animal behaviour tied to air pressure). The worst ones are pattern-matching without a physical mechanism.

---

Get science-based forecasts on [Weather Tomorrow](/).`
);

concept("weather-records-extremes", "Weather Records and Extremes — The Most Extreme Weather on Earth",
"From the hottest temperature ever recorded to the wettest place on the planet, these are Earth's most extreme weather records.",
`## Temperature Records

| Record | Value | Location | Date |
|--------|-------|----------|------|
| Highest temperature | 56.7°C (134°F) | Death Valley, USA | July 1913 |
| Lowest temperature | -89.2°C (-128.6°F) | Vostok Station, Antarctica | July 1983 |
| Greatest 24h temp range | 56°C swing | Loma, Montana | Jan 1972 |

## Rainfall Records

| Record | Value | Location |
|--------|-------|----------|
| Most rain in 1 minute | 31.2mm | Unionville, Maryland |
| Most rain in 24 hours | 1,825mm | Foc-Foc, Réunion |
| Most rain in 1 year | 26,461mm | Mawsynram, India |
| Wettest place (average) | 11,873mm/year | Mawsynram, India |

## Wind Records

| Record | Value | Location |
|--------|-------|----------|
| Strongest non-tornado wind | 408 km/h | Barrow Island, Australia |
| Strongest tornado wind | 484 km/h (estimated) | Bridge Creek, Oklahoma |
| Longest-lasting tornado | 3.5 hours, 352 km path | Tri-State Tornado, 1925 |

## Other Extremes

| Record | Value | Location |
|--------|-------|----------|
| Most snow in 24 hours | 192 cm | Silver Lake, Colorado |
| Largest hailstone | 20 cm diameter | Vivian, South Dakota |
| Longest drought | 173 months (no rain) | Arica, Chile |
| Most lightning per km² | 233 flashes/km²/year | Lake Maracaibo, Venezuela |

## Driest Places

- **Atacama Desert, Chile**: Some areas have never recorded rain in human history
- **McMurdo Dry Valleys, Antarctica**: Have not seen rain for ~2 million years
- **Arica, Chile**: Average rainfall of 0.76mm per year

## Perspective

These records remind us of the atmosphere's extraordinary range. The difference between the hottest and coldest temperatures ever recorded is nearly 146°C — all within the thin shell of air we call weather.

---

See your city's weather on [Weather Tomorrow](/).`
);

concept("microclimates-explained", "Microclimates Explained — Weather in Your Backyard",
"Why one side of your garden frosts while the other does not. Microclimates create surprisingly different weather over short distances.",
`## What Is a Microclimate?

A microclimate is a small area where the climate differs from the surrounding region. This can be as small as a single garden bed or as large as a city block. The differences are driven by local factors like topography, vegetation, buildings, and water bodies.

## Common Microclimates

### Urban vs Rural
Cities are warmer than the surrounding countryside (urban heat island effect). A city centre can be 5°C warmer than a farm 20 km away.

### South-Facing vs North-Facing Slopes (Northern Hemisphere)
South-facing slopes receive more direct sunlight, making them warmer and drier. North-facing slopes are cooler and retain moisture longer. This affects everything from snow melt to wine grape selection.

### Near Water vs Inland
Lakes and oceans moderate temperatures. Coastal areas warm up more slowly in spring but cool down more slowly in autumn.

### Valley Bottoms vs Hillsides
Cold air is dense and sinks into valleys at night, creating frost pockets. Hillsides above the valley floor can be several degrees warmer overnight.

## Practical Applications

| Application | How Microclimates Help |
|------------|----------------------|
| Gardening | Plant frost-tender species near south-facing walls |
| Agriculture | Choose crop varieties suited to local slope and drainage |
| Home energy | Plant deciduous trees on the west side for summer shade |
| Outdoor dining | South-facing, sheltered patios extend the season |

## Creating Your Own Microclimate

- **Thermal mass**: Stone or brick walls absorb heat during the day and release it at night
- **Windbreaks**: Hedges or fences reduce wind chill
- **Mulch**: Moderates soil temperature extremes
- **Water features**: Add humidity and moderate temperature swings

---

Track local weather conditions on [Weather Tomorrow](/).`
);

concept("weather-sunrise-sunset-colours", "How Weather Affects Sunrise and Sunset Colours",
"The most spectacular sunrises and sunsets happen under specific weather conditions. Learn what creates those unforgettable skies.",
`## Why Sunrises and Sunsets Have Colour

At sunrise and sunset, sunlight travels through **more atmosphere** than at midday. Short blue wavelengths scatter away, leaving longer red, orange, and pink wavelengths to dominate the sky.

## Conditions for the Best Colours

### High, Thin Clouds
Mid-to-high clouds (altocumulus, cirrus) act as a canvas, reflecting and scattering the warm light. Low, thick clouds block the light entirely.

### Clean Air After Rain
Rain washes particles from the atmosphere. The cleaner air that follows produces purer, more vivid colours. Some of the best sunsets happen the evening after a storm passes.

### Moderate Humidity
Some moisture in the atmosphere enhances scattering and colour. Bone-dry air produces pale sunsets. Moderate humidity adds depth and variety.

### Volcanic Aerosols
Major eruptions inject sulphur particles into the stratosphere, producing exceptionally vivid sunsets worldwide for months. After Krakatoa (1883), sunsets were so red that fire brigades were called out.

## Sunrise vs Sunset

Sunrises often produce cleaner, subtler colours because the atmosphere is calmer and contains fewer particles in the morning. Sunsets tend to be more dramatic because daytime heating stirs up dust and moisture.

## Photographer's Rule of Thumb

- **Clear west + clouds overhead** at sunset = vivid colour
- **Rain clearing from the west** at sunset = spectacular potential
- **Thick overcast everywhere** = grey and dull
- **Completely clear sky** = colour at the horizon only, no cloud canvas

## Predicting Great Sunsets

Check the forecast for:
1. Mid-level cloud cover (30-70% is ideal)
2. Clear skies toward the western horizon
3. Recent rain or storm passage
4. Moderate humidity

---

Check sunset conditions on [Weather Tomorrow](/).`
);

// ============= PRACTICAL GUIDES (8 posts) =============

concept("preparing-heat-wave", "Preparing for a Heat Wave — Essential Checklist",
"Heat waves kill more people than any other weather event. A simple preparation checklist can keep you safe.",
`## Before the Heat Wave

- **Check your cooling**: Test air conditioning or fans before extreme heat arrives
- **Stock up on water**: Keep extra bottled water at home; freeze some bottles
- **Close curtains**: Reflective or blackout curtains on sun-facing windows reduce indoor temps significantly
- **Identify cooling centres**: Know where public air-conditioned spaces are (libraries, malls, community centres)
- **Check on others**: Know which neighbours, friends, or family members are vulnerable

## During the Heat Wave

### Hydration
- Drink water regularly, even when not thirsty
- Avoid alcohol, caffeine, and sugary drinks (they increase dehydration)
- Eat water-rich foods: watermelon, cucumber, berries

### Activity
- Limit outdoor activity to before 10 am or after 6 pm
- Never exercise in the midday heat
- Take cool showers to lower body temperature
- Rest more than usual

### Home Cooling
- Close windows and curtains during the day; open them at night if it cools down
- Use fans to circulate air (but fans alone are not effective above 35°C)
- Hang damp towels near fans for evaporative cooling
- Spend the hottest hours in the lowest floor of your building

## Red Flags — When to Seek Help

| Symptom | Condition | Action |
|---------|-----------|--------|
| Heavy sweating, weakness, nausea | Heat exhaustion | Move to cool space, sip water, cool down |
| No sweating, confusion, hot skin | Heat stroke | **Call emergency services immediately** |
| Muscle cramps | Heat cramps | Rest, stretch, drink electrolytes |

## For Pet Owners
- Never leave pets in parked cars
- Provide extra water bowls and shade
- Walk dogs on grass, not hot pavement (test with your hand — if too hot for you, too hot for paws)

---

Track heat warnings on [Weather Tomorrow](/).`
);

concept("storm-preparation-guide", "Storm Preparation Guide — Before, During, and After",
"A step-by-step guide to preparing for severe storms, staying safe during them, and recovering afterward.",
`## Before the Storm

### Build an Emergency Kit
- Water: 4 litres per person per day for 3 days
- Non-perishable food and a manual can opener
- Torch and extra batteries
- First aid kit
- Battery-powered or hand-crank radio
- Phone charger (portable battery bank)
- Important documents in a waterproof bag
- Cash (ATMs may be down)

### Prepare Your Home
- Secure loose outdoor furniture, bins, and decorations
- Clear gutters and drains
- Know how to shut off gas, electricity, and water
- Trim overhanging tree branches near your home
- Board up windows if a hurricane is approaching

### Plan
- Know your evacuation route
- Identify the safest room in your house (interior, ground floor, away from windows)
- Have a family communication plan

## During the Storm

- Stay indoors, away from windows
- Go to your safe room if wind becomes severe
- Do not walk or drive through flood water (15cm of moving water can knock you down; 30cm can move a car)
- Use torches, not candles (fire risk)
- Unplug major appliances to protect against power surges
- Fill bathtub with water (for flushing toilets if water is cut)

## After the Storm

- Check yourself and others for injuries
- Do not touch downed power lines
- Document damage with photos for insurance
- Boil water until authorities confirm supply is safe
- Watch for secondary hazards: flooding, weakened structures, gas leaks

---

Monitor storm warnings on [Weather Tomorrow](/).`
);

concept("winter-driving-weather-tips", "Winter Driving in Bad Weather — Safety Tips",
"Ice, snow, fog, and rain make winter roads dangerous. These practical tips can help you arrive safely.",
`## Before You Drive

- Check the weather and road conditions before leaving
- Clear all snow and ice from windows, mirrors, roof, and lights
- Ensure tyres have adequate tread (minimum 3mm for winter driving)
- Keep fuel tank at least half full (prevents fuel line freezing)
- Pack an emergency kit: blanket, torch, ice scraper, phone charger, snacks, water

## Driving on Snow and Ice

- **Reduce speed** — stopping distances are 10x longer on ice
- **Increase following distance** to at least 6 seconds behind the vehicle ahead
- **Accelerate and brake gently** — sudden inputs cause skids
- **Use low gears** for better traction on hills
- **If you skid**, steer into the skid (turn the wheel in the direction the rear is sliding) and ease off the brakes

## Driving in Fog

- Use low-beam headlights (high beams reflect back and reduce visibility)
- Reduce speed significantly
- Use road markings as a guide
- Do not stop on the road — pull completely off to the side
- Use fog lights if your vehicle has them

## Driving in Heavy Rain

- Turn headlights on
- Slow down — aquaplaning risk increases above 80 km/h
- Avoid standing water; it may be deeper than it looks
- If you start aquaplaning, ease off the accelerator and keep the wheel straight

## Black Ice Warning Signs

- Temperatures near 0°C, especially after rain or on bridges and overpasses
- Road looks wet but there is no spray from other vehicles
- Shaded areas and north-facing slopes are especially risky
- Early morning and evening are peak black ice times

---

Check road weather conditions on [Weather Tomorrow](/).`
);

concept("weather-emergency-kit", "Weather Emergency Kit — What to Pack and Why",
"A ready-to-go emergency kit could save your life in a severe weather event. Here is exactly what to include.",
`## The Essential Kit

### Water and Food
- 4 litres of water per person per day (minimum 3-day supply)
- Non-perishable food: canned goods, energy bars, dried fruit, nuts
- Manual can opener
- Baby food or formula if applicable

### Light and Communication
- LED torch with extra batteries
- Battery-powered or hand-crank AM/FM radio
- Portable phone charger (keep fully charged)
- Whistle to signal for help

### First Aid
- Adhesive bandages, gauze, medical tape
- Antiseptic wipes
- Pain relievers (ibuprofen, paracetamol)
- Prescribed medications (7-day supply)
- Allergy medications if needed

### Documents and Money
- Copies of ID, insurance, and medical information in a waterproof bag
- Cash in small denominations (ATMs and card machines may be down)
- Emergency contact list (written, not just in your phone)

### Clothing and Shelter
- Change of clothes appropriate for the season
- Rain poncho
- Emergency blanket (space blanket)
- Sturdy shoes

### Tools
- Multi-tool or Swiss army knife
- Duct tape
- Bin bags (shelter, waterproofing, waste)
- Matches or lighter in a waterproof container

## Where to Keep It

- In a grab-and-go bag near your front door
- A smaller version in your car
- Check and refresh every 6 months (rotate food and water, check batteries)

## For Different Scenarios

| Scenario | Add to Kit |
|----------|-----------|
| Hurricane/cyclone | Plywood, nails, tarp |
| Winter storm | Extra blankets, hand warmers, ice melt |
| Earthquake | Wrench for gas shutoff, dust masks |
| Flood | Waterproof bags, waders |

---

Stay prepared and check forecasts on [Weather Tomorrow](/).`
);

concept("weather-and-pets-safety", "Weather and Pets — Keeping Animals Safe in Extreme Conditions",
"Your pets rely on you to protect them from heat, cold, storms, and other weather dangers. Here is a practical guide.",
`## Heat Safety

- **Never leave pets in parked cars** — even at 22°C outside, a car interior can reach 47°C in an hour
- Walk dogs early morning or after sunset; hot pavement burns paw pads (test with your palm — 5 seconds)
- Provide constant access to fresh water and shade
- Watch for heat stroke signs: excessive panting, drooling, lethargy, vomiting
- Breeds with flat faces (bulldogs, pugs, Persian cats) are especially vulnerable

## Cold Weather Safety

- Short-haired, small, elderly, and very young pets are most at risk
- Limit outdoor time when temperatures drop below -5°C
- Consider dog coats or sweaters for small or thin-coated breeds
- Wipe paws after walks to remove road salt (toxic if licked)
- Check under car bonnets before starting — cats seek warmth near engines
- Provide warm bedding away from draughts

## Storm Safety

- Bring all pets indoors well before a storm arrives
- Create a safe, quiet space away from windows (interior room)
- Keep pets leashed or crated — frightened animals may bolt
- Thunder anxiety is common; talk to your vet about calming options
- Update ID tags and microchip information before storm season

## Flood Safety

- Include pets in your evacuation plan
- Keep pet carriers, leashes, food, and medications in your emergency kit
- Never leave pets behind in a flood evacuation

## Seasonal Hazards

| Season | Hazard | Prevention |
|--------|--------|-----------|
| Spring | Fertilisers, pesticides on lawns | Keep pets off treated grass |
| Summer | Algae blooms in lakes | Avoid green or scummy water |
| Autumn | Mushrooms in gardens | Remove wild mushrooms promptly |
| Winter | Antifreeze puddles | Clean up immediately; lethal to pets |

---

Check pet-safe outdoor conditions on [Weather Tomorrow](/).`
);

concept("outdoor-wedding-weather-planning", "Outdoor Wedding Weather Planning — The Complete Guide",
"Your outdoor wedding depends on weather. Here is how to plan for it, monitor it, and prepare backup options.",
`## Choosing the Date

- Research historical weather data for your venue's location and month
- The driest months reduce rain risk, but no date guarantees perfect weather
- Shoulder seasons (spring, early autumn) often offer pleasant temperatures with fewer extreme heat days
- Avoid peak hurricane, monsoon, or rainy seasons

## Two Weeks Out

- Start checking extended forecasts daily (accuracy improves as the date approaches)
- The 10-day forecast gives directional guidance but will change
- Confirm your backup plan with the venue

## One Week Out

- The 7-day forecast is reasonably reliable for temperature and general conditions
- If rain is forecast, inform vendors about the backup plan
- Check wind forecasts — strong gusts can damage decorations and make outdoor dining uncomfortable

## The Day Before

- The 24-hour forecast is highly accurate
- Make the indoor/outdoor decision if conditions are marginal
- Brief vendors, staff, and wedding party on the plan

## Backup Plan Essentials

- **Always have a Plan B**: tent, indoor space, or marquee
- Book the backup space even if you are confident about weather
- Clear-span tents can be enclosed with sides if rain hits
- Fans or heaters depending on temperature
- Have extra blankets or parasols available for guests

## Temperature Comfort for Guests

| Temperature | Comfort Level |
|-------------|---------------|
| 15-22°C | Ideal for outdoor ceremonies |
| 23-28°C | Comfortable with shade |
| Above 30°C | Provide shade, fans, cold drinks |
| Below 15°C | Provide heaters, blankets |

## Weather Details That Matter

- **Wind**: Above 25 km/h causes problems with veils, candles, table settings
- **Humidity**: Above 75% makes everything feel sticky; hair and makeup struggle
- **UV**: Provide parasols or shade; guests can burn during long ceremonies
- **Rain timing**: A morning shower may clear by afternoon — do not panic at the first sign of cloud

---

Track your wedding date forecast on [Weather Tomorrow](/).`
);

concept("weather-packing-checklist", "Weather-Based Packing Checklist for Travellers",
"Stop overpacking. Use the weather forecast to pack exactly what you need for your trip.",
`## The System

Instead of packing for every possibility, check the forecast and pack for what is actually predicted. This approach reduces luggage weight by 30-40%.

## Hot Weather (Above 25°C)

- [ ] 2-3 lightweight cotton or linen tops
- [ ] 1-2 pairs of shorts or light trousers
- [ ] Sundress or light outfit for evenings
- [ ] Swimsuit and flip-flops
- [ ] Sunscreen SPF 30+
- [ ] Sunglasses and hat
- [ ] Light cardigan (for air-conditioned interiors)
- [ ] Refillable water bottle

## Mild Weather (10-25°C)

- [ ] Mix of short and long-sleeve tops
- [ ] 1-2 pairs of trousers or jeans
- [ ] Light jacket or cardigan
- [ ] One warm layer for cool evenings
- [ ] Comfortable closed-toe shoes
- [ ] Compact umbrella
- [ ] Light scarf (versatile for warmth or sun)

## Cold Weather (Below 10°C)

- [ ] Thermal base layers (top and bottom)
- [ ] 2-3 warm tops (wool or fleece)
- [ ] Insulated coat
- [ ] Warm trousers
- [ ] Hat, gloves, and scarf
- [ ] Warm waterproof boots
- [ ] Wool socks (2-3 pairs)

## Rainy Weather (Any Temperature)

- [ ] Waterproof jacket (packable)
- [ ] Compact umbrella
- [ ] Quick-dry clothing
- [ ] Waterproof bag for electronics
- [ ] Extra pair of socks
- [ ] Water-resistant shoes or shoe covers

## Universal Items

- [ ] Phone charger and adapter
- [ ] Medications
- [ ] Reusable bag (for shopping and wet items)
- [ ] Layers that can mix and match

## Pro Tip

Check the forecast for your destination 3 days before departure and adjust your packing. Do a final check the evening before you leave.

---

Get accurate destination forecasts on [Weather Tomorrow](/).`
);

concept("running-in-different-weather", "Running in Different Weather — A Complete Guide",
"Rain, heat, cold, wind — each weather condition changes your run. Here is how to adapt your pace, gear, and strategy.",
`## Running in Heat (Above 25°C)

- Slow down: expect 10-20 seconds per km slower for every 5°C above 15°C
- Run early morning (before 8 am) or after sunset
- Wear light, moisture-wicking fabrics — no cotton
- Hydrate before, during, and after
- Wet a bandana and wear it around your neck
- Acclimatise gradually over 10-14 days

## Running in Cold (Below 5°C)

- Dress in layers: wicking base, insulating mid, wind-blocking outer
- Protect extremities: gloves, ear-covering hat, neck gaiter
- Warm up indoors for 5-10 minutes before heading out
- Breathe through a buff or scarf in extreme cold
- Run into the wind first so the wind is at your back when you are sweaty
- Shorten your stride on icy surfaces

## Running in Rain

- A light rain jacket with ventilation prevents overheating
- Wear a cap with a brim to keep rain off your face
- Apply anti-chafe balm to prevent raw skin
- Wear wool-blend socks (they stay warm when wet, unlike cotton)
- After the run: change into dry clothes immediately

## Running in Wind

- Strong headwinds (above 30 km/h) can slow you by 30-60 seconds per km
- Tuck behind buildings or trees when possible
- Plan out-and-back routes so the headwind is first half, tailwind second
- Lean slightly into headwinds and shorten your stride
- Wind chill makes it feel colder — dress one layer warmer than the temperature suggests

## Running in Humidity (Above 70%)

- Your body cannot cool itself efficiently — reduce intensity
- Sweat more but cool less; hydrate aggressively
- Heart rate will be higher than usual for the same pace
- Recovery takes longer in humid conditions

## Quick Reference

| Condition | Pace Adjustment | Key Gear |
|-----------|----------------|----------|
| 25-30°C | +10-20s/km | Light clothing, water |
| 30-35°C | +20-40s/km | Shade, electrolytes |
| 0-5°C | Normal pace | Layers, gloves |
| Below -10°C | Shorter runs | Full coverage, buff |
| Rain | Normal pace | Cap, anti-chafe, jacket |
| Wind > 30 km/h | Variable | Wind layer, cap |

---

Check running conditions on [Weather Tomorrow](/).`
);

concept("weather-outdoor-events", "Planning Outdoor Events Around Weather — A Practical Guide",
"Concerts, festivals, markets, and sports events all depend on weather. Here is how to plan smart and handle the unexpected.",
`## Planning Phase

### Choose the Right Season
- Research historical weather data for your dates and venue
- Spring and autumn offer milder temperatures but variable conditions
- Summer is popular but heat and afternoon storms are risks
- Winter events need cold-weather infrastructure (heating, covered areas)

### Venue Considerations
- Is there a covered or indoor backup option?
- What is the ground surface? (Grass becomes mud in rain)
- Are there natural windbreaks (buildings, trees)?
- Is the site prone to flooding?

## Monitoring Phase

| Timeframe | Action |
|-----------|--------|
| 2 weeks out | Watch general trends; no decisions yet |
| 1 week out | Review forecast daily; alert vendors to potential issues |
| 3 days out | Forecast is reliable; make tent/cover decisions |
| Day before | Fine-tune: adjust start times, deploy weather gear |
| Day of | Monitor hourly; have decision points built into timeline |

## Weather Contingencies

### Rain
- Tents and marquees for cover
- Ground mats or temporary flooring for muddy areas
- Extra towels and hand-drying stations
- Adjust electrical setups for wet conditions (safety first)

### Heat
- Shade structures and misting stations
- Free water stations every 50 metres at large events
- Medical tent with cold packs and rehydration supplies
- Schedule programming to avoid peak heat (12-3 pm)

### Wind
- Secure all signage, banners, and decorations
- Weighted bases for tents and canopies
- Cancel inflatables if gusts exceed 40 km/h
- Brief food vendors on securing equipment

### Cold
- Heated tents or fire pits (check fire regulations)
- Warm beverage stations
- Shorter event duration to reduce exposure

## Communication

- Have a clear weather-delay or cancellation policy
- Notify attendees via app, social media, and email
- Designate one person as the weather decision-maker

---

Get event-day forecasts on [Weather Tomorrow](/).`
);

console.log(`Generated ${idx - 55} weather tips blog posts (indices 55-${idx - 1}).`);
