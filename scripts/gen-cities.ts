import { writeFileSync } from "fs";
import { join } from "path";

const DIR = join(process.cwd(), "content", "blog");
const F = (c: number) => Math.round(c * 9 / 5 + 32);

function getDate(i: number): string {
  const d = new Date("2026-03-27");
  d.setDate(d.getDate() + Math.floor(i / 2));
  return d.toISOString().split("T")[0];
}

function getPack(hi: number, lo: number, rain: number, hum: number): string[] {
  const items: string[] = [];
  if (hi >= 30) {
    items.push("Lightweight breathable clothing in cotton or linen");
    items.push("High-SPF sunscreen, sunglasses, and a wide-brimmed hat");
  } else if (hi >= 20) {
    items.push("Light layers — t-shirts plus a jacket for cooler evenings");
    items.push("Sunscreen and sunglasses");
  } else if (hi >= 10) {
    items.push("Layered outfits — sweaters, a warm jacket, and a scarf");
    items.push("Waterproof walking shoes");
  } else {
    items.push("Insulated winter coat with thermal base layers");
    items.push("Warm hat, gloves, and a scarf");
    items.push("Insulated waterproof boots");
  }
  if (rain > 100) items.push("Waterproof jacket and a sturdy umbrella");
  else if (rain > 30) items.push("Compact umbrella or light rain jacket");
  if (hum > 75 && hi > 25) items.push("Moisture-wicking fabrics and a refillable water bottle");
  items.push("Comfortable walking shoes suited to the terrain");
  return items;
}

interface C {
  slug: string; city: string; country: string; period: string;
  hi: number; lo: number; rain: number; rainD: number; hum: number; sun: number;
  hook: string; act: string[]; tips: string[];
}

let idx = 0;

function gen(c: C) {
  const pack = getPack(c.hi, c.lo, c.rain, c.hum);
  const citySlug = c.slug.replace(/-weather.*/, "");
  const title = `${c.city} Weather ${c.period} — What to Expect`;
  const excerpt = `Complete guide to ${c.city} weather ${c.period.toLowerCase()}: temperatures, rainfall, what to pack, and tips for ${c.country}.`;

  const body = `## Overview

${c.city}, ${c.country} — ${c.hook}. Whether you are planning a holiday or a business trip, understanding the weather helps you pack right and make the most of your time.

## Temperature

Daytime highs reach **${c.hi}\u00B0C (${F(c.hi)}\u00B0F)** while nights cool to **${c.lo}\u00B0C (${F(c.lo)}\u00B0F)**. ${c.sun > 0 ? `Expect around ${c.sun} hours of sunshine per day.` : "Overcast skies are common."}${c.hi - c.lo > 15 ? " The wide daily temperature swing means layering is essential." : ""}

## Rainfall

${c.city} sees about **${c.rain}mm of rainfall across ${c.rainD} days** during this period. ${c.rain > 150 ? "Downpours can be heavy but usually pass quickly. Waterproof gear is essential." : c.rain > 80 ? "Showers are fairly regular — keep an umbrella handy when you head out." : c.rain > 30 ? "Rainfall is moderate. The odd shower is possible but unlikely to ruin your plans." : c.rain > 5 ? "Rain is uncommon, though a light sprinkle is not out of the question." : "Rain is virtually nonexistent — expect clear, dry skies throughout."}

## Humidity and Comfort

Average humidity sits at **${c.hum}%**. ${c.hum > 75 ? "Combined with the heat this can feel oppressive. Stay hydrated, wear breathable fabrics, and take advantage of air-conditioned spaces during peak afternoon hours." : c.hum > 55 ? "Most visitors find this comfortable, though midday can feel slightly muggy." : "The air is pleasantly dry, making even warmer temperatures feel manageable."}

## What to Pack

${pack.map(p => `- ${p}`).join("\n")}

## Best Things to Do

${c.act.map(a => `- ${a}`).join("\n")}

## Travel Tips

${c.tips.map(t => `- ${t}`).join("\n")}

## Quick Summary

| Metric | Value |
|--------|-------|
| Daytime High | ${c.hi}\u00B0C (${F(c.hi)}\u00B0F) |
| Nighttime Low | ${c.lo}\u00B0C (${F(c.lo)}\u00B0F) |
| Rainfall | ${c.rain}mm over ${c.rainD} days |
| Humidity | ${c.hum}% |
| Sunshine | ${c.sun} hrs/day |

---

Plan your trip with the [live ${c.city} forecast](/${citySlug}) on Weather Tomorrow.`;

  const fm = `---\ntitle: "${title}"\nslug: "${c.slug}"\nexcerpt: "${excerpt}"\ndate: "${getDate(idx)}"\ncategory: "City Guide"\ncity: "${citySlug}"\nreadTime: 4\n---`;
  writeFileSync(join(DIR, `${c.slug}.mdx`), fm + "\n\n" + body);
  idx++;
}

gen({ slug: "bangkok-weather-april", city: "Bangkok", country: "Thailand", period: "in April", hi: 35, lo: 26, rain: 85, rainD: 8, hum: 80, sun: 8,
  hook: "April is the hottest month of the year and home to the legendary Songkran water festival",
  act: ["Explore the Grand Palace and Wat Pho before the midday heat", "Join Songkran water-fight celebrations on Khao San Road", "Cruise the Chao Phraya River on a long-tail boat at sunset", "Browse Chatuchak Weekend Market in the cool morning hours"],
  tips: ["Avoid outdoor sightseeing between noon and 3 pm when heat peaks", "Carry a towel and waterproof phone case during Songkran week", "Air-conditioned malls like Siam Paragon make great afternoon retreats"]
});

gen({ slug: "barcelona-weather-summer", city: "Barcelona", country: "Spain", period: "in Summer", hi: 28, lo: 21, rain: 40, rainD: 4, hum: 65, sun: 10,
  hook: "summer means long sunny days, warm Mediterranean water, and buzzing street life along La Rambla",
  act: ["Stroll La Rambla and the Gothic Quarter in the golden evening light", "Swim and sunbathe at Barceloneta Beach", "Visit the Sagrada Familia — book early-morning tickets to beat queues", "Watch the sunset from the Montjuic hilltop gardens"],
  tips: ["Book major attractions online weeks in advance — summer is peak season", "Carry a water bottle; public fountains are plentiful and free", "Dine late like the locals — restaurants fill up after 9 pm"]
});

