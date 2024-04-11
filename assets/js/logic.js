// q: The query parameter, where we'll add the city variable. appid: The application id or key, where we'll add the API key variable.
//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} API call for openweathermap by city name
//https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key} API call for openweathermap by city name and country code
// API key for OpenWeatherMap although API is randomly generated
// Yes when variables are assigned we will click the search button and the event listener will be triggered  and the function will call the variables to be displayed spliced concatted.
// let search;
// let city;
// let country;
// let date;
// let temp;
// let wind;
// let humidity;

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
  const APIKey = "dd699e84055222330cd4dae0d505a590";
  const queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`; // Geo coordinates for the city (lat and lon)

  // Fetch the data from the API
  fetch(queryURL)
    .then(function (response) {
      return response.json();
    })
    // Display the data in console
    .then(function (data) {
      console.log(data);
      // make variables for the lat and lon from the data and run a second fetch to get the 5 day forecast using the lat and lon
      // Move the function below into the second fetch
      // Display the data on the page
      displayWeatherData(data); // Should handle the 5 days
      // Save the city to local storage so it persists on page reload
      saveCity(city); // Save the searched city to the past searches local storage array
      // Render after page reload
      displaySavedCities(); // Displays the past searches
      // Display the array of data on the page
      displayDailyForecastData(data.list[0], city); // This is the current day

      // Set the current city name and data to local storage
      localStorage.setItem("CityName", city);
      localStorage.setItem("DailyForecastData", JSON.stringify(data.list[0]));
    });
}
// Function to display the weather data for the city
function displayWeatherData(data) {
  // Get ids and set text content
  document.getElementById("temp1").textContent = data[0].temp;
  console.log(data[0].temp);
  document.getElementById("wind1").textContent = data[0].wind;
  console.log(data[0].wind);
  document.getElementById("humidity1").textContent = data[0].humidity;
  console.log(data[0].humidity);
  displayWeatherData(data);
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
}
