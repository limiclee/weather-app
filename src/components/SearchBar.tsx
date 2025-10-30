'use client';

import { useState, useEffect, useRef } from 'react';
import { GeocodingData } from '@/types/weather';

interface SearchBarProps {
    onLocationSelect: (location: string) => void;
    placeholder?: string;
    isLoading?: boolean;
}

export default function SearchBar({
    onLocationSelect,
    placeholder = "Search for a city...",
    isLoading = false
}: SearchBarProps) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState<GeocodingData[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    // Close suggestions when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Search for cities as user types (debounced)
    useEffect(() => {
        const searchCities = async () => {
            if (query.length < 2) {
                setSuggestions([]);
                setShowSuggestions(false);
                return;
            }

            setIsSearching(true);
            try {
                console.log(`🔍 Searching for: "${query}"`);
                const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`);

                if (response.ok) {
                    const locations = await response.json();
                    setSuggestions(locations);
                    setShowSuggestions(true);
                    console.log(`📍 Found ${locations.length} suggestions`);
                } else {
                    console.error('Search failed:', response.status);
                    setSuggestions([]);
                }
            } catch (error) {
                console.error('Search error:', error);
                setSuggestions([]);
            } finally {
                setIsSearching(false);
            }
        };

        // Debounce the search (wait 300ms after user stops typing)
        const debounceTimer = setTimeout(searchCities, 300);
        return () => clearTimeout(debounceTimer);
    }, [query]);

    const handleLocationClick = (location: GeocodingData) => {
        const locationString = location.state
            ? `${location.name}, ${location.state}, ${location.country}`
            : `${location.name}, ${location.country}`;

        setQuery(locationString);
        setShowSuggestions(false);
        onLocationSelect(locationString);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim() && !isLoading) {
            setShowSuggestions(false);
            onLocationSelect(query.trim());
        }
    };

    return (
        <div ref={searchRef} className="relative w-full max-w-md mx-auto">
            <form onSubmit={handleSubmit} className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={placeholder}
                    disabled={isLoading}
                    className={`w-full px-4 py-3 pr-12 text-gray-900 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                />

                {/* Search/Loading Icon */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isLoading ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
                    ) : isSearching ? (
                        <div className="animate-pulse text-gray-400">🔍</div>
                    ) : (
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    )}
                </div>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {suggestions.map((location, index) => (
                        <button
                            key={`${location.lat}-${location.lon}-${index}`}
                            onClick={() => handleLocationClick(location)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 border-b border-gray-100 last:border-b-0 transition-colors"
                        >
                            <div className="font-medium text-gray-900">
                                📍 {location.name}
                            </div>
                            <div className="text-sm text-gray-600">
                                {location.state ? `${location.state}, ` : ''}{location.country}
                            </div>
                        </button>
                    ))}
                </div>
            )}

            {/* No results message */}
            {showSuggestions && suggestions.length === 0 && query.length >= 2 && !isSearching && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
                    <div className="text-gray-500 text-center">
                        🤷‍♂️ No cities found for "{query}"
                    </div>
                </div>
            )}
        </div>
    );
}