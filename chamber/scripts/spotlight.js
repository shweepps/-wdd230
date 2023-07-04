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

            for (let i = 0; i < spotlights.length; i++) {
                const spotlight = spotlights[i];
                const company = shuffledCompanies[i];

                spotlight.querySelector('h3').textContent = company.name;
                spotlight.querySelector('a').href = company.website;
                spotlight.querySelector('img').src = company.image;
                spotlight.querySelector('img').alt = company.name;
            }
        });
});
