// server.js
const express = require("express");
const axios = require("axios");
const app = express();
const PORT = 8080;

const API_KEY = "c3bc528d4f17fa15cfd83a03a1b60db0";

app.use(express.static("app/public"));

app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    const data = response.data;

    // Convert timezone seconds → readable IST time
    const timezoneOffset = data.timezone; // in seconds
    const localTime = new Date(Date.now() + timezoneOffset * 1000)
      .toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const result = {
      city: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      weather: data.weather[0].main,
      description: data.weather[0].description,
      wind_speed: data.wind.speed,
      timezone: localTime
    };

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
