// get the weather url and set it as a variable

// append the results to the forecast display and create a button with the search word

// within the function set the query as a button with a city name so that it can be called later
// 


var search = document.getElementById('searchButton')

var APIKey = '7cb92b27a8129439217e5257f292a3e9';

var currWeather = document.querySelector(".weather")

// var city = document.getElementById('cityName').value;

var pastSearches = document.getElementById('pastSearches') 

var cityBtn = document.querySelectorAll('.cityBtn')
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
function addButton(){
  let btnName = document.getElementById('cityName').value;
  let btn = document.createElement('button');
  btn.innerHTML = btnName;
  btn.type = "submit";
  btn.className = "cityBtn"
  // btn.onclick = clearInput;
  btn.onclick = getCoordByBtn;
  
  document.querySelector('#pastSearches').appendChild(btn)
  clearInput();
}
function clearInput(){
  let getValue = document.getElementById("cityName");
    if (getValue.value !="") {
        getValue.value = "";
    }
}
// Gets the weather for a single day
function fetchWeather(){
  let inputCity = document.getElementById('cityName').value;
  
  let queryURL = 
  "http://api.openweathermap.org/data/2.5/weather?q="+inputCity+"&units=imperial&appid="+APIKey;

  fetch(
    queryURL
  ).then((response) => response.json())
  .then((data)=> displayWeather(data));

    function displayWeather(data){
       let { name } = data;
       let { icon, description} = data.weather[0];
       let { temp } = data.main;
       let { humidity } = data.main;
       let { speed } = data.wind;
       console.log(name, icon, description, temp, humidity, speed)
       document.querySelector(".city").innerHTML = "Weather in " + name;
       document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + 
       ".png";
       document.querySelector(".temp").innerHTML = temp + "??F";
       document.querySelector(".description").innerHTML = description;
       document.querySelector(".humidity").innerHTML = "Humidity: " + humidity + "%";
       document.querySelector(".wind").innerHTML = "Wind Speed: " + speed + " mph";

       
    }
    // inputCity = "";
    
}

// retrieves the geocode information based on the input value
function getCoords(){
  let inputCity = document.getElementById('cityName').value;
  let geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&limit=1&appid=" +APIKey
  fetch(
    geoCode
  ).then((response) => response.json())
  .then((data) => findCoords(data))
}

function getCoordByBtn(event){

  let inputCity = document.getElementById('cityName').value
  console.log(inputCity)
  // inputCity = "";
  console.log(inputCity)
  var inputBtn = event.target.innerHTML;
  console.log(inputBtn)
  
  // inputCity.remove.value
  inputCity = inputBtn;
  console.log(inputCity);
  
  let geoCode = "http://api.openweathermap.org/geo/1.0/direct?q=" + inputCity + "&limit=1&appid=" +APIKey
  console.log(geoCode)
  fetch(
    geoCode
  ).then((response) => response.json())
  .then((data) => findCoords(data))
  .then(fetchWeather())
}

// uses the geo data to get the lat. and lon. values 
function findCoords(data){

  let location = data[0]
   let lat = location.lat;
   let long = location.lon;
   lati = lat;
   longi = long;
   console.log(lati, longi)
   fetchForecast(data)
}

var lati;

var longi;

// Uses the longitude and latitude values to fetch an 8 day forecast
function fetchForecast(){
  
  var forecastURL = "https://api.openweathermap.org/data/3.0/onecall?lat=" + lati + "&lon=" + longi + "&units=imperial&exclude=current,minutely,hourly,alerts&appid=" + APIKey

  fetch(
    forecastURL
  ).then((response) => response.json())
  .then((data)=> createForecast(data));
}
  
// Creates a forecast with needed info based on the retrieved data
function createForecast(data){
  //  for(i=0; i<=5; i++){
      var dayBox = document.getElementsByClassName('dayBox')

      // console.log(data.daily[0])

      for(i=0; i<5; i++){
        
        // console.log(data.daily[i + 1]);
        // +1 used to avoid current date data since it is displayed separate of the 5 day forecast
        var forecastDay = data.daily[i + 1];
        let { icon, description} = forecastDay.weather[0];
        let { day } = forecastDay.temp;
        let { humidity } = forecastDay;
        let { wind_speed } = forecastDay;
        let { dt } = forecastDay
        // console.log(day,humidity,wind_speed,description,icon)
        // console.log(dayBox[i])

        // uses the unix data in the forecast to create a real date
        let unixStamp = dt; 
        let milliseconds = unixStamp * 1000;
        let dateObject = new Date(milliseconds)
        let trueDate = dateObject.toLocaleDateString("en-US")

        dayBox[i].querySelector('h3').innerHTML= trueDate;
        dayBox[i].querySelector("img").src = "http://openweathermap.org/img/wn/" + icon + 
        ".png";
        dayBox[i].querySelector(".desc").innerHTML = description;
        dayBox[i].querySelector(".dayTemp").innerHTML = "Temp: " + day;
        dayBox[i].querySelector(".dayWind").innerHTML = "Wind Speed: " + wind_speed + "mph";
        dayBox[i].querySelector(".dayHum").innerHTML = "Humidity: " + humidity + "%";

        // console.log(trueDate)
      }

  }

search.addEventListener('click', fetchWeather);
search.addEventListener('click', getCoords);
search.addEventListener('click', addButton);

// var prevSearch = document.querySelector('#pastSearches')

// prevSearch.addEventListener( 'click', function (event) {
//   if( event.target.classList.contains('cityBtn') ) {
//     getCoordByBtn;
//   };
// } );
// search.addEventListener('click', fetchForecast);

