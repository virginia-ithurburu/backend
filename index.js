
const express = require ('express')
const app = express()

const fs = require("fs")

class Contenedor {
    constructor (desafio) {

    this.desafio = desafio;

    }

    async save (object) {
        let objects = this.desafio;
        fs.promises.readFile(`./${objects}`, "utf-8")
        .then( content => {
            if (content.length) { 
                let longit = JSON.parse(content).length;
                object.id = JSON.parse(content)[longit - 1].id + 1;
                async function add() {
                    try {
                        let newContent = JSON.parse(content);
                        newContent.push(object); 
                        await fs.promises.writeFile(`./${objects}`, JSON.stringify(newContent, null, 2))
                        console.log(`Id del producto: ${object.id}`);
                    }
                    catch (e) {
                        console.log(e);
                    }
                }
                add(); 
            } else {
                object.id = 1;
                async function startJson() {
                    try {
                        let newContent = [object];
                        await fs.promises.writeFile(`./${objects}`,  JSON.stringify(newContent, null, 2))
                        console.log(`Id del producto: ${object.id}`);
                    }
                    catch(err) {
                        console.log("Hubo un error", err);
                    }   
                }
                startJson(); 
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    async getById(id) {
        let objects = this.desafio;
        fs.promises.readFile(`./${objects}`, "utf-8")
        .then(content => {
            const result = JSON.parse(content).find(obj => obj.id === id)
            if (result) {
                console.log(result);
            } else {
                console.log(null);
            }
        })
        .catch(err => {
            console.log("No se pudo encontrar", err)
        })
    }

    async getAll() {
            let objects = this.desafio;
            fs.promises.readFile(`./${objects}`, "utf-8")
            .then(contenido => {
                console.log(JSON.parse(contenido))
            })
            .catch(err => {
                console.log("No hay contenido", err)
            })
    }

    async deleteById(id) {
        let objects = this.desafio;
        fs.promises.readFile(`./${objects}`, "utf-8")
        .then(content => {
            let filter = JSON.parse(content).filter(elem => elem.id !== id)
            let idExist = JSON.parse(content).some(elem => elem.id === id);
            async function eliminar() {
                try {
                    await fs.promises.writeFile(`./${objects}`, JSON.stringify(filter, null, 2))
                    !idExist ? console.log("No se ha encontrado el objeto con la id indicada") : console.log("Objeto borrado");
                }
                catch(err) {
                    console.log("No se pudo eliminar", err)
                }
            }
            eliminar();
        })
        .catch(err => {
            console.log("Algo falló", err)
        })
    }

    async deleteAll () {
        await fs.promises.writeFile(this.desafio, "")
    }   
}


fileTxt.save({ title: "Burger", price: 25, thumbnail: "https://cdn.nanalyze.com/uploads/2017/05/Burger-Future-Teaser.jpg"})

//fileTxt.getAll();

//fileTxt.getById(2);

//fileTxt.deleteById(1);

//fileTxt.deleteAll();

const PORT = 8080

const server = app.listen(PORT, () => {
    console.log(`Servidor HTTP escuchando en el puerto ${server.address().port}`);
})

server.on('Error', (error) => console.log(`Error en el servidor ${error}`));

app.get('/', (req, res) => {
    res.send("<h1>Bienvenidos al servidor Express!</h1>");
})

const random = (max) => {
    return Math.floor(Math.random() * (max));
}
const fileTxt = new Contenedor("file.txt");

app.get('/productos', async (req, res) => {
    res.json(await fileTxt.getAll())
})

app.get('/productoRandom', async (req, res) => {
    const datos = await fileTxt.getAll();
    res.json(datos[random(datos.length)])
})