gen({ slug: "berlin-weather-winter", city: "Berlin", country: "Germany", period: "in Winter", hi: 3, lo: -2, rain: 45, rainD: 10, hum: 85, sun: 2,
  hook: "winter transforms the city with enchanting Christmas markets, cozy cafes, and a stark historical atmosphere",
  act: ["Wander the magical Christmas markets at Gendarmenmarkt and Alexanderplatz", "Visit Museum Island — perfect for cold or rainy days", "Warm up with Glühwein and currywurst from street vendors", "Explore the Berlin Wall Memorial and Checkpoint Charlie"],
  tips: ["Daylight fades by 4 pm — plan outdoor activities for the morning", "Layers are essential; heated interiors contrast sharply with freezing streets", "Public transport is excellent and keeps you out of the cold"]
});

gen({ slug: "cairo-weather-summer", city: "Cairo", country: "Egypt", period: "in Summer", hi: 36, lo: 22, rain: 0, rainD: 0, hum: 35, sun: 12,
  hook: "summer brings extreme desert heat, but also thinner crowds at the Pyramids and lower hotel prices",
  act: ["Visit the Pyramids of Giza at sunrise before temperatures soar", "Take a felucca sailboat ride on the Nile at sunset", "Explore the Egyptian Museum and its air-conditioned galleries", "Haggle in Khan el-Khalili bazaar during the cooler evening hours"],
  tips: ["Start your day at dawn — by 10 am the heat becomes punishing", "Drink at least 3 litres of water daily to avoid dehydration", "Dress modestly in loose, light-coloured fabrics that also respect local customs"]
});

gen({ slug: "cape-town-weather-december", city: "Cape Town", country: "South Africa", period: "in December", hi: 26, lo: 16, rain: 15, rainD: 3, hum: 60, sun: 11,
  hook: "December kicks off Cape Town's glorious summer with warm sunshine, long days, and vibrant holiday energy",
  act: ["Hike or take the cable car up Table Mountain on a clear morning", "Relax on Camps Bay Beach with a view of the Twelve Apostles", "Drive out to the Stellenbosch wine lands for tastings and lunch", "Visit the penguins at Boulders Beach in Simon's Town"],
  tips: ["The southeaster wind can blow hard — mornings tend to be calmer", "Book accommodation well in advance; December is peak holiday season", "Rent a car to explore the Cape Peninsula and wine regions"]
});

gen({ slug: "chicago-weather-spring", city: "Chicago", country: "USA", period: "in Spring", hi: 15, lo: 5, rain: 85, rainD: 11, hum: 65, sun: 7,
  hook: "spring brings a welcome thaw, blooming parks, and a city eager to enjoy the outdoors after a long winter",
  act: ["Walk through Millennium Park and see your reflection in Cloud Gate", "Take the architecture boat tour along the Chicago River", "Cycle the lakefront trail with views of Lake Michigan", "Try deep-dish pizza at a classic spot like Lou Malnati's"],
  tips: ["Temperatures can swing wildly in spring — always carry an extra layer", "Lake Michigan creates its own microclimate; the lakefront is often cooler", "Check for Cubs home games if you want a classic Wrigley Field experience"]
});

gen({ slug: "delhi-weather-winter", city: "Delhi", country: "India", period: "in Winter", hi: 21, lo: 7, rain: 15, rainD: 2, hum: 55, sun: 8,
  hook: "winter is the most pleasant season, with mild days perfect for exploring the city's Mughal and colonial heritage",
  act: ["Explore the Red Fort and Jama Masjid in the crisp morning air", "Visit Qutub Minar and Humayun's Tomb without summer's punishing heat", "Take a food walk through Old Delhi's legendary street-food lanes", "Day-trip to Agra for the Taj Mahal in soft winter light"],
  tips: ["Fog can cause flight delays in December and January — build in buffer time", "Air quality dips in winter; check the AQI and consider a mask", "Mornings and evenings are chilly — a warm jacket is needed after dark"]
});

gen({ slug: "florence-weather-october", city: "Florence", country: "Italy", period: "in October", hi: 19, lo: 10, rain: 90, rainD: 8, hum: 70, sun: 5,
  hook: "October offers golden autumn light, harvest festivals, and far fewer tourists than the summer crush",
  act: ["Spend a morning in the Uffizi Gallery without summer queues", "Climb the Duomo dome for panoramic views of autumn-tinted Tuscany", "Drive through the Chianti countryside for wine harvest celebrations", "Enjoy a truffle-season menu at a traditional Tuscan trattoria"],
  tips: ["Rain showers are common — a waterproof jacket is more practical than an umbrella in narrow streets", "Book the Uffizi and Accademia online even in shoulder season", "The evening chill arrives quickly after sunset; bring a warm layer for dinners al fresco"]
});

gen({ slug: "hanoi-weather-november", city: "Hanoi", country: "Vietnam", period: "in November", hi: 25, lo: 17, rain: 40, rainD: 6, hum: 75, sun: 5,
  hook: "November marks the start of the cool, dry season — one of the most comfortable months to explore northern Vietnam",
  act: ["Wander the atmospheric Old Quarter streets on foot or by cyclo", "Enjoy a morning stroll around Hoan Kiem Lake and Ngoc Son Temple", "Take a street-food tour to try pho, bun cha, and egg coffee", "Book a two-day trip to Ha Long Bay while the weather is calm"],
  tips: ["Carry a light jacket for cool evenings, especially near the lakes", "Traffic is chaotic — cross roads slowly and steadily without hesitating", "Vietnamese coffee is strong; try ca phe trung (egg coffee) at a lakeside cafe"]
});

gen({ slug: "honolulu-weather-year-round", city: "Honolulu", country: "USA", period: "Year Round", hi: 30, lo: 22, rain: 45, rainD: 8, hum: 65, sun: 9,
  hook: "trade winds keep temperatures pleasant all year, making Honolulu one of the most consistently comfortable cities on Earth",
  act: ["Sunbathe and surf at Waikiki Beach", "Hike Diamond Head crater for a panoramic sunrise view", "Snorkel at Hanauma Bay's protected reef", "Drive to the North Shore for big-wave watching in winter"],
  tips: ["The windward (east) side gets more rain; Waikiki on the leeward side is drier", "Reef-safe sunscreen is required by Hawaii law", "Book snorkelling and hiking early; popular spots fill up fast"]
});

