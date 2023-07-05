document.addEventListener('DOMContentLoaded', function(){


    // select HTML elements in the document
 
  const weatherIcon = document.querySelector('#weather-icon');
  const captionDesc = document.querySelector('figcaption');

  const cityName = 'fauresmith';
  const units = 'metric';
  const appId = 'd6fa1434205326c55483598917053e46'; 

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${appId}`;

  async function apiFetch() {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        displayResults(data);
        // Update the wind chill value after displaying results
        let temperature = parseFloat(data.main.temp);
        let windSpeed = parseFloat(data.wind.speed);
        let windChill = calculateWindChill(temperature, windSpeed);
        let weatherElement = document.getElementById("weather");
        weatherElement.innerHTML += "<p>Wind Chill: " + windChill + "°C</p>";
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.log(error);
    }
  }

  apiFetch();
        
    

  function displayResults(weatherData) {
    const currentTemp = document.querySelector('#temperature');
    const windSpeed = document.querySelector('#wind-speed');
  
    currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)} &deg;C </strong>`;
    windSpeed.innerHTML = `<strong>${weatherData.wind.speed.toFixed(0)}</strong>`;
    windSpeed.style.fontSize = '0.9rem'; // Set the font size to 0.7rem
  
    const iconSrc = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`;
  
    const desc = weatherData.weather[0].description;
  
    const weatherIcon = document.querySelector('#weather-icon');
    weatherIcon.setAttribute('src', iconSrc);
    weatherIcon.setAttribute('alt', desc);
  
    const captionDesc = document.querySelector('figcaption');
    captionDesc.innerHTML = `<p>${capitalizeFirstLetter(desc)}</p>`;
  }
  
  function capitalizeFirstLetter(str) {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }
  
  // Get the temperature and wind speed elements from the HTML document
  let temperatureElement = document.getElementById("temperature");
  let windSpeedElement = document.getElementById("wind-speed");
  
  // Function to calculate the wind chill factor
  function calculateWindChill(temperature, windSpeed) {
    // Check if the temperature and wind speed meet the specification limits
    if (temperature <= 50 && windSpeed > 3.0) {
      // Calculate the wind chill factor using the formula
      let windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
      return Math.round(windChill); // Round the wind chill value
    } else {
      return "N/A"; // Return "N/A" if the input values do not meet the requirements
    }
  }
  
  
});
