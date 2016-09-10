var currentWeather;
var tomorrowWeather;
var pageheader = $("#page-header")[0];
var pagecontainer = $("#page-container")[0];
$("#textId").keyup(function (event) {
    if (event.keyCode == 13) {
        $("#buttonId").click();
    }
});
function begin() {
    var input = document.getElementById("textId").value;
    var weatherUrl = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + input + "&mode=json&units=metric&cnt=7&APPID=633429e8d4ce6f97d1faf355b6d2081b";
    sendWeatherRequest(function (weatherList) {
        getCurrWeather(weatherList, 0);
        displayWeather("#current-img");
        getCurrWeather(weatherList, 1);
        displayWeather("#tomorrow-img");
    }, weatherUrl);
}
function displayWeather(weatherImg) {
    var img = $(weatherImg)[0];
    img.src = currentWeather.clipArt;
    img.style.display = "block";
    pagecontainer.style.marginTop = "20px";
}
function sendWeatherRequest(callback, weatherUrl) {
    $.ajax({
        url: weatherUrl,
        type: "POST",
        dataType: 'json'
    })
        .done(function (data) {
        var list = data.list;
        callback(list);
    })
        .fail(function (error) {
        console.log(error.getAllResponseHeaders());
    });
}
var Weather = (function () {
    function Weather(weather, clipArtUrl) {
        this.weather = weather;
        this.clipArtUrl = clipArtUrl;
        this.name = weather;
        this.clipArt = clipArtUrl;
    }
    return Weather;
}());
var sunny = new Weather("sunny", "https://openclipart.org/download/193454/shining-sun.svg");
var cloudy = new Weather("cloudy", "https://openclipart.org/download/193455/1399995805.svg");
var rainy = new Weather("rainy", "https://openclipart.org/download/18894/sivvus-weather-symbols-4.svg");
var thunder = new Weather("thunder", "https://openclipart.org/download/137905/stormclouds.svg");
var snowy = new Weather("snowy", "https://openclipart.org/download/189282/snow-flake-8.svg");
var foggy = new Weather("foggy", "https://openclipart.org/download/210347/misc-mental-worry.svg");
var stormy = new Weather("stormy", "https://openclipart.org/download/116797/inclement-weather.svg");
function getCurrWeather(list, day) {
    if (list[day].weather[0].main == "Clear") {
        currentWeather = sunny;
    }
    else if (list[day].weather[0].main == "Clouds") {
        currentWeather = cloudy;
    }
    else if (list[day].weather[0].main == "Rain") {
        currentWeather = rainy;
    }
    else if (list[day].weather[0].main == "Drizzle") {
        currentWeather = rainy;
    }
    else if (list[day].weather[0].main == "Snow") {
        currentWeather = snowy;
    }
    else if (list[day].weather[0].main == "Atmosphere") {
        currentWeather = foggy;
    }
    else if (list[day].weather[0].main == "Extreme") {
        currentWeather = stormy;
    }
    else if (list[day].weather[0].main == "Thunderstorm") {
        currentWeather = thunder;
    }
    else {
        currentWeather = cloudy;
    }
    return currentWeather;
}
