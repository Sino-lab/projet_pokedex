async function afficherFilms() {
  const reponse = await fetch("https://pokeapi.co/api/v2/pokemon/ditto");
  const films = await reponse.json();
  console.log(films);
}


