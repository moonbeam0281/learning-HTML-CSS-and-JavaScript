window.onload = () => {
    searchTextDefault();
    createFloatingBooks();
    addSearchEvent();
  };

function searchTextDefault(){
    document.getElementById("bookDisplay").innerHTML = `
    <p style="text-align:center; color: #555;">Search for the wonders of the world to begin...</p>
  `;
}

function addSearchEvent(){
    const searchBar = document.getElementById("searchInput");
    searchBar.addEventListener('keydown', (event) => {
        if(event.key === 'Enter')
        {
            const btn = document.getElementById("searchBtn");
            btn.click();
        }
    });
    const searchNumb = document.getElementById("searchNumb");
    searchNumb.addEventListener('keydown', (event) => {
        if(event.key === 'Enter')
        {
            const btn = document.getElementById("searchBtn");
            btn.click();
        }
    });
}

function fetchBooks(query) {
    if(query == ""){
        searchTextDefault();
        hideFloatingBooks("flex");
    }
    else{
        hideFloatingBooks("none");
        fetch(`https://openlibrary.org/search.json?q=${query}`).then(res => res.json()).then(data => {
            const display = document.getElementById("bookDisplay");
            display.innerHTML = "";
            
            const nRez = document.getElementById("searchNumb").value;

            data.docs.slice(0, (nRez == "" || nRez == 0? 20 : (nRez > 60? 60 : nRez))).forEach(book => {
            const title = book.title;
            console.log("Added book: '" + title + "'");
            const author = book.author_name ? book.author_name[0] : "Unknown";
            const coverId = book.cover_i;
            const coverUrl = coverId 
            ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
            : "images/default-book.jpg";
  
            const card = document.createElement("div");
            card.className = "bookCard";
            card.innerHTML = `
            <img src="${coverUrl}" alt="${title}">
            <h3>${title}</h3>
            <p>by ${author}</p>
            <button class="moreBtn" onclick="openModal('${title}', '${author}', 'No description available.', '${coverUrl}')">More Info</button>
            `;
            display.appendChild(card);
            });
        });
    }
  }
  
  function hideFloatingBooks(style){
    const floatingBooksDiv = document.getElementById("floatingBooks");
    floatingBooksDiv.style.display = style;
    console.log("Search bar is empty. Setting bookdisplay to flex");
  }


  function createFloatingBooks() {
    const floatingBooks = document.getElementById("floatingBooks");
        floatingBooks.innerHTML = "";
      
        for (let i = 0; i < 6; i++) {
          const img = document.createElement("img");
          img.src = "images/book" + (i+1) + ".jpg";
          img.className = "floatingBook";
          img.style.left = Math.random() * 90 + "vw";
          img.style.top = Math.random() * 60 + 20 + "vh";
          img.style.animationDuration = 15 + Math.random() * 10 + "s";
          floatingBooks.appendChild(img);
          console.log("Image " + (i+1) + " has been created. Path:`" + "images/book" + (i+1) + ".jpg`");
        }
  }
  
  

  function openModal(title, author, description, image) {
    const modal = document.getElementById("modal");
    modal.querySelector("h2").textContent = title;
    modal.querySelector("h4").textContent = "by " + author;
    modal.querySelector("img").src = image;
    modal.querySelector("p").textContent = description;
    modal.style.display = "flex";
  }
  
  function closeModal() {
    document.getElementById("modal").style.display = "none";
  }

  