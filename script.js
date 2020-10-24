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
    weatherApplicationFinal();
});

function weatherApplicationFinal() {
    //API key 
    var apiKey = "e686e0dce848c687199057ba5b1706c5";
    //Query API and concat with city input and api key 
    var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid" + apiKey;

    $.ajax({
        //point url to the url above and use GET method to retrive the information from server
        url: url,
        method: "GET"
    }).then(function (response) {
            //console log printf statement for debugging
            //console.log(response.weather[0].icon);
        }


    }