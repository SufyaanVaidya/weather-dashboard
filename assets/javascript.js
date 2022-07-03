const search = $('.searchbutton');
const myApiKey = "34c3e6b2f1df4ec6c700399d6355c7df";
const userInput = $('.userinput');
const DayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + userInput + "&appid=" + myApiKey;
const FiveDay = "https://api.openweathermap.org/data/2.5/forecast?q=" + userInput + "&appid=" + myApiKey;