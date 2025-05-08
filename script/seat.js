const seatGrid = document.getElementById("seatGrid");
const confirmBtn = document.getElementById("confirmBtn");

const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    const formattedDate = `${dd} - ${mm} - ${yyyy}`;
    console.log(formattedDate);

    document.getElementById('movieDate').textContent=formattedDate; 

const selectedMovie = JSON.parse(localStorage.getItem("selectedMovie"));
console.log("Selected Movie:", selectedMovie);  // DEBUG

if (selectedMovie) {
  movieName.textContent = selectedMovie.title.toUpperCase();
}

const rows = 8;
const cols = 8;
let occupiedSeats = [];
let selected = document.getElementById('SS');
selected.textContent = 0
let occupied = document.getElementById('OPS');
let available = document.getElementById('AS');
for (let i = 0; i < 10; i++) {  
  occupiedSeats.push(Math.floor(Math.random() * 64)); 
}
occupied.textContent = occupiedSeats.length

const selectedSeats = new Set();


for (let i = 0; i < rows * cols; i++) {
  const seat = document.createElement("div");
  seat.classList.add("seat");

  if (occupiedSeats.includes(i)) {
    seat.classList.add("occupied");
  } else {
    seat.addEventListener("click", () => {
      if (!seat.classList.contains("occupied")) {
        seat.classList.toggle("selected");

        if (selectedSeats.has(i)) {
          selectedSeats.delete(i);
          selected.textContent = parseInt(selected.textContent) - 1;
        } else {
          selectedSeats.add(i);
          selected.textContent = parseInt(selected.textContent) + 1;
        }
        available.textContent =64 - (parseInt(selected.textContent) + parseInt(occupied.textContent))
      }
    });
  }
  available.textContent =64 -  parseInt(occupied.textContent)
  

  seatGrid.appendChild(seat);
}

confirmBtn.addEventListener("click", () => {
  if (selectedSeats.size === 0) {
    alert("Please select at least one seat.");
    return;
  } else {
    document.getElementById('booking').style.display='none'
    document.getElementById('bill').style.display='block'
    const booked = Array.from(selectedSeats).map(seat => `${seat + 1}`);
    console.log(booked);

    const BookedTitle = document.getElementById('BookedTitle')
    const BookedDate = document.getElementById('BookedDate')
    const BookedSeats = document.getElementById('BookedSeats')
    const BookedPrice = document.getElementById('BookedPrice')    


    BookedTitle.innerHTML = selectedMovie.title.toUpperCase()

    BookedDate.innerHTML = formattedDate
    console.log(typeof(BookedDate));

    BookedSeats.innerHTML = booked.join(' ');

    BookedPrice.innerHTML = (booked.length)*250;
  }
});

function pay(){
  alert("Booking Sucessfull, Thankyou for booking");
  window.location.href = "movie.html";
}

