// OpenWeatherMap API Response Types
// This matches the exact structure from OpenWeatherMap API

export interface WeatherData {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;        // "Clear", "Clouds", "Rain", etc.
    description: string; // "clear sky", "few clouds", etc.
    icon: string;        // "01d", "02n", etc.
  }>;
  base: string;
  main: {
    temp: number;        // Temperature in Celsius
    feels_like: number;  // Feels like temperature
    temp_min: number;    // Minimum temperature
    temp_max: number;    // Maximum temperature
    pressure: number;    // Atmospheric pressure
    humidity: number;    // Humidity percentage
    sea_level?: number;  // Optional: Sea level pressure
    grnd_level?: number; // Optional: Ground level pressure
  };
  visibility: number;    // Visibility in meters
  wind: {
    speed: number;       // Wind speed in m/s
    deg: number;         // Wind direction in degrees
    gust?: number;       // Optional: Wind gust speed
  };
  clouds: {
    all: number;         // Cloudiness percentage
  };
  dt: number;            // Data calculation time (Unix timestamp)
  sys: {
    type: number;
    id: number;
    country: string;     // Country code (US, GB, etc.)
    sunrise: number;     // Sunrise time (Unix timestamp)
    sunset: number;      // Sunset time (Unix timestamp)
  };
  timezone: number;      // Timezone offset in seconds
  id: number;            // City ID
  name: string;          // City name
  cod: number;           // API response code
}

// Geocoding API Response (for city search)
export interface GeocodingData {
  name: string;          // City name
  local_names?: {        // Optional: Local names in different languages
    [key: string]: string;
  };
  lat: number;           // Latitude
  lon: number;           // Longitude
  country: string;       // Country code
  state?: string;        // Optional: State/region name
}

// Our app's custom types
export interface FavoriteLocation {
  id: string;
  name: string;
  country: string;
  state?: string;
  lat: number;
  lon: number;
  addedAt: string;       // ISO date string
}

export interface WeatherHistory {
  id: string;
  location: string;
  searchedAt: string;    // ISO date string
  weatherData: WeatherData;
}