gen({ slug: "hong-kong-weather-summer", city: "Hong Kong", country: "China", period: "in Summer", hi: 32, lo: 27, rain: 380, rainD: 16, hum: 82, sun: 6,
  hook: "summer is hot, humid, and prone to typhoons, but the city's air-conditioned malls, incredible food, and dramatic storms have their own appeal",
  act: ["Take the Peak Tram to Victoria Peak for skyline views", "Sample dim sum at a traditional Cantonese teahouse", "Ride the Star Ferry across Victoria Harbour at night", "Visit the Ten Thousand Buddhas Monastery in Sha Tin"],
  tips: ["Check the Hong Kong Observatory for typhoon warnings before heading out", "Carry an umbrella everywhere — afternoon downpours strike with little warning", "Bring a light layer for aggressively air-conditioned MTR trains and malls"]
});

gen({ slug: "istanbul-weather-april", city: "Istanbul", country: "Turkey", period: "in April", hi: 16, lo: 9, rain: 45, rainD: 9, hum: 70, sun: 7,
  hook: "April brings the famous Istanbul Tulip Festival, mild temperatures, and fewer crowds than summer",
  act: ["Marvel at the Hagia Sophia and Blue Mosque without peak-season queues", "Stroll through Emirgan Park during the Tulip Festival with millions of blooms", "Cruise the Bosphorus at sunset for views of two continents", "Bargain for spices and ceramics in the Grand Bazaar"],
  tips: ["Weather can be changeable — dress in layers and carry a rain jacket", "Eat like a local: try simit for breakfast and balik ekmek at the Galata Bridge", "The Istanbul Museum Pass saves money and queue time at major sites"]
});

gen({ slug: "kuala-lumpur-weather-year-round", city: "Kuala Lumpur", country: "Malaysia", period: "Year Round", hi: 33, lo: 24, rain: 250, rainD: 17, hum: 80, sun: 6,
  hook: "the equatorial climate means heat and afternoon thunderstorms are a daily constant, but mornings are typically clear and bright",
  act: ["Visit the Petronas Twin Towers and KLCC Park early in the day", "Explore the Batu Caves and their rainbow staircase", "Eat your way through Jalan Alor night market", "Cool off in the air-conditioned splendour of Pavilion KL mall"],
  tips: ["Plan outdoor activities for the morning; storms roll in most afternoons by 3 pm", "The Grab app is the easiest way to get around — taxis can be unpredictable", "Dress modestly when visiting mosques; free robes are usually available at the entrance"]
});

gen({ slug: "las-vegas-weather-summer", city: "Las Vegas", country: "USA", period: "in Summer", hi: 41, lo: 27, rain: 10, rainD: 2, hum: 15, sun: 13,
  hook: "summer in the Mojave Desert means scorching heat, but pool parties, world-class shows, and air-conditioned casinos keep the fun going",
  act: ["Spend the afternoon at a resort pool party on the Strip", "Catch a Cirque du Soleil or headliner show in the evening", "Day-trip to the Grand Canyon or Red Rock Canyon early morning", "Explore the Fremont Street Experience after dark when it cools down"],
  tips: ["Never underestimate the heat — heatstroke is a real risk above 40°C", "Drink water constantly, even if you do not feel thirsty", "The best hotel deals are midweek; weekends command premium prices"]
});

gen({ slug: "lisbon-weather-spring", city: "Lisbon", country: "Portugal", period: "in Spring", hi: 20, lo: 12, rain: 50, rainD: 7, hum: 65, sun: 8,
  hook: "spring is arguably the best time to visit, with mild sunshine, blooming jacaranda trees, and the city at its most photogenic",
  act: ["Ride the iconic Tram 28 through the Alfama neighbourhood", "Eat freshly baked pastéis de nata at Pastéis de Belém", "Explore the Belém Tower and Jerónimos Monastery", "Walk the miradouros (viewpoints) for sunset panoramas over the Tagus"],
  tips: ["Lisbon is hilly — wear comfortable shoes with good grip on the cobblestones", "The Lisboa Card includes free public transport and museum entry", "Sunset drinks at a rooftop bar in Bairro Alto are a must"]
});

gen({ slug: "melbourne-weather-january", city: "Melbourne", country: "Australia", period: "in January", hi: 26, lo: 15, rain: 48, rainD: 8, hum: 55, sun: 9,
  hook: "January is peak summer, the Australian Open tennis fills the city with energy, and Melbourne's famous unpredictable weather keeps things exciting",
  act: ["Watch the Australian Open live at Melbourne Park", "Explore the street art and coffee culture of the city's laneways", "Take the Great Ocean Road day trip to the Twelve Apostles", "Cool off at St Kilda Beach and walk the pier at sunset"],
  tips: ["Melbourne can experience four seasons in one day — always carry a layer and an umbrella", "Slip, slop, slap: sunscreen, a hat, and shade are essential on hot days", "The free City Circle tram loops through the CBD's main attractions"]
});

gen({ slug: "mexico-city-weather-year-round", city: "Mexico City", country: "Mexico", period: "Year Round", hi: 25, lo: 12, rain: 135, rainD: 14, hum: 50, sun: 7,
  hook: "the high altitude keeps temperatures mild year-round despite being in the tropics, making it a surprisingly comfortable megacity",
  act: ["Visit the vast Zócalo and the Templo Mayor ruins", "Explore Frida Kahlo's Casa Azul in Coyoacán", "Wander Chapultepec Park and its world-class anthropology museum", "Eat tacos al pastor at a street stand in Condesa or Roma"],
  tips: ["The rainy season runs May to October with afternoon showers — mornings stay dry", "Altitude sickness is rare at 2,200m but drink extra water your first day", "Uber and DiDi are safe and affordable for getting around"]
});

gen({ slug: "miami-weather-hurricane-season", city: "Miami", country: "USA", period: "in Hurricane Season", hi: 33, lo: 25, rain: 200, rainD: 15, hum: 75, sun: 8,
  hook: "hurricane season from June to November brings the cheapest hotel rates, dramatic skies, and warm ocean water — just keep an eye on the forecasts",
  act: ["Soak up the sun and art-deco architecture on South Beach", "Explore the Wynwood Walls street art district", "Take an airboat tour through the Everglades", "Enjoy Cuban coffee and croquetas in Little Havana"],
  tips: ["Monitor the National Hurricane Center during your trip and have a plan", "Afternoon thunderstorms are almost daily — they pass quickly", "Travel insurance with hurricane coverage is strongly recommended"]
});

