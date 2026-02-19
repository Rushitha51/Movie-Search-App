const movieContainer = document.getElementById("movieContainer");
const movieSources = {
    telugu: ['Baahubali', 'RRR', 'Pushpa', 'Ala Vaikunthapurramuloo', 'Sita Ramam'],
    korean: ['Squid Game', 'Parasite', 'Train to Busan', 'Oldboy', 'My Love from the Star'],
    japanese: ['Spirited Away', 'Your Name', 'Demon Slayer', 'Attack on Titan', 'Naruto'],
    bollywood: ['Dangal', 'Gully Boy', 'Lagaan', '3 Idiots'],
    spanish: ['Pan\'s Labyrinth', 'The Secret of Their Eyes', 'Y Tu Mamá También', 'Dunkirk', 'Amor'],
    french: ['Amélie', 'Intouchables', 'Léon the Professional', 'La Haine'],
    mexican: ['Coco', 'Guillermo del Toro Films', 'El Crimen del Padre Amaro', 'Cantinflas'],
    chinese: ['Crazy Rich Asians', 'Shang-Chi', 'Everything Everywhere All at Once', 'Hero'],
    italian: ['Life is Beautiful', 'Cinema Paradiso', 'The Great Beauty', 'A Tale of Tales']
};
async function searchMovie() {
    const movieName = document.getElementById("searchInput").value.trim();
    if (!movieName) return;

    const url = `https://www.omdbapi.com/?apikey=thewdb&s=${movieName}&type=movie`;
    const res = await fetch(url);
    const data = await res.json();

    movieContainer.innerHTML = "";

    if (data.Response === "False") {
        movieContainer.innerHTML = `<p>🌍 No results! Try Telugu hits like 'RRR', 'Baahubali', or 'Pushpa'</p>`;
        return;
    }
    const teluguTitles = movieSources.telugu.map(title => title.toLowerCase());
    const teluguMovies = [];
    const otherMovies = [];

    data.Search.forEach(movie => {
        if (teluguTitles.includes(movie.Title.toLowerCase())) {
            teluguMovies.push(movie);
        } else {
            otherMovies.push(movie);
        }
    });
    const finalMovies = [...teluguMovies, ...otherMovies];

    finalMovies.forEach(movie => {
        const div = document.createElement("div");
        div.className = "movie";
        const year = movie.Year || 'N/A';
        const type = movie.Type.toUpperCase();

        div.innerHTML = `
            <img src="${movie.Poster}" onerror="this.src='https://via.placeholder.com/300x450?text=No+Poster'">
            <h3>🎬 ${movie.Title}</h3>
            <p>📅 Year: ${year}</p>
            <p>🎥 Type: ${type}</p>
        `;
        movieContainer.appendChild(div);
    });
}
function showInternationalSuggestions() {
    movieContainer.innerHTML = `<div class="suggestions">
        <h2>🌏 Movie Suggestions (Telugu First)</h2>
        <ul>
            ${movieSources.telugu.map(movie => `<li>${movie}</li>`).join('')}
            ${Object.entries(movieSources)
                .filter(([key]) => key !== 'telugu')
                .flatMap(([_, arr]) => arr)
                .map(movie => `<li>${movie}</li>`)
                .join('')}
        </ul>
    </div>`;
}
