let page = 1;

document.addEventListener("DOMContentLoaded", async () => {
    toggleLoading();
});

document.getElementById("pesquisar").addEventListener("submit", async function (event) {
    event.preventDefault();
    page = 1;
    let div = document.querySelector("#resultado");
    div.innerHTML = "";
    await pesquisar();
});

async function pesquisar() {
    toggleLoading();
    let texto = document.querySelector('input[type="text"]').value;
    let exibirMais = document.querySelector("#showMore");
    if (exibirMais) {
        exibirMais.innerHTML =  '';
    }

    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/multi?query=${texto}&include_adult=true&language=pt-br&page=${page}`, options);
        const pes = await response.json();

        exibirResultados(pes);
        criarBotaoMostrarMais(pes);
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao buscar os dados. Por favor, tente novamente.");
    }

    toggleLoading();
}

function exibirResultados(pes) {
    let div = document.querySelector("#resultado");
    let res = document.querySelector("#qtdeResultados");

    if (pes.total_results > 0) {
        res.innerHTML = `Resultado encontrado (${pes.total_results})`;
        pes.results.forEach(result => {
            let poster = result.poster_path ? `https://image.tmdb.org/t/p/original/${result.poster_path}` : 'img/no-poster.png';     ;
            div.innerHTML += `
            <div class="col">
                <a href="detalhes.html?id=${result.id}&media_type=${result.media_type}" class="text-decoration-none">
                    <div class="card bg-dark h-100 rounded-5">
                        <div class="img-container">
                            <div class="poster-img" style="background-image: url('${poster}');"></div>
                        </div>
                        <div class="card-body text-white">
                            <h5 class="card-title text-center">${result.title ?? result.name}</h5>
                        </div>
                    </div>
                </a>
            </div>`;
        });
    }
}

function criarBotaoMostrarMais(pes) {
    if (page < pes.total_pages) {
        page += 1;
        let exibirMais = document.querySelector("#showMore");
        exibirMais.innerHTML = 
       `<div class="col-14 text-center mt-5">
            <button class="btn btn-lg px-5 btn-danger text-white rounded-5" onclick="pesquisar()">Exibir Mais</button>
        </div>`;
    }
}
