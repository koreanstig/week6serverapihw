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
// this will fetch data from serverside api
function currentCityApi() {
    var value = encodeURIComponent(localStorage.getItem("value"));
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + value + "&appid=" + apiKey + "&units=imperial";
    console.log(requestUrl);
    fetch(requestUrl)
        .then(function(response){
            if (response.ok){
                console.log(response);
                response.json().then(function(data){
                    console.log(data);
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    var requestUVUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
                    fetch(requestUVUrl) 
                        .then(function(response2){
                            if (response2.ok) {
                                response2.json().then(function(data){
                                    console.log(data);
                                    currentCityUV.textContent = "UV Index: " + data.value;
                                })
                            }
                            else {
                                return
                            };
                        });
                    currentCity.textContent = data.name;
                    currentCityTemp.textContent = "Temperature: " + data.main.temp + " *F";
                    currentCityHumidity.textContent = "Humidity: " + data.main.humidity + "%";
                    currentCityWind.textContent = "Wind Speed: " + data.wind.speed + " MPH";    
                });
            }
            else {
                alert('Please enter a valid city name')
            };
        });
}
// this will activate the api function upon click and save input into local storage
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    var value = cityInput.value;
    localStorage.setItem("value", value);
    prevCityArr.push(value);
    console.log(prevCityArr);
    currentCityApi();
})

// var displayPrevSearches = function 
