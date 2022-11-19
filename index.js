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

function getWeekForecast(coordinates) {
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}`;
  axios.get(apiUrl).then(weatherForecast);
}
function weatherCitySearch(response) {
  celsiusTemp = response.data.temperature.current;
  let temp = (document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemp) + "°");
  let cityName = (document.querySelector("#place").innerHTML =
    response.data.city);
  let humid = (document.querySelector("#humid").innerHTML =
    Math.round(response.data.temperature.humidity) + "%");
  let wind = (document.querySelector("#wind").innerHTML =
    Math.round(response.data.wind.speed) + "km/h");
  let description = (document.querySelector("#description").innerHTML =
    response.data.condition.description);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  getWeekForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
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
  fahrenheit.classList.remove("active");
  celsius.classList.add("active");
}
function showFahrenheit(event) {
  event.preventDefault();
  let mainFahrenheit = document.querySelector("#temperature");
  let fahrenheitConversion = (celsiusTemp * 9) / 5 + 32;
  mainFahrenheit.innerHTML = Math.round(fahrenheitConversion) + "°";
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
}

function searchPosition(position) {
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(weatherCitySearch);
}
function findCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchPosition);
}
function displayDay(weekday) {
  let date = new Date(weekday * 1000);
  let day = date.getDay();
  let days = ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"];

  return days[day];
}

function weatherForecast(response) {
  let forecastData = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = `<div class="row">`;
  forecastData.forEach(function (forecastDay) {
    forecastHtml =
      forecastHtml +
      `        
     <div class="col-1">
      
       <div class="temp-border">
 <div class="day">${displayDay(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
            forecastDay.condition.icon
          }.png"
          alt="Weather icon"
          class="forecast-icon"
        />
        <div class="forecast-temps">
          <span class="temp1" id="temp1">${
            Math.round(forecastDay.temperature.maximum) + "°"
          }</span>
          <span class="temp2" id="temp2">${
            Math.round(forecastDay.temperature.minimum) + "°"
          }</span>
        </div>
       </div>
     </div>

        `;
  });
  forecastHtml = forecastHtml + `</div>`;
  forecastElement.innerHTML = forecastHtml;
}

let apiKey = "5tc304bf7ddcboc14c696c0e7aad7093";
let currentLink = document.querySelector("#currentLink");
currentLink.addEventListener("click", findCurrentLocation);
let celsiusTemp = null;
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius);
let formSelector = document.querySelector("#weather-form");
formSelector.addEventListener("submit", submitCity);
searchCity("paris");
