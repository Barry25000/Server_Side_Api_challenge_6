const firstDayElement = document.getElementById("firstDay");
const secondDayElement = document.getElementById("secondDay");
const thirdDayElement = document.getElementById("thirdDay");
const fourthDayElement = document.getElementById("fourthDay");
const fifthDayElement = document.getElementById("fifthDay");

fetch(
  "https://api.openweathermap.org/data/2.5/forecast?q=London,uk&APPID=f143fe1fd933ca340292950f394916e2&units=imperial"
)
  .then(function (response) {
    if (!response.ok) {
      throw response.json();
    }
    // console.log(response);
    return response.json();
  })
  .then(function (response) {
    console.log(response);
    const firstDay = response.list[4];
    const secondDay = response.list[12];
    const thirdDay = response.list[20];
    const fourthDay = response.list[28];
    const fifthDay = response.list[36];
    console.log(firstDay);
    displayWeather(firstDay, firstDayElement);
    displayWeather(secondDay, secondDayElement);
    displayWeather(thirdDay, thirdDayElement);
    displayWeather(fourthDay, fourthDayElement);
    displayWeather(fifthDay, fifthDayElement);
  });

function displayWeather(weatherObject, weatherElement) {
  // console.log(weatherObject, weatherElement);
  weatherElement.innerHTML = weatherObject.dt_txt;
  weatherElement.innerHTML += "<br>";
  weatherElement.innerHTML += "Temp: " + weatherObject.main.temp + " °F";
  weatherElement.innerHTML += "<br>";
  weatherElement.innerHTML += "Wind: " + weatherObject.wind.speed + " MPH";
  weatherElement.innerHTML += "<br>";
  weatherElement.innerHTML += "Humidity " + weatherObject.main.humidity + "%";
}
