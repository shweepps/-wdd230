document.addEventListener('DOMContentLoaded', function(){
    
    const Fullyear = new Date().getFullYear();
    const msgFooter = `&copy; ${Fullyear}  Moshoeshoe S. Mopeli | South Africa, Free State`;
    const msgSecond = `<br/>Last Updated: ${document.lastModified}`;
    const footeEl = document.querySelector('footer');

    footeEl.innerHTML = msgFooter + msgSecond;


});

