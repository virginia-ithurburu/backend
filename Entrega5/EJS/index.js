'use strict'

const express = require ('express')
const app = express()
const router = require ('./Router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use("/", express.static(__dirname + '/public'))

app.set('views', './views')
app.set('view engine', 'ejs')

const PORT = 8080

app.get("/", (req, res) => {
    res.sendFile(__dirname)
});


app.get("/hello", (req, res) => {
    const mascotas = [
        { name: 'Toru', organizacion: 'Casa de mami', birth_year: 2014},
        { name: 'Ramona', organizacion: 'Casa de Berni', birth_year: 2014},
        { name: 'Toru', organizacion: 'Casa de Berni', birth_year: 2018}
    ];

    var tagline = "No programming concept is complete without a cute animal mascot."

    res.render('pages/index', {mascotas: mascotas, tagline: tagline});
});

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on('Error', (error) => console.log(`Error en el servidor ${error}`));



