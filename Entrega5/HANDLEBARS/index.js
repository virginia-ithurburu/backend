'use strict'

const express = require ('express')
const app = express()
const router = require ('./Router')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', router)
app.use("/", express.static(__dirname + '/public'))
const handlebars = require("express-handlebars");

app.set("view engine", "hbs"); 
app.set("views", "./views");
app.engine("hbs", handlebars.engine({
    extname: ".hbs",
    defaultLayout: "index.hbs",
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
})
);

const PORT = 8080

app.get("/", (req, res) => {
    res.sendFile(__dirname)
});

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
});

server.on('Error', (error) => console.log(`Error en el servidor ${error}`));



