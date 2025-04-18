const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const media = params.get("media");

document.addEventListener("DOMContentLoaded", async () => {
getMovie();
toggleLoading();
}); 

async function getMovie() {
let movie;
   //aqui vai a linha 14do pdf

   
   .then(res=> res.json())
   .then(res => movie = res)
   .catch(err => console.error(err));
   

      //terminar linha 21 do pdf


});