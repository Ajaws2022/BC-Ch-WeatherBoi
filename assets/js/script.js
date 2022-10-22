// get the weather url and set it as a variable

// create a function that combines the search word with the url using the split method
// append the results to the forecast display and create a button with the search word
// within the function set the search in local storage so that it can be shown later
// 
var inputCity = document.getElementById('#cityName')

var search = document.getElementById('#searchButton')

var APIKey = '7cb92b27a8129439217e5257f292a3e9';

var city;

var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;


