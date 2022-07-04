// i need my variables
const search = $('.searchbutton');
const myApiKey = "34c3e6b2f1df4ec6c700399d6355c7df";
const userInput = $('.userinput');
const theCityName = $('.city-group').addClass('cityListGroup');
const currentWeather = $('.todayforecast').append('<div>').addClass('card-body');
const chosenName = currentWeather.append('<p>');
const temprature = chosenName.append('<p>');
var keyCount = 0;



search.on('click', function () {
const typedSearch = userInput.val();
const DayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + typedSearch + "&Appid=" + myApiKey + "&units=imperial";
const FiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + typedSearch + "&ppid=" + myApiKey + "&units=imperial";
if (!typedSearch == "") {
    console.log(typedSearch);
    fetch(DayURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        theCityName.append('<li>' + data.name + "<li>");
        const storage = localStorage.setItem(keyCount, data.name);
        keyCount = keyCount + 1;
        currentWeather.empty();
        currentWeather.append(chosenName);

        const time = new Date(data.dt * 1000);
        chosenName.append(data.name + ' ' + time.toLocaleDateString('en-US'));
        chosenName.append(`<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">`);
        chosenName.append(temprature);
        temprature.append('<p>' + 'Temp- ' + data.main.temp + '<p>');

    });
}




// i need a way to add it to the searched list








// i need a way to display the current forecast








// i need a function that shows the 5 day forecast







// i need a function that displays the uv indext on all the items











});
// i need to make it loop throught the data
