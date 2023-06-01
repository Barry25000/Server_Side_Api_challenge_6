const city_name = document.getElementById("city-search"); // grab city name from search field
const firstDayElement = document.getElementById("firstDay");
const secondDayElement = document.getElementById("secondDay");
const thirdDayElement = document.getElementById("thirdDay");
const fourthDayElement = document.getElementById("fourthDay");
const fifthDayElement = document.getElementById("fifthDay");
const currentElement = document.getElementById("Current");
const searchForm = document.querySelector(".search-form");

function forecast() {
  //fetch 5 day weather outlook from API
  fetch(
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
      city_name.value +
      "&APPID=f143fe1fd933ca340292950f394916e2&units=imperial"
  )
    .then(function (response) {
      
      return response.json();
    })
    .then(function (response) {
      const startDay = response.list[0]
      const firstDay = response.list[4];
      const secondDay = response.list[12];
      const thirdDay = response.list[20];
      const fourthDay = response.list[28];
      const fifthDay = response.list[36];
      var iconCode = response.list[0].weather[0].icon;
      var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png";
      console.log(startDay);
      displayWeather(firstDay, firstDayElement);
      displayWeather(secondDay, secondDayElement);
      displayWeather(thirdDay, thirdDayElement);
      displayWeather(fourthDay, fourthDayElement);
      displayWeather(fifthDay, fifthDayElement);
      displayWeather(startDay, currentElement);
    });
}

function current() {
  //fetch current weather from API
  fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city_name.value +
      "&APPID=f143fe1fd933ca340292950f394916e2&units=imperial"
  )
    .then(function (response) {
     return response.json();
    })
    .then(function (response) {
      const current = response;
      displayWeather(current, currentElement);

    });
}

    //calling functions to start the program
function logSubmit(event) {
  event.preventDefault();
  current();
  forecast();
}

    //write weather data to DOM
function displayWeather(weatherObject, weatherElement) {
   
  var iconUrl = "http://openweathermap.org/img/w/" + weatherObject.weather[0].icon + ".png";
  weatherElement.innerHTML = weatherObject.dt_txt || new Date().toLocaleDateString(); //No date, grab current date off of Local
  weatherElement.innerHTML += "<br>";
  weatherElement.innerHTML += "Temp: " + Math.round(weatherObject.main.temp) + " °F";
  weatherElement.innerHTML += "<br>";
  weatherElement.innerHTML += "Wind: " + Math.round(weatherObject.wind.speed) + " MPH";
  weatherElement.innerHTML += "<br>";
  weatherElement.innerHTML += "Humidity " + Math.round(weatherObject.main.humidity) + "%";
  weatherElement.innerHTML +="<br>";
  weatherElement.innerHTML += `<img src="${iconUrl}">`;
}

    //Fun starts here, waiting for the search button push
searchForm.addEventListener("submit", logSubmit);
