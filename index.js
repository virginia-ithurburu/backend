'use strict'

const express = require ('express')
const app = express()
const router = require ('./Router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use("/", express.static(__dirname + '/public'))

const PORT = 8080

app.get("/", (req, res) => {
    res.sendFile(__dirname)
})

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
})

server.on('Error', (error) => console.log(`Error en el servidor ${error}`));




