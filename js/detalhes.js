const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const media = params.get("media");

document.addEventListener("DOMContentLoaded", async () => {
getMovie();
toggleLoading();
}); 

async function getMovie() {
   //terminar linha 13 do pdf

}