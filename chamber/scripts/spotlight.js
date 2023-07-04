document.addEventListener('DOMContentLoaded', function () {
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
  }

  fetch('data.json')
      .then(response => response.json())
      .then(data => {
          const shuffledCompanies = shuffleArray(data.companies);
          const spotlights = document.getElementsByClassName('spotlight');

          const screenSize = window.innerWidth;
          let numSpotlights = 2; // Default number of spotlights for medium and small screens

          if (screenSize >= 1024) {
              numSpotlights = 3; // Display 3 spotlights for large screens
          }

          for (let i = 0; i < numSpotlights; i++) {
              const spotlight = spotlights[i];
              const company = shuffledCompanies[i];

              spotlight.querySelector('h3').textContent = company.name;
              spotlight.querySelector('a').href = company.website;
              spotlight.querySelector('img').src = company.image;
              spotlight.querySelector('img').alt = company.name;
          }
      });


// Add the media query using JavaScript
let mediaQuery = window.matchMedia('(min-width: 810px )');

function handleMediaQuery(mediaQuery) {
  if (mediaQuery.matches) {
      // The media query condition is true
      // Update the spotlight elements as needed
      let spotlight1 = document.getElementById('spotlight1');
      let spotlight2 = document.getElementById('spotlight2');
      let spotlight3 = document.getElementById('spotlight3');

      // Modify the display style of the spotlight elements
      spotlight1.style.display = 'block';
      spotlight2.style.display = 'block';
      spotlight3.style.display = 'block';
  } else {
      // The media query condition is false
      // Hide the spotlight elements
      let spotlight1 = document.getElementById('spotlight1');
      let spotlight2 = document.getElementById('spotlight2');
      let spotlight3 = document.getElementById('spotlight3')

      // Modify the display style of the spotlight elements
      spotlight1.style.display = 'block';
      spotlight2.style.display = 'block';
      spotlight3.style.display = 'none';
  }
}

// Add event listener to the media query
mediaQuery.addListener(handleMediaQuery);

// Call the function initially
handleMediaQuery(mediaQuery);
});