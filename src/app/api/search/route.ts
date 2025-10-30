import { NextRequest, NextResponse } from 'next/server';

// OpenWeatherMap Geocoding API
const API_KEY = process.env.OPENWEATHER_API_KEY;
const GEOCODING_URL = 'http://api.openweathermap.org/geo/1.0/direct';

/**
 * GET /api/search?q=Lond
 * 
 * This API route:
 * 1. Takes a search query from parameters
 * 2. Returns matching cities for autocomplete
 * 3. Limits results to 5 cities
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');

  // Validate input
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }

  // Minimum query length for performance
  if (query.length < 2) {
    return NextResponse.json([]);
  }

  // Check API key
  if (!API_KEY) {
    return NextResponse.json(
      { error: 'OpenWeather API key is not configured' },
      { status: 500 }
    );
  }

  try {
    console.log(`🔍 Searching cities for: "${query}"`);
    
    const response = await fetch(
      `${GEOCODING_URL}?q=${encodeURIComponent(query)}&limit=5&appid=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`Geocoding API Error: ${response.status}`);
    }

    const locations = await response.json();
    console.log(`📍 Found ${locations.length} cities`);

    return NextResponse.json(locations);

  } catch (error) {
    console.error('❌ Search API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to search locations' },
      { status: 500 }
    );
  }
}