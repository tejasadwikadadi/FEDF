import React, { useState, useEffect } from "react";

function Weather() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const fetchWeather = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=17.38&longitude=78.48&current_weather=true"
      );

      if (!response.ok) {
        throw new Error("Unable to fetch weather data");
      }

      const data = await response.json();

      setWeather(data.current_weather);
      setLastUpdated(new Date().toLocaleString());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();

    const interval = setInterval(fetchWeather, 30000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <h2 className="loading">Loading Weather Information...</h2>;
  }

  if (error) {
    return <h2 className="error">Error: {error}</h2>;
  }

  return (
    <div className="weather-container">
      <h1>🌤 Weather Information System</h1>

      <h3>📍 Hyderabad</h3>

      <p>🕒 Time: {new Date().toLocaleTimeString()}</p>

      <div className="weather-card">
        <p>🌡 Temperature: {weather.temperature} °C</p>

        <p>
          {weather.temperature > 30
            ? "🔥 Hot Weather"
            : "❄ Cool Weather"}
        </p>

        <p>💨 Wind Speed: {weather.windspeed} km/h</p>

        <p>
          Wind Status:
          {weather.windspeed > 20
            ? " 🌪 Strong"
            : " 🍃 Normal"}
        </p>

        <p>🧭 Wind Direction: {weather.winddirection}°</p>
      </div>

      <p>Last Updated: {lastUpdated}</p>

      <button
        className="refresh-btn"
        onClick={fetchWeather}
      >
        Refresh Weather
      </button>
    </div>
  );
}

export default Weather;