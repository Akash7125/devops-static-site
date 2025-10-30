async function getWeather() {
  const city = document.getElementById("city").value;
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Fetching weather data...";

  try {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();

    if (data.error) {
      resultDiv.innerHTML = `<p>${data.error}</p>`;
      return;
    }

    resultDiv.innerHTML = `
      <h2>${data.city}, ${data.country}</h2>
      <p>🌡️ Temperature: ${data.temperature}°C</p>
      <p>🔺 Max: ${data.temp_max}°C | 🔻 Min: ${data.temp_min}°C</p>
      <p>💧 Humidity: ${data.humidity}%</p>
      <p>🌬️ Wind: ${data.wind_speed} m/s</p>
      <p>⏱️ Pressure: ${data.pressure} hPa</p>
      <p>🕓 Local Time: ${data.timezone}</p>
      <p>${data.weather} - ${data.description}</p>
    `;
  } catch (err) {
    resultDiv.innerHTML = `<p>Unable to fetch weather data.</p>`;
  }
}
