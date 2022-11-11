let timeSelect = document.querySelector("#time");
let dateSelect = document.querySelector("#date");
let timeDate = new Date();

let timeMinutes = timeDate.getMinutes();
if (timeMinutes < 10) {
  timeMinutes = `0${timeMinutes}`;
}
let timeHours = timeDate.getHours();
if (timeHours < 10) {
  timeHours = `0${timeHours}`;
}

timeSelect.innerHTML = `${timeHours}:${timeMinutes}`;

let day = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let dayDisplay = day[timeDate.getDay()];
let month = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let MonthDisplay = month[timeDate.getMonth()];
dateSelect.innerHTML = `${dayDisplay} ${timeDate.getDate()} ${MonthDisplay} ${timeDate.getFullYear()}`;

function weatherCitySearch(response) {
  celsiusTemp = response.data.main.temp;
  let temp = (document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemp) + "°");
  let cityName = (document.querySelector("#place").innerHTML =
    response.data.name);
  let humid = (document.querySelector("#humid").innerHTML =
    Math.round(response.data.main.humidity) + "%");
  let wind = (document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + "km/h");
  let description = (document.querySelector("#description").innerHTML =
    response.data.weather[0].description);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function searchCity(city) {
  let cityName = "new york";
  let apiKey = "f49ee1e2561369c11af5b8f8810cf134";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCitySearch);
}
function submitCity(event) {
  event.preventDefault();
  let searchBar = document.querySelector("#search");
  searchCity(searchBar.value);
}
function showCelsius(event) {
  event.preventDefault();
  let mainCelsius = document.querySelector("#temperature");
  mainCelsius.innerHTML = Math.round(celsiusTemp) + "°";
}
function showFahrenheit(event) {
  event.preventDefault();
  let mainFahrenheit = document.querySelector("#temperature");
  let fahrenheitConversion = (celsiusTemp * 9) / 5 + 32;
  mainFahrenheit.innerHTML = Math.round(fahrenheitConversion) + "°";
}
function searchPosition(position) {
  let apiKey = "f49ee1e2561369c11af5b8f8810cf134";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCitySearch);
  console.log(apiUrl);
}
function findcurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", findcurrentLocation);
let celsiusTemp = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
let formSelector = document.querySelector("#weather-form");
formSelector.addEventListener("submit", submitCity);
searchCity("paris");
