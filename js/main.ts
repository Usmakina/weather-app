var currentWeather: Weather;
var tomorrowWeather: Weather;

var pageheader = $("#page-header")[0];
var pagecontainer = $("#page-container")[0];

$("#textId").keyup(function(event){
    if(event.keyCode == 13){
        $("#buttonId").click();
    }
});

function begin() : void{
    var input : string = (<HTMLInputElement>document.getElementById("textId")).value;
    var weatherUrl : string = "http://api.openweathermap.org/data/2.5/forecast/daily?q=" + input + "&mode=json&units=metric&cnt=7&APPID=633429e8d4ce6f97d1faf355b6d2081b";
    sendWeatherRequest(function(weatherList){
        getCurrWeather(weatherList, 0);
        displayWeather("#current-img");
        getCurrWeather(weatherList, 1);
        displayWeather("#tomorrow-img");
    }, weatherUrl);
}

function displayWeather(weatherImg) : void {
    var img : HTMLImageElement = <HTMLImageElement> $(weatherImg)[0];
    img.src = currentWeather.clipArt;
    img.style.display = "block";
    pagecontainer.style.marginTop = "20px";
}

function sendWeatherRequest(callback, weatherUrl) : void {
    $.ajax({
        url: weatherUrl, 
        type: "POST",
        dataType:'json'
    })

    .done(function (data) {
        var list = data.list;
        callback(list);
    })

    .fail(function (error) {
        console.log(error.getAllResponseHeaders());
    });
}

class Weather {
    name: string;
    clipArt: string;
    constructor(public weather, public clipArtUrl) {
        this.name = weather;
        this.clipArt = clipArtUrl;
    }
}

var sunny : Weather = new Weather("sunny", "https://openclipart.org/download/193454/shining-sun.svg");
var cloudy : Weather = new Weather("cloudy", "https://openclipart.org/download/193455/1399995805.svg");
var rainy : Weather = new Weather("rainy", "https://openclipart.org/download/18894/sivvus-weather-symbols-4.svg");
var thunder : Weather = new Weather("thunder", "https://openclipart.org/download/137905/stormclouds.svg");
var snowy : Weather = new Weather("snowy", "https://openclipart.org/download/189282/snow-flake-8.svg");
var foggy : Weather = new Weather("foggy", "https://openclipart.org/download/210347/misc-mental-worry.svg");
var stormy : Weather = new Weather("stormy", "https://openclipart.org/download/116797/inclement-weather.svg");

function getCurrWeather(list : any, day : number) : Weather {
    if (list[day].weather[0].main == "Clear") {
        currentWeather = sunny;
    } else if (list[day].weather[0].main == "Clouds") {
        currentWeather = cloudy;
    } else if (list[day].weather[0].main == "Rain") {
        currentWeather = rainy;
    } else if (list[day].weather[0].main == "Drizzle") {
        currentWeather = rainy;
    } else if (list[day].weather[0].main == "Snow") {
        currentWeather = snowy;
    } else if (list[day].weather[0].main == "Atmosphere") {
        currentWeather = foggy;
    } else if (list[day].weather[0].main == "Extreme") {
        currentWeather = stormy;
    } else if (list[day].weather[0].main == "Thunderstorm") {
        currentWeather = thunder;
    } else {
        currentWeather = cloudy;
    }
    return currentWeather;
}