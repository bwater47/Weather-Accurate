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
  const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`; // Geo coordinates for the city (lat and lon)

  // Fetch the data from the API
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    // Display the data in console
    .then(function (data) {
      // make variables for the lat and lon from the data and run a second fetch to get the 5 day forecast using the lat and lon
      // Move the function below into the second fetch
      displayFiveDayForecast(data);
      // Save the city to local storage so it persists on page reload
      saveCity(city); // Save the searched city to the past searches local storage array
      // Render after page reload
      displaySavedCities(); // Displays the past searches
      // Display the current weather data
      displayDailyForecast(data, city);
      // Set the current city name and data to local storage
      localStorage.setItem("cityName", city);
      localStorage.setItem("currentData", JSON.stringify(data));
      // localStorage.setItem("DailyData", JSON.stringify(data.list[0]));
    });
}

// Function to display the weather data for the city
function displayFiveDayForecast(data) {
  // Get ids and set content for the 5 day forecast
  document.getElementById("date1").textContent = new Date(
    data.dt * 1000
  ).toLocaleDateString();
  document.getElementById(
    "icon1"
  ).src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
  document.getElementById("temp1").textContent = data.main.temp;
  document.getElementById("wind1").textContent = data.wind.speed;
  document.getElementById("humidity1").textContent = data.main.humidity;
  // For loop to display the 5 day forecast
  // for (let index = 0; index < array.length; index++) {
  //   const element = array[index];
  // }
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

// Get the data from the API
function getDailyForecast(city) {
  // API Key which allows us to make request to the server.
  const dailyDayURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;
  // Fetch the data from the API
  fetch(dailyDayURL)
    // Check if the response is ok
    .then(function (response) {
      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} ${response.statusText}`
        );
      }
      // Parse the response using the json method
      return response.json();
    })
    // Display the data in the console
    .then(function (data) {
      console.log(data);
      localStorage.setItem("weatherData", JSON.stringify(data));
    })
    // Display an error message if there is a problem with the fetch operation
    .catch(function (error) {
      console.log(
        "There has been a problem with your fetch operation: ",
        error.message
      );
    });
}

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
  document.getElementById("humiditynumber").textContent = data.main.humidity;
  localStorage.setItem("data")
}
