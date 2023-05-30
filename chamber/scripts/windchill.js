document.addEventListener('DOMContentLoaded', function(){
        
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
    weatherElement.innerHTML += "<p>Wind Chill: " + windChill + "°F</p>";
});