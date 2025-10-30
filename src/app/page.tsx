'use client';

import { useState } from 'react';
import { WeatherData } from '@/types/weather';
import SearchBar from '@/components/SearchBar';
import WeatherCard from '@/components/WeatherCard';

export default function Home() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLocationSearch = async (location: string) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log(`🌤️ Searching weather for: ${location}`);
      
      const response = await fetch(`/api/weather?location=${encodeURIComponent(location)}`);
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch weather data');
      }
      
      const weatherData = await response.json();
      setWeather(weatherData);
      console.log(`✅ Weather data loaded for ${weatherData.name}`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred';
      setError(errorMessage);
      setWeather(null);
      console.error('❌ Weather fetch error:', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToFavorites = () => {
    if (weather) {
      // TODO: Implement favorites functionality in next steps
      console.log('💖 Adding to favorites:', weather.name);
      alert(`Added ${weather.name} to favorites! (Feature coming soon)`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            ☀️ Weather App
          </h1>
          <p className="text-xl text-blue-100">
            Get current weather information for any location
          </p>
        </div>

        {/* Main Content Area */}
        <div className="max-w-md mx-auto sm:max-w-lg md:max-w-xl">
          {/* Interactive Search Bar */}
          <div className="mb-8">
            <SearchBar 
              onLocationSelect={handleLocationSearch}
              isLoading={loading}
              placeholder="Search for a city..."
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
                <p className="text-white">Loading weather data...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="mb-8">
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                <div className="flex items-center">
                  <span className="text-xl mr-2">❌</span>
                  <div>
                    <p className="font-medium">Error</p>
                    <p className="text-sm">{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Weather Card */}
          {weather && !loading && (
            <div className="mb-8">
              <WeatherCard 
                weather={weather} 
                onAddToFavorites={handleAddToFavorites}
              />
            </div>
          )}

          {/* Empty State */}
          {!weather && !loading && !error && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-lg p-8">
              <div className="text-center text-white">
                <div className="text-6xl mb-4">🌤️</div>
                <p className="text-lg mb-2">Search for a city to see the weather</p>
                <p className="text-sm text-blue-100">
                  Try searching for "London", "New York", or your hometown!
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-blue-100 text-sm">
          <p>
            Powered by{' '}
            <a 
              href="https://openweathermap.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              OpenWeatherMap
            </a>
            {' '}• Built with{' '}
            <a 
              href="https://nextjs.org/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="underline hover:text-white transition-colors"
            >
              Next.js
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}