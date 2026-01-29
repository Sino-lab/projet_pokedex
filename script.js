async function afficherFilms() {
  const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const films = await reponse.json();
  console.log(films);
}






<label for="site-search">Search the site:</label>
<input type="search" id="site-search" name="q" />
<button>Search</button>

