
    /* Weather API */
    const cityName = "Carlsbad";
    const units = 'imperial';
    const appId = 'd6fa1434205326c55483598917053e46';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=${units}&appid=${appId}`;
    const urlDay = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=${units}&appid=${appId}`;

    async function api() {
        try {
            const res = await fetch(url);
            if (res.ok) {
                const data = await res.json();
                const currentT = document.querySelector("#current");
                const iconT = document.querySelector("#icon");
                const condition = document.querySelector("#aircon");

                //console.log(data);
                imgUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                currentT.innerHTML = `${data.main.temp} &deg;F`;
                iconT.setAttribute('src', imgUrl)
                condition.innerHTML = `${data.weather[0].description}`;
            } else {
                throw new Error(await res.text());
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function apiDay() {
        try {
            const respond = await fetch(urlDay);
            if (respond.ok) {
                const dataDay = await respond.json();
               // console.log(dataDay);
                const forecastDiv = document.getElementById("forecast");
                forecastDiv.innerHTML = "<h3>3-Day Forecast</h3>";

                // Group the forecast data by day
                const forecastList = dataDay.list;
                const forecastByDay = {};
                forecastList.forEach((item) => {
                    const date = new Date(item.dt_txt);
                    const day = date.toLocaleDateString(undefined, { weekday: 'short' }); // Use 'short' instead of 'long'
                    if (!forecastByDay[day]) {
                        forecastByDay[day] = {
                            temps: [],
                            conditions: [],
                            humidity: [],
                            icons: []
                        };
                    }
                    forecastByDay[day].temps.push(item.main.temp);
                    forecastByDay[day].conditions.push(item.weather[0].description);
                    forecastByDay[day].humidity.push(item.main.humidity);
                    forecastByDay[day].icons.push(item.weather[0].icon);
                });

                // Get the next 3 days of forecast
                const forecastDates = Object.keys(forecastByDay).slice(0, 3);

                // Get the current day of the week
                const currentDate = new Date();
                const currentDay = currentDate.toLocaleDateString(undefined, { weekday: 'short' }); // Use 'short' instead of 'long'

                // Display the 3-day forecast
                forecastDates.forEach((day) => {
                    const tempMin = Math.min(...forecastByDay[day].temps);
                    const tempMax = Math.max(...forecastByDay[day].temps);
                    const iconSrc = forecastByDay[day].icons[0] + "@4x"; // Add @4x to the icon URL
                    const iconSr = forecastByDay[day].icons[0];

                    const forecastItem = document.createElement("div");
                    forecastItem.setAttribute("id", "threeday");
                    const dayText = day === currentDay ? "Today" : day;

                    forecastItem.innerHTML = `
                        <p class="day"><strong>${dayText}</strong></p>
                        <img class="icon-temp" src="https://openweathermap.org/img/w/${iconSr}.png" alt="Weather Icon">
                        <p class="min-temp"> Low<br/> ${tempMin.toFixed(0)} &deg;F</p>
                        <p class="max-temp">High<br/> ${tempMax.toFixed(0)} &deg;F</p>
                    `;

                    forecastDiv.appendChild(forecastItem);
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    api();
    apiDay();
    