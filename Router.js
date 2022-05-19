const express = require ('express')
const Api = require('./Api')
const { Router } = express
const router = Router()

let productos = [
    {
        title: "Burger",
        price: 55,
        thumbnail: "none",
        id: 1,
    }, 
];

const myApi = new Api(productos);

router.get('/productos', (req, res) => {
    return myApi.getProducts(req, res)
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