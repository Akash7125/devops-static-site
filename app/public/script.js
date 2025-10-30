async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  try {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.city}, ${data.country}</h2>
      <p>🌡️ Temperature: ${data.temperature}°C (Feels like ${data.feels_like}°C)</p>
      <p>🌤️ Condition: ${data.description}</p>
      <p>💧 Humidity: ${data.humidity}%</p>
      <p>🌬️ Wind Speed: ${data.wind_speed} m/s</p>
      <p>🌡️ Min: ${data.temp_min}°C | Max: ${data.temp_max}°C</p>
      <p>🕓 Local Time (IST): ${data.local_time}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = "<p>Unable to fetch weather data.</p>";
  }
}
