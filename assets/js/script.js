const city_name = document.getElementById("city-search"); // grab city name from search field
const firstDayElement = document.getElementById("firstDay");
const secondDayElement = document.getElementById("secondDay");
const thirdDayElement = document.getElementById("thirdDay");
const fourthDayElement = document.getElementById("fourthDay");
const fifthDayElement = document.getElementById("fifthDay");
const currentElement = document.getElementById("Current");
const searchForm = document.querySelector(".search-form");
var searchHistoryElement = document.querySelector(".search-history");


  // initialize local storage for history saves, if local storage key is abscent

  let historyCheck=localStorage.getItem("history") || localStorage.setItem("history", "");
    


    // append search history to site
function writeHistory () {

  local_pull=localStorage.getItem("history");
  console.log(local_pull);

   const searchHistoryItem = document.createElement('a');
   searchHistoryItem.className = "list-group-itemn list-group-item-action";
  searchHistoryItem.textContent = local_pull;
  searchHistoryElement.appendChild(searchHistoryItem);
  // searchHistoryElement.className = d-block;
}





// localStorage.setItem("search", "san antonia");
// searchHistory=localStorage.getItem("search");

function saveHistory() {
    
  let searched_city=JSON.stringify(city_name.value);
      
    // local_pull=localStorage.getItem("history"); 
        
    // let result = local_pull.concat(searched_city);
        
    // localStorage.setItem("history", result);
    localStorage.setItem("history", searched_city);
    
}




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
  saveHistory();
  writeHistory();
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
