// i need my variables
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

function listClicks(e) {
    e.preventDefault();
    console.log(e.target.innerHTML);
    userInput.val(e.target.innerHTML);
    weatherInfo(userInput.val);
}


function weatherInfo() {
    typedSearch = userInput.val();
const DayURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + typedSearch + '&Appid=' + myApiKey + '&units=imperial';
const FiveDay = 'https://api.openweathermap.org/data/2.5/forecast?q=' + typedSearch + '&Appid=' + myApiKey + '&units=imperial';
if (!typedSearch == '') {
    fetch(DayURL)
    .then(function (response) {
        return response.json();
    })
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


    fetch (FiveDay)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        fiveDayForecast.empty();
        days.forEach(function (i) {
            const fiveDayTime = moment().add(i + 1, 'days').format('MM/DD/YYYY');
            fiveDayForecast.append('<div class=forecastcolor>'+ '<p>' + fiveDayTime + '</p>' + `<img src='https://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png'>` + '<p>' + 'Temp- ' + data.list[i].main.temp + '°F' + '</p>' + '<p>' + 'Humidity- ' + data.list[i].main.humidity + '%' + '</p>' + '</div>');
        })
    });
}


};



search.on('click', function () {
    weatherInfo()
    userInput.val('');
});