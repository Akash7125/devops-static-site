// ✅ Change to CommonJS syntax
const express = require("express");
const axios = require("axios");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;
const API_KEY = "c3bc528d4f17fa15cfd83a03a1b60db0";

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// API route
app.get("/api/weather", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City name required" });

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    const data = response.data;
    const localTime = new Date((data.dt + data.timezone) * 1000).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    res.json({
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
      wind_deg: data.wind.deg,
      clouds: data.clouds.all,
      timezone: localTime,
    });
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch weather data" });
  }
});

// ✅ Important — listen on all interfaces inside Docker
app.listen(PORT, "0.0.0.0", () => console.log(`✅ Server running on http://localhost:${PORT}`));