gen({ slug: "moscow-weather-winter", city: "Moscow", country: "Russia", period: "in Winter", hi: -5, lo: -10, rain: 50, rainD: 18, hum: 85, sun: 1,
  hook: "winter turns Moscow into a snow-covered wonderland — bitterly cold but stunningly beautiful, with festive lights and steaming street food",
  act: ["Walk Red Square under snow and see St Basil's Cathedral illuminated", "Watch a ballet at the legendary Bolshoi Theatre", "Explore the lavishly decorated Moscow Metro stations", "Shop and warm up inside GUM department store's historic arcades"],
  tips: ["Dress for extreme cold: thermal layers, down jacket, and insulated boots are non-negotiable", "Daylight lasts only about 7 hours — plan accordingly", "The Moscow Metro is fast, warm, and beautiful — use it instead of taxis"]
});

gen({ slug: "nairobi-weather-year-round", city: "Nairobi", country: "Kenya", period: "Year Round", hi: 25, lo: 13, rain: 90, rainD: 10, hum: 60, sun: 7,
  hook: "sitting at 1,700m altitude, Nairobi enjoys a surprisingly temperate climate — warm days, cool nights, and Africa's wildlife right on the city's doorstep",
  act: ["Visit Nairobi National Park — the only national park inside a capital city", "Feed giraffes at the Giraffe Centre in Lang'ata", "Explore the Karen Blixen Museum and its colonial history", "Take a day trip to the Great Rift Valley viewpoint"],
  tips: ["Long rains fall March-May, short rains October-December — June to September is driest", "Evenings get genuinely cool; bring a fleece or light jacket", "Kenyan coffee is world-class — visit a local roastery"]
});

gen({ slug: "osaka-weather-april", city: "Osaka", country: "Japan", period: "in April", hi: 20, lo: 10, rain: 100, rainD: 10, hum: 60, sun: 6,
  hook: "April is cherry blossom season, transforming Osaka into a pink-and-white wonderland — one of the most magical times to visit Japan",
  act: ["Picnic under cherry blossoms at Osaka Castle Park during hanami season", "Eat your way through Dotonbori's neon-lit street food strip", "Visit Osaka Castle and its museum for a panoramic city view", "Take a day trip to Nara to feed the friendly bowing deer"],
  tips: ["Cherry blossom timing varies by year — check bloom forecasts before booking", "Get an IC transport card for seamless subway and train travel", "Osaka is Japan's food capital — budget generously for eating"]
});

gen({ slug: "paris-weather-autumn", city: "Paris", country: "France", period: "in Autumn", hi: 14, lo: 7, rain: 55, rainD: 10, hum: 80, sun: 4,
  hook: "autumn drapes Paris in golden leaves and soft light, making it arguably the most romantic season in the City of Light",
  act: ["Visit the Louvre and Musée d'Orsay without summer crowds", "Walk along the Seine as chestnut trees turn gold", "Sip coffee at a pavement cafe in Saint-Germain-des-Prés", "Climb Montmartre for a misty view of the city's zinc rooftops"],
  tips: ["Carry a compact umbrella — drizzle is common but rarely heavy", "This is fashion week and wine harvest season; restaurants can be busier than expected", "The Paris Museum Pass is worthwhile if you plan to visit three or more museums"]
});

gen({ slug: "prague-weather-december", city: "Prague", country: "Czech Republic", period: "in December", hi: 2, lo: -3, rain: 25, rainD: 12, hum: 85, sun: 2,
  hook: "December transforms Prague's medieval squares into a fairy-tale Christmas scene with markets, mulled wine, and occasional snow",
  act: ["Browse the Old Town Square Christmas Market for crafts and trdelník pastry", "Explore Prague Castle and St Vitus Cathedral dusted in frost", "Warm up in a traditional Czech pub with svíčková and a Pilsner", "Walk the Charles Bridge at dawn before the crowds arrive"],
  tips: ["Dress warmly — cobblestones get icy, so wear shoes with good grip", "Christmas markets run late November through early January", "The city is walkable but trams are cheap, heated, and scenic"]
});

gen({ slug: "rio-weather-summer", city: "Rio de Janeiro", country: "Brazil", period: "in Summer", hi: 32, lo: 24, rain: 170, rainD: 12, hum: 78, sun: 7,
  hook: "summer means Carnival energy, packed beaches, and tropical heat — this is Rio at its most vibrant and exuberant",
  act: ["Lay out on Copacabana or Ipanema Beach at golden hour", "Take the cog train up to Cristo Redentor for panoramic views", "Ride the cable car to the top of Sugarloaf Mountain at sunset", "Experience samba at a local bar in Lapa on a Friday night"],
  tips: ["Afternoon thunderstorms are almost daily — mornings are the best time for outdoor plans", "Keep valuables at your hotel when at the beach", "Carnival dates shift yearly — book 6 months ahead if visiting during the festival"]
});

gen({ slug: "rome-weather-summer", city: "Rome", country: "Italy", period: "in Summer", hi: 32, lo: 19, rain: 15, rainD: 2, hum: 50, sun: 11,
  hook: "summer brings blazing heat, but also the longest days, outdoor dining, and a chance to explore ancient ruins in dramatic golden light",
  act: ["Visit the Colosseum and Forum at opening time to beat the heat and crowds", "Tour the Vatican Museums and Sistine Chapel on a Wednesday morning", "Cool off with artisan gelato from a gelateria in Trastevere", "Stroll through Villa Borghese gardens in the shade of umbrella pines"],
  tips: ["Hydration is key — carry a water bottle and refill at Rome's many nasoni fountains", "Many Romans leave in August so some local restaurants close; tourist areas stay open", "Free entry to state museums on the first Sunday of each month"]
});

