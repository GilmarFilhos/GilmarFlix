const options = {
	method: 'GET';
		headers: {
			accept: 'application/json';
			Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzU2NTNlNzllOTU1ZmFlNzljY2I0NWEzZmUyZjA2MiIsIm5iZiI6MTc0NDkzNjAxNS40MzYsInN1YiI6IjY4MDE5YzRmNjFiMWM0YmIzMjlhMGQzNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ISpH37nr9Z0K0-ll6VB8TjY1hbo3DBNbKu9GiZ9lzAg'
		}
}

fuction toggleLoading() {
	let loader = document.querySelector(".loader");
	loader.style.display = loader.style.display == "none" ? "block" : "none";

}

/*linha 18* /