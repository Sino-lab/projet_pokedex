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
            <p>${data.types[0].type.name}</p>
            <button id="detailsBtn">Details</button>
        `
        
        const detailsBtn = document.getElementById('detailsBtn')
        detailsBtn.addEventListener('click', () => {
            document.getElementById('modal').showModal()
            
       document.getElementById('modalInfo').innerHTML = `
    <p>Weight: ${data.weight / 10} kg</p>
    <p>Height: ${data.height / 10} m</p>
    <p>Ability: ${data.abilities[0].ability.name}</p>
`
            const closeModal = document.getElementById('closeModal') 
            closeModal.addEventListener('click', () => {
                document.getElementById('modal').close()
            })                        
        })
    }
}