gen({ slug: "san-francisco-weather-fog", city: "San Francisco", country: "USA", period: "in Fog Season", hi: 22, lo: 13, rain: 2, rainD: 0, hum: 75, sun: 9,
  hook: "summer fog is San Francisco's signature weather — Karl the Fog rolls through the Golden Gate most mornings before burning off by midday",
  act: ["Watch the fog pour over the Golden Gate Bridge from Battery Spencer", "Explore Fisherman's Wharf and sample clam chowder in a sourdough bowl", "Ride a cable car from Union Square to Ghirardelli Square", "Ferry to Alcatraz Island — book weeks in advance"],
  tips: ["Always bring layers; it can be 10 degrees colder near the ocean than inland", "Mark Twain never actually said 'the coldest winter I ever spent was a summer in San Francisco' but the sentiment is real", "Fog typically clears by noon — plan outdoor sightseeing for afternoon"]
});

gen({ slug: "santiago-weather-year-round", city: "Santiago", country: "Chile", period: "Year Round", hi: 22, lo: 8, rain: 30, rainD: 4, hum: 55, sun: 8,
  hook: "the dry Mediterranean climate and dramatic Andes backdrop make Santiago a year-round destination with distinct seasons",
  act: ["Hike or take the funicular up Cerro San Cristóbal for Andes views", "Explore the Mercado Central for fresh seafood and Chilean empanadas", "Tour the Maipo Valley wine region just outside the city", "Day-trip to Cajón del Maipo for hot springs and canyon scenery"],
  tips: ["Smog can be heavy in winter (June-August) due to temperature inversions", "Summer (December-February) is best for outdoor activities and wine tours", "The metro is fast and clean — the best way to cross the city"]
});

gen({ slug: "seoul-weather-spring", city: "Seoul", country: "South Korea", period: "in Spring", hi: 17, lo: 6, rain: 65, rainD: 8, hum: 55, sun: 7,
  hook: "spring brings cherry blossoms along the Yeouido waterfront and a welcome end to the bitter winter cold",
  act: ["Walk under cherry blossoms at Yeouido's Yunjung-ro and along the Seokchon Lake", "Explore the five grand palaces — Gyeongbokgung is the most spectacular", "Shop and snack in the Myeongdong district", "Take a DMZ tour for a sobering look at the Korean border"],
  tips: ["Yellow dust from China can affect air quality — check AQI and carry a KF94 mask", "Cherry blossom peak is usually early to mid-April but varies by year", "A T-money transport card works on subways, buses, and even convenience stores"]
});

gen({ slug: "shanghai-weather-summer", city: "Shanghai", country: "China", period: "in Summer", hi: 32, lo: 25, rain: 160, rainD: 12, hum: 80, sun: 7,
  hook: "summer in Shanghai is hot and steamy with the plum rain season in June giving way to intense heat in July and August",
  act: ["Walk the Bund at night when the Pudong skyline lights up across the river", "Explore the traditional Yu Garden and its surrounding bazaar", "Stroll the tree-lined streets of the French Concession", "Take in the Pudong skyline from the Shanghai Tower observation deck"],
  tips: ["The plum rain season (meiyu) in June brings persistent drizzle — waterproofs are essential", "Air conditioning is fierce indoors; carry a light layer for malls and restaurants", "The Shanghai Metro is extensive and easy to navigate with English signage"]
});

gen({ slug: "stockholm-weather-summer", city: "Stockholm", country: "Sweden", period: "in Summer", hi: 22, lo: 13, rain: 65, rainD: 9, hum: 60, sun: 10,
  hook: "summer is Stockholm's golden season — nearly 19 hours of daylight, warm enough for swimming, and the entire city comes alive outdoors",
  act: ["Explore the medieval alleyways of Gamla Stan (Old Town)", "Take a boat through the Stockholm archipelago's 30,000 islands", "Visit the ABBA Museum and the Vasa Museum on Djurgården", "Swim in the clean waters of Lake Mälaren or the Baltic shoreline"],
  tips: ["Book accommodation early — Midsummer (late June) is the biggest holiday", "A Stockholm Pass covers free boat tours and many museum admissions", "Pack for variable weather; a warm pullover is needed even in July evenings"]
});

gen({ slug: "sydney-weather-december", city: "Sydney", country: "Australia", period: "in December", hi: 26, lo: 18, rain: 80, rainD: 10, hum: 65, sun: 8,
  hook: "December is early summer, beach season begins, and Sydney builds toward its spectacular New Year's Eve harbour fireworks",
  act: ["Walk from Bondi to Coogee along the stunning coastal path", "See the Sydney Opera House and harbour on a ferry ride", "Take a day trip to the Blue Mountains for bush walks and lookouts", "Celebrate New Year's Eve with fireworks over the Harbour Bridge"],
  tips: ["Apply sunscreen frequently — the UV index in Australia is extreme", "The Opal card works on all public transport including ferries", "NYE viewing spots fill up very early; arrive by midday for a good harbour position"]
});

gen({ slug: "taipei-weather-year-round", city: "Taipei", country: "Taiwan", period: "Year Round", hi: 28, lo: 20, rain: 170, rainD: 13, hum: 78, sun: 5,
  hook: "rain is common year-round, but Taipei rewards visitors with incredible night markets, hot springs, and lush mountain scenery just minutes from the city",
  act: ["Ride the elevator to Taipei 101's observation deck for city views", "Eat your way through Shilin Night Market or Raohe Street Night Market", "Soak in natural hot springs at Beitou just 30 minutes from downtown", "Day-trip to the gold-mining town of Jiufen for tea houses and ocean views"],
  tips: ["Always carry a compact umbrella — rain arrives without warning", "An EasyCard covers MRT, buses, and convenience store purchases", "Typhoon season runs June-October; check forecasts and have a backup plan"]
});

gen({ slug: "toronto-weather-winter", city: "Toronto", country: "Canada", period: "in Winter", hi: -1, lo: -8, rain: 55, rainD: 15, hum: 75, sun: 3,
  hook: "winter is genuinely cold with frequent snowfall, but the underground PATH network, world-class museums, and hockey culture keep the city buzzing",
  act: ["Skate on the rink at Nathan Phillips Square under city lights", "See the city from the CN Tower's glass floor and revolving restaurant", "Explore the St. Lawrence Market for peameal bacon sandwiches and local produce", "Catch a Maple Leafs or Raptors game at Scotiabank Arena"],
  tips: ["The underground PATH connects 30km of shops and offices — use it to escape the cold", "Wind chill can make it feel 10-15 degrees colder; cover all exposed skin", "TTC day passes are good value if you plan to hop between indoor attractions"]
});

