let page = 1;

document.addEventListener("DOMContentLoaded",async () => {
toggleLoading();
});

document.getElementById('pesquisar').addEventListener('submit', async function (event) {
	event.preventDefault();
	page = 1;
	let div = document.querySelector('#resultado');
	div.innerHTML = '';
	await pesquisar();

});

async function pesquisar(){
	toggleLoading();
	let pes;
	let texto = document.querySelector('input[type="text"]').value;
	let exblirMais = document.querySelector('#showMore');
	if (exibirMais) {
		exiblirMais.innerHTML = '';
	}

	await fetch(`https://api.themoviedb.org/3/search/multi=${texto}&include_adult=false&language=pt-br&page=${page}`, options) 
	.then(res => res.json())
	.then(res => pes = res)
	.catch(err => console.error(error));
}

let div = document.querySelector('#resulto');
let res = document.querySelector('#qtdeResultados')
if (pes.total_results > 0) {
	res.innerHTML = `Resultado encontrado (${pes.total_results})`;
	let poster = result.poster_path ?  `https://image.tmdb.org/t/p/original/$result.poster_path}` : 'img/no-poster.png';
	div.innerHTML += 
	`<div class="col">
   <a href="detalhes.html?id=${result.id}&{result.media_type} class="text-decoration-none">
   <div class='card bg-dark h-100 rounded-5";

  <div class='img-container'>
  <div class="poster-img" src="${poster}" style="background-image: url('${poster}');"></div>
  </div>
  <div class="card-body text-white">
  <h5 card="card-title text-center">${result.title ?? result.name}</h5>

</div>
</div>

</a>
</div>




	
});

}

if (page < pes.total_pages) {
	page += 1;
	exiblirMais.innerHTML = 
	`<div class="col-12 text-center mt-5">
	<button class="btn btn-lg px-5 btn-danger text-white rounded-5 onclick="pesquisar()">Exiblir Mais</button>
</div>`
}

toggleLoading();

}