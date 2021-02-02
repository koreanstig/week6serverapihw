var apiKey = "f2117d65263053ab1dd5f89a222f10c1";
var searchBtn = document.getElementById("searchBtn");
var cityInput = document.getElementById("form1")
// variables for the current city
var currentCity = document.getElementById("currentCity");
var currentCityTemp = document.getElementById("currentCityTemp");
var currentCityHumidity = document.getElementById("currentCityHumidity");
var currentCityWind = document.getElementById("currentCityWind");
var currentCityUV = document.getElementById("currentCityUV");
// variables for prev searches
var prevSearches = document.getElementById("prevSearches");
var prevCityArr = [];

function currentCityApi() {
    var value = encodeURIComponent(localStorage.getItem("value"));
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=" + apiKey;
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function(response){
            if (response.ok){
                console.log(response);
                response.json().then(function(data){
                    console.log(data);
                });
            }
            else {
                alert('Please enter a valid city name')
            };
        })
}

searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    var value = cityInput.value;
    localStorage.setItem("value", value);
    currentCityApi();
})

