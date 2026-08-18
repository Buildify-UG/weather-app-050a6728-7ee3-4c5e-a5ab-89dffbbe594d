import { useState } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Eye, Gauge } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface WeatherData {
  city: string;
  temp: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  feelsLike: number;
  icon: string;
}

interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

export default function Index() {
  const [city, setCity] = useState('San Francisco');
  const [searchInput, setSearchInput] = useState('');

  // Sample weather data
  const weatherData: WeatherData = {
    city: city,
    temp: 72,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    visibility: 10,
    pressure: 1013,
    feelsLike: 70,
    icon: 'cloud'
  };

  const forecast: ForecastDay[] = [
    { day: 'Tomorrow', high: 75, low: 62, condition: 'Sunny', icon: 'sun' },
    { day: 'Wednesday', high: 73, low: 61, condition: 'Cloudy', icon: 'cloud' },
    { day: 'Thursday', high: 68, low: 58, condition: 'Rainy', icon: 'rain' },
    { day: 'Friday', high: 70, low: 59, condition: 'Partly Cloudy', icon: 'cloud' },
    { day: 'Saturday', high: 76, low: 64, condition: 'Sunny', icon: 'sun' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setCity(searchInput);
      setSearchInput('');
    }
  };

  const getWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sun':
        return <Sun className="w-16 h-16 text-yellow-400" />;
      case 'cloud':
        return <Cloud className="w-16 h-16 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-16 h-16 text-blue-400" />;
      default:
        return <Cloud className="w-16 h-16 text-gray-400" />;
    }
  };

  const getSmallWeatherIcon = (iconType: string) => {
    switch (iconType) {
      case 'sun':
        return <Sun className="w-8 h-8 text-yellow-400" />;
      case 'cloud':
        return <Cloud className="w-8 h-8 text-gray-400" />;
      case 'rain':
        return <CloudRain className="w-8 h-8 text-blue-400" />;
      default:
        return <Cloud className="w-8 h-8 text-gray-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Weather</h1>
          <p className="text-blue-100">Current conditions and forecast</p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Search for a city..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="bg-white/90 backdrop-blur text-foreground placeholder:text-gray-500 border-0"
            />
            <Button type="submit" className="bg-white text-blue-600 hover:bg-blue-50">
              Search
            </Button>
          </div>
        </form>

        {/* Current Weather Card */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8 mb-8">
          <div className="flex items-start justify-between mb-8">
            <div>
              <h2 className="text-5xl font-bold text-foreground mb-2">{weatherData.city}</h2>
              <p className="text-gray-600">Today</p>
            </div>
            <div className="text-right">
              <div className="text-7xl font-bold text-foreground">{weatherData.temp}°</div>
              <p className="text-gray-600 text-lg">{weatherData.condition}</p>
              <p className="text-gray-500">Feels like {weatherData.feelsLike}°</p>
            </div>
          </div>

          {/* Weather Icon and Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex justify-center md:justify-start">
              {getWeatherIcon(weatherData.icon)}
            </div>

            {/* Weather Details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Droplets className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600">Humidity</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{weatherData.humidity}%</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Wind className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600">Wind Speed</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{weatherData.windSpeed} mph</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600">Visibility</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{weatherData.visibility} mi</p>
              </div>

              <div className="bg-blue-50 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Gauge className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-medium text-gray-600">Pressure</span>
                </div>
                <p className="text-2xl font-bold text-foreground">{weatherData.pressure} mb</p>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Day Forecast */}
        <div className="bg-white/95 backdrop-blur rounded-3xl shadow-2xl p-8">
          <h3 className="text-2xl font-bold text-foreground mb-6">5-Day Forecast</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 text-center">
                <h4 className="font-semibold text-foreground mb-4">{day.day}</h4>
                <div className="flex justify-center mb-4">
                  {getSmallWeatherIcon(day.icon)}
                </div>
                <p className="text-sm text-gray-600 mb-3">{day.condition}</p>
                <div className="flex justify-center gap-4">
                  <div>
                    <p className="text-xs text-gray-500">High</p>
                    <p className="text-xl font-bold text-foreground">{day.high}°</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Low</p>
                    <p className="text-xl font-bold text-foreground">{day.low}°</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
