const apiKey = "YOUR_API_KEY"; // Replace with your actual OpenWeather API key

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();

  if (city === "") {
    alert("Please enter a city name.");
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then(data => {
      document.getElementById("cityName").innerText = `${data.name}, ${data.sys.country}`;
      document.getElementById("temp").innerText = `${Math.round(data.main.temp)}°C`;
      document.getElementById("condition").innerText = data.weather[0].main;
      document.getElementById("humidity").innerText = `Humidity: ${data.main.humidity}%`;
      document.getElementById("wind").innerText = `Wind: ${data.wind.speed} m/s`;

      const iconCode = data.weather[0].icon;
      document.getElementById("icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
    })
    .catch(error => {
      alert(error.message);
      console.error("Error fetching weather data:", error);
    });
}
