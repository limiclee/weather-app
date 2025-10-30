import { NextRequest, NextResponse } from 'next/server';

// OpenWeatherMap API configuration
const API_KEY = process.env.OPENWEATHER_API_KEY;
const GEOCODING_URL = 'http://api.openweathermap.org/geo/1.0/direct';
const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * GET /api/weather?location=London
 * 
 * This API route:
 * 1. Takes a city name from query parameters
 * 2. Uses OpenWeatherMap Geocoding API to get coordinates
 * 3. Uses coordinates to fetch weather data
 * 4. Returns the weather data as JSON
 */
export async function GET(request: NextRequest) {
  // Extract the location from URL search parameters
  const searchParams = request.nextUrl.searchParams;
  const cityName = searchParams.get('location');

  // Validate input
  if (!cityName) {
    return NextResponse.json(
      { error: 'Location parameter is required' },
      { status: 400 }
    );
  }

  // Check if API key is configured
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'OpenWeather API key is not configured' },
      { status: 500 }
    );
  }

  try {
    // Step 1: Get coordinates from city name (Geocoding)
    console.log(`🔍 Searching for coordinates of: ${cityName}`);
    
    const geoResponse = await fetch(
      `${GEOCODING_URL}?q=${encodeURIComponent(cityName)}&limit=1&appid=${API_KEY}`
    );
    
    if (!geoResponse.ok) {
      throw new Error(`Geocoding API Error: ${geoResponse.status}`);
    }

    const geoData = await geoResponse.json();
    
    if (!geoData || geoData.length === 0) {
      return NextResponse.json(
        { error: `City not found: ${cityName}` },
        { status: 404 }
      );
    }

    const { lat, lon } = geoData[0];
    console.log(`📍 Found coordinates: ${lat}, ${lon}`);

    // Step 2: Get weather data using coordinates
    console.log(`🌤️ Fetching weather data...`);
    
    const weatherResponse = await fetch(
      `${WEATHER_URL}?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    
    if (!weatherResponse.ok) {
      throw new Error(`Weather API Error: ${weatherResponse.status}`);
    }

    const weatherData = await weatherResponse.json();
    console.log(`✅ Weather data fetched successfully for ${weatherData.name}`);

    // Return the weather data
    return NextResponse.json(weatherData);

  } catch (error) {
    console.error('❌ Weather API error:', error);
    
    return NextResponse.json(
      { 
        error: error instanceof Error ? error.message : 'Internal server error' 
      },
      { status: 500 }
    );
  }
}