gen({ slug: "vancouver-weather-fall", city: "Vancouver", country: "Canada", period: "in Fall", hi: 10, lo: 4, rain: 180, rainD: 18, hum: 85, sun: 3,
  hook: "fall means rain returns to the Pacific Northwest, but the city's mountains, forests, and cozy coffee culture shine through the grey skies",
  act: ["Walk or bike the Stanley Park seawall with autumn colours as backdrop", "Browse the artisan stalls at Granville Island Public Market", "Cross the Capilano Suspension Bridge through misty old-growth forest", "Watch Pacific storms crash against the rocks at English Bay"],
  tips: ["Invest in a high-quality waterproof jacket — umbrellas are no match for sideways rain", "Rain or shine, outdoor Vancouver is stunning — embrace it", "Coffee culture is serious here; explore independent roasters in Gastown and Main Street"]
});

gen({ slug: "vienna-weather-december", city: "Vienna", country: "Austria", period: "in December", hi: 3, lo: -2, rain: 40, rainD: 13, hum: 80, sun: 2,
  hook: "December is quintessential Vienna — imperial Christmas markets, Sachertorte with coffee, and possibly a dusting of snow over baroque architecture",
  act: ["Visit the grand Christkindlmarkt in front of the Rathaus (City Hall)", "Tour Schönbrunn Palace and its festive Christmas market", "Warm up in a traditional Viennese coffee house with Sachertorte and a mélange", "Attend a concert or opera at the Musikverein or Vienna State Opera"],
  tips: ["Evenings get very cold; a good coat and warm accessories are essential", "Vienna's Christmas markets open mid-November and run through late December", "The Vienna City Card includes public transport and museum discounts"]
});

gen({ slug: "zurich-weather-winter", city: "Zurich", country: "Switzerland", period: "in Winter", hi: 3, lo: -2, rain: 65, rainD: 11, hum: 80, sun: 2,
  hook: "winter in Zurich means Christmas lights along Bahnhofstrasse, fondue by the lake, and world-class ski resorts just an hour away by train",
  act: ["Browse Europe's largest indoor Christmas market at Zurich HB station", "Enjoy cheese fondue at a traditional restaurant in the Altstadt", "Walk the snow-dusted shores of Lake Zurich", "Take a day trip to Engelberg or Flumserberg for skiing or snowboarding"],
  tips: ["Swiss trains are punctual and scenic — use them for ski day trips", "Winter clothing is expensive in Zurich; bring your own gear", "Hot chocolate at Sprüngli on Paradeplatz is a local institution"]
});

gen({ slug: "amsterdam-weather-spring", city: "Amsterdam", country: "Netherlands", period: "in Spring", hi: 14, lo: 6, rain: 40, rainD: 9, hum: 75, sun: 6,
  hook: "spring is tulip season — the iconic Keukenhof gardens explode with colour, canals sparkle, and the city shakes off winter on two wheels",
  act: ["Visit Keukenhof Gardens during the April tulip bloom (mid-March to mid-May)", "Cruise the UNESCO-listed canal ring on a glass-topped boat", "Explore the Rijksmuseum and Van Gogh Museum on a rainy day", "Rent a bike and ride through Vondelpark like a local"],
  tips: ["Wind off the canals can make it feel colder — always carry a windproof layer", "Book Keukenhof tickets online in advance; it sells out on weekends", "Cycling is king — rent a bike from a local shop, not a tourist stand, for better rates"]
});

gen({ slug: "athens-weather-summer", city: "Athens", country: "Greece", period: "in Summer", hi: 34, lo: 23, rain: 6, rainD: 1, hum: 40, sun: 12,
  hook: "summer brings scorching heat and blazing sunshine, but also long evenings, island-hopping, and the Acropolis bathed in golden light",
  act: ["Visit the Acropolis at opening time (8am) before temperatures soar", "Take a ferry to Hydra, Aegina, or Poros for a day trip from Piraeus", "Dine at a rooftop taverna in Plaka with Parthenon views at sunset", "Explore the National Archaeological Museum in air-conditioned comfort"],
  tips: ["The Acropolis has no shade — go early or late, never midday", "Tap water in Athens is safe and free; refill your bottle at restaurants", "Island ferries book up fast in July and August — reserve online"]
});

gen({ slug: "bali-weather-dry-season", city: "Bali", country: "Indonesia", period: "in Dry Season", hi: 31, lo: 23, rain: 55, rainD: 5, hum: 70, sun: 8,
  hook: "the dry season from April to October is Bali's peak time — expect sunny days, calm seas for snorkelling, and spectacular sunsets",
  act: ["Watch sunrise from the rim of Mount Batur volcano", "Walk through the emerald Tegallalang rice terraces near Ubud", "Surf the breaks at Uluwatu or Canggu", "Visit Tanah Lot sea temple at sunset"],
  tips: ["Dry season is peak tourist season — book accommodation and activities ahead", "Rent a scooter for flexibility, but get an international driving permit first", "Respect temple dress codes: sarong and sash are required at most Balinese temples"]
});

gen({ slug: "boston-weather-fall", city: "Boston", country: "USA", period: "in Fall", hi: 14, lo: 6, rain: 90, rainD: 9, hum: 65, sun: 6,
  hook: "fall in New England is legendary — Boston's tree-lined streets blaze with red, orange, and gold foliage from late September through November",
  act: ["Walk the Freedom Trail's 2.5-mile route through revolutionary history", "Visit Harvard Yard in Cambridge amid autumn colours", "Take a day trip to the Berkshires or Cape Cod for peak foliage", "Try a steaming bowl of clam chowder at a Quincy Market stall"],
  tips: ["Peak foliage usually hits mid-October — check local leaf-peeping reports", "Evenings cool quickly; a warm jacket is essential after sunset", "The T subway system connects major attractions and neighbourhoods easily"]
});

