const movies = [];

function addMovie() {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const year = parseInt(document.getElementById('year').value);

    if (title && genre && !isNaN(rating) && !isNaN(year)) {
        movies.push({ title, genre, rating, year });
        displayMovies();
        showSuccess(`"${title}" has been added to your collection`);
        clearForm();
    } else {
        alert('Please complete all fields correctly.');
    }
}

function showSuccess(message) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    document.querySelector('.card').insertBefore(successDiv, document.querySelector('.form-grid'));
    setTimeout(() => successDiv.remove(), 3000);
}

function clearForm() {
    document.getElementById('title').value = '';
    document.getElementById('genre').value = '';
    document.getElementById('rating').value = '';
    document.getElementById('year').value = '';
}

function displayMovies() {
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = movies.map(movie => `
        <div class="movie-card">
            <div class="movie-title">${movie.title}</div>
            <div class="movie-details">${movie.genre} • ${movie.year}</div>
            <span class="rating-badge">${movie.rating}/10</span>
        </div>
    `).join('');
}

function listMoviesByGenre(genre) {
    return movies.filter(movie => movie.genre.toLowerCase() === genre.toLowerCase());
}

function findHighestRatedMovie() {
    return movies.reduce((highest, current) => 
        current.rating > highest.rating ? current : highest, { rating: 0 });
}

function getAllMovieTitles() {
    return movies.map(movie => movie.title);
}

function getMoviesAfterYear(year) {
    return movies.filter(movie => movie.year > year);
}

function showGenreFilter() {
    const genre = prompt("Enter genre to filter:");
    if (genre) {
        const genreMovies = listMoviesByGenre(genre);
        displayFilterResults(`Movies in ${genre} genre:`, genreMovies);
        console.log(`Movies in ${genre} genre:`, genreMovies);
    }
}

function showHighestRated() {
    const highestRated = findHighestRatedMovie();
    displayFilterResults('Highest Rated Movie:', [highestRated]);
    console.log('Highest Rated Movie:', highestRated);
}

function showAllTitles() {
    const titles = getAllMovieTitles();
    displayFilterResults('All Movie Titles:', titles);
    console.log('All Movie Titles:', titles);
}

function showRecentMovies() {
    const year = parseInt(prompt("Enter year:"));
    if (!isNaN(year)) {
        const recentMovies = getMoviesAfterYear(year);
        displayFilterResults(`Movies after ${year}:`, recentMovies);
        console.log(`Movies after ${year}:`, recentMovies);
    }
}

function displayFilterResults(title, results) {
    const resultsDiv = document.getElementById('filterResults');
    resultsDiv.style.display = 'block';
    
    if (Array.isArray(results) && results.length === 0) {
        resultsDiv.textContent = `${title}\nNo results found`;
        return;
    }

    if (typeof results[0] === 'string') {
        resultsDiv.textContent = `${title}\n${results.join('\n')}`;
    } else {
        const formatted = results.map(movie => 
            `${movie.title} (${movie.year}) - ${movie.genre} - Rating: ${movie.rating}`
        ).join('\n');
        resultsDiv.textContent = `${title}\n${formatted}`;
    }
}

function logMovieOperation(operation, data) {
    console.log(`Movie Operation: ${operation}`);
    console.log('Data:', data);
    console.log('Current Collection Size:', movies.length);
}

function addMovie() {
    const title = document.getElementById('title').value;
    const genre = document.getElementById('genre').value;
    const rating = parseFloat(document.getElementById('rating').value);
    const year = parseInt(document.getElementById('year').value);

    if (title && genre && !isNaN(rating) && !isNaN(year)) {
        const newMovie = { title, genre, rating, year };
        movies.push(newMovie);
        displayMovies();
        showSuccess(`"${title}" has been added to your collection`);
        clearForm();
        logMovieOperation('Added New Movie', newMovie);
    } else {
        alert('Please complete all fields correctly.');
    }
}

displayMovies();
