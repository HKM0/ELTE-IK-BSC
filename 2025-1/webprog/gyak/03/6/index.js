const filter = document.querySelector('#filter');
const list = document.querySelector('#list');
const details = document.querySelector('#details');

displayMovies(movies);

filter.addEventListener("input", onFilter);

function onFilter(s){
    const filterText = filter.value.trim();
    const filteredMovies = fmovie(filterText);
    displayMovies(filteredMovies);
}

function fmovie(s) {
    return movies.filter(m => 
        m.title.trim().toLowerCase().includes(s.toLowerCase())
    );
}

function displayMovies(movieList) {
    list.innerHTML = '';
    movieList.forEach(movie => {
        const li = document.createElement('li');
        li.textContent = movie.title;
        li.addEventListener('click', () => showMovieDetailsByID(movie.id));
        list.appendChild(li);
    });
}

function showMovieDetails(movie) {
    details.innerHTML = `
        <p><strong>${movie.title}</strong></p>
        <p>${movie.director} (${movie.year})</p>
    `;
    //<p><strong>${movie.id}</strong></p>
}


function showMovieDetailsByID(id) {
    details.innerHTML = `
        <p><strong>${movie.title}</strong></p>
        <p>${movie.director} (${movie.year})</p>
    `;
    //<p><strong>${movie.id}</st
}
