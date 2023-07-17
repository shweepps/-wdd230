document.addEventListener('DOMContentLoaded', function() {
  // select HTML elements in the document
  
  const cityName = 'emalahleni';
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
});

function displayResults(weatherData) {
  const currentTemp = document.querySelector('#current-temp'); // Define currentTemp variable here
  const captionDesc = document.querySelector('figcaption'); // Define captionDesc variable here
  const weatherIcon = document.querySelector('#weather-icon'); // Define weatherIcon variable here

  const iconSrc = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  const desc = weatherData.weather[0].description;

  currentTemp.innerHTML = `<strong>${weatherData.main.temp.toFixed(0)} &deg;F </strong>`;

  weatherIcon.setAttribute('src', iconSrc);
  weatherIcon.setAttribute('alt', desc);
  captionDesc.innerHTML =`<p> ${capitalizeFirstLetter(desc)}</p>` ;
}

function capitalizeFirstLetter(str) {

  return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}
