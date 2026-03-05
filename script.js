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

        if (historique.length > 5) {
            historique.shift()
        }

      
        afficherHistorique()
        
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

function afficherHistorique() {
    let historiqueDiv = document.getElementById('historique')
    historiqueDiv.innerHTML = '<p>Historique des recherches :</p>'
    for (let i = 0; i < historique.length; i++) {
        const btn = document.createElement('button')
        btn.textContent = historique[i]
        btn.addEventListener('click', () => {
            document.getElementById('input').value = historique[i]
            searchPokemon()
        })
        historiqueDiv.appendChild(btn)
    }
}


function getIdAleatoires() {
    let ids = []
    while (ids.length < 5) {
        const nombreAleatoire = Math.floor(Math.random() * 151) + 1
        // On évite les doublons
        if (!ids.includes(nombreAleatoire)) {
            ids.push(nombreAleatoire)
        }
    }
    return ids
}

async function afficherRecommandations() {
    const ids = getIdAleatoires()
    const recommandationsDiv = document.getElementById('recommandations')

    recommandationsDiv.innerHTML = '<p>Pokémon recommandés :</p>'

    for (let i = 0; i < ids.length; i++) {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${ids[i]}`)
        const data = await res.json()

        const btn = document.createElement('button')
        btn.textContent = data.name
        btn.addEventListener('click', () => {
            document.getElementById('input').value = data.name
            searchPokemon()
        })
        recommandationsDiv.appendChild(btn)
    }
}

afficherRecommandations()