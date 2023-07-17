document.addEventListener('DOMContentLoaded', function(){
    
    function toggleMenu(){
        
        document.getElementById("primaryNav").classList.toggle("open");
        document.getElementById("hamBtn").classList.toggle("open");
    }
    
    const btn = document.getElementById("hamBtn");
    btn.onclick = toggleMenu;

});