gen({ slug: "budapest-weather-spring", city: "Budapest", country: "Hungary", period: "in Spring", hi: 17, lo: 7, rain: 55, rainD: 9, hum: 60, sun: 7,
  hook: "spring warms the banks of the Danube, fills the ruin bars with optimism, and makes Budapest's thermal baths even more inviting",
  act: ["Soak in the Széchenyi or Gellért thermal baths on a cool morning", "Walk up to Buda Castle for sweeping views of the Parliament building", "Explore the unique ruin bars of the Jewish Quarter by night", "Take an evening Danube river cruise with Parliament lit up in gold"],
  tips: ["Bring a swimsuit for the thermal baths — they are a must-do in any weather", "Spring can be changeable; a waterproof layer keeps you flexible", "The Budapest Card includes unlimited public transport and free museum entry"]
});

gen({ slug: "copenhagen-weather-summer", city: "Copenhagen", country: "Denmark", period: "in Summer", hi: 21, lo: 13, rain: 60, rainD: 9, hum: 65, sun: 9,
  hook: "summer brings the best of Danish hygge outdoors — long daylight hours, canal-side dining, and a city perfectly designed for cycling",
  act: ["Visit the colourful Nyhavn waterfront for photos and canal-boat tours", "Spend an evening at Tivoli Gardens amusement park", "Cycle through Christiania, the self-governing neighbourhood", "Tour the Danish Design Museum and Royal Copenhagen porcelain"],
  tips: ["A Copenhagen Card covers transport, 80+ attractions, and canal tours", "Rent a bike — the city has dedicated cycle lanes everywhere", "Even in summer, bring a jacket for cool evenings near the harbour"]
});

gen({ slug: "dublin-weather-year-round", city: "Dublin", country: "Ireland", period: "Year Round", hi: 13, lo: 6, rain: 70, rainD: 14, hum: 80, sun: 4,
  hook: "Dublin's mild maritime climate means it rarely gets very hot or very cold, but rain can appear at any moment — the locals simply call it 'soft'",
  act: ["See the Book of Kells at Trinity College and walk through the campus", "Pub-crawl through Temple Bar's cobbled streets for live music", "Tour the Guinness Storehouse and pour your own pint at the top", "Take a DART train along the coast to Howth for cliff walks and seafood"],
  tips: ["A rain jacket beats an umbrella in Dublin's gusty winds", "Irish summers are mild but long — sunset can be after 10 pm in June", "Check if any GAA matches are on; Gaelic football and hurling are unforgettable live"]
});

gen({ slug: "edinburgh-weather-august", city: "Edinburgh", country: "UK", period: "in August", hi: 19, lo: 11, rain: 65, rainD: 12, hum: 75, sun: 5,
  hook: "August is Festival season — the Edinburgh Fringe, the world's largest arts festival, fills every corner of the city with performances, comedy, and street acts",
  act: ["See shows at the Edinburgh Fringe — from comedy to drama, much of it free", "Climb Arthur's Seat for panoramic views of the city and the Firth of Forth", "Explore Edinburgh Castle perched dramatically on Castle Rock", "Walk the Royal Mile from the Castle down to Holyrood Palace"],
  tips: ["Book Fringe accommodation months in advance; the city fills up completely", "Weather changes fast — carry layers and a waterproof even if the morning looks clear", "Many Fringe shows are free or pay-what-you-want; check the programme daily"]
});

gen({ slug: "johannesburg-weather-year-round", city: "Johannesburg", country: "South Africa", period: "Year Round", hi: 25, lo: 12, rain: 75, rainD: 9, hum: 55, sun: 9,
  hook: "perched at 1,750m altitude, Johannesburg enjoys warm days, cool nights, and spectacular afternoon thunderstorms in summer",
  act: ["Visit the Apartheid Museum for a powerful journey through South Africa's history", "Explore Soweto with a local guide — see Vilakazi Street and the Hector Pieterson Memorial", "Browse the galleries and restaurants of the Maboneng Precinct", "Day-trip to the Cradle of Humankind or a nearby private game reserve"],
  tips: ["Summer storms (October-March) are dramatic but short — wait them out with a coffee", "Winter (June-August) is dry and sunny but nights drop below 5°C — bring warm clothes", "Use ride-hailing apps rather than hailing taxis on the street"]
});

gen({ slug: "kyoto-weather-autumn", city: "Kyoto", country: "Japan", period: "in Autumn", hi: 20, lo: 10, rain: 110, rainD: 9, hum: 65, sun: 5,
  hook: "autumn transforms Kyoto's 2,000 temples and gardens into a canvas of crimson, gold, and amber — one of the world's most beautiful seasonal displays",
  act: ["Visit Tofukuji Temple for the most famous autumn foliage viewing in Kyoto", "Walk through the Arashiyama Bamboo Grove and nearby temples", "Experience a traditional tea ceremony in the Gion geisha district", "Explore Fushimi Inari's thousands of vermillion torii gates at dawn"],
  tips: ["Peak koyo (autumn colour) is usually mid-to-late November", "Temples get crowded on weekends — visit early on weekday mornings", "A Kyoto bus day pass saves money and gets you to most major temples"]
});

gen({ slug: "los-angeles-weather-year-round", city: "Los Angeles", country: "USA", period: "Year Round", hi: 25, lo: 14, rain: 35, rainD: 3, hum: 60, sun: 10,
  hook: "LA's Mediterranean climate delivers sunshine roughly 280 days a year, making it one of the most consistently sunny major cities in the world",
  act: ["Hike to the Griffith Observatory for Hollywood sign and city views", "Catch the sunset at Santa Monica Pier or Venice Beach boardwalk", "Drive Pacific Coast Highway through Malibu to Zuma Beach", "Explore the Getty Center for art, architecture, and hilltop panoramas"],
  tips: ["Traffic is legendary — use the Metro for downtown, Hollywood, and Santa Monica", "June Gloom brings morning marine fog that burns off by noon; do not be discouraged", "Neighbourhoods vary wildly in temperature — the Valley is often 5-8 degrees hotter than the coast"]
});

gen({ slug: "marrakech-weather-spring", city: "Marrakech", country: "Morocco", period: "in Spring", hi: 26, lo: 12, rain: 25, rainD: 4, hum: 40, sun: 9,
  hook: "spring is the ideal time to visit — warm without the extreme summer heat, wildflowers in the Atlas foothills, and the souks at their most pleasant",
  act: ["Lose yourself in the labyrinth of souks around Jemaa el-Fnaa square", "Visit the stunning Majorelle Garden created by Yves Saint Laurent", "Day-trip to the Atlas Mountains for Berber villages and valley hikes", "Watch the sunset storytellers and musicians fill Jemaa el-Fnaa"],
  tips: ["Bargaining is expected in the souks — start at about a third of the asking price", "Dress modestly out of respect; shoulders and knees covered is appreciated", "Riads (traditional guesthouses) offer a far more authentic stay than hotels"]
});

