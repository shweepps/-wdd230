document.addEventListener('DOMContentLoaded', function(){
    const app = {
      init: () => {
        document
          .getElementById('btnGet')
          .addEventListener('click', app.fetchWeather);
        document
          .getElementById('btnCurrent')
          .addEventListener('click', app.getLocation);
      },
      fetchWeather: (ev) => {
        // Use the values from latitude and longitude to fetch the weather
        let lat = document.getElementById('latitude').value;
        let lon = document.getElementById('longitude').value;
        let key = 'd6fa1434205326c55483598917053e46';
        let url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  
        // Fetch the weather
        fetch(url)
          .then((resp) => {
            if (!resp.ok) throw new Error(resp.statusText);
            return resp.json();
          })
          .then((data) => {
            app.showWeather(data);
          })
          .catch(console.error);
      },
      getLocation: (ev) => {
        let opts = {
          enableHighAccuracy: true,
          timeout: 1000 * 10, // 10 seconds
          maximumAge: 1000 * 60 * 5, // 5 minutes
        };
        navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
      },
      ftw: (position) => {
        // Got position
        document.getElementById('latitude').value = position.coords.latitude.toFixed(2);
        document.getElementById('longitude').value = position.coords.longitude.toFixed(2);
      },
      wtf: (err) => {
        // Geolocation failed
        console.error(err);
      },
      showWeather: (data) => {
        console.log(data);
        let row = document.querySelector('.weather.row');
  
        // Clear out the old weather and add the new
        row.innerHTML = `<div class="col">
            <div class="card">
              <div class="card-body">
                <h3 class="card-title">Current Temperature</h3>
                <img
                  src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"
                  alt="${data.weather[0].description}"
                />
                <p class="card-text">Temperature: ${data.main.temp}&deg;C</p>
                <p class="card-text">Feels like: ${data.main.feels_like}&deg;C</p>
                <p class="card-text">Pressure: ${data.main.pressure}mb</p>
                <p class="card-text">Humidity: ${data.main.humidity}%</p>
                <p class="card-text">Wind Speed: ${data.wind.speed}m/s, ${data.wind.deg}&deg;</p>
              </div>
            </div>
          </div>`;
      },
    };
    
    app.init();
  });
  