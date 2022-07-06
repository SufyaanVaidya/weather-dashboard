// these are all my variables that target the html and css
const search = $('.searchbutton');
const myApiKey = '34c3e6b2f1df4ec6c700399d6355c7df';
const userInput = $('.userinput');
var typedSearch;
const theCityName = $('.city-group').addClass('cityListGroup');
const currentWeather = $('.todayforecast').append('<div>').addClass('card-body');
const chosenName = currentWeather.append('<p>');
const temprature = chosenName.append('<p>');
const fiveForecastArea = $('.fiveforecastarea').addClass('forecast-body');
const fiveDayForecast = $('.fivedayforecast').addClass('forecast-text');
const days = [0, 1, 2, 3, 4];
var keyCount = 0;
var historyCity;

// this function is for what happens when the list items are clicked.
function listClicks(e) {
    e.preventDefault();
    userInput.val(e.target.innerHTML);
    weatherInfo(userInput.val);
}

// this function is generating the weather input
function weatherInfo() {
    typedSearch = userInput.val();
    // these variables are to target certain data from an api using the users input
const DayURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + typedSearch + '&Appid=' + myApiKey + '&units=imperial';
const FiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=' + typedSearch + '&Appid=' + myApiKey + '&units=imperial';
if (!typedSearch == '') {
    // this is calling on the api
    fetch(DayURL)
    .then(function (response) {
        return response.json();
    })
    // this is applying the data returned to the html page and creating elements
    .then(function (data) {
        var li = $('<li>').attr('id', data.name).text(data.name).on('click',listClicks);
        li.appendTo(theCityName);
        const storage = localStorage.setItem(keyCount, data.name);
        keyCount = keyCount + 1;
        currentWeather.empty();
        currentWeather.append(chosenName);
        const time = new Date(data.dt * 1000);
        chosenName.append(data.name + ' ' + time.toLocaleDateString('en-US'));
        chosenName.append(`<img src='https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png'>`);
        chosenName.append(temprature);
        temprature.append('<p>' + 'Temp- ' + data.main.temp + '°F' + '</p>');
        temprature.append('<p>' + 'Humitdity- ' + data.main.humidity + '%' + '</p>');
        temprature.append('<p>' + 'Wind Speeds- ' + data.wind.speed + '</p>');
        const uvIndex = `https://api.openweathermap.org/data/2.5/onecall?lat=${data.coord.lat}&lon=${data.coord.lon}&exclude=minutely,hourly,alerts&appid=${myApiKey}`;
        fetch(uvIndex)
        .then(function (response) {
            return response.json();
            
        })
        // this is adding the uvi to the temp card and color coding it based on the index
        .then(function (data) {
            const cityUv = temprature.append('<p id= "cardText">' + 'UVI- ' + data.current.uvi + '</p>').addClass('cardText');
            cityUv.addClass('ultraViolet');
            temprature.append(cityUv);
            const uvColor = $('#cardText');
            if (data.current.uvi <= 2) {
                uvColor.addClass('gooduv')
            }
            if (data.current.uvi >= 3 && data.current.uvi <= 7) {
                uvColor.addClass('decentuv')
            }
            if (data.current.uvi > 8) {
                uvColor.addClass('baduv')
            }
        })
       
    });

    // this is getting information about the 5 day forecast of that area
    fetch (FiveDay)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        fiveDayForecast.empty();
        days.forEach(function (i) {
            const fiveDayTime = moment().add(i + 1, 'days').format('MM/DD/YYYY');
            fiveDayForecast.append('<div class=forecastcolor>'+ '<p>' + fiveDayTime + '</p>' + `<img src='https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png'>` + '<p>' + 'Temp- ' + data.list[i].main.temp + '°F' + '</p>' + '<p>' + 'Humidity- ' + data.list[i].main.humidity + '%' + '</p>' + '</div>');
        })
    });
}


};


// this is an onclick for the search button and what should happen when its clicked
search.on('click', function () {
    weatherInfo()
    userInput.val('');
});