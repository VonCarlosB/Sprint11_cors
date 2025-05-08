const characterInput = document.getElementById('characterName')
const characterInfo = document.getElementById('characterInfo')
const characterForm = document.getElementById('characterForm')

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') getCharacterInfo()
})

characterForm.addEventListener('submit', (e) => {
    e.preventDefault()
    getCharacterInfo()
})

function getCharacterInfo() {
    const characterName = characterInput.value.toLocaleLowerCase()
    fetch(`http://localhost:3000/characters/${characterName}`)
        .then(response => response.json())
        .then(data => {
            characterInfo.innerHTML = ''

            //Multiple characters
            data.forEach(character => {
                const {name, status, species, gender, origin, image} = character
                characterInfo.innerHTML += `
                <div class="border element">
                    <h2>${name}</h2>
                    <img src="${image}">
                    <p>Status: ${status}</p>
                    <p>Species: ${species}</p>
                    <p>Gender: ${gender}</p>
                    <p>Origin: ${origin}</p>
                </div>
            `
            })

            //Single character
            // const {name, status, species, gender, origin, image} = data
            // characterInfo.innerHTML = `
            //     <h2>${name}</h2>
            //     <img src="${image}">
            //     <p>Status: ${status}</p>
            //     <p>Species: ${species}</p>
            //     <p>Gender: ${gender}</p>
            //     <p>Origin: ${origin}</p>
            // `
        })
        .catch(error => {
            characterInfo.innerHTML = `
                <p>Imposible acceder al personaje</p>
            `
        })
}