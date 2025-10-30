async function getWeather() {
  const city = document.getElementById("city").value.trim();
  const resultDiv = document.getElementById("result");

  if (!city) {
    resultDiv.innerHTML = `<p>Please enter a city name</p>`;
    return;
  }

  try {
    const response = await fetch(`/api/weather?city=${city}`);
    const data = await response.json();

    if (data.error) {
      resultDiv.innerHTML = `<p>${data.error}</p>`;
    } else {
      resultDiv.innerHTML = `
        <h2>${data.city}, ${data.country}</h2>
        <p class="temp">${data.temperature.toFixed(2)}°C</p>
        <p>${data.weather} - ${data.description}</p>
        <div class="details">
          <p>💧 Humidity: ${data.humidity}%</p>
          <p>🌬️ Wind: ${data.wind_speed} m/s</p>
        </div>
      `;
    }
  } catch (err) {
    resultDiv.innerHTML = `<p>Unable to fetch weather data</p>`;
  }
}
