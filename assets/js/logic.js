// q: The query parameter, where we'll add the city variable. appid: The application id or key, where we'll add the API key variable.
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} API call for openweathermap by city name
//https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key} API call for openweathermap by city name and country code
// API key for OpenWeatherMap although API is randomly generated
// Yes when variables are assigned we will click the search button and the event listener will be triggered  and the function will call the variables to be displayed spliced concatted.
// let city = "";
// let country = "";
// let temp = "";
// let wind = "";
// let humidity = "";
// API key for OpenWeatherMap
const APIKey = "dd699e84055222330cd4dae0d505a590";
// Event listener for search button
document
  .getElementById("searchCity")
  .addEventListener("submit", function (event) {
    // Prevent the default form submission
    event.preventDefault();
    const cityInput = document.getElementById("cityInput");
    const city = cityInput.value.trim();
    // If the user enters a city name, fetch the weather forecast for that city
    if (city !== "") {
      getWeatherData(city);
      // Clear the input field after the user submits the form
      cityInput.value = "";
    } else {
      // If the user doesn't put anything in the input field, alert them to enter a city name.
      alert("Please enter a city name");
    }
  });

// API key for OpenWeatherMap and fetch the url with the city variable and API key variable
function getWeatherData(city) {
  // API Key which allows us to make request to the server.
  const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  // Fetch the data from the API
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    // Display the data in console
    .then(function (data) {
      console.log(data);
      // Save the searched city to the past searches local storage array
      saveCity(city);
      // Render after page reload
      displaySavedCities();
      // Display the current weather data
      displayDailyForecast(data, city);
      // Set the current city name and data to local storage
      getFiveDayForecast(data.coord.lat, data.coord.lon);
      localStorage.setItem("cityName", city);
      localStorage.setItem("currentData", JSON.stringify(data));
    });
}

// Function to display the current day data
function saveCity(city) {
  let savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
  if (!savedCities.includes(city)) {
    savedCities.push(city);
    localStorage.setItem("savedCities", JSON.stringify(savedCities));
  }
}

// Function to display the saved cities on the page in the search history
function displaySavedCities() {
  const savedCities = JSON.parse(localStorage.getItem("savedCities")) || [];
  const savedCitiesContainer = document.querySelector(".savedCities");
  // Clear the existing buttons
  savedCitiesContainer.innerHTML = "";
  // Create a button for each saved city
  savedCities.forEach((city) => {
    const button = document.createElement("button");
    button.classList.add("btn", "btn-secondary");
    button.addEventListener("click", function () {
      getWeatherData(city);
    });
    button.textContent = city;
    savedCitiesContainer.appendChild(button);
  });
}

// // Get the data from the API
// function getDailyForecast(city) {
//   // API Key which allows us to make request to the server.
//   const dailyDayURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
//   // Fetch the data from the API
//   fetch(dailyDayURL)
//     // Check if the response is ok
//     .then(function (response) {
//       if (!response.ok) {
//         throw new Error(
//           `HTTP error! status: ${response.status} ${response.statusText}`
//         );
//       }
//       // Parse the response using the json method
//       return response.json();
//     })
//     // Display the data in the console
//     .then(function (data) {
//       console.log(data);
//       localStorage.setItem("weatherData", JSON.stringify(data));
//     })
//     // Display an error message if there is a problem with the fetch operation
//     .catch(function (error) {
//       console.log(
//         "There has been a problem with your fetch operation: ",
//         error.message
//       );
//     });
// }

// Display the data on the page
function displayDailyForecast(data, city) {
  // Get the ids and set the text content for the current weather data
  const date = new Date(data.dt * 1000).toLocaleDateString();
  const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.getElementById(
    "dailyName"
  ).innerHTML = `${city} (${date}) <img src="${iconUrl}">`;
  document.getElementById("temperature").textContent = data.main.temp;
  document.getElementById("windspeed").textContent = data.wind.speed;
  document.getElementById("humiditydaily").textContent = data.main.humidity;
}

// Get details from lat and lon make variables
function getFiveDayForecast(lat, lon) {
  const fiveDayURL = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`;
  fetch(fiveDayURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      displayFiveDayForecast(data);
      localStorage.setItem("fiveDayData", JSON.stringify(data));
    })
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}
// Function to display the weather data for the city
function displayFiveDayForecast(data) {
  // Get the list of forecasts from the response data
  const forecasts = data.list;

  // For loop to display the 5 day forecast
  for (let i = 0; i < 5; i++) {
    // Get the forecast data for the current day
    const forecast = forecasts[i];
    
    // Extract the relevant information for display
    const date = new Date(forecast.dt * 1000).toLocaleDateString();
    const iconUrl = `http://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    const temperature = forecast.main.temp;
    const windSpeed = forecast.wind.speed;
    const humidity = forecast.main.humidity;

    // Set the content for each forecast card
    document.getElementById(`icon${i + 1}`).innerHTML = `<img src="${iconUrl}">`;
    console.log(iconUrl);
    document.getElementById(`date${i + 1}`).textContent = date;
    document.getElementById(`temp${i + 1}`).textContent = temperature;
    document.getElementById(`wind${i + 1}`).textContent = windSpeed;
    document.getElementById(`humidity${i + 1}`).textContent = humidity;
  }
}
displaySavedCities();