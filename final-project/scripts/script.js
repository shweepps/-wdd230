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
                const currentT = document.querySelector("#current");
                const iconT = document.querySelector("#icon");
                const condition = document.querySelector("#aircon");

                console.log(data);
                imgUrl = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
                currentT.innerHTML = `${data.main.temp} &deg;F`;
                iconT.setAttribute('src', imgUrl)
                condition.innerHTML = `${data.weather[0].description}`;
            }else{
                throw new Error(await res.text());
            }
        }catch (error){
            console.log(error);
        }
    }
async function apiDay() {
    try {
        const respond = await fetch(urlDay);
        if (respond.ok) {
            const dataDay = await respond.json();
            console.log(dataDay);
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
                    <img class="icon-temp" src="https://openweathermap.org/img/w/${iconSr}.png" alt="Weather Icon"> </p>
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

// Global variable to store the nutritional data fetched from 'fruit.json'
let nutritionalData;

// Function to fetch JSON data from 'fruit.json' file
async function fetchFruitData() {
    try {
        const response = await fetch('fruit.json');
        if (response.ok) {
            nutritionalData = await response.json();
            return nutritionalData;
        } else {
            throw new Error('Failed to fetch fruit data');
        }
    } catch (error) {
        console.log(error);
    }
}

// Function to populate the select element with fruit options
async function populateSelectElement(selectElement) {
    await fetchFruitData();
    if (nutritionalData) {
        nutritionalData.forEach(fruit => {
            const option = document.createElement("option");
            option.value = fruit.name;
            option.textContent = fruit.name;
            selectElement.appendChild(option);
        });
    }
}

// Get the form element
const form = document.getElementById("specialtyDrinkForm");

// Get the select elements
const fruitSelect1 = document.getElementById("fruit1");
const fruitSelect2 = document.getElementById("fruit2");
const fruitSelect3 = document.getElementById("fruit3");

// Populate the select elements with fruit options
populateSelectElement(fruitSelect1);
populateSelectElement(fruitSelect2);
populateSelectElement(fruitSelect3);

// Function to calculate the total nutritional values based on selected fruits
function calculateTotalNutrition(fruits) {
    let totalCarbohydrates = 0;
    let totalProtein = 0;
    let totalFat = 0;
    let totalSugar = 0;
    let totalCalories = 0;

    fruits.forEach(fruitName => {
        const fruit = nutritionalData.find(item => item.name === fruitName);
        if (fruit) {
            totalCarbohydrates += fruit.nutritions.carbohydrates;
            totalProtein += fruit.nutritions.protein;
            totalFat += fruit.nutritions.fat;
            totalSugar += fruit.nutritions.sugar;
            totalCalories += fruit.nutritions.calories;
        }
    });

    return {
        totalCarbohydrates,
        totalProtein,
        totalFat,
        totalSugar,
        totalCalories
    };
}

// Function to handle form submission
function handleSubmit(event) {
    event.preventDefault();

    // Extract form values
    const firstName = document.getElementById("firstName").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phoneNumber").value;
    const selectedFruit1 = fruitSelect1.value;
    const selectedFruit2 = fruitSelect2.value;
    const selectedFruit3 = fruitSelect3.value;
    const specialInstructions = document.getElementById("specialInstructions").value;

    // Create an object to store the form data
    const formData = {
        firstName: firstName,
        email: email,
        phoneNumber: phoneNumber,
        selectedFruit1: selectedFruit1,
        selectedFruit2: selectedFruit2,
        selectedFruit3: selectedFruit3,
        specialInstructions: specialInstructions
    };

    // Calculate total nutritional values
    const selectedFruits = [selectedFruit1, selectedFruit2, selectedFruit3];
    const totalNutrition = calculateTotalNutrition(selectedFruits);

    // Store the form data in local storage
    localStorage.setItem('formData', JSON.stringify(formData));

    // Clear the form after submission
    form.reset();

    // Display the form data and nutritional values
    const displaySection = document.getElementById("displaySection");
    displaySection.innerHTML = `
        <h2>Submitted Form Data:</h2>
        <p><strong>First Name:</strong> ${formData.firstName}</p>
        <p class="E"><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
        <p><strong>Fruit 1:</strong> ${formData.selectedFruit1}</p>
        <p><strong>Fruit 2:</strong> ${formData.selectedFruit2}</p>
        <p><strong>Fruit 3:</strong> ${formData.selectedFruit3}</p>
        <p><strong>Special Instructions:</strong> ${formData.specialInstructions}</p>
        <h2>Total Nutritional Values:</h2>
        <p><strong>Total Carbohydrates:</strong> ${totalNutrition.totalCarbohydrates.toFixed(1)} g</p>
        <p><strong>Total Protein:</strong> ${totalNutrition.totalProtein.toFixed(1)} g</p>
        <p><strong>Total Fat:</strong> ${totalNutrition.totalFat.toFixed(1)} g</p>
        <p><strong>Total Sugar:</strong> ${totalNutrition.totalSugar.toFixed(1)} g</p>
        <p><strong>Total Calories:</strong> ${totalNutrition.totalCalories.toFixed(1)} kcal</p>
    `;
    
}

// Add event listener for form submission
form.addEventListener("submit", handleSubmit);


});