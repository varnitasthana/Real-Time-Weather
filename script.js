const apiKey = "bf4529d06a7be515d25b3d6434d5bae9"

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const result = document.getElementById("weatherResult");

  if (!city) {
    result.innerHTML = "Please enter a city name.";
    return;
  }

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      const temp = data.main.temp;
      const humidity = data.main.humidity;
      const description = data.weather[0].description;
      const wind = data.wind.speed;

      result.innerHTML = `
        <h2>Weather in ${city}</h2>
        <p>🌡️ Temperature: ${temp}°C</p>
        <p>💧 Humidity: ${humidity}%</p>
        <p>🌬️ Wind: ${wind} km/h</p>
        <p>☁️ Description: ${description.toUpperCase()}</p>
      `;
    })
    .catch(error => {
      result.innerHTML = "Error: " + error.message;
    });
}
        
