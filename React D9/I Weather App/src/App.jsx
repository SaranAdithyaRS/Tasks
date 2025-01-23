import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);

  // Fake API for demonstration
  const fakeWeatherApi = async (cityName) => {
    const weatherConditions = {
      Sunny: { temp: "27°C", high: "30°C", low: "20°C", desc: "Sunny", wind: "10 km/h", humidity: "40%" },
      Cloudy: { temp: "21°C", high: "25°C", low: "18°C", desc: "Cloudy", wind: "8 km/h", humidity: "50%" },
      Rainy: { temp: "18°C", high: "22°C", low: "15°C", desc: "Rainy", wind: "12 km/h", humidity: "70%" },
    };

    const randomCondition = Object.keys(weatherConditions)[Math.floor(Math.random() * 3)];
    return { city: cityName, condition: randomCondition, ...weatherConditions[randomCondition] };
  };

  // Fetch weather by city
  const fetchWeather = async () => {
    if (!city) return alert("Please enter a city!");
    setLoading(true);
    setTimeout(async () => {
      const data = await fakeWeatherApi(city);
      setWeather(data);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className={`app ${weather ? weather.condition.toLowerCase() : ""}`}>
      <header className="app-header">
        <h1 className="app-title">iWeather</h1>
      </header>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Search</button>
      </div>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : weather ? (
        <div className="weather-container fade-in">
          <h1>{weather.city}</h1>
          <h2>{weather.temp}</h2>
          <p>{weather.desc}</p>
          <div className="details">
            <div>
              <p>High</p>
              <p>{weather.high}</p>
            </div>
            <div>
              <p>Low</p>
              <p>{weather.low}</p>
            </div>
            <div>
              <p>Humidity</p>
              <p>{weather.humidity}</p>
            </div>
            <div>
              <p>Wind</p>
              <p>{weather.wind}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="prompt">Search for a city to see the weather!</p>
      )}
    </div>
  );
};

export default App;
