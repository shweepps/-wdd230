document.addEventListener('DOMContentLoaded', function(){

    function toggleMenu(){
        document.getElementById("primaryNav").classList.toggle("open");
        document.getElementById("hamBtn").classList.toggle("open");
    }

    const btn = document.getElementById("hamBtn");
    btn.onclick = toggleMenu;

    /*weather js code */
    const cityName  = "Carlsbad";
    const units = 'imperial';
    const appId = 'd6fa1434205326c55483598917053e46';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${appId}`;
    const urlDay = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${appId}`;

    async function api(){
        try{
            const res = await fetch(url);
            if(res.ok){
                const data = await res.json();
                console.log(data);
                const currentT = document.querySelector("#current");
                currentT.innerHTML = `${data.main.temp} &deg;F`;
            }else{
                throw new Error(await res.text());
            }
        }catch (error){
            console.log(error);
        }
    }

    async function apiDay(){
        try{
            const respond = await fetch(urlDay);
            if(respond.ok){
                const dataDay = await respond.json();
                console.log(dataDay);
                const forecastDiv = document.getElementById("forecast");
                forecastDiv.innerHTML = "<h2>3-Day Forecast</h2>";
    
                // Group the forecast data by day
                const forecastList = dataDay.list;
                const forecastByDay = {};
                forecastList.forEach((item) => {
                    const date = new Date(item.dt_txt);
                    const day = date.toLocaleDateString(undefined, { weekday: 'long' });
                    if (!forecastByDay[day]) {
                        forecastByDay[day] = {
                            temps: [],
                            conditions: [],
                            humidity: []
                        };
                    }
                    forecastByDay[day].temps.push(item.main.temp);
                    forecastByDay[day].conditions.push(item.weather[0].description);
                    forecastByDay[day].humidity.push(item.main.humidity);
                });
    
                // Get the next 3 days of forecast
                const forecastDates = Object.keys(forecastByDay).slice(0, 3);
    
                // Get the current day of the week
                const currentDate = new Date();
                const currentDay = currentDate.toLocaleDateString(undefined, { weekday: 'long' });
    
                // Display the 3-day forecast
                forecastDates.forEach((day) => {
                    const tempMin = Math.min(...forecastByDay[day].temps);
                    const tempMax = Math.max(...forecastByDay[day].temps);
                    const condition = forecastByDay[day].conditions[0];
                    const humidity = forecastByDay[day].humidity.reduce((sum, h) => sum + h, 0) / forecastByDay[day].humidity.length;
    
                    const forecastItem = document.createElement("div");
                    const dayText = day === currentDay ? "Today" : day;
                    forecastItem.innerHTML = `
                        <p>${dayText}</p>
                        <p>Condition: ${condition}</p>
                        <p>Min Temperature: ${tempMin} &deg;F</p>
                        <p>Max Temperature: ${tempMax} &deg;F</p>
                        <p>Average Humidity: ${humidity.toFixed(2)}%</p><br/>
                    `;
    
                    forecastDiv.appendChild(forecastItem);
                });
            }
        }catch (error){
            console.log(error);
        }
    }
    
    
    

    api();
    apiDay();

});