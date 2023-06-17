document.addEventListener('DOMContentLoaded', function() {
    const url = 'https://brotherblazzard.github.io/canvas-content/latter-day-prophets.json';
    getProphetData();
  
    async function getProphetData() {
      const response = await fetch(url);
      const data = await response.json();
      displayProphets(data.prophets);
    }
  
    const displayProphets = (prophets) => {
      const cards = document.querySelector('div.cards');
  
      prophets.forEach((prophet, index) => {
        let card = document.createElement('section');
        let h2 = document.createElement('h2');
        let birthdate = document.createElement('p');
        let birthplace = document.createElement('p');
        let portrait = document.createElement('img');
  
        h2.textContent = `${prophet.name} ${prophet.lastname}`;
        birthdate.textContent = `Date of Birth: ${prophet.birthdate}`;
        portrait.imageurl = prophet.imageurl;
        birthplace.textContent = `Place of Birth: ${prophet.birthplace}`;
  
        card.setAttribute('class', 'card');
        h2.setAttribute('class', 'names');
  
        card.setAttribute('class', 'card');
        card.setAttribute('data-length', prophet.length); // Add the data-length attribute
      
        portrait.setAttribute('class', 'imgs');
        portrait.setAttribute('src', prophet.imageurl);
        portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname} - ${getProphetNumberSuffix(index + 1)} Latter-day President`);
        portrait.setAttribute('loading', 'lazy');
        portrait.setAttribute('width', '340');
        portrait.setAttribute('height', '440');
  
        card.appendChild(h2);
        card.appendChild(portrait);
        card.appendChild(birthdate);
        card.appendChild(birthplace);
  
        cards.appendChild(card);
      });
    }
  
    function getProphetNumberSuffix(number) {
      const suffixes = ['th', 'st', 'nd', 'rd'];
      const remainder = number % 100;
      const suffix = suffixes[(remainder - 20) % 10] || suffixes[remainder] || suffixes[0];
      return `${number}${suffix}`;
    }
  
    function getAgeAtDeath(birthdate, deathdate) {
      const birth = new Date(birthdate);
      const death = new Date(deathdate);
      const ageInMillis = death - birth;
      const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25));
      return ageInYears;
    }
  
    function getCurrentAge(birthdate) {
      const birth = new Date(birthdate);
      const today = new Date();
      const ageInMillis = today - birth;
      const ageInYears = Math.floor(ageInMillis / (1000 * 60 * 60 * 24 * 365.25));
      return ageInYears;
    }
  
    const filterButton = document.getElementById('filterButton');
    filterButton.addEventListener('click', handleFilter);
  
    function handleFilter() {
      const cards = Array.from(document.getElementsByClassName('card'));
  
      cards.forEach((card) => {
        const length = parseInt(card.dataset.length);
        if (length > 10) {
          card.style.display = 'block';
        } else {
          card.style.display = 'none';
        }
      });
    }
    const noFilterButton = document.getElementById('noFilterButton');
    noFilterButton.addEventListener('click', handleNoFilter);
    
    function handleNoFilter() {
      const cards = Array.from(document.getElementsByClassName('card'));
    
      cards.forEach((card) => {
        card.style.display = 'block';
      });
    }




});
  