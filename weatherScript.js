// Weather API Key: 955f10e58acb14070de949096114de11
// Example API Call: api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=955f10e58acb14070de949096114de11
const search = document.querySelector("#SearchButton");
search.addEventListener("click", () => {
  let location = document.querySelector("#location").value;
  document.querySelector("#location").textContent = "";
  fetch(
    `http://api.openweathermap.org/geo/1.0/zip?zip=${location},us&appid=955f10e58acb14070de949096114de11`
  )
    .then((response) => response.json())
    .then((place) => {
      let cityName = place.name;
      let geo = [];
      geo.push(place.lat);
      geo.push(place.lon);
      document.querySelector("#place").textContent += cityName;
      return geo;
    })
    .then((geo) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${geo[0]}&lon=${geo[1]}&appid=955f10e58acb14070de949096114de11`
      )
        .then((response) => response.json())
        .then((weather) => console.log(JSON.stringify(weather)));
    });
});
