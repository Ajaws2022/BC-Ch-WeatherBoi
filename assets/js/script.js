// get the weather url and set it as a variable

// append the results to the forecast display and create a button with the search word

// within the function set the query as a button with a city name so that it can be called later
// 


var search = document.getElementById('searchButton')

var APIKey = '7cb92b27a8129439217e5257f292a3e9';
var currWeather = document.querySelector(".weather")
var city = document.getElementById('cityName').value;



var pastSearches = document.getElementById('pastSearches') 

// function getApi(queryURL) {
//     fetch(queryURL)
//       .then(function (response) {
//         console.log(response);
//         if (response.status === 200) {
//           pastSearches.textContent = `${response.status}`;
//         }
//         console.log(response.json());
//          return response.body;
//     });
//   }

//   getApi(queryURL)

function fetchWeather(){
  var inputCity = document.getElementById('cityName').value;
  
  var queryURL = 
  "http://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&units=imperial&appid="+APIKey;

  fetch(
    queryURL
  ).then((response) => response.json())
  .then((data)=> displayWeather(data));

    function displayWeather(data){
       const { name } = data;
       const { icon, description} = data.weather[0];
       const { temp } = data.main;
       const { humidity } = data.main;
       const { speed } = data.wind;
       console.log(name, icon, description, temp, humidity, speed)
       document.querySelector(".city").innerHTML = "Weather in " + name;
       document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + 
       ".png";
       document.querySelector(".temp").innerHTML = temp + "°F";
       document.querySelector(".description").innerHTML = description;
       document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
       document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + " mph";

    }

}

function fetchForecast(){
  var inputCity = document.getElementById('cityName').value;
  
  var forecastURL = "http://api.openweathermap.org/data/2.5/forecast?q="+inputCity+"&units=imperial&cnt=5&appid="+APIKey

  fetch(
    forecastURL
  ).then((response) => response.json())
  .then((data)=> createForecast(data));
  }
  
var lati;

var longi;

function getCoords(data){
  var inputCity = document.getElementById('cityName').value;
  var geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&limit=1&appid=" +APIKey
  fetch(
    geoCode
  ).then((response) => response.json())
   let { lat } = data
   let { long } = data
   lati.value = lat;
   longi.value = long;
}

  function createForecast(data){
  //  for(i=0; i<=5; i++){
      var dayBox = document.getElementsByClassName('dayBox')

      console.log(data.list)

      for(i=0; i<5; i++){
        
        console.log(data.list[i]);
        var forecastDay = data.list[i];
        let { icon, description} = forecastDay.weather[0];
        let { temp } = forecastDay.main;
        let { humidity } = forecastDay.main;
        let { speed } = forecastDay.wind;
        let { dt } = forecastDay
        console.log(temp,humidity,speed,description,icon)
        console.log(dayBox[i])
        let unixStamp = dt; 
        let milliseconds = unixStamp * 1000;
        let dateObject = new Date(milliseconds)
        let trueDate = dateObject.toLocaleDateString("en-US")
        dayBox[i].querySelector('h3').innerHTML= trueDate;
        console.log(trueDate)
      }

  }


function searchByCity(){
  var inputCity = document.getElementById('cityName').value;
  fetchWeather(inputCity)
}

search.addEventListener('click', searchByCity);
search.addEventListener('click', fetchForecast);

