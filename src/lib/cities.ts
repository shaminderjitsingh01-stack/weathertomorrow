// Curated cities for sitemap, popular cities, and direct slug matching.
// Any city not in this list is geocoded dynamically via Open-Meteo.

export interface CityData {
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  region?: string; // For grouping in UI
}

// ~250 most-searched cities globally
export const CITIES: Record<string, CityData> = {
  // North America — United States
  "new-york": { name: "New York", country: "United States", countryCode: "US", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York", region: "north-america" },
  "los-angeles": { name: "Los Angeles", country: "United States", countryCode: "US", latitude: 34.0522, longitude: -118.2437, timezone: "America/Los_Angeles", region: "north-america" },
  "chicago": { name: "Chicago", country: "United States", countryCode: "US", latitude: 41.8781, longitude: -87.6298, timezone: "America/Chicago", region: "north-america" },
  "houston": { name: "Houston", country: "United States", countryCode: "US", latitude: 29.7604, longitude: -95.3698, timezone: "America/Chicago", region: "north-america" },
  "phoenix": { name: "Phoenix", country: "United States", countryCode: "US", latitude: 33.4484, longitude: -112.074, timezone: "America/Phoenix", region: "north-america" },
  "philadelphia": { name: "Philadelphia", country: "United States", countryCode: "US", latitude: 39.9526, longitude: -75.1652, timezone: "America/New_York", region: "north-america" },
  "san-antonio": { name: "San Antonio", country: "United States", countryCode: "US", latitude: 29.4241, longitude: -98.4936, timezone: "America/Chicago", region: "north-america" },
  "san-diego": { name: "San Diego", country: "United States", countryCode: "US", latitude: 32.7157, longitude: -117.1611, timezone: "America/Los_Angeles", region: "north-america" },
  "dallas": { name: "Dallas", country: "United States", countryCode: "US", latitude: 32.7767, longitude: -96.797, timezone: "America/Chicago", region: "north-america" },
  "san-jose": { name: "San Jose", country: "United States", countryCode: "US", latitude: 37.3382, longitude: -121.8863, timezone: "America/Los_Angeles", region: "north-america" },
  "austin": { name: "Austin", country: "United States", countryCode: "US", latitude: 30.2672, longitude: -97.7431, timezone: "America/Chicago", region: "north-america" },
  "jacksonville": { name: "Jacksonville", country: "United States", countryCode: "US", latitude: 30.3322, longitude: -81.6557, timezone: "America/New_York", region: "north-america" },
  "san-francisco": { name: "San Francisco", country: "United States", countryCode: "US", latitude: 37.7749, longitude: -122.4194, timezone: "America/Los_Angeles", region: "north-america" },
  "seattle": { name: "Seattle", country: "United States", countryCode: "US", latitude: 47.6062, longitude: -122.3321, timezone: "America/Los_Angeles", region: "north-america" },
  "denver": { name: "Denver", country: "United States", countryCode: "US", latitude: 39.7392, longitude: -104.9903, timezone: "America/Denver", region: "north-america" },
  "washington-dc": { name: "Washington D.C.", country: "United States", countryCode: "US", latitude: 38.9072, longitude: -77.0369, timezone: "America/New_York", region: "north-america" },
  "nashville": { name: "Nashville", country: "United States", countryCode: "US", latitude: 36.1627, longitude: -86.7816, timezone: "America/Chicago", region: "north-america" },
  "miami": { name: "Miami", country: "United States", countryCode: "US", latitude: 25.7617, longitude: -80.1918, timezone: "America/New_York", region: "north-america" },
  "atlanta": { name: "Atlanta", country: "United States", countryCode: "US", latitude: 33.749, longitude: -84.388, timezone: "America/New_York", region: "north-america" },
  "boston": { name: "Boston", country: "United States", countryCode: "US", latitude: 42.3601, longitude: -71.0589, timezone: "America/New_York", region: "north-america" },
  "las-vegas": { name: "Las Vegas", country: "United States", countryCode: "US", latitude: 36.1699, longitude: -115.1398, timezone: "America/Los_Angeles", region: "north-america" },
  "portland": { name: "Portland", country: "United States", countryCode: "US", latitude: 45.5152, longitude: -122.6784, timezone: "America/Los_Angeles", region: "north-america" },
  "detroit": { name: "Detroit", country: "United States", countryCode: "US", latitude: 42.3314, longitude: -83.0458, timezone: "America/Detroit", region: "north-america" },
  "minneapolis": { name: "Minneapolis", country: "United States", countryCode: "US", latitude: 44.9778, longitude: -93.265, timezone: "America/Chicago", region: "north-america" },
  "orlando": { name: "Orlando", country: "United States", countryCode: "US", latitude: 28.5383, longitude: -81.3792, timezone: "America/New_York", region: "north-america" },
  "tampa": { name: "Tampa", country: "United States", countryCode: "US", latitude: 27.9506, longitude: -82.4572, timezone: "America/New_York", region: "north-america" },
  "charlotte": { name: "Charlotte", country: "United States", countryCode: "US", latitude: 35.2271, longitude: -80.8431, timezone: "America/New_York", region: "north-america" },
  "honolulu": { name: "Honolulu", country: "United States", countryCode: "US", latitude: 21.3069, longitude: -157.8583, timezone: "Pacific/Honolulu", region: "north-america" },
  "anchorage": { name: "Anchorage", country: "United States", countryCode: "US", latitude: 61.2181, longitude: -149.9003, timezone: "America/Anchorage", region: "north-america" },
  "salt-lake-city": { name: "Salt Lake City", country: "United States", countryCode: "US", latitude: 40.7608, longitude: -111.891, timezone: "America/Denver", region: "north-america" },
  "pittsburgh": { name: "Pittsburgh", country: "United States", countryCode: "US", latitude: 40.4406, longitude: -79.9959, timezone: "America/New_York", region: "north-america" },
  "st-louis": { name: "St. Louis", country: "United States", countryCode: "US", latitude: 38.627, longitude: -90.1994, timezone: "America/Chicago", region: "north-america" },
  "kansas-city": { name: "Kansas City", country: "United States", countryCode: "US", latitude: 39.0997, longitude: -94.5786, timezone: "America/Chicago", region: "north-america" },
  "raleigh": { name: "Raleigh", country: "United States", countryCode: "US", latitude: 35.7796, longitude: -78.6382, timezone: "America/New_York", region: "north-america" },
  "indianapolis": { name: "Indianapolis", country: "United States", countryCode: "US", latitude: 39.7684, longitude: -86.1581, timezone: "America/Indiana/Indianapolis", region: "north-america" },
  "new-orleans": { name: "New Orleans", country: "United States", countryCode: "US", latitude: 29.9511, longitude: -90.0715, timezone: "America/Chicago", region: "north-america" },
  // North America — Canada
  "toronto": { name: "Toronto", country: "Canada", countryCode: "CA", latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto", region: "north-america" },
  "vancouver": { name: "Vancouver", country: "Canada", countryCode: "CA", latitude: 49.2827, longitude: -123.1207, timezone: "America/Vancouver", region: "north-america" },
  "montreal": { name: "Montreal", country: "Canada", countryCode: "CA", latitude: 45.5017, longitude: -73.5673, timezone: "America/Toronto", region: "north-america" },
  "calgary": { name: "Calgary", country: "Canada", countryCode: "CA", latitude: 51.0447, longitude: -114.0719, timezone: "America/Edmonton", region: "north-america" },
  "ottawa": { name: "Ottawa", country: "Canada", countryCode: "CA", latitude: 45.4215, longitude: -75.6972, timezone: "America/Toronto", region: "north-america" },
  "edmonton": { name: "Edmonton", country: "Canada", countryCode: "CA", latitude: 53.5461, longitude: -113.4938, timezone: "America/Edmonton", region: "north-america" },
  "winnipeg": { name: "Winnipeg", country: "Canada", countryCode: "CA", latitude: 49.8951, longitude: -97.1384, timezone: "America/Winnipeg", region: "north-america" },
  // Europe
  "london": { name: "London", country: "United Kingdom", countryCode: "GB", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", region: "europe" },
  "paris": { name: "Paris", country: "France", countryCode: "FR", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris", region: "europe" },
  "berlin": { name: "Berlin", country: "Germany", countryCode: "DE", latitude: 52.52, longitude: 13.405, timezone: "Europe/Berlin", region: "europe" },
  "madrid": { name: "Madrid", country: "Spain", countryCode: "ES", latitude: 40.4168, longitude: -3.7038, timezone: "Europe/Madrid", region: "europe" },
  "rome": { name: "Rome", country: "Italy", countryCode: "IT", latitude: 41.9028, longitude: 12.4964, timezone: "Europe/Rome", region: "europe" },
  "amsterdam": { name: "Amsterdam", country: "Netherlands", countryCode: "NL", latitude: 52.3676, longitude: 4.9041, timezone: "Europe/Amsterdam", region: "europe" },
  "barcelona": { name: "Barcelona", country: "Spain", countryCode: "ES", latitude: 41.3874, longitude: 2.1686, timezone: "Europe/Madrid", region: "europe" },
  "lisbon": { name: "Lisbon", country: "Portugal", countryCode: "PT", latitude: 38.7223, longitude: -9.1393, timezone: "Europe/Lisbon", region: "europe" },
  "vienna": { name: "Vienna", country: "Austria", countryCode: "AT", latitude: 48.2082, longitude: 16.3738, timezone: "Europe/Vienna", region: "europe" },
  "zurich": { name: "Zurich", country: "Switzerland", countryCode: "CH", latitude: 47.3769, longitude: 8.5417, timezone: "Europe/Zurich", region: "europe" },
  "munich": { name: "Munich", country: "Germany", countryCode: "DE", latitude: 48.1351, longitude: 11.582, timezone: "Europe/Berlin", region: "europe" },
  "prague": { name: "Prague", country: "Czech Republic", countryCode: "CZ", latitude: 50.0755, longitude: 14.4378, timezone: "Europe/Prague", region: "europe" },
  "dublin": { name: "Dublin", country: "Ireland", countryCode: "IE", latitude: 53.3498, longitude: -6.2603, timezone: "Europe/Dublin", region: "europe" },
  "stockholm": { name: "Stockholm", country: "Sweden", countryCode: "SE", latitude: 59.3293, longitude: 18.0686, timezone: "Europe/Stockholm", region: "europe" },
  "oslo": { name: "Oslo", country: "Norway", countryCode: "NO", latitude: 59.9139, longitude: 10.7522, timezone: "Europe/Oslo", region: "europe" },
  "copenhagen": { name: "Copenhagen", country: "Denmark", countryCode: "DK", latitude: 55.6761, longitude: 12.5683, timezone: "Europe/Copenhagen", region: "europe" },
  "helsinki": { name: "Helsinki", country: "Finland", countryCode: "FI", latitude: 60.1699, longitude: 24.9384, timezone: "Europe/Helsinki", region: "europe" },
  "warsaw": { name: "Warsaw", country: "Poland", countryCode: "PL", latitude: 52.2297, longitude: 21.0122, timezone: "Europe/Warsaw", region: "europe" },
  "budapest": { name: "Budapest", country: "Hungary", countryCode: "HU", latitude: 47.4979, longitude: 19.0402, timezone: "Europe/Budapest", region: "europe" },
  "athens": { name: "Athens", country: "Greece", countryCode: "GR", latitude: 37.9838, longitude: 23.7275, timezone: "Europe/Athens", region: "europe" },
  "moscow": { name: "Moscow", country: "Russia", countryCode: "RU", latitude: 55.7558, longitude: 37.6173, timezone: "Europe/Moscow", region: "europe" },
  "istanbul": { name: "Istanbul", country: "Turkey", countryCode: "TR", latitude: 41.0082, longitude: 28.9784, timezone: "Europe/Istanbul", region: "europe" },
  "milan": { name: "Milan", country: "Italy", countryCode: "IT", latitude: 45.4642, longitude: 9.19, timezone: "Europe/Rome", region: "europe" },
  "brussels": { name: "Brussels", country: "Belgium", countryCode: "BE", latitude: 50.8503, longitude: 4.3517, timezone: "Europe/Brussels", region: "europe" },
  "edinburgh": { name: "Edinburgh", country: "United Kingdom", countryCode: "GB", latitude: 55.9533, longitude: -3.1883, timezone: "Europe/London", region: "europe" },
  "manchester": { name: "Manchester", country: "United Kingdom", countryCode: "GB", latitude: 53.4808, longitude: -2.2426, timezone: "Europe/London", region: "europe" },
  "birmingham": { name: "Birmingham", country: "United Kingdom", countryCode: "GB", latitude: 52.4862, longitude: -1.8904, timezone: "Europe/London", region: "europe" },
  "hamburg": { name: "Hamburg", country: "Germany", countryCode: "DE", latitude: 53.5511, longitude: 9.9937, timezone: "Europe/Berlin", region: "europe" },
  "frankfurt": { name: "Frankfurt", country: "Germany", countryCode: "DE", latitude: 50.1109, longitude: 8.6821, timezone: "Europe/Berlin", region: "europe" },
  "lyon": { name: "Lyon", country: "France", countryCode: "FR", latitude: 45.764, longitude: 4.8357, timezone: "Europe/Paris", region: "europe" },
  "marseille": { name: "Marseille", country: "France", countryCode: "FR", latitude: 43.2965, longitude: 5.3698, timezone: "Europe/Paris", region: "europe" },
  "bucharest": { name: "Bucharest", country: "Romania", countryCode: "RO", latitude: 44.4268, longitude: 26.1025, timezone: "Europe/Bucharest", region: "europe" },
  "kiev": { name: "Kyiv", country: "Ukraine", countryCode: "UA", latitude: 50.4501, longitude: 30.5234, timezone: "Europe/Kyiv", region: "europe" },
  "belgrade": { name: "Belgrade", country: "Serbia", countryCode: "RS", latitude: 44.7866, longitude: 20.4489, timezone: "Europe/Belgrade", region: "europe" },
  "zagreb": { name: "Zagreb", country: "Croatia", countryCode: "HR", latitude: 45.815, longitude: 15.9819, timezone: "Europe/Zagreb", region: "europe" },
  // Asia
  "tokyo": { name: "Tokyo", country: "Japan", countryCode: "JP", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo", region: "asia" },
  "singapore": { name: "Singapore", country: "Singapore", countryCode: "SG", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore", region: "asia" },
  "dubai": { name: "Dubai", country: "United Arab Emirates", countryCode: "AE", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai", region: "asia" },
  "bangkok": { name: "Bangkok", country: "Thailand", countryCode: "TH", latitude: 13.7563, longitude: 100.5018, timezone: "Asia/Bangkok", region: "asia" },
  "seoul": { name: "Seoul", country: "South Korea", countryCode: "KR", latitude: 37.5665, longitude: 126.978, timezone: "Asia/Seoul", region: "asia" },
  "hong-kong": { name: "Hong Kong", country: "Hong Kong", countryCode: "HK", latitude: 22.3193, longitude: 114.1694, timezone: "Asia/Hong_Kong", region: "asia" },
  "taipei": { name: "Taipei", country: "Taiwan", countryCode: "TW", latitude: 25.033, longitude: 121.5654, timezone: "Asia/Taipei", region: "asia" },
  "kuala-lumpur": { name: "Kuala Lumpur", country: "Malaysia", countryCode: "MY", latitude: 3.139, longitude: 101.6869, timezone: "Asia/Kuala_Lumpur", region: "asia" },
  "jakarta": { name: "Jakarta", country: "Indonesia", countryCode: "ID", latitude: -6.2088, longitude: 106.8456, timezone: "Asia/Jakarta", region: "asia" },
  "manila": { name: "Manila", country: "Philippines", countryCode: "PH", latitude: 14.5995, longitude: 120.9842, timezone: "Asia/Manila", region: "asia" },
  "beijing": { name: "Beijing", country: "China", countryCode: "CN", latitude: 39.9042, longitude: 116.4074, timezone: "Asia/Shanghai", region: "asia" },
  "shanghai": { name: "Shanghai", country: "China", countryCode: "CN", latitude: 31.2304, longitude: 121.4737, timezone: "Asia/Shanghai", region: "asia" },
  "mumbai": { name: "Mumbai", country: "India", countryCode: "IN", latitude: 19.076, longitude: 72.8777, timezone: "Asia/Kolkata", region: "asia" },
  "delhi": { name: "Delhi", country: "India", countryCode: "IN", latitude: 28.7041, longitude: 77.1025, timezone: "Asia/Kolkata", region: "asia" },
  "bangalore": { name: "Bangalore", country: "India", countryCode: "IN", latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata", region: "asia" },
  "chennai": { name: "Chennai", country: "India", countryCode: "IN", latitude: 13.0827, longitude: 80.2707, timezone: "Asia/Kolkata", region: "asia" },
  "kolkata": { name: "Kolkata", country: "India", countryCode: "IN", latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata", region: "asia" },
  "hyderabad": { name: "Hyderabad", country: "India", countryCode: "IN", latitude: 17.385, longitude: 78.4867, timezone: "Asia/Kolkata", region: "asia" },
  "pune": { name: "Pune", country: "India", countryCode: "IN", latitude: 18.5204, longitude: 73.8567, timezone: "Asia/Kolkata", region: "asia" },
  "ahmedabad": { name: "Ahmedabad", country: "India", countryCode: "IN", latitude: 23.0225, longitude: 72.5714, timezone: "Asia/Kolkata", region: "asia" },
  "jaipur": { name: "Jaipur", country: "India", countryCode: "IN", latitude: 26.9124, longitude: 75.7873, timezone: "Asia/Kolkata", region: "asia" },
  "chandigarh": { name: "Chandigarh", country: "India", countryCode: "IN", latitude: 30.7333, longitude: 76.7794, timezone: "Asia/Kolkata", region: "asia" },
  "hanoi": { name: "Hanoi", country: "Vietnam", countryCode: "VN", latitude: 21.0278, longitude: 105.8342, timezone: "Asia/Ho_Chi_Minh", region: "asia" },
  "ho-chi-minh-city": { name: "Ho Chi Minh City", country: "Vietnam", countryCode: "VN", latitude: 10.8231, longitude: 106.6297, timezone: "Asia/Ho_Chi_Minh", region: "asia" },
  "osaka": { name: "Osaka", country: "Japan", countryCode: "JP", latitude: 34.6937, longitude: 135.5023, timezone: "Asia/Tokyo", region: "asia" },
  "kyoto": { name: "Kyoto", country: "Japan", countryCode: "JP", latitude: 35.0116, longitude: 135.7681, timezone: "Asia/Tokyo", region: "asia" },
  "doha": { name: "Doha", country: "Qatar", countryCode: "QA", latitude: 25.2854, longitude: 51.531, timezone: "Asia/Qatar", region: "asia" },
  "riyadh": { name: "Riyadh", country: "Saudi Arabia", countryCode: "SA", latitude: 24.7136, longitude: 46.6753, timezone: "Asia/Riyadh", region: "asia" },
  "abu-dhabi": { name: "Abu Dhabi", country: "United Arab Emirates", countryCode: "AE", latitude: 24.4539, longitude: 54.3773, timezone: "Asia/Dubai", region: "asia" },
  "tel-aviv": { name: "Tel Aviv", country: "Israel", countryCode: "IL", latitude: 32.0853, longitude: 34.7818, timezone: "Asia/Jerusalem", region: "asia" },
  "colombo": { name: "Colombo", country: "Sri Lanka", countryCode: "LK", latitude: 6.9271, longitude: 79.8612, timezone: "Asia/Colombo", region: "asia" },
  "kathmandu": { name: "Kathmandu", country: "Nepal", countryCode: "NP", latitude: 27.7172, longitude: 85.324, timezone: "Asia/Kathmandu", region: "asia" },
  "dhaka": { name: "Dhaka", country: "Bangladesh", countryCode: "BD", latitude: 23.8103, longitude: 90.4125, timezone: "Asia/Dhaka", region: "asia" },
  "karachi": { name: "Karachi", country: "Pakistan", countryCode: "PK", latitude: 24.8607, longitude: 67.0011, timezone: "Asia/Karachi", region: "asia" },
  "lahore": { name: "Lahore", country: "Pakistan", countryCode: "PK", latitude: 31.5204, longitude: 74.3587, timezone: "Asia/Karachi", region: "asia" },
  "islamabad": { name: "Islamabad", country: "Pakistan", countryCode: "PK", latitude: 33.6844, longitude: 73.0479, timezone: "Asia/Karachi", region: "asia" },
  "phnom-penh": { name: "Phnom Penh", country: "Cambodia", countryCode: "KH", latitude: 11.5564, longitude: 104.9282, timezone: "Asia/Phnom_Penh", region: "asia" },
  "yangon": { name: "Yangon", country: "Myanmar", countryCode: "MM", latitude: 16.8661, longitude: 96.1951, timezone: "Asia/Yangon", region: "asia" },
  // Oceania
  "sydney": { name: "Sydney", country: "Australia", countryCode: "AU", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney", region: "oceania" },
  "melbourne": { name: "Melbourne", country: "Australia", countryCode: "AU", latitude: -37.8136, longitude: 144.9631, timezone: "Australia/Melbourne", region: "oceania" },
  "brisbane": { name: "Brisbane", country: "Australia", countryCode: "AU", latitude: -27.4698, longitude: 153.0251, timezone: "Australia/Brisbane", region: "oceania" },
  "perth": { name: "Perth", country: "Australia", countryCode: "AU", latitude: -31.9505, longitude: 115.8605, timezone: "Australia/Perth", region: "oceania" },
  "auckland": { name: "Auckland", country: "New Zealand", countryCode: "NZ", latitude: -36.8485, longitude: 174.7633, timezone: "Pacific/Auckland", region: "oceania" },
  "wellington": { name: "Wellington", country: "New Zealand", countryCode: "NZ", latitude: -41.2865, longitude: 174.7762, timezone: "Pacific/Auckland", region: "oceania" },
  // Latin America
  "mexico-city": { name: "Mexico City", country: "Mexico", countryCode: "MX", latitude: 19.4326, longitude: -99.1332, timezone: "America/Mexico_City", region: "latin-america" },
  "sao-paulo": { name: "São Paulo", country: "Brazil", countryCode: "BR", latitude: -23.5505, longitude: -46.6333, timezone: "America/Sao_Paulo", region: "latin-america" },
  "rio-de-janeiro": { name: "Rio de Janeiro", country: "Brazil", countryCode: "BR", latitude: -22.9068, longitude: -43.1729, timezone: "America/Sao_Paulo", region: "latin-america" },
  "buenos-aires": { name: "Buenos Aires", country: "Argentina", countryCode: "AR", latitude: -34.6037, longitude: -58.3816, timezone: "America/Argentina/Buenos_Aires", region: "latin-america" },
  "bogota": { name: "Bogotá", country: "Colombia", countryCode: "CO", latitude: 4.711, longitude: -74.0721, timezone: "America/Bogota", region: "latin-america" },
  "lima": { name: "Lima", country: "Peru", countryCode: "PE", latitude: -12.0464, longitude: -77.0428, timezone: "America/Lima", region: "latin-america" },
  "santiago": { name: "Santiago", country: "Chile", countryCode: "CL", latitude: -33.4489, longitude: -70.6693, timezone: "America/Santiago", region: "latin-america" },
  "cancun": { name: "Cancún", country: "Mexico", countryCode: "MX", latitude: 21.1619, longitude: -86.8515, timezone: "America/Cancun", region: "latin-america" },
  "havana": { name: "Havana", country: "Cuba", countryCode: "CU", latitude: 23.1136, longitude: -82.3666, timezone: "America/Havana", region: "latin-america" },
  "medellin": { name: "Medellín", country: "Colombia", countryCode: "CO", latitude: 6.2476, longitude: -75.5658, timezone: "America/Bogota", region: "latin-america" },
  "montevideo": { name: "Montevideo", country: "Uruguay", countryCode: "UY", latitude: -34.9011, longitude: -56.1645, timezone: "America/Montevideo", region: "latin-america" },
  "panama-city": { name: "Panama City", country: "Panama", countryCode: "PA", latitude: 8.9824, longitude: -79.5199, timezone: "America/Panama", region: "latin-america" },
  "san-juan": { name: "San Juan", country: "Puerto Rico", countryCode: "PR", latitude: 18.4655, longitude: -66.1057, timezone: "America/Puerto_Rico", region: "latin-america" },
  // Africa
  "cairo": { name: "Cairo", country: "Egypt", countryCode: "EG", latitude: 30.0444, longitude: 31.2357, timezone: "Africa/Cairo", region: "africa" },
  "lagos": { name: "Lagos", country: "Nigeria", countryCode: "NG", latitude: 6.5244, longitude: 3.3792, timezone: "Africa/Lagos", region: "africa" },
  "johannesburg": { name: "Johannesburg", country: "South Africa", countryCode: "ZA", latitude: -26.2041, longitude: 28.0473, timezone: "Africa/Johannesburg", region: "africa" },
  "cape-town": { name: "Cape Town", country: "South Africa", countryCode: "ZA", latitude: -33.9249, longitude: 18.4241, timezone: "Africa/Johannesburg", region: "africa" },
  "nairobi": { name: "Nairobi", country: "Kenya", countryCode: "KE", latitude: -1.2921, longitude: 36.8219, timezone: "Africa/Nairobi", region: "africa" },
  "casablanca": { name: "Casablanca", country: "Morocco", countryCode: "MA", latitude: 33.5731, longitude: -7.5898, timezone: "Africa/Casablanca", region: "africa" },
  "marrakech": { name: "Marrakech", country: "Morocco", countryCode: "MA", latitude: 31.6295, longitude: -7.9811, timezone: "Africa/Casablanca", region: "africa" },
  "accra": { name: "Accra", country: "Ghana", countryCode: "GH", latitude: 5.6037, longitude: -0.187, timezone: "Africa/Accra", region: "africa" },
  "addis-ababa": { name: "Addis Ababa", country: "Ethiopia", countryCode: "ET", latitude: 9.0246, longitude: 38.7468, timezone: "Africa/Addis_Ababa", region: "africa" },
  "dar-es-salaam": { name: "Dar es Salaam", country: "Tanzania", countryCode: "TZ", latitude: -6.7924, longitude: 39.2083, timezone: "Africa/Dar_es_Salaam", region: "africa" },
  "tunis": { name: "Tunis", country: "Tunisia", countryCode: "TN", latitude: 36.8065, longitude: 10.1815, timezone: "Africa/Tunis", region: "africa" },
};

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES[slug];
}

export function getAllCitySlugs(): string[] {
  return Object.keys(CITIES);
}

export function getCityLabel(city: CityData): string {
  return `${city.name}, ${city.country}`;
}

// Convert slug to search query for dynamic geocoding
export function slugToQuery(slug: string): string {
  return slug.replace(/-/g, " ");
}
