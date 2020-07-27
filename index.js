//Current date
function CurrentDate() {
  let today = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let months = [
    "January",
    "February",
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

  let minutes = today.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let hours = today.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let day = days[today.getDay()];
  let time = hours + `:` + minutes;
  let month = months[today.getMonth()];
  let date = today.getDate();

  return `${day}, ${date} ${month} ${time}`;
}

let currentDate = document.querySelector("#today");
currentDate.innerHTML = CurrentDate();

//search form
function currentWeather(response) {
  let searchedCity = document.querySelector("#currentCity");
  searchedCity.innerHTML = response.data.name;
  let temperature = document.querySelector(".temp");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let feelsLike = document.querySelector(".feelsLike");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
  let humidity = document.querySelector(".humidity");
  humidity.innerHTML = Math.round(response.data.main.humidity);
  let wind = document.querySelector(".wind");
  wind.innerHTML = Math.round(response.data.wind.speed);
  let description = document.querySelector(".description");
  description.innerHTML = response.data.weather[0].main;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  let apiKey = `91de7449ab8633be763a2c086e4ca924`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&&units=metric`;
  axios.get(apiUrl).then(currentWeather);
}

let changeCity = document.querySelector("#city-form");
changeCity.addEventListener("submit", searchCity);

//current Position button
function currentPosition(position) {
  let apiKey = "91de7449ab8633be763a2c086e4ca924";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(currentWeather);
}

function getLoc() {
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let button = document.querySelector("#currentLoc");
button.addEventListener("click", getLoc);
