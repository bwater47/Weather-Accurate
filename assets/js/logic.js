// dd699e84055222330cd4dae0d505a590 This is the API key for OpenWeatherMap
// q: The query parameter, where we'll add the city variable. appid: The application id or key, where we'll add the API key variable.
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} API call for openweathermap by city name
//https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key} API call for openweathermap by city name and country code
// API key for OpenWeatherMap although API is randomly generated
const APIKey = "dd699e84055222330cd4dae0d505a590";


const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
fetch(queryURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });

// city Search
// search History
let search;
let city;
let country;
let date;
let temp;
let wind;
let humidity;

// Where we call the const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`; to get the data from the API
// Yes when variables are assigned we will click the search button and the event listener will be triggered  and the function will call the variables to be displayed spliced concatted.
// fetch Response then 'then' data 'then' event
// Here we are building the URL we need to query the database
// {
//     "id": 5771826,
//     "name": "Bountiful",
//     "state": "UT",
//     "country": "US",
//     "coord": {
//         "lon": -111.880768,
//         "lat": 40.889389
//     }
// },