import { Search, Sun, CloudRain, Wind, Droplet, MapPin, Calendar, RefreshCw, 
         CloudSnow, CloudLightning, CloudFog, Thermometer, Eye, Gauge, 
         Compass, Heart, Umbrella, Cloud, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

const popularCities = [
  "Mumbai", "Delhi", "Bengaluru", "Hyderabad", "Ahmedabad",
  "Chennai", "Kolkata", "Pune", "Jaipur", "Surat",
  "Lucknow", "Kanpur", "Nagpur", "Indore", "Bhopal",
  "Patna", "Vadodara", "Ludhiana", "Agra", "Nashik",
  "Faridabad", "Meerut", "Rajkot", "Varanasi", "Amritsar",
  "Ranchi", "Guwahati", "Chandigarh", "Coimbatore", "Vijayawada",
  "Mysuru", "Thiruvananthapuram", "Jodhpur", "Madurai", "Noida",
  "Gwalior", "Visakhapatnam", "Raipur", "Jamshedpur", "Dehradun",
  "Udaipur", "Shimla", "Mangalore", "Allahabad", "Tiruchirappalli",
  "Kangra", "Dharamshala", "Manali", "Kullu", "Palampur", "Mcleodganj"
];

const weatherGradients = {
  Clear: "from-amber-400 via-orange-400 to-red-400",
  Clouds: "from-gray-500 via-gray-600 to-gray-700",
  Rain: "from-blue-600 via-blue-700 to-indigo-800",
  Drizzle: "from-blue-400 via-blue-500 to-blue-600",
  Snow: "from-blue-200 via-gray-100 to-white",
  Thunderstorm: "from-purple-700 via-indigo-800 to-purple-900",
  Mist: "from-gray-400 via-gray-500 to-gray-600",
  Fog: "from-gray-400 via-gray-500 to-gray-600",
  Haze: "from-gray-400 via-gray-500 to-gray-600"
};

const getWeatherGradient = (weatherMain) => {
  return weatherGradients[weatherMain] || "from-blue-500 via-purple-500 to-pink-500";
};

const App = () => {
  const apikey = import.meta.env.VITE_OPEN_WEATHER_API_KEY;
  
  const [suggestions, setSuggestions] = useState([]);
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favoriteCities");
    return saved ? JSON.parse(saved) : ["Kangra", "Dharamshala"];
  });
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    localStorage.setItem("favoriteCities", JSON.stringify(favorites));
  }, [favorites]);

  // Auto-load Kangra weather on startup
  useEffect(() => {
    getweatherData("Kangra");
  }, []);

  const getWeatherIcon = (main, size = 80) => {
    const iconClass = `transition-all duration-500 hover:scale-110 hover:rotate-12`;
    const props = { size, strokeWidth: 1.5, className: iconClass };
    
    switch (main) {
      case "Clear":
        return <Sun {...props} className={`${iconClass} text-yellow-300 drop-shadow-lg`} />;
      case "Clouds":
        return <Cloud {...props} className="text-gray-300 drop-shadow-lg" />;
      case "Rain":
      case "Drizzle":
        return <CloudRain {...props} className="text-blue-300 drop-shadow-lg animate-bounce" />;
      case "Snow":
        return <CloudSnow {...props} className="text-white drop-shadow-lg animate-pulse" />;
      case "Thunderstorm":
        return <CloudLightning {...props} className="text-purple-300 drop-shadow-lg animate-pulse" />;
      case "Mist":
      case "Fog":
      case "Haze":
        return <CloudFog {...props} className="text-gray-300 drop-shadow-lg" />;
      default:
        return <CloudRain {...props} className="text-gray-300 drop-shadow-lg" />;
    }
  };

  const convertTemp = (temp) => {
    if (unit === "metric") return Math.round(temp);
    return Math.round((temp * 9/5) + 32);
  };

  const getTempUnit = () => unit === "metric" ? "°C" : "°F";

  const getWindSpeed = (speed) => {
    if (unit === "metric") return `${speed} m/s`;
    return `${(speed * 2.237).toFixed(1)} mph`;
  };

  // MAIN FUNCTION - Fixed to work with ANY city including Dharamshala
  const getweatherData = async (cityName = city) => {
    if (!cityName) return;
    
    setLoading(true);
    setError(null);
    
    try {
      // STEP 1: Use Geocoding API to get coordinates from city name
      // This works for ALL cities including small towns like Dharamshala!
      console.log(`🔍 Searching for coordinates of: ${cityName}`);
      
      const geoResponse = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(cityName)}&limit=1&appid=${apikey}`
      );
      
      if (!geoResponse.ok) {
        throw new Error(`Geocoding API error: ${geoResponse.status}`);
      }
      
      const geoData = await geoResponse.json();
      
      if (!geoData || geoData.length === 0) {
        throw new Error(`City "${cityName}" not found. Please check the spelling. Try "Dharamshala" (one 'm', one 's')`);
      }
      
      const { lat, lon, name, country } = geoData[0];
      console.log(`📍 Found coordinates: ${lat}, ${lon} for ${name}, ${country}`);
      
      // STEP 2: Get weather using coordinates (MOST ACCURATE METHOD)
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}&units=metric`
      );
      
      if (!weatherResponse.ok) {
        throw new Error(`Weather API error: ${weatherResponse.status}`);
      }
      
      const weatherData = await weatherResponse.json();
      
      // Add the correct city name from geocoding
      weatherData.name = name;
      weatherData.sys = weatherData.sys || {};
      weatherData.sys.country = country;
      
      setWeatherData(weatherData);
      setLastUpdated(new Date());
      setError(null);
      setCity(cityName);
      
    } catch (error) {
      console.error("API Error:", error);
      setError(`❌ ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setCity(value);

    if (value.length > 0) {
      const matches = popularCities
        .filter((c) => c.toLowerCase().includes(value.toLowerCase()))
        .slice(0, 8);
      setSuggestions(matches);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCity(suggestion);
    setSuggestions([]);
    setShowSuggestions(false);
    getweatherData(suggestion);
  };

  const addToFavorites = () => {
    if (weatherData && !favorites.includes(weatherData.name)) {
      setFavorites([weatherData.name, ...favorites]);
    }
  };

  const removeFromFavorites = (cityName) => {
    setFavorites(favorites.filter(fav => fav !== cityName));
  };

  const loadFavoriteCity = (cityName) => {
    getweatherData(cityName);
  };

  const getWindDirection = (deg) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(deg / 45) % 8];
  };

  const getWeatherAdvice = (temp, condition) => {
    if (condition.includes("rain")) return "🌧️ Don't forget your umbrella!";
    if (temp < 10) return "🧣 It's cold! Wear warm clothes.";
    if (temp > 35) return "🥵 Very hot! Stay hydrated.";
    if (condition.includes("clear")) return "☀️ Perfect day for outdoor activities!";
    if (condition.includes("cloud")) return "☁️ Good day for a walk.";
    return "👍 Check weather before heading out!";
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className={`absolute inset-0 bg-gradient-to-br ${weatherData ? getWeatherGradient(weatherData.weather[0].main) : "from-purple-600 via-pink-500 to-red-500"} transition-all duration-1000`}>
        <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl"></div>
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-6 mb-6 shadow-2xl border border-white/20">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
              <div className="flex items-center space-x-4">
                <div className="bg-gradient-to-br from-yellow-400 to-orange-500 p-3 rounded-2xl shadow-lg animate-pulse">
                  <Sparkles size={32} className="text-white" />
                </div>
                <div>
                  <h1 className="font-bold text-3xl md:text-4xl text-white tracking-tight drop-shadow-lg">
                    Weather<span className="font-light text-yellow-200">Wise</span>
                  </h1>
                  <p className="text-white/70 text-sm mt-1">Your Personal Weather Companion</p>
                </div>
              </div>

              <div className="w-full lg:w-auto space-y-3">
                <div className="relative">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="🔍 Search any city... (Dharamshala works!)"
                        value={city}
                        onChange={handleSearchChange}
                        onFocus={() => city && suggestions.length > 0 && setShowSuggestions(true)}
                        className="w-full px-5 py-3 bg-white/20 backdrop-blur-md placeholder-white/80 text-white border-2 border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent transition-all text-lg"
                      />
                      {showSuggestions && suggestions.length > 0 && (
                        <ul className="absolute z-20 w-full bg-white/95 backdrop-blur-md text-gray-800 mt-2 rounded-2xl overflow-hidden shadow-2xl max-h-60 overflow-y-auto">
                          {suggestions.map((s, index) => (
                            <li
                              key={index}
                              className="px-5 py-3 hover:bg-gradient-to-r hover:from-purple-100 hover:to-pink-100 cursor-pointer transition-all flex items-center space-x-3"
                              onClick={() => handleSuggestionClick(s)}
                            >
                              <MapPin size={18} className="text-purple-600" />
                              <span className="font-medium">{s}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                    <button
                      className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-white/30 transition-all hover:scale-105"
                      onClick={() => getweatherData()}
                      disabled={loading}
                    >
                      <Search size={24} className="text-white" />
                    </button>
                    <button
                      className="p-3 bg-white/20 backdrop-blur-md rounded-2xl hover:bg-white/30 transition-all hover:rotate-180 duration-500"
                      onClick={() => getweatherData(city)}
                      disabled={loading}
                    >
                      <RefreshCw size={24} className={`text-white ${loading ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div className="bg-white/20 backdrop-blur-md rounded-2xl p-1 flex gap-1">
                    <button
                      onClick={() => setUnit("metric")}
                      className={`px-5 py-2 rounded-xl transition-all font-semibold ${unit === "metric" ? "bg-white text-purple-600 shadow-lg" : "text-white hover:bg-white/20"}`}
                    >
                      °C
                    </button>
                    <button
                      onClick={() => setUnit("imperial")}
                      className={`px-5 py-2 rounded-xl transition-all font-semibold ${unit === "imperial" ? "bg-white text-purple-600 shadow-lg" : "text-white hover:bg-white/20"}`}
                    >
                      °F
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="backdrop-blur-xl bg-red-500/30 border border-red-500/50 rounded-2xl p-5 mb-6">
              <p className="text-white text-center font-semibold">{error}</p>
            </div>
          )}

          {/* Favorites Section */}
          {favorites.length > 0 && (
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-5 mb-6 border border-white/20">
              <h3 className="text-white/90 text-sm font-semibold mb-3 flex items-center space-x-2">
                <Heart size={18} className="text-red-400 fill-red-400" />
                <span>⭐ YOUR FAVORITE CITIES</span>
              </h3>
              <div className="flex flex-wrap gap-2">
                {favorites.map(fav => (
                  <button
                    key={fav}
                    onClick={() => loadFavoriteCity(fav)}
                    className="group relative bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-md px-5 py-2.5 rounded-xl text-white hover:from-white/30 hover:to-white/20 transition-all flex items-center space-x-2 shadow-lg"
                  >
                    <MapPin size={16} />
                    <span className="font-medium">{fav}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromFavorites(fav);
                      }}
                      className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity hover:scale-110"
                    >
                      <X size={14} />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Main Weather Display */}
          {loading ? (
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-16 text-center border border-white/20">
              <div className="animate-spin inline-block">
                <RefreshCw size={64} className="text-white" />
              </div>
              <p className="text-white mt-6 text-xl font-semibold">Fetching weather data...</p>
              <p className="text-white/70 mt-2">Finding coordinates for your city...</p>
            </div>
          ) : weatherData ? (
            <>
              <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-8 mb-6 shadow-2xl border border-white/20 hover:shadow-3xl transition-all duration-500">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                  <div className="text-center lg:text-left space-y-4 flex-1">
                    <div className="flex items-center justify-center lg:justify-start space-x-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <MapPin size={24} className="text-white" />
                      </div>
                      <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
                        {weatherData.name}, {weatherData.sys.country}
                      </h2>
                      <button
                        onClick={addToFavorites}
                        className={`p-2 rounded-xl transition-all hover:scale-110 ${favorites.includes(weatherData.name) ? "bg-red-500/50" : "bg-white/20 hover:bg-white/30"}`}
                      >
                        <Heart size={24} className={favorites.includes(weatherData.name) ? "text-red-400 fill-red-400" : "text-white"} />
                      </button>
                    </div>
                    
                    <div className="flex items-baseline justify-center lg:justify-start space-x-4">
                      <span className="text-8xl md:text-9xl font-bold text-white drop-shadow-2xl">
                        {convertTemp(weatherData.main.temp)}
                      </span>
                      <span className="text-4xl md:text-5xl text-white/80 font-light">{getTempUnit()}</span>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-3xl text-white/90 capitalize font-semibold">
                        {weatherData.weather[0].description}
                      </p>
                      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-white/80 text-sm">
                        <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full">
                          <Thermometer size={18} />
                          <span>Feels like {convertTemp(weatherData.main.feels_like)}{getTempUnit()}</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full">
                          <Droplet size={18} />
                          <span>Humidity {weatherData.main.humidity}%</span>
                        </div>
                        <div className="flex items-center space-x-2 bg-white/10 px-3 py-1.5 rounded-full">
                          <Wind size={18} />
                          <span>{getWindSpeed(weatherData.wind.speed)}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-white/10 rounded-xl border border-white/20">
                      <p className="text-white/90 text-sm flex items-center space-x-2">
                        <Umbrella size={18} />
                        <span>💡 {getWeatherAdvice(weatherData.main.temp, weatherData.weather[0].description)}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-center transform hover:scale-110 transition-transform duration-500">
                    {getWeatherIcon(weatherData.weather[0].main, 140)}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-xl">
                    <Compass size={24} className="text-cyan-300" />
                    <div>
                      <p className="text-white/60 text-xs font-semibold">WIND DIRECTION</p>
                      <p className="text-white font-bold text-lg">{getWindDirection(weatherData.wind.deg)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-xl">
                    <Eye size={24} className="text-green-300" />
                    <div>
                      <p className="text-white/60 text-xs font-semibold">VISIBILITY</p>
                      <p className="text-white font-bold text-lg">{(weatherData.visibility / 1000).toFixed(1)} km</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-xl">
                    <Gauge size={24} className="text-orange-300" />
                    <div>
                      <p className="text-white/60 text-xs font-semibold">PRESSURE</p>
                      <p className="text-white font-bold text-lg">{weatherData.main.pressure} hPa</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-white/5 rounded-xl">
                    <Cloud size={24} className="text-gray-300" />
                    <div>
                      <p className="text-white/60 text-xs font-semibold">CLOUD COVER</p>
                      <p className="text-white font-bold text-lg">{weatherData.clouds.all}%</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                <WeatherBox
                  icon={<Droplet size={32} className="text-cyan-300" />}
                  title="Humidity"
                  value={`${weatherData.main.humidity}%`}
                  description="Relative humidity level"
                  color="from-cyan-500 to-blue-500"
                />
                <WeatherBox
                  icon={<Wind size={32} className="text-emerald-300" />}
                  title="Wind Speed"
                  value={getWindSpeed(weatherData.wind.speed)}
                  description={`Direction: ${getWindDirection(weatherData.wind.deg)}`}
                  color="from-emerald-500 to-teal-500"
                />
                <WeatherBox
                  icon={<Thermometer size={32} className="text-orange-300" />}
                  title="Min / Max"
                  value={`${convertTemp(weatherData.main.temp_min)}${getTempUnit()} / ${convertTemp(weatherData.main.temp_max)}${getTempUnit()}`}
                  description="Temperature range"
                  color="from-orange-500 to-red-500"
                />
                <WeatherBox
                  icon={<Calendar size={32} className="text-purple-300" />}
                  title="Last Updated"
                  value={lastUpdated ? lastUpdated.toLocaleTimeString() : "--:--"}
                  description="Local time"
                  color="from-purple-500 to-pink-500"
                />
              </div>

              <div className="text-center mt-8 text-white/60 text-sm backdrop-blur-xl bg-white/5 rounded-xl p-4">
                <p>🌤️ Weather data provided by OpenWeatherMap | Updated in real-time</p>
                <p className="mt-1">📍 Explore Himalayan gems: <strong>Kangra ✓</strong>, <strong>Dharamshala ✓</strong>, Manali, and more!</p>
                <p className="mt-1 text-white/40 text-xs">✅ Now using Geocoding API - ANY city name works!</p>
              </div>
            </>
          ) : (
            <div className="backdrop-blur-xl bg-white/10 rounded-3xl p-16 text-center border border-white/20">
              <CloudRain size={80} className="text-white mx-auto mb-6 animate-float" />
              <h3 className="text-white text-2xl font-bold mb-2">Welcome to WeatherWise! 🌤️</h3>
              <p className="text-white/80 text-lg">
                Search for any city - Dharamshala works perfectly now!
              </p>
              <p className="text-white/60 text-sm mt-3">
                Popular: Kangra, Dharamshala, Mumbai, Delhi, Manali
              </p>
              <p className="text-white/40 text-xs mt-2">
                ✅ Using Geocoding API - Converts any city name to coordinates first
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WeatherBox = ({ icon, title, value, description, color }) => {
  return (
    <div className={`group backdrop-blur-xl bg-gradient-to-br ${color || 'from-white/20 to-white/10'} rounded-2xl p-6 hover:scale-105 transition-all duration-300 border border-white/20 shadow-xl`}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-white group-hover:scale-110 transition-transform">
          {icon}
        </div>
      </div>
      <h3 className="text-white/70 text-xs font-semibold uppercase tracking-wider mb-2">
        {title}
      </h3>
      <p className="text-white text-2xl font-bold mb-2 leading-tight">{value}</p>
      {description && (
        <p className="text-white/50 text-xs">{description}</p>
      )}
    </div>
  );
};

const X = ({ size, className }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18"></line>
      <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  );
};

export default App;