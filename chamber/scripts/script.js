document.addEventListener('DOMContentLoaded', function(){
    
    const Fullyear = new Date().getFullYear();
    const msgFooter = `&copy; ${Fullyear} | `;
    const msgSecond = `Last Updated: ${document.lastModified}`;
    const contInfo = ``;
    const map = `| <a href="https://www.google.com/maps/place/9+Van+Riebeeck+St,+Fauresmith,+9978/@-29.7489724,25.3165676,17z/data=!3m1!4b1!4m5!3m4!1s0x1e8574e4f9d4e64d:0xa93a42a7002f5d56!8m2!3d-29.7489724!4d25.3165676">Map Link </a>`;
    const logo = `<img width="50" src="images/SACCI-logo.png">`;
    const siteName = `SACCI | Moshoeshoe S Mopeli | `;
    const datefield = document.querySelector("time");
    const now = new Date();
    const fulldate = new Intl.DateTimeFormat("en-US", 
        { dateStyle: "full" }).format(
            now
        );
 
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = new Date();
    const currentDay = days[currentDate.getDay()];
    const banner = document.getElementById("banner");
    
    if (currentDay === "Monday" || currentDay === "Tuesday") {
        banner.style.display = "block";
    } else {
        banner.style.display = "none";
    }


    datefield.textContent = fulldate;
    const footeEl = document.querySelector('footer');


    footeEl.innerHTML = msgFooter + siteName + logo + msgSecond + map;

    function toggleMenu(){
        
        document.getElementById("primaryNav").classList.toggle("open");
        document.getElementById("hamBtn").classList.toggle("open");
    }

    const btn = document.getElementById("hamBtn");
    btn.onclick = toggleMenu;

});

