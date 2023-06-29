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
      } else {
        throw new Error(await response.text());
      }
    } catch (error) {
      console.log(error);
    }
  }

  apiFetch();
        
    


    function displayResults(weatherData) {
        const currentTemp = document.querySelector('#temperature'); // Define currentTemp variable here
        const windspeed = document.querySelector('#wind-speed');
        currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)} &deg;C </strong>`;
        windspeed.innerHTML = `<strong>${weatherData.wind.speed.toFixed(0)}</strong>`;
        
      
        const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
        const desc = weatherData.weather[0].description;
      
        const weatherIcon = document.querySelector('#weather-icon'); // Define weatherIcon variable here
        weatherIcon.setAttribute('src', iconSrc);
        weatherIcon.setAttribute('alt', desc);
      
        const captionDesc = document.querySelector('figcaption'); // Define captionDesc variable here
        captionDesc.innerHTML =`<p> ${capitalizeFirstLetter(desc)}</p>` ;
      }
      
      function capitalizeFirstLetter(str) {
        return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }

      
     // Get the temperature and wind speed elements from the HTML document
     let temperatureElement = document.getElementById("temperature");
     let windSpeedElement = document.getElementById("wind-speed");
      
      

   // Get the values of temperature and wind speed
   let temperature = parseFloat(temperatureElement.textContent);
   let windSpeed = parseFloat(windSpeedElement.textContent);
   
   // Calculate the wind chill factor
   
   let windChill = calculateWindChill(temperature, windSpeed);
   
   // Update the HTML with the wind chill value
   let weatherElement = document.getElementById("weather");
   weatherElement.innerHTML += "<p>Wind Chill: " + windChill + "°C</p>";

  // Function to calculate the wind chill factor
  function calculateWindChill(temperature, windSpeed) {
      // Check if the temperature and wind speed meet the specification limits
      if (temperature <=50 && windSpeed > 3.0) {
          // Calculate the wind chill factor using the formula
          let windChill = 35.74 + (0.6215 * temperature) - (35.75 * Math.pow(windSpeed, 0.16)) + (0.4275 * temperature * Math.pow(windSpeed, 0.16));
          return Math.round(windChill); // Round the wind chill value
      } else {

          return "N/A"; // Return "N/A" if the input values do not meet the requirements
      }
  }
});