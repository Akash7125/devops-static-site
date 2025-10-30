async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const errorMsg = document.getElementById("error-msg");
  const weatherIcon = document.getElementById("weather-icon");
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const condition = document.getElementById("condition");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");

  if (!city) {
    errorMsg.textContent = "Please enter a city name.";
    return;
  }

  errorMsg.textContent = "Fetching weather...";
  weatherIcon.src = "search.png";

  try {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    if (!response.ok || data.error) throw new Error(data.error || "Unable to fetch weather");

    cityName.textContent = `${data.city}, ${data.country}`;
    condition.textContent = data.weather;
    temperature.textContent = `${data.temperature}°C`;
    humidity.textContent = `${data.humidity}%`;
    wind.textContent = `${data.wind_speed} m/s`;

    const weatherType = data.weather.toLowerCase();
    if (weatherType.includes("clear")) weatherIcon.src = "clear.svg";
    else if (weatherType.includes("cloud")) weatherIcon.src = "clouds.svg";
    else if (weatherType.includes("rain")) weatherIcon.src = "rain.svg";
    else if (weatherType.includes("drizzle")) weatherIcon.src = "drizzle.svg";
    else if (weatherType.includes("thunderstorm")) weatherIcon.src = "thunderstorm.svg";
    else if (weatherType.includes("snow")) weatherIcon.src = "snow.svg";
    else if (weatherType.includes("mist") || weatherType.includes("fog")) weatherIcon.src = "atmosphere.svg";
    else weatherIcon.src = "not-found.png";

    errorMsg.textContent = "";
  } catch (err) {
    errorMsg.textContent = "Unable to fetch weather data.";
    weatherIcon.src = "not-found.png";
  }
}
