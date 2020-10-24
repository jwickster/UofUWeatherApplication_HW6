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

//function call