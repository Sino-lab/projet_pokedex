const searchBtn = document.getElementById('searchBtn')


searchBtn.addEventListener('click', () => {
   searchPokemon()
})

async function searchPokemon() {
    const valueFromTheUser = document.getElementById('input').value
     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${valueFromTheUser}`)
     if(!res.ok) {
        alert('Une erreur est survenue, exemple pokemon inconnu')
     } else {
        const data = await res.json()
        document.getElementById('pokemon').innerHTML = `
        <p>${data.name}</p>
        <img src=${data.sprites.front_default}>
        <p>${data.types[0].type.name}
        `
     }
}


