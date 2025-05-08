let editingRow = null;
function logOut(){
     window.location.href = './admin.html'
}
function addMovie() {
    document.getElementById("movieForm").style.display = 'block';
}

function closeForm() {
    document.getElementById("movieForm").reset();
    document.getElementById("movieForm").style.display = 'none';
    editingRow = null;
}

function formatMin(el) {
    let value = parseInt(el.value, 10);
    if (!isNaN(value)) {
        if (value < 0) value = 0;
        if (value > 59) value = '';
        el.value = value.toString().padStart(2, '0');
    }
}

function formatHour(el) {
    let value = parseInt(el.value, 10);
    if (!isNaN(value)) {
        if (value < 0) value = 0;
        if (value > 12) value = '';
        el.value = value.toString().padStart(2, '0');
    }
}

function upload() {
    const title = document.getElementById("movie-name").value;
    const desc = document.getElementById("desc").value;
    const hour = document.getElementById("hour").value;
    const mins = document.getElementById("mins").value;
    const startDate = new Date(document.getElementById("show-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
    const file = document.getElementById("poster").files[0];
    const url = document.getElementById("poster-url").value;
    const today = new Date();
    const status = (today >= startDate && today <= endDate) ? "Streaming" : "Available soon";

    const handlePoster = (posterURL) => {
        const table = document.getElementById("movieTable").getElementsByTagName('tbody')[0];
        if (editingRow) {
            editingRow.cells[0].innerHTML = `<img src="${posterURL}" width="60" height="80"/>`;
            editingRow.cells[1].textContent = title;
            editingRow.cells[2].textContent = desc;
            editingRow.cells[3].textContent = `${hour.padStart(2, '0')}:${mins.padStart(2, '0')}`;
            editingRow.cells[4].textContent = status;
            editingRow = null;
        } else {
            const newRow = table.insertRow();
            newRow.innerHTML = `
                <td><img src="${posterURL}" width="60" height="80"/></td>
                <td>${title}</td>
                <td>${desc}</td>
                <td>${hour.padStart(2, '0')}:${mins.padStart(2, '0')}</td>
                <td>${status}</td>
                <td>
                    <button onclick="editMovie(this)" style="background-color:green;color:white; border:none">Edit</button>
                <button onclick="viewMovie(this)" >View</button>
                <button onclick="deleteMovie(this)" style="background-color:red;color:white; border:none">Delete</button>
                </td>
            `;
        }

        saveToLocalStorage();
        document.getElementById("movieForm").reset();
        document.getElementById("movieForm").style.display = "none";
    };

    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => handlePoster(e.target.result);
        reader.readAsDataURL(file);
    } else if (url) {
        handlePoster(url);
    } else if (editingRow) {
        const existingImg = editingRow.cells[0].querySelector('img').src;
        handlePoster(existingImg);
    } else {
        alert("Please upload or paste a valid image.");
    }
}

function saveToLocalStorage() {
    const rows = document.querySelectorAll("#movieTable tbody tr");
    const movies = Array.from(rows).map(row => {
        const img = row.cells[0].querySelector("img").src;
        const title = row.cells[1].textContent;
        const desc = row.cells[2].textContent;
        const time = row.cells[3].textContent;
        const status = row.cells[4].textContent;
        return { img, title, desc, time, status};
    });
    localStorage.setItem("movies", JSON.stringify(movies));
}

function loadFromLocalStorage() {
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const table = document.getElementById("movieTable").getElementsByTagName('tbody')[0];
    table.innerHTML = ""; 

    movies.forEach(movie => {
        const newRow = table.insertRow();
        newRow.innerHTML = `
            <td><img src="${movie.img}" width="60" height="80"/></td>
            <td>${movie.title}</td>
            <td>${movie.desc}</td>
            <td>${movie.time}</td>
            <td>${movie.status}</td>
            <td>
                <button onclick="editMovie(this)" style="background-color:green;color:white; border:none">Edit</button>
                <button onclick="viewMovie(this)" >View</button>
                <button onclick="deleteMovie(this)" style="background-color:red;color:white; border:none">Delete</button>
            </td>
        `;
    });
}

function editMovie(btn) {
    editingRow = btn.parentElement.parentElement;
    const cells = editingRow.cells;
    document.getElementById("movie-name").value = cells[1].textContent;
    document.getElementById("desc").value = cells[2].textContent;

    const [hour, mins] = cells[3].textContent.split(':');
    document.getElementById("hour").value = hour;
    document.getElementById("mins").value = mins;

    document.getElementById("movieForm").style.display = 'block';
}

function deleteMovie(btn) {
    if (confirm("Are you sure to delete this movie?")) {
        const row = btn.parentElement.parentElement;
        row.remove();
        saveToLocalStorage();
    }
}

function viewMovie(btn) {
    const row = btn.parentElement.parentElement;
    const title = row.cells[1].textContent;
    const desc = row.cells[2].textContent;
    const time = row.cells[3].textContent;
    const status = row.cells[4].textContent;
    alert(`Title: ${title}\nDescription: ${desc}\nDuration: ${time}\nStatus: ${status}`);
}

window.onload = loadFromLocalStorage;