import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { WeatherData } from '../services/weatherService';
import { weatherService } from '../services/weatherService';
import { getNFLTeam, getGameLocation } from '../services/nflTeamService';
import '../styles/WeatherDisplay.css';

interface WeatherDisplayProps {
  proTeamId: number;
  playerName: string;
  currentWeek: number;
  onClose: () => void;
}

export const WeatherDisplay = ({ proTeamId, playerName, currentWeek, onClose }: WeatherDisplayProps) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Manage body scroll when modal is open/closed
  useEffect(() => {
    // Store current scroll position
    const scrollY = window.scrollY;
    
    // Add class to prevent body scroll
    document.body.classList.add('weather-modal-open');
    
    // Cleanup function
    return () => {
      // Remove class to restore scroll
      document.body.classList.remove('weather-modal-open');
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
    };
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const nflTeam = getNFLTeam(proTeamId);
        if (!nflTeam) {
          throw new Error('NFL team not found');
        }

        const gameLocation = getGameLocation(proTeamId, currentWeek);
        if (!gameLocation) {
          throw new Error('Game location not available');
        }

        const weatherData = await weatherService.getWeather(
          gameLocation.coordinates.lat,
          gameLocation.coordinates.lon,
          gameLocation.city,
          gameLocation.stadium,
          gameLocation.isHome
        );

        setWeather(weatherData);
      } catch (err) {
        console.error('Weather fetch error:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch weather');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWeather();
  }, [proTeamId, currentWeek]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div className="weather-overlay" onClick={handleOverlayClick}>
      <div className="weather-modal">
        <div className="weather-header">
          <h3 className="weather-title">Game Weather for {playerName}</h3>
          <button className="weather-close" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="weather-content">
          {isLoading && (
            <div className="weather-loading">
              <div className="loading-spinner">☀️</div>
              <p>Fetching weather data...</p>
            </div>
          )}

          {error && (
            <div className="weather-error">
              <p>⚠️ {error}</p>
              <p className="weather-error-subtitle">Weather information unavailable</p>
            </div>
          )}

          {weather && !isLoading && (
            <div className="weather-info">
              <div className="weather-main">
                <div className="weather-icon-section">
                  <img 
                    src={weatherService.getWeatherIconUrl(weather.icon)} 
                    alt={weather.description}
                    className="weather-icon"
                  />
                  <div className="weather-temp">{weather.temperature}°F</div>
                </div>
                
                <div className="weather-details">
                  <div className="weather-condition">
                    <strong>{weather.condition}</strong>
                    <span className="weather-description">{weather.description}</span>
                  </div>
                  
                  <div className="weather-location">
                    <span className="location-marker">📍</span>
                    <span className="stadium-name">{weather.stadium}</span>
                    <span className="home-away-indicator">
                      {weather.isHome ? '🏠 Home' : '✈️ Away'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="weather-extra">
                <div className="weather-stat">
                  <span className="stat-label">Wind:</span>
                  <span className="stat-value">{weather.windSpeed} mph</span>
                </div>
                <div className="weather-stat">
                  <span className="stat-label">Humidity:</span>
                  <span className="stat-value">{weather.humidity}%</span>
                </div>
              </div>

              <div className="weather-footer">
                <small>Weather data refreshed every 10 minutes</small>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// Weather button component for use in roster views
interface WeatherButtonProps {
  proTeamId: number;
  playerName: string;
  currentWeek: number;
  size?: 'small' | 'medium';
  className?: string;
}

export const WeatherButton = ({ 
  proTeamId, 
  playerName, 
  currentWeek, 
  size = 'medium', 
  className = '' 
}: WeatherButtonProps) => {
  const [showWeather, setShowWeather] = useState(false);

  return (
    <>
      <button 
        className={`weather-button ${size} ${className}`}
        onClick={() => setShowWeather(true)}
        title={`View weather for ${playerName}'s game`}
      >
        ☀️
      </button>

      {showWeather && (
        <WeatherDisplay
          proTeamId={proTeamId}
          playerName={playerName}
          currentWeek={currentWeek}
          onClose={() => setShowWeather(false)}
        />
      )}
    </>
  );
};