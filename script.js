//Linking variables to jQuery
//capturing Name, temp, humidity, wind speed, UV index, long/latitude
var cityUVIndex = $(".uvIndex");
var cityName = $(".temp");
var cityHumidity = $(".humidity");
var cityWindSpeed = $(".windSpeed");
var cityTemperature = $(".temp");
var cityLongitude = "";
var cityLatitude = "";

//JSON parse
var localStorageCity = JSON.parse(localStorage.getItem("cityName"));

//Logic

//Event handler to populate when searchButton is pressed
$("#find-city").on("click", function (event) {
    event.preventDefault();
    //create city and link to city-input id
    var city = $("#city-input");
    //create button tag and assign to searchButton
    var searchButton = ("<button>");
    //Search button text city
    searchButton.text(city);
    //Stringify the city input to parse by JSON
    localStorage.setItem("cityName", JSON.stringify(city));

    //TODO call function
});

function