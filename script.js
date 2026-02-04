const searchBtn = document.getElementById('searchBtn')
let historique = [] 
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
        historique.push(data.name)
        
        document.getElementById('pokemon').innerHTML = `
            <p>${data.name}</p>
            <img src=${data.sprites.front_default}>
            <p>${data.types[0].type.name}</p>
            <p class="type" data-type="${data.types[0].type.name}">

            <button id="detailsBtn">Details</button>
        `
        
        const detailsBtn = document.getElementById('detailsBtn')
        detailsBtn.addEventListener('click', () => {
            document.getElementById('modal').showModal()
            
       document.getElementById('modalInfo').innerHTML = `
        <img src=${data.sprites.front_default}>
        <p>HP: ${data.stats[0].base_stat}</p>
        <p>Attack: ${data.stats[1].base_stat}</p>
        <p>Defense: ${data.stats[2].base_stat}</p>
        <p>Weight: ${data.weight / 10} kg</p>
        <p>Height: ${data.height / 10} m</p>
        <p>Ability 1: ${data.abilities[0].ability.name}</p>
        <p>Ability 2: ${data.abilities[1].ability.name}</p>
`
            const closeModal = document.getElementById('closeModal') 
            closeModal.addEventListener('click', () => {
                document.getElementById('modal').close()
            })                        
        })
    }
}