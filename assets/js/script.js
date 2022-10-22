// get the weather url and set it as a variable

// append the results to the forecast display and create a button with the search word

// within the function set the query as a button with a city name so that it can be called later
// 
var inputCity = document.getElementById('#cityName')

var search = document.getElementById('#searchButton')

var APIKey = '7cb92b27a8129439217e5257f292a3e9';

var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + 'Riverside' + "&appid=" + APIKey;

var pastSearches = document.getElementsByClassName('.pastSearches')

pastSearches.textContent = 'Im alive';

console.log(pastSearches.textContent)

function getApi(queryURL) {
    fetch(queryURL)
      .then(function (response) {
        console.log(response);
        if (response.status === 200) {
          pastSearches.textContent = `${response.status}`;
        }
        console.log(response.json());
        return response.body;
    });
  }

  getApi(queryURL)

  console.log(pastSearches.textContent)