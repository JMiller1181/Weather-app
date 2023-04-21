const search = document.querySelector("#SearchButton");
search.addEventListener("click", () => {
  let location = document.querySelector("#location").value;
  document.querySelector("#location").value = "";
  fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${location},us&appid=955f10e58acb14070de949096114de11`
  )
    .then((response) => response.json())
    .then((place) => {
      let cityName = place.name;
      let geo = [];
      geo.push(place.lat);
      geo.push(place.lon);
      document.querySelector("#place").textContent = cityName;
      return geo;
    })
    .then((geo) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geo[0]}&lon=${geo[1]}&appid=955f10e58acb14070de949096114de11&units=imperial`
      )
        .then((response) => response.json())
        .then((weather) => {
          const date = new Date(weather.dt * 1000);
          console.log(weather);
          document.querySelector("#locality").innerHTML = weather.name;
          document.querySelector("#date").innerHTML =
            date.getMonth() + 1 + " / " + date.getDate();
          document.querySelector("#currentTemp").innerHTML =
            weather.main.temp + "°F";
          document.querySelector("#feelsLike").innerHTML =
            weather.main.feels_like + "°F";
          document.querySelector("#currentWeather").innerHTML =
            weather.weather[0].description;
          document.querySelector(
            "#weatherIcon"
          ).src = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
          document.querySelector("#windSpeed").innerHTML = weather.wind.speed;
          document.querySelector("#lo").innerHTML =
            weather.main.temp_min + "°F";
          document.querySelector("#hi").innerHTML =
            weather.main.temp_max + "°F";
        })
        .catch((error) => {
          console.log(error);
          document.querySelector("#locality").innerHTML =
            "Sorry, there was an error fetching the weather data";
          document.querySelector("#date").innerHTML = "";
          document.querySelector("#currentTemp").innerHTML = "";
          document.querySelector("#feelsLike").innerHTML = "";
          document.querySelector("#currentWeather").innerHTML = "";
          document.querySelector("#windSpeed").innerHTML = "";
          document.querySelector("#lo").innerHTML = "";
          document.querySelector("#hi").innerHTML = "";
        });
    })
    .catch((error) => {
      console.log(error);
      document.querySelector("#place").textContent =
        "Sorry, there was an error fetching the location data";
      document.querySelector("#locality").innerHTML = "";
      document.querySelector("#date").innerHTML = "";
      document.querySelector("#currentTemp").innerHTML = "";
      document.querySelector("#feelsLike").innerHTML = "";
      document.querySelector("#currentWeather").innerHTML = "";
      document.querySelector("#windSpeed").innerHTML = "";
      document.querySelector("#lo").innerHTML = "";
      document.querySelector("#hi").innerHTML = "";
    });
});
