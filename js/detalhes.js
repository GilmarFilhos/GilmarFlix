const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const media = params.get("media");

document.addEventListener("DOMContentLoaded", async () => {
getMovie();
toggleLoading();
}); 

async function getMovie() {
let movie;
   await fetch(`https://api.themoviedb.org/3/${media}/${id}?language=pt-br`, options)

   
   .then(res=> res.json()) 
   .then(res => movie = res)
   .catch(err => console.error(err));
   
document.querySelector('.poster').src = movie.poster_path ? `https://image.tmdb.org/t/p/original/${movie.poster_path}` : "img/no-poster.png";

let detalhes = document.getElementById('detalhes');

detalhes.innerHTML = `<h1 class="fs-1 text-danger">${movie.title ?? movie.name}</h1>
<h4 class="mb-4 fw-bold">Título Original: ${movie.original_title ?? movie.original_name}</h4>
<p class='mb-3'>Data de Estreia: ${formatDate(movie.release_date ?? movie.last_air_date)}</p>
<p class='mb-3'>País de Origem: ${movie.origin_country}</p>
<p class='mb-3'>Popularidade: ${movie.popularity.toFixed(1)}</p>
<p class='mb-3'>Status: ${movie.status}</p>
<p class='mb-3'>${movie.overview}</p>;
`
movie.genres.forEach(genre => {

detalhes.innerHTML += `<button class="btn btn-lg btn-outline-danger m3-2">${genre.name}</button>`


});

let trailer;

  await fetch(`https://api.themoviedb.org/3/${media}/${id}/videos?language=pt-br`, options)

   .then(res=> res.json()) 
   .then(res => movie = res)
   .catch(err => console.error(err));
   
let trailerContainer = document.querySelector('#trailer');
if (trailer.length > 0) {
    let carousel = document.querySelector('.carousel-inner');
    carousel.innerHTML = '';
    for (let i = 0; i < trailer.length; i++) {
        carousel.innerHTML +=
            `<div class="carousel-item ${i == 0 ? 'active' : ''}">
                <iframe class="rounded-5 d-block w-100" width="100%" height="500" src="https://www.youtube.com/embed/${trailer[i].key}"></iframe>
                <div class="carousel-caption d-none d-md-block">
                    <h5 class="mb-0">${trailer[i].name} - Publicado em: ${formatDate(trailer[i].published_at)}</h5>
                </div>
            </div>`;
    }
} else {
    trailerContainer.style.display = 'none';
}

// Elenco
let cast = [];
await fetch(`https://api.themoviedb.org/3/${media}/${id}/credits?language=pt-br`, options)
    .then(res => res.json())
    .then(res => cast = res.cast)
    .catch(err => console.error(err));

//console.log(cast);

let castContainer = document.querySelector('#elenco');
if (cast.length > 0) {
    castContainer.innerHTML = '';
    for (let i = 0; i < cast.length; i++) {
        let profile = cast[i].profile_path ? `https://image.tmdb.org/t/p/w185${cast[i].profile_path}` : 'img/no-photo-cast.png';
        castContainer.innerHTML +=
            `<div class="row">
                <div class="col-md-2 col-sm-4 col-4">
                    <a href="pessoa.html?id=${cast[i].id}">
                        <img class="rounded-circle img-fluid img-thumbnail" src="${profile}" />
                    </a>
                </div>
                <div class="col-md-10 col-sm-8 col-8">
                    <a class="fw-bold mb-0 text-decoration-none" href="pessoa.html?id=${cast[i].id}">${cast[i].original_name}</a>
                    <small class="text-secondary d-block">${cast[i].character}</small>
                </div>
            </div>`;
    }
} else {
    castContainer.parentElement.style.display = 'none';
}

}