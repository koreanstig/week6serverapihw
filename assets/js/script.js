var apiKey = "f2117d65263053ab1dd5f89a222f10c1";
var searchBtn = document.getElementById("searchBtn");
var cityInput = document.getElementById("form1")
// variables for the current cityls
var currentCity = document.getElementById("currentCity");
var currentCityTemp = document.getElementById("currentCityTemp");
var currentCityHumidity = document.getElementById("currentCityHumidity");
var currentCityWind = document.getElementById("currentCityWind");
var currentCityUV = document.getElementById("currentCityUV");
// variables for prev searches
var prevSearches = document.getElementById("prevSearches");
var prevCityArr = [];
var createCard = document.createElement('div');
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
                    var requestOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly,alerts&units=imperial&appid=" + apiKey;
                    // var for the date
                    var timestamp = data.dt;
                    var date = new Date(timestamp * 1000).toLocaleDateString("en-US");
                    var currentIcon = data.weather[0].icon;
                    fetch(requestOneCall) 
                        .then(function(response2){
                            if (response2.ok) {
                                response2.json().then(function(data){
                                    currentCityUV.textContent = "UV Index: " + data.current.uvi;
                                    var day1Time = new Date((timestamp+86400) * 1000).toLocaleDateString("en-US");
                                    var icon1 = data.daily[1].weather[0].icon;
                                    // day 1
                                    var day1Date = document.getElementById("day1Date");
                                    var day1Icon = document.getElementById("day1Icon");
                                    var day1Temp = document.getElementById("day1Temp");
                                    var day1Humid = document.getElementById("day1Humid");
                                    day1Date.textContent = day1Time;
                                    day1Icon.src = 'http://openweathermap.org/img/w/' + icon1 + ".png";
                                    day1Temp.textContent = "Temp: " + data.daily[1].temp.day + " *F";
                                    day1Humid.textContent = "Humidity: " + data.daily[1].humidity + "%";
                                    // day 2
                                    var day2Time = new Date((timestamp+(86400*2)) * 1000).toLocaleDateString("en-US");
                                    var icon2 = data.daily[2].weather[0].icon;
                                    var day2Date = document.getElementById("day2Date");
                                    var day2Icon = document.getElementById("day2Icon");
                                    var day2Temp = document.getElementById("day2Temp");
                                    var day2Humid = document.getElementById("day2Humid");
                                    day2Date.textContent = day2Time;
                                    day2Icon.src = 'http://openweathermap.org/img/w/' + icon2 + ".png";
                                    day2Temp.textContent = "Temp: " + data.daily[2].temp.day + " *F";
                                    day2Humid.textContent = "Humidity: " + data.daily[2].humidity + "%";
                                    // day 3
                                    var day3Time = new Date((timestamp+(86400*3)) * 1000).toLocaleDateString("en-US");
                                    var icon3 = data.daily[3].weather[0].icon;
                                    var day3Date = document.getElementById("day3Date");
                                    var day3Icon = document.getElementById("day3Icon");
                                    var day3Temp = document.getElementById("day3Temp");
                                    var day3Humid = document.getElementById("day3Humid");
                                    day3Date.textContent = day3Time;
                                    day3Icon.src = 'http://openweathermap.org/img/w/' + icon3 + ".png";
                                    day3Temp.textContent = "Temp: " + data.daily[3].temp.day + " *F";
                                    day3Humid.textContent = "Humidity: " + data.daily[3].humidity + "%";
                                    // day 4
                                    var day4Time = new Date((timestamp+(86400*4)) * 1000).toLocaleDateString("en-US");
                                    var icon4 = data.daily[4].weather[0].icon;
                                    var day4Date = document.getElementById("day4Date");
                                    var day4Icon = document.getElementById("day4Icon");
                                    var day4Temp = document.getElementById("day4Temp");
                                    var day4Humid = document.getElementById("day4Humid");
                                    day4Date.textContent = day4Time;
                                    day4Icon.src = 'http://openweathermap.org/img/w/' + icon4 + ".png";
                                    day4Temp.textContent = "Temp: " + data.daily[4].temp.day + " *F";
                                    day4Humid.textContent = "Humidity: " + data.daily[4].humidity + "%";
                                    // day 5
                                    var day5Time = new Date((timestamp+(86400*5)) * 1000).toLocaleDateString("en-US");
                                    var icon5 = data.daily[5].weather[0].icon;
                                    var day5Date = document.getElementById("day5Date");
                                    var day5Icon = document.getElementById("day5Icon");
                                    var day5Temp = document.getElementById("day5Temp");
                                    var day5Humid = document.getElementById("day5Humid");
                                    day5Date.textContent = day5Time;
                                    day5Icon.src = 'http://openweathermap.org/img/w/' + icon5 + ".png";
                                    day5Temp.textContent = "Temp: " + data.daily[5].temp.day + " *F";
                                    day5Humid.textContent = "Humidity: " + data.daily[5].humidity + "%";
                                })
                            }
                            else {
                                return
                            };
                        });
                    // change texts to show proper data
                    currentCity.innerHTML = data.name + " (" + date + ") " + "<img src='http://openweathermap.org/img/w/" + currentIcon + ".png'></img>";
                    currentCityTemp.textContent = "Temperature: " + data.main.temp + " *F";
                    currentCityHumidity.textContent = "Humidity: " + data.main.humidity + "%";
                    currentCityWind.textContent = "Wind Speed: " + data.wind.speed + " MPH"; 
                });
            }
            else if(!response.ok){
                alert('Please enter a valid city name')
                // localStorage.removeItem("value");
                // prevSearches.removeChild(createCard);
            } else {
                return
            }
            ;
        });
}
// this will activate the api function upon click and save input into local storage
searchBtn.addEventListener('click', function(event){
    event.preventDefault();
    var value = cityInput.value.trim();
    localStorage.setItem("value", value);
    prevCityArr.push(value);
    console.log(prevCityArr);
    currentCityApi();
    prevSearch();
    hasDuplicates();
})

// var displayPrevSearches = function 
function prevSearch() {
    prevSearches.innerHTML = "";
    var noCitySearch = document.getElementById("noCitySearch");
    if (prevCityArr.length === 0){
        noCitySearch.textContent = 'No previous searched cities.';
        prevCityArr = [];
    } else{
        for (var i=0;i<prevCityArr.length;i++){
            var createCard = document.createElement('div');
            createCard.classList = "card w-100 prevSearch";
            createCard.innerHTML = "<div class='card-body'><p class='card-text btn'>" + prevCityArr[i].toUpperCase() + "</p></div>"
            prevSearches.appendChild(createCard);
            
        }
    }
}

function hasDuplicates() {
    var valuesSoFar = Object.create(null);
    for (var i = 0; i < prevCityArr.length; ++i) {
        var value = prevCityArr[i];
        if (value in valuesSoFar) {
            prevCityArr.pop();
            return true;
        }
        valuesSoFar[value] = true;
    }
    return false;
}
