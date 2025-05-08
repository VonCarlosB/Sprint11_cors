const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/characters', async (req, res) => {
    const url = 'https://rickandmortyapi.com/api/character/'
    try {
        const response = await axios.get(url)
        res.json(response.data)
    } catch (error) {
        res.status(404).json({error: 'Error con la API de R&M'})
    }
})

app.get('/characters/:name', async (req, res) => {
    const name = req.params.name
    const url = 'https://rickandmortyapi.com/api/character/?name='+name
    try {
        const response = await axios.get(url)
        
        // To return all characters
        const characters = response.data.results
        if(characters){
            const newDataCharacter = characters.map(personaje => {
                const {name, status, species, gender, origin, image} = personaje
                return {name, status, species, gender, origin: origin.name, image}
            })
            res.json(newDataCharacter)
        }else{
            console.log('Personaje no encontrado')
            res.json({error: 'Personaje no encontrado'})
        }

        // To return the first character
        // const {name, status, species, gender, origin, image} = response.data.results[0]
        // res.json({name, status, species, gender, origin, image})
    } catch (error) {
        res.status(404).json({error: 'Personaje no encontrado'})
    }
})

app.listen(3000, () => {
    console.log('Server active on http://localhost:3000')
})