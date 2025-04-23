const books = [
    {
      title: "The Godfather",
      author: "Mario Puzo",
      image: "images/book1.jpg",
      description: "One of the gratest books with an amazing movie adaptation, truly one of the best dramas out there."
    },
    {
      title: "Fight Club",
      author: "Chuck Palahniuk",
      image: "images/book2.jpg",
      description: "Fight Club presaged a decade of magazine articles debating man’s emasculation. It was visceral, inflammatory and, above all, entertaining"
    },
    {
      title: "Star Wars",
      author: "Claudia Gray",
      image: "images/book3.jpg",
      description: "Wars amongs the stars, battle against evil and good. One of the most popular books and movies amongst both young and old readers."
    },
    {
        title: "The Lord of the Rings",
        author: "J. R. R. Tolkein",
        image: "images/book4.jpg",
        description: "The Lord of the Rings is considered one of the greatest fantasy books ever written."
    },
    {
        title:"Jurassic Park",
        author: "Michael Crichton",
        image: "images/book5.jpg",
        description: "A very entertaining and interesting fantasy about a world with dinosaurs."
    },
    {
        title:"Rita Hayworth and the Shawshank Redemption",
        author: "Stephen King",
        image: "images/book6.jpg",
        description:"Stephen King's novella is a beautifully written look at how having patience, hope and perseverance will help you succeed, no matter how dark the situation you find yourself in"
    }
  ];

  const display = document.getElementById("bookDisplay");

  books.forEach(book => {
    const card = document.createElement("div");
    card.className = "bookCard";
    card.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <h3>${book.title}</h3>
        <p>by ${book.author}</p>
        <p class="desc">${book.description}</p>
        <button class="moreBtn" onclick="openModal('${book.title}', '${book.author}', '${book.description}', '${book.image}')">More Info</button>
`;
    display.appendChild(card);
  });

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