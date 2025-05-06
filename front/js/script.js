function getCharacterInfo() {
    const characterName = document.getElementById('characterName').value.toLocaleLowerCase()
    const characterInfo = document.getElementById('characterInfo')
    characterInfo.classList.add('border')
    fetch(`http://localhost:3000/characters/${characterName}`)
        .then(response => response.json())
        .then(data => {
            const {name, status, species, gender, origin, image} = data
            characterInfo.innerHTML = `
                <h2>${name}</h2>
                <img src="${image}">
                <p>Status: ${status}</p>
                <p>Species: ${species}</p>
                <p>Gender: ${gender}</p>
                <p>Origin: ${origin.name}</p>
            `
        })
        .catch(error => {
            characterInfo.innerHTML = `
                <p>Imposible acceder al personaje</p>
            `
        })
}

document.addEventListener('keydown', (e) => {
    if(e.key === 'Enter') getCharacterInfo()
})