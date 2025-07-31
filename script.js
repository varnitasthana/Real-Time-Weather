const apiKey = '0c7957cac0080768dfbe57fcb8c2b2f0'

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");
  const animation = document.getElementById("animation");

  result.innerText = '';
  animation.className = '';

  if (!city) {
    result.innerText = "❗ Please enter a city name.";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  result.innerText = "⏳ Loading...";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod !== 200) {
      result.innerText = `❌ Error: ${data.message}`;
      return;
    }

    const condition = data.weather[0].main.toLowerCase();
    const description = data.weather[0].description;

    result.innerHTML = `
      <p><strong>📍 ${data.name}, ${data.sys.country}</strong></p>
      <p>🌡️ Temperature: ${data.main.temp}°C</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌥️ Condition: ${data.weather[0].main} (${description})</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;

    if (condition.includes('rain')) {
      animation.className = 'rainy';
    } else if (condition.includes('cloud')) {
      animation.className = 'cloudy';
    } else if (condition.includes('snow')) {
      animation.className = 'snowy';
    } else if (condition.includes('clear')) {
      animation.className = 'clear';
    } else if (condition.includes('thunder')) {
      animation.className = 'thunder';
    } else {
      animation.className = 'sunny';
    }

  } catch (err) {
    console.error(err);
    result.innerText = "❗ Unable to fetch weather data. Try again later.";
  }
}