gen({ slug: "munich-weather-october", city: "Munich", country: "Germany", period: "in October", hi: 13, lo: 4, rain: 55, rainD: 10, hum: 75, sun: 4,
  hook: "October is Oktoberfest — the world's largest beer festival fills the city with lederhosen, brass bands, and enormous pretzels",
  act: ["Experience Oktoberfest at the Theresienwiese fairgrounds", "Walk through the English Garden, one of the world's largest urban parks", "Visit Marienplatz to see the Glockenspiel chime at 11 am", "Tour the BMW Museum for Bavarian engineering history"],
  tips: ["Reserve a beer tent table months ahead; showing up without one means long queues", "Oktoberfest actually starts in September — the last weekend falls in early October", "Dress warmly for evening; temperatures drop fast after sunset in the beer gardens"]
});

gen({ slug: "reykjavik-weather-summer", city: "Reykjavik", country: "Iceland", period: "in Summer", hi: 13, lo: 8, rain: 50, rainD: 10, hum: 75, sun: 6,
  hook: "summer brings the midnight sun — 24 hours of daylight in June, making it possible to explore glaciers, geysers, and waterfalls around the clock",
  act: ["Drive the Golden Circle: Thingvellir, Geysir, and Gullfoss waterfall", "Soak in the milky blue waters of the Blue Lagoon or Sky Lagoon", "Go whale watching from Reykjavik's old harbour", "Hike among wildflowers on the Reykjadalur hot spring trail"],
  tips: ["Pack waterproof layers and a windbreaker — weather changes every 15 minutes", "Midnight sun means you will not need a torch but blackout curtains help for sleep", "Rent a 4WD if you plan to explore the highlands beyond the ring road"]
});

gen({ slug: "san-diego-weather-year-round", city: "San Diego", country: "USA", period: "Year Round", hi: 22, lo: 14, rain: 25, rainD: 3, hum: 65, sun: 10,
  hook: "San Diego boasts some of the most consistently pleasant weather in the US — warm, sunny, and mild virtually every day of the year",
  act: ["Spend a day at Balboa Park exploring museums and gardens", "Relax at La Jolla Cove and watch the sea lions bask on the rocks", "Visit the world-famous San Diego Zoo", "Stroll the Gaslamp Quarter for craft breweries and rooftop dining"],
  tips: ["May Gray and June Gloom bring morning fog that clears by midday", "The San Diego Trolley connects the airport, downtown, and the border", "Craft beer is huge here — visit a few of the 150+ local breweries"]
});

gen({ slug: "seattle-weather-year-round", city: "Seattle", country: "USA", period: "Year Round", hi: 16, lo: 8, rain: 95, rainD: 12, hum: 75, sun: 5,
  hook: "Seattle's reputation for rain is slightly exaggerated — it drizzles often but total rainfall is less than New York or Miami; summers are gloriously dry",
  act: ["Explore Pike Place Market and watch the fishmongers toss salmon", "Head to the Space Needle and Chihuly Garden for glass-art wonder", "Take a ferry to Bainbridge Island for a scenic day trip", "Tour the coffee roasters that made Seattle the espresso capital of America"],
  tips: ["Locals rarely use umbrellas — a good waterproof shell is the way to go", "July and August are almost always sunny and dry; the best time to visit", "Puget Sound keeps temperatures moderate; it rarely gets very hot or very cold"]
});

gen({ slug: "perth-weather-summer", city: "Perth", country: "Australia", period: "in Summer", hi: 31, lo: 18, rain: 10, rainD: 2, hum: 45, sun: 11,
  hook: "summer in Perth is hot, dry, and gloriously sunny — perfect for beach days, wine regions, and the stunning Indian Ocean coastline",
  act: ["Relax at Cottesloe Beach and watch the sunset over the Indian Ocean", "Ferry to Rottnest Island for snorkelling and quokka selfies", "Walk through Kings Park Botanic Garden for wildflowers and city views", "Drive to the Swan Valley for wine tastings and artisan food"],
  tips: ["Apply sunscreen every two hours — the UV index is extreme in Australian summer", "The Fremantle Doctor sea breeze arrives most afternoons and drops temperatures quickly", "Perth is remote — plan driving distances carefully if heading out of the city"]
});

gen({ slug: "denver-weather-spring", city: "Denver", country: "USA", period: "in Spring", hi: 16, lo: 2, rain: 45, rainD: 9, hum: 40, sun: 8,
  hook: "spring in the Mile High City is unpredictable — sunshine one hour, snow the next — but the proximity to the Rockies and craft-beer culture more than compensate",
  act: ["Drive into Rocky Mountain National Park for elk sightings and alpine scenery", "Catch a concert or sunrise yoga at the Red Rocks Amphitheatre", "Explore the craft brewery scene on a Denver Beer Trail tour", "Walk the 16th Street Mall and visit Union Station's restaurants"],
  tips: ["Spring snowstorms can hit as late as May — always check the forecast before mountain drives", "Altitude (1,600m) can cause headaches; drink extra water your first two days", "Sunshine is intense at altitude — wear sunscreen even on cool days"]
});

gen({ slug: "havana-weather-winter", city: "Havana", country: "Cuba", period: "in Winter", hi: 27, lo: 18, rain: 45, rainD: 5, hum: 70, sun: 8,
  hook: "winter is Havana's dry season — warm, breezy, and ideal for wandering the pastel-coloured streets of Old Havana",
  act: ["Stroll the Malecón seawall at sunset with the locals", "Explore the crumbling beauty of Old Havana, a UNESCO World Heritage site", "Ride in a classic 1950s American convertible along the seafront", "Day-trip to Viñales Valley for tobacco farms and limestone mogotes"],
  tips: ["Cash is king — bring euros or Canadian dollars to exchange; US cards often do not work", "WiFi is limited; buy ETECSA cards at parks and hotel lobbies", "Jineteros (street touts) are persistent but polite; a firm 'no gracias' works"]
});

console.log(`Generated ${idx} city guide blog posts.`);
