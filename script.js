var cityName = $(".cityName");
var cityTemp = $(".temp");
var cityHumidity = $(".humidity");
var cityWindSpeed = $(".windSpeed");
var cityUvIndex = $(".uvIndex");
var cityLatitude = "";
var cityLongitude = "";

var cityFromLocalStorage = JSON.parse(localStorage.getItem("cityName"));
weatherApp(cityFromLocalStorage);

$("#find-city").on("click", function (event) {
    event.preventDefault();
    
    var city = $("#city-input").val();
    var searchedBtn = $("<button>");
    searchedBtn.text(city);
    $(".searched").append(searchedBtn);
    
    localStorage.setItem("cityName", JSON.stringify(city));
    weatherApp(city);
});

function weatherApp(city) {
    var apiKey = "e686e0dce848c687199057ba5b1706c5";
    var queryurl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city + "&appid=" + apiKey;
    
    $.ajax({
        url: queryurl,
        method: "GET",
    }).then(function (response) {
        console.log(response.weather[0].icon);
        
        var currentImage = $("<img>");
        currentImage.attr("src", "https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png");
        //convert Kelven to farenheit https://www.checkyourmath.com/convert/temperature/kelvin_fahrenheit.php
        var actualTemp = Math.floor((response.main.temp - 273.15) * 1.8 + 32);
        
        cityName.html(response.name);
        cityName.append(currentImage);
        cityTemp.html("Temp : " + actualTemp);
        cityHumidity.html("Local Humidty : " + response.main.humidity);
        cityWindSpeed.html("Windspeed speed : " + response.wind.speed);
        cityLatitude = response.coord.lat;
        cityLongitude = response.coord.lon;
        
        //Get UV Index
        var uvIndexurl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + cityLatitude + "&lon=" + cityLongitude;
        $.ajax({
            url: uvIndexurl,
            method: "GET",
            
            
        }).then(function (UVindex) {
            
            cityUvIndex.html("UV Index : " + UVindex.value);
            
            var fiveDayQueryUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
            $.ajax({
                url: fiveDayQueryUrl,
                method: "GET",
            }).then(function (fiveDayForecast) {$(".fiveDayRow").empty();
                
                // for the five day forcast
                
                for (var i = 0; i < fiveDayForecast.list.length; i++) {
                    //if five day forecast at index i search element 12:00:00 is not equal to -1
                    if (fiveDayForecast.list[i].dt_txt.indexOf("12:00:00") !== -1) {
                        //
                        var date = fiveDayForecast.list[i].dt_txt;
                        date = moment.parseZone(date).format("MMM Do");
                        var tempF = Math.floor(
                            //convert Kelven to farenheit https://www.checkyourmath.com/convert/temperature/kelvin_fahrenheit.php
                            (fiveDayForecast.list[i].main.temp - 273.15) * 1.8 + 32
                        );
                        
                        
                        var humidityFive = fiveDayForecast.list[i].main.humidity;
                        var wrapper = $("<div>");
                        wrapper.attr("class", "col-md-2");
                        var fiveDate = $("<p>");
                        fiveDate.text(date);
                        var fiveImage = $("<img>");
                        fiveImage.attr(
                            "src",
                            "http://openweathermap.org/img/wn/" +
                            fiveDayForecast.list[i].weather[0].icon +
                            ".png"
                        );
                        
                        var fiveTemp = $("<p>");
                        fiveTemp.text("Temp: " + tempF);
                        var fiveHumidity = $("<p>");
                        fiveHumidity.text("Humidity: " + humidityFive);
                        wrapper.append(fiveDate, fiveImage, fiveTemp, fiveHumidity);
                        $(".fiveDayRow").append(wrapper);
                    }
                }
            });
        });
    });
}