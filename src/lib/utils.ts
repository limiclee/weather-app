// Utility functions for our weather app

/**
 * Convert Unix timestamp to readable time
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted time string (e.g., "7:30 AM")
 */
export function formatTime(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true
  });
}

/**
 * Convert Unix timestamp to readable date
 * @param timestamp - Unix timestamp in seconds
 * @returns Formatted date string (e.g., "Dec 25, 2024")
 */
export function formatDate(timestamp: number): string {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

/**
 * Get weather icon URL from OpenWeatherMap
 * @param iconCode - Icon code from API (e.g., "01d")
 * @returns Full URL to weather icon
 */
export function getWeatherIconUrl(iconCode: string): string {
  return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

/**
 * Convert wind direction from degrees to compass direction
 * @param degrees - Wind direction in degrees (0-360)
 * @returns Compass direction (e.g., "N", "NE", "E")
 */
export function getWindDirection(degrees: number): string {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Round temperature to nearest integer
 * @param temp - Temperature value
 * @returns Rounded temperature
 */
export function roundTemp(temp: number): number {
  return Math.round(temp);
}

export function formatVisibility(meter: number): string{
  return `${(meter/1000).toFixed(1)} km`;
}