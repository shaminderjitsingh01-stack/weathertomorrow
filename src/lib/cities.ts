// Top cities for programmatic SEO pages
// Slug → city data mapping for static generation

export interface CityData {
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  timezone: string;
  population: number;
}

// Top 100 most-searched cities for weather
export const CITIES: Record<string, CityData> = {
  "new-york": { name: "New York", country: "United States", countryCode: "US", latitude: 40.7128, longitude: -74.006, timezone: "America/New_York", population: 8336817 },
  "london": { name: "London", country: "United Kingdom", countryCode: "GB", latitude: 51.5074, longitude: -0.1278, timezone: "Europe/London", population: 8982000 },
  "paris": { name: "Paris", country: "France", countryCode: "FR", latitude: 48.8566, longitude: 2.3522, timezone: "Europe/Paris", population: 2161000 },
  "tokyo": { name: "Tokyo", country: "Japan", countryCode: "JP", latitude: 35.6762, longitude: 139.6503, timezone: "Asia/Tokyo", population: 13960000 },
  "sydney": { name: "Sydney", country: "Australia", countryCode: "AU", latitude: -33.8688, longitude: 151.2093, timezone: "Australia/Sydney", population: 5312000 },
  "dubai": { name: "Dubai", country: "United Arab Emirates", countryCode: "AE", latitude: 25.2048, longitude: 55.2708, timezone: "Asia/Dubai", population: 3331000 },
  "singapore": { name: "Singapore", country: "Singapore", countryCode: "SG", latitude: 1.3521, longitude: 103.8198, timezone: "Asia/Singapore", population: 5686000 },
  "los-angeles": { name: "Los Angeles", country: "United States", countryCode: "US", latitude: 34.0522, longitude: -118.2437, timezone: "America/Los_Angeles", population: 3979576 },
  "chicago": { name: "Chicago", country: "United States", countryCode: "US", latitude: 41.8781, longitude: -87.6298, timezone: "America/Chicago", population: 2693976 },
  "toronto": { name: "Toronto", country: "Canada", countryCode: "CA", latitude: 43.6532, longitude: -79.3832, timezone: "America/Toronto", population: 2794356 },
  "mumbai": { name: "Mumbai", country: "India", countryCode: "IN", latitude: 19.076, longitude: 72.8777, timezone: "Asia/Kolkata", population: 12442373 },
  "delhi": { name: "Delhi", country: "India", countryCode: "IN", latitude: 28.7041, longitude: 77.1025, timezone: "Asia/Kolkata", population: 11034555 },
  "berlin": { name: "Berlin", country: "Germany", countryCode: "DE", latitude: 52.52, longitude: 13.405, timezone: "Europe/Berlin", population: 3644826 },
  "madrid": { name: "Madrid", country: "Spain", countryCode: "ES", latitude: 40.4168, longitude: -3.7038, timezone: "Europe/Madrid", population: 3223334 },
  "rome": { name: "Rome", country: "Italy", countryCode: "IT", latitude: 41.9028, longitude: 12.4964, timezone: "Europe/Rome", population: 2873000 },
  "bangkok": { name: "Bangkok", country: "Thailand", countryCode: "TH", latitude: 13.7563, longitude: 100.5018, timezone: "Asia/Bangkok", population: 8281000 },
  "istanbul": { name: "Istanbul", country: "Turkey", countryCode: "TR", latitude: 41.0082, longitude: 28.9784, timezone: "Europe/Istanbul", population: 15462000 },
  "moscow": { name: "Moscow", country: "Russia", countryCode: "RU", latitude: 55.7558, longitude: 37.6173, timezone: "Europe/Moscow", population: 12506000 },
  "cairo": { name: "Cairo", country: "Egypt", countryCode: "EG", latitude: 30.0444, longitude: 31.2357, timezone: "Africa/Cairo", population: 9540000 },
  "lagos": { name: "Lagos", country: "Nigeria", countryCode: "NG", latitude: 6.5244, longitude: 3.3792, timezone: "Africa/Lagos", population: 15388000 },
  "melbourne": { name: "Melbourne", country: "Australia", countryCode: "AU", latitude: -37.8136, longitude: 144.9631, timezone: "Australia/Melbourne", population: 5078000 },
  "miami": { name: "Miami", country: "United States", countryCode: "US", latitude: 25.7617, longitude: -80.1918, timezone: "America/New_York", population: 467963 },
  "san-francisco": { name: "San Francisco", country: "United States", countryCode: "US", latitude: 37.7749, longitude: -122.4194, timezone: "America/Los_Angeles", population: 873965 },
  "seattle": { name: "Seattle", country: "United States", countryCode: "US", latitude: 47.6062, longitude: -122.3321, timezone: "America/Los_Angeles", population: 737015 },
  "boston": { name: "Boston", country: "United States", countryCode: "US", latitude: 42.3601, longitude: -71.0589, timezone: "America/New_York", population: 694583 },
  "houston": { name: "Houston", country: "United States", countryCode: "US", latitude: 29.7604, longitude: -95.3698, timezone: "America/Chicago", population: 2304580 },
  "dallas": { name: "Dallas", country: "United States", countryCode: "US", latitude: 32.7767, longitude: -96.797, timezone: "America/Chicago", population: 1304379 },
  "denver": { name: "Denver", country: "United States", countryCode: "US", latitude: 39.7392, longitude: -104.9903, timezone: "America/Denver", population: 715522 },
  "atlanta": { name: "Atlanta", country: "United States", countryCode: "US", latitude: 33.749, longitude: -84.388, timezone: "America/New_York", population: 498715 },
  "phoenix": { name: "Phoenix", country: "United States", countryCode: "US", latitude: 33.4484, longitude: -112.074, timezone: "America/Phoenix", population: 1608139 },
  "vancouver": { name: "Vancouver", country: "Canada", countryCode: "CA", latitude: 49.2827, longitude: -123.1207, timezone: "America/Vancouver", population: 631486 },
  "montreal": { name: "Montreal", country: "Canada", countryCode: "CA", latitude: 45.5017, longitude: -73.5673, timezone: "America/Toronto", population: 1762949 },
  "amsterdam": { name: "Amsterdam", country: "Netherlands", countryCode: "NL", latitude: 52.3676, longitude: 4.9041, timezone: "Europe/Amsterdam", population: 821752 },
  "barcelona": { name: "Barcelona", country: "Spain", countryCode: "ES", latitude: 41.3874, longitude: 2.1686, timezone: "Europe/Madrid", population: 1620343 },
  "lisbon": { name: "Lisbon", country: "Portugal", countryCode: "PT", latitude: 38.7223, longitude: -9.1393, timezone: "Europe/Lisbon", population: 504718 },
  "vienna": { name: "Vienna", country: "Austria", countryCode: "AT", latitude: 48.2082, longitude: 16.3738, timezone: "Europe/Vienna", population: 1897000 },
  "zurich": { name: "Zurich", country: "Switzerland", countryCode: "CH", latitude: 47.3769, longitude: 8.5417, timezone: "Europe/Zurich", population: 402275 },
  "munich": { name: "Munich", country: "Germany", countryCode: "DE", latitude: 48.1351, longitude: 11.582, timezone: "Europe/Berlin", population: 1472000 },
  "prague": { name: "Prague", country: "Czech Republic", countryCode: "CZ", latitude: 50.0755, longitude: 14.4378, timezone: "Europe/Prague", population: 1309000 },
  "dublin": { name: "Dublin", country: "Ireland", countryCode: "IE", latitude: 53.3498, longitude: -6.2603, timezone: "Europe/Dublin", population: 1228000 },
  "seoul": { name: "Seoul", country: "South Korea", countryCode: "KR", latitude: 37.5665, longitude: 126.978, timezone: "Asia/Seoul", population: 9776000 },
  "hong-kong": { name: "Hong Kong", country: "Hong Kong", countryCode: "HK", latitude: 22.3193, longitude: 114.1694, timezone: "Asia/Hong_Kong", population: 7482000 },
  "taipei": { name: "Taipei", country: "Taiwan", countryCode: "TW", latitude: 25.033, longitude: 121.5654, timezone: "Asia/Taipei", population: 2646000 },
  "kuala-lumpur": { name: "Kuala Lumpur", country: "Malaysia", countryCode: "MY", latitude: 3.139, longitude: 101.6869, timezone: "Asia/Kuala_Lumpur", population: 1768000 },
  "jakarta": { name: "Jakarta", country: "Indonesia", countryCode: "ID", latitude: -6.2088, longitude: 106.8456, timezone: "Asia/Jakarta", population: 10560000 },
  "manila": { name: "Manila", country: "Philippines", countryCode: "PH", latitude: 14.5995, longitude: 120.9842, timezone: "Asia/Manila", population: 1780000 },
  "beijing": { name: "Beijing", country: "China", countryCode: "CN", latitude: 39.9042, longitude: 116.4074, timezone: "Asia/Shanghai", population: 21540000 },
  "shanghai": { name: "Shanghai", country: "China", countryCode: "CN", latitude: 31.2304, longitude: 121.4737, timezone: "Asia/Shanghai", population: 24870000 },
  "sao-paulo": { name: "São Paulo", country: "Brazil", countryCode: "BR", latitude: -23.5505, longitude: -46.6333, timezone: "America/Sao_Paulo", population: 12330000 },
  "rio-de-janeiro": { name: "Rio de Janeiro", country: "Brazil", countryCode: "BR", latitude: -22.9068, longitude: -43.1729, timezone: "America/Sao_Paulo", population: 6748000 },
  "buenos-aires": { name: "Buenos Aires", country: "Argentina", countryCode: "AR", latitude: -34.6037, longitude: -58.3816, timezone: "America/Argentina/Buenos_Aires", population: 2891000 },
  "mexico-city": { name: "Mexico City", country: "Mexico", countryCode: "MX", latitude: 19.4326, longitude: -99.1332, timezone: "America/Mexico_City", population: 8919000 },
  "johannesburg": { name: "Johannesburg", country: "South Africa", countryCode: "ZA", latitude: -26.2041, longitude: 28.0473, timezone: "Africa/Johannesburg", population: 5635000 },
  "cape-town": { name: "Cape Town", country: "South Africa", countryCode: "ZA", latitude: -33.9249, longitude: 18.4241, timezone: "Africa/Johannesburg", population: 4618000 },
  "nairobi": { name: "Nairobi", country: "Kenya", countryCode: "KE", latitude: -1.2921, longitude: 36.8219, timezone: "Africa/Nairobi", population: 4397000 },
  "stockholm": { name: "Stockholm", country: "Sweden", countryCode: "SE", latitude: 59.3293, longitude: 18.0686, timezone: "Europe/Stockholm", population: 975551 },
  "oslo": { name: "Oslo", country: "Norway", countryCode: "NO", latitude: 59.9139, longitude: 10.7522, timezone: "Europe/Oslo", population: 693494 },
  "copenhagen": { name: "Copenhagen", country: "Denmark", countryCode: "DK", latitude: 55.6761, longitude: 12.5683, timezone: "Europe/Copenhagen", population: 794128 },
  "helsinki": { name: "Helsinki", country: "Finland", countryCode: "FI", latitude: 60.1699, longitude: 24.9384, timezone: "Europe/Helsinki", population: 656229 },
  "warsaw": { name: "Warsaw", country: "Poland", countryCode: "PL", latitude: 52.2297, longitude: 21.0122, timezone: "Europe/Warsaw", population: 1790000 },
  "budapest": { name: "Budapest", country: "Hungary", countryCode: "HU", latitude: 47.4979, longitude: 19.0402, timezone: "Europe/Budapest", population: 1752000 },
  "athens": { name: "Athens", country: "Greece", countryCode: "GR", latitude: 37.9838, longitude: 23.7275, timezone: "Europe/Athens", population: 664046 },
  "doha": { name: "Doha", country: "Qatar", countryCode: "QA", latitude: 25.2854, longitude: 51.531, timezone: "Asia/Qatar", population: 956457 },
  "riyadh": { name: "Riyadh", country: "Saudi Arabia", countryCode: "SA", latitude: 24.7136, longitude: 46.6753, timezone: "Asia/Riyadh", population: 7676654 },
  "tel-aviv": { name: "Tel Aviv", country: "Israel", countryCode: "IL", latitude: 32.0853, longitude: 34.7818, timezone: "Asia/Jerusalem", population: 460613 },
  "washington-dc": { name: "Washington D.C.", country: "United States", countryCode: "US", latitude: 38.9072, longitude: -77.0369, timezone: "America/New_York", population: 689545 },
  "philadelphia": { name: "Philadelphia", country: "United States", countryCode: "US", latitude: 39.9526, longitude: -75.1652, timezone: "America/New_York", population: 1603797 },
  "las-vegas": { name: "Las Vegas", country: "United States", countryCode: "US", latitude: 36.1699, longitude: -115.1398, timezone: "America/Los_Angeles", population: 641903 },
  "san-diego": { name: "San Diego", country: "United States", countryCode: "US", latitude: 32.7157, longitude: -117.1611, timezone: "America/Los_Angeles", population: 1423851 },
  "portland": { name: "Portland", country: "United States", countryCode: "US", latitude: 45.5152, longitude: -122.6784, timezone: "America/Los_Angeles", population: 652503 },
  "minneapolis": { name: "Minneapolis", country: "United States", countryCode: "US", latitude: 44.9778, longitude: -93.265, timezone: "America/Chicago", population: 429954 },
  "detroit": { name: "Detroit", country: "United States", countryCode: "US", latitude: 42.3314, longitude: -83.0458, timezone: "America/Detroit", population: 639111 },
  "orlando": { name: "Orlando", country: "United States", countryCode: "US", latitude: 28.5383, longitude: -81.3792, timezone: "America/New_York", population: 307573 },
  "nashville": { name: "Nashville", country: "United States", countryCode: "US", latitude: 36.1627, longitude: -86.7816, timezone: "America/Chicago", population: 689447 },
  "auckland": { name: "Auckland", country: "New Zealand", countryCode: "NZ", latitude: -36.8485, longitude: 174.7633, timezone: "Pacific/Auckland", population: 1657000 },
  "lima": { name: "Lima", country: "Peru", countryCode: "PE", latitude: -12.0464, longitude: -77.0428, timezone: "America/Lima", population: 9751717 },
  "bogota": { name: "Bogotá", country: "Colombia", countryCode: "CO", latitude: 4.711, longitude: -74.0721, timezone: "America/Bogota", population: 7181000 },
  "santiago": { name: "Santiago", country: "Chile", countryCode: "CL", latitude: -33.4489, longitude: -70.6693, timezone: "America/Santiago", population: 6269000 },
  "hanoi": { name: "Hanoi", country: "Vietnam", countryCode: "VN", latitude: 21.0278, longitude: 105.8342, timezone: "Asia/Ho_Chi_Minh", population: 8054000 },
  "bangalore": { name: "Bangalore", country: "India", countryCode: "IN", latitude: 12.9716, longitude: 77.5946, timezone: "Asia/Kolkata", population: 8443675 },
  "chennai": { name: "Chennai", country: "India", countryCode: "IN", latitude: 13.0827, longitude: 80.2707, timezone: "Asia/Kolkata", population: 4681087 },
  "kolkata": { name: "Kolkata", country: "India", countryCode: "IN", latitude: 22.5726, longitude: 88.3639, timezone: "Asia/Kolkata", population: 4496694 },
  "hyderabad": { name: "Hyderabad", country: "India", countryCode: "IN", latitude: 17.385, longitude: 78.4867, timezone: "Asia/Kolkata", population: 6809970 },
};

export function getCityBySlug(slug: string): CityData | undefined {
  return CITIES[slug];
}

export function getAllCitySlugs(): string[] {
  return Object.keys(CITIES);
}

// Get display label with state/country
export function getCityLabel(city: CityData): string {
  return `${city.name}, ${city.country}`;
}
