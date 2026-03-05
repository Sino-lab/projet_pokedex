const searchBtn = document.getElementById('searchBtn')
let historique = []
let favoris = []

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
            <button id="favoriBtn">⭐ Ajouter aux favoris</button>
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

        const favoriBtn = document.getElementById('favoriBtn')
        favoriBtn.addEventListener('click', () => {
            if (!favoris.includes(data.name)) {
                favoris.push(data.name)
                afficherFavoris()
            } else {
                alert(`${data.name} est déjà dans vos favoris !`)
            }
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

function afficherFavoris() {
    const favorisDiv = document.getElementById('favoris')
    favorisDiv.innerHTML = '<p>Mes favoris :</p>'

    for (let i = 0; i < favoris.length; i++) {
        const btn = document.createElement('button')
        btn.textContent = favoris[i]
        btn.addEventListener('click', () => {
            document.getElementById('input').value = favoris[i]
            searchPokemon()
        })
        favorisDiv.appendChild(btn)

        const btnSupprimer = document.createElement('button')
        btnSupprimer.textContent = '❌'
        btnSupprimer.addEventListener('click', () => {
            favoris.splice(i, 1)
            afficherFavoris()
        })
        favorisDiv.appendChild(btnSupprimer)
    }
}

function getIdAleatoires() {
    let ids = []
    while (ids.length < 5) {
        const nombreAleatoire = Math.floor(Math.random() * 151) + 1
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

async function rechercherParType() {
    const type = document.getElementById('inputType').value.toLowerCase()
    const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`)

    if (!res.ok) {
        alert('Type inconnu, exemples : fire, water, grass, electric...')
        return
    }

    const data = await res.json()
    const liste = data.pokemon

    const resultatsDiv = document.getElementById('resultatsRecherche')
    resultatsDiv.innerHTML = `<p>Pokémon de type ${type} :</p>`

    for (let i = 0; i < 10 && i < liste.length; i++) {
        const btn = document.createElement('button')
        btn.textContent = liste[i].pokemon.name
        btn.addEventListener('click', () => {
            document.getElementById('input').value = liste[i].pokemon.name
            searchPokemon()
        })
        resultatsDiv.appendChild(btn)
    }
}

async function rechercherParGeneration() {
    const generation = document.getElementById('inputGeneration').value
    const res = await fetch(`https://pokeapi.co/api/v2/generation/${generation}`)

    if (!res.ok) {
        alert('Génération inconnue, entrez un nombre entre 1 et 9')
        return
    }

    const data = await res.json()
    const liste = data.pokemon_species

    const resultatsDiv = document.getElementById('resultatsRecherche')
    resultatsDiv.innerHTML = `<p>Pokémon de la génération ${generation} :</p>`

    for (let i = 0; i < 10 && i < liste.length; i++) {
        const btn = document.createElement('button')
        btn.textContent = liste[i].name
        btn.addEventListener('click', () => {
            document.getElementById('input').value = liste[i].name
            searchPokemon()
        })
        resultatsDiv.appendChild(btn)
    }
}

afficherRecommandations()