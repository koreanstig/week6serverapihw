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
    fetch(requestUrl)
        .then(function(response){
            if (response.ok){
                response.json().then(function(data){
                    // using the data from the first api URL, we can find the UV data and add it with the other info
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;
                    var requestUVUrl = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
                    // var for the date
                    var timestamp = data.dt;
                    var date = new Date(timestamp * 1000).toLocaleDateString("en-US");
                    // var link for 5 day
                    var request5dayUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + "&units=imperial" + "&appid=" + apiKey;
                    var currentIcon = data.weather[0].icon;
                    // fetch to get UV
                    fetch(requestUVUrl) 
                        .then(function(response2){
                            if (response2.ok) {
                                response2.json().then(function(data){
                                    currentCityUV.textContent = "UV Index: " + data.value;
                                })
                            }
                            else {
                                return
                            };
                        });
                    // change texts to show proper data
                    currentCity.innerHTML = data.name + " (" + date + ") " + "<img src='http://openweathermap.org/img/w/" + currentIcon + ".png'></img>";
                    // currentCity.textContent = data.name + " (" + date + ") ";
                    currentCityTemp.textContent = "Temperature: " + data.main.temp + " *F";
                    currentCityHumidity.textContent = "Humidity: " + data.main.humidity + "%";
                    currentCityWind.textContent = "Wind Speed: " + data.wind.speed + " MPH"; 
                    // fetch to get 5 day
                    fetch(request5dayUrl)
                        .then(function(response3) {
                            if (response3.ok) {
                                response3.json().then(function(data){
                                    // var day1Timestamp = timestamp + 86400;
                                    // var day1Time = new Date(day1Timestamp * 1000).toLocaleDateString("en-US");
                                    // // variables for 5 day
                                    // var day1Date = document.getElementById("day1Date");
                                    // var day1Icon = document.getElementById("day1Icon");
                                    // var day1Temp = document.getElementById("day1Temp");
                                    // var day1Humid = document.getElementById("day1Humid");
                                    // day1Date.textContent = day1Time;
                                    var daysArr = [];
                                    var searchField = "dt";
                                    var searchVal = (timestamp + 86400).toString();
                                    var val = searchVal.replaceAt(8, "00");
                                    console.log();
                                    console.log(searchVal[8]);
                                    // console.log(data);
                                    console.log(data.list[0].dt);
                                    for (i=0;i<data.list.length;i++){
                                        if(data.list[i].dt == searchVal){
                                            daysArr.push(data.list[i])
                                            console.log(daysArr);
                                        }
                                    }
                                })
                            }
                            else {
                                return
                            };
                        })
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
    // console.log(prevCityArr);
    currentCityApi();
})

// var displayPrevSearches = function 
