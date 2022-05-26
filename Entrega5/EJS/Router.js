const express = require ('express')
const Api = require('./Api')
const { Router } = express
const router = Router()

let productos = [
    {
        title: "Ramen",
        price: 150,
        thumbnail: "https://cdn2.iconfinder.com/data/icons/international-food/64/ramen-256.png",
        id: 1,
    }, 
];

const myApi = new Api(productos);

router.get('/productos', (req, res) => {
    res.render("./pages/cargar", { productos: productos }) 
 })

 router.get("/", (req, res) => {
    res.render("./pages/ingreso", { productos: productos }) 
})

router.get('/productos/:id', (req, res) => {
    return myApi.getProduct(req, res)
})

router.post('/productos', (req, res) => {
    return myApi.postProduct(req, res)
})

router.put("/productos/:id", (req, res) => {
    return myApi.putProduct(req, res)
})

router.delete("/productos/:id", (req, res) => {
    return myApi.deleteProduct(req, res)
})

module.exports = router;