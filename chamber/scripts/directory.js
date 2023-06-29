document.addEventListener('DOMContentLoaded', function() {
    const URL = "data.json";
    const display = document.getElementById("cards");
  
    function displayDirectory(directory, type) {
      let data = directory.companies;
      data.forEach((business, index) => {
        let card = document.createElement("section");
        let p = document.createElement("p");
        let p2 = document.createElement("p");
        let a = document.createElement("a");
  
        card.setAttribute("class", "member");
        p.innerHTML = `${business.address}`;
        p2.innerHTML = `${business.phone}`;
        a.innerHTML = `${business.name}`;
        a.setAttribute("href", `${business.website}`);
  
        if (type === "grid") {
          let img = document.createElement("img");
          img.setAttribute("src", `${business.image}`);
          img.setAttribute("alt", `${business.name}`);
          img.setAttribute("loading", "lazy");
          card.append(img);
        } else {
          let h2 = document.createElement("h2");
          h2.innerHTML = `${business.name}`;
          card.append(h2);
        }
  
        card.appendChild(p);
        card.appendChild(p2);
        card.appendChild(a);
  
        display.classList.add(type);
  
        // Position the seventh company card after company 6
     
          display.append(card);
        
      });
    }
  
    async function getDirectoryData(type) {
      let response = await fetch(URL);
      if (response.ok) {
        let data = await response.json();
        displayDirectory(data, type);
      } else {
        throw Error(response.statusText);
      }
    }
  
    function deleteItems() {
      while (display.firstChild) {
        display.removeChild(display.firstChild);
      }
    }
  
    getDirectoryData("grid");
  
    const gridButton = document.querySelector("#grid");
    const listButton = document.querySelector("#list");
  
    gridButton.addEventListener("click", () => {
      if (display.classList.contains("list")) {
        deleteItems();
        display.classList.remove("list");
        getDirectoryData("grid");
      }
    });
  
    listButton.addEventListener("click", () => {
      if (display.classList.contains("grid")) {
        deleteItems();
        display.classList.remove("grid");
        getDirectoryData("list");
      }
    });
  });
  