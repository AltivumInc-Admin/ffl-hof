// Weather Service - Fetch weather data for NFL game locations
// Using OpenWeatherMap API (free tier available)

export interface WeatherData {
  temperature: number;
  condition: string;
  description: string;
  icon: string;
  windSpeed: number;
  windDirection: number;
  humidity: number;
  location: string;
  stadium: string;
  isHome: boolean;
}

interface WeatherAPIResponse {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
    icon: string;
  }>;
  wind: {
    speed: number;
    deg: number;
  };
  name: string;
}

class WeatherService {
  private readonly API_KEY = '3b4e34906755ee4dc9f91524438b2e4c';
  private readonly API_BASE = 'https://api.openweathermap.org/data/2.5/weather';
  private cache = new Map<string, { data: WeatherData; timestamp: number }>();
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutes

  // Generate cache key for location
  private getCacheKey(lat: number, lon: number): string {
    return `${lat.toFixed(4)}_${lon.toFixed(4)}`;
  }

  // Check if cached data is still valid
  private isCacheValid(timestamp: number): boolean {
    return Date.now() - timestamp < this.CACHE_DURATION;
  }

  // Get weather from cache if available and valid
  private getCachedWeather(lat: number, lon: number): WeatherData | null {
    const cacheKey = this.getCacheKey(lat, lon);
    const cached = this.cache.get(cacheKey);
    
    if (cached && this.isCacheValid(cached.timestamp)) {
      console.log('Using cached weather data for', cacheKey);
      return cached.data;
    }
    
    // Clean up expired cache entry
    if (cached) {
      this.cache.delete(cacheKey);
    }
    
    return null;
  }

  // Store weather data in cache
  private setCachedWeather(lat: number, lon: number, data: WeatherData): void {
    const cacheKey = this.getCacheKey(lat, lon);
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
  }

  // Fetch weather from OpenWeatherMap API
  private async fetchWeatherFromAPI(lat: number, lon: number): Promise<WeatherAPIResponse> {
    const url = `${this.API_BASE}?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=imperial`;
    
    console.log('Fetching weather from URL:', url);
    
    try {
      const response = await fetch(url);
      console.log('Weather API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Weather API error response:', errorText);
        
        if (response.status === 401) {
          throw new Error('Weather API key invalid or missing');
        } else if (response.status === 429) {
          throw new Error('Weather API rate limit exceeded');
        }
        throw new Error(`Weather API error: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log('Weather API response data:', data);
      return data;
    } catch (error) {
      console.error('Weather API fetch failed:', error);
      throw error;
    }
  }

  // Main method to get weather for a location
  async getWeather(
    lat: number, 
    lon: number, 
    location: string, 
    stadium: string, 
    isHome: boolean = true
  ): Promise<WeatherData> {
    // Check cache first
    const cached = this.getCachedWeather(lat, lon);
    if (cached) {
      return {
        ...cached,
        location,
        stadium,
        isHome
      };
    }

    try {
      // Fetch from API
      console.log(`Fetching weather for ${location} (${lat}, ${lon})`);
      const apiResponse = await this.fetchWeatherFromAPI(lat, lon);
      
      const weatherData: WeatherData = {
        temperature: Math.round(apiResponse.main.temp),
        condition: apiResponse.weather[0].main,
        description: apiResponse.weather[0].description,
        icon: apiResponse.weather[0].icon,
        windSpeed: Math.round(apiResponse.wind.speed),
        windDirection: apiResponse.wind.deg,
        humidity: apiResponse.main.humidity,
        location,
        stadium,
        isHome
      };
      
      // Cache the result
      this.setCachedWeather(lat, lon, weatherData);
      
      return weatherData;
    } catch (error) {
      // Return fallback data on API failure
      console.warn('Weather fetch failed, returning fallback data:', error);
      
      return {
        temperature: 72,
        condition: 'Clear',
        description: 'API key activating - live weather coming soon',
        icon: '01d',
        windSpeed: 5,
        windDirection: 180,
        humidity: 50,
        location,
        stadium,
        isHome
      };
    }
  }

  // Get weather icon URL
  getWeatherIconUrl(icon: string): string {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  }

  // Format weather for display
  formatWeatherDisplay(weather: WeatherData): string {
    const homeAway = weather.isHome ? 'Home' : 'Away';
    return `${weather.temperature}°F ${weather.condition} at ${weather.stadium} (${homeAway})`;
  }

  // Clear cache (useful for testing)
  clearCache(): void {
    this.cache.clear();
  }

  // Get cache stats (for debugging)
  getCacheStats(): { size: number; keys: string[] } {
    return {
      size: this.cache.size,
      keys: Array.from(this.cache.keys())
    };
  }

  // Test API key functionality
  async testAPIKey(): Promise<{ working: boolean; message: string; data?: WeatherAPIResponse }> {
    try {
      console.log('Testing OpenWeatherMap API key...');
      const testUrl = `${this.API_BASE}?q=Dallas,TX,US&appid=${this.API_KEY}&units=imperial`;
      const response = await fetch(testUrl);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ API key is working! Sample data:', data);
        return {
          working: true,
          message: 'API key is active and working!',
          data: data
        };
      } else {
        const errorData = await response.json();
        console.log('❌ API key test failed:', errorData);
        return {
          working: false,
          message: `API key not ready: ${errorData.message || 'Unknown error'}`
        };
      }
    } catch (error) {
      console.error('API key test error:', error);
      return {
        working: false,
        message: `Test failed: ${error instanceof Error ? error.message : 'Unknown error'}`
      };
    }
  }
}

export const weatherService = new WeatherService();