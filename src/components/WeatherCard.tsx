'use client';

import { WeatherData } from '@/types/weather';
import { formatTime, roundTemp, formatVisibility, getWeatherIconUrl } from '@/lib/utils';
import Image from 'next/image';

interface WeatherCardProps {
  weather: WeatherData;
  onAddToFavorites?: () => void;
  showFavoriteButton?: boolean;
}

export default function WeatherCard({ 
  weather, 
  onAddToFavorites, 
  showFavoriteButton = true 
}: WeatherCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md mx-auto transform transition-all hover:scale-105 hover:shadow-xl">
      {/* Header with City Name and Favorite Button */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {weather.name}
          </h2>
          <p className="text-gray-600">{weather.sys.country}</p>
        </div>
        {showFavoriteButton && onAddToFavorites && (
          <button
            onClick={onAddToFavorites}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors group"
            title="Add to favorites"
          >
            <svg 
              className="w-6 h-6 text-gray-400 group-hover:text-red-500 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
              />
            </svg>
          </button>
        )}
      </div>

      {/* Main Temperature Display */}
      <div className="flex items-center justify-center mb-6">
        <div className="flex items-center">
          {/* Weather Icon */}
          <div className="mr-4">
            <Image
              src={getWeatherIconUrl(weather.weather[0].icon)}
              alt={weather.weather[0].description}
              width={80}
              height={80}
              className="drop-shadow-lg"
            />
          </div>
          
          {/* Temperature and Description */}
          <div className="text-center">
            <div className="text-5xl font-bold text-gray-800 mb-2">
              {roundTemp(weather.main.temp)}°C
            </div>
            <p className="text-gray-600 capitalize text-lg">
              {weather.weather[0].description}
            </p>
          </div>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600 flex items-center">
            🌡️ Feels like:
          </span>
          <span className="font-medium text-gray-800">
            {roundTemp(weather.main.feels_like)}°C
          </span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600 flex items-center">
            💧 Humidity:
          </span>
          <span className="font-medium text-gray-800">
            {weather.main.humidity}%
          </span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600 flex items-center">
            💨 Wind:
          </span>
          <span className="font-medium text-gray-800">
            {weather.wind.speed} m/s
          </span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600 flex items-center">
            📊 Pressure:
          </span>
          <span className="font-medium text-gray-800">
            {weather.main.pressure} hPa
          </span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600 flex items-center">
            👁️ Visibility:
          </span>
          <span className="font-medium text-gray-800">
            {formatVisibility(weather.visibility)}
          </span>
        </div>
        
        <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
          <span className="text-gray-600 flex items-center">
            🌡️ Min/Max:
          </span>
          <span className="font-medium text-gray-800">
            {roundTemp(weather.main.temp_min)}°/{roundTemp(weather.main.temp_max)}°C
          </span>
        </div>
      </div>

      {/* Sunrise/Sunset */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span className="flex items-center">
            🌅 Sunrise: {formatTime(weather.sys.sunrise)}
          </span>
          <span className="flex items-center">
            🌇 Sunset: {formatTime(weather.sys.sunset)}
          </span>
        </div>
      </div>

      {/* Last Updated */}
      <div className="mt-2 text-xs text-gray-400 text-center">
        Last updated: {new Date(weather.dt * 1000).toLocaleString()}
      </div>
    </div>
  );
}