// Step 1: Get movies from localStorage
const movies = JSON.parse(localStorage.getItem("movies")) || [];
const container = document.getElementById("cardContainer");

// Step 2: Display only 'Streaming' movies
movies.forEach(movie => {
  if (movie.status === 'Streaming') {
    const card = document.createElement("div"); 
    card.className = "card";
    card.innerHTML = `
      <img src="${movie.img}" alt="${movie.title}" style="cursor:pointer;" />
      <h3>${movie.title}</h3>
    `;

    card.querySelector('img').addEventListener('click', () => {
      localStorage.setItem('selectedMovie', JSON.stringify({
        title: movie.title,
        img: movie.img
      }));
      
      window.location.href = 'seat.html';
    });

    container.appendChild(card);
  }
});
