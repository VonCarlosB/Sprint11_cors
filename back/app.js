const express = require('express')
const axios = require('axios')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/characters', async (req, res) => {

})

app.get('/characters/:name', async (req, res) => {
    const name = req.params.name
    const url = 'https://rickandmortyapi.com/api/character/?name='+name
    try {
        const response = await axios.get(url)
        const {name, status, species, gender, origin, image} = response.data
        res.json({name, status, species, gender, origin, image})
    } catch (error) {
        res.status(404).json({error: 'Personaje no encontrado'})
    }
})

app.listen(4000, () => {
    console.log('Server active on http://localhost:4000')
})