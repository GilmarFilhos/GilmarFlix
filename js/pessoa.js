const params = new URLSearchParams(window.location.search);
const id = params.get('id'); // Corrigido: era params('id')

document.addEventListener('DOMContentLoaded', async () => {
    await getPessoa();
    toggleLoading(); // Se você tiver essa função em outro lugar
});

async function getPessoa() {
    let pessoa;

    await fetch(`https://api.themoviedb.org/3/person/${id}?language=pt-BR`, options)
        .then(res => res.json())
        .then(res => pessoa = res)
        .catch(err => console.error(err));

    document.querySelector('.poster').src = pessoa.profile_path
        ? `https://image.tmdb.org/t/p/original/${pessoa.profile_path}`
        : 'img/no-photo-cast.jpg'; // Corrigido para imagem padrão

    let detalhes = document.getElementById('detalhes');
    detalhes.innerHTML = `
        <h1 class='fs-1 text-danger'>${pessoa.name}</h1>
        <h4 class='mb-4'>Nascimento: ${pessoa.place_of_birth}</h4>
        <h4 class='mb-4'>Data Nascimento: ${formatDate(pessoa.birthday)}</h4>
        <p class='mb-3'>${pessoa.biography ? pessoa.biography : "Biografia Não Está Disponível"}</p>
    `;
}

