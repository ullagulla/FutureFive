const express = require('express')
const app = express()
const router = express.Router()

router.get('/', async (req, res) => {

    res.render('shop/main.ejs')
})

//Ullis kod nedan

const products = [{
        name: "Voodoo",
        price: 5 + " kr",
        imgUrl: "/img/voodoo1.jpg"
    },
    {
        name: "Voodoo",
        price: 10 + " kr",
        imgUrl: "/img/voodoo2.jpg"
    },
    {
        name: "Voodoo",
        price: 10 + " kr",
        imgUrl: "/img/voodoo3.jpg"
    }, {
        name: "Drömfångare",
        price: 10 + " kr",
        imgUrl: "/img/dreamcatcher2.jpg"
    },
    {
        name: "Ouija board",
        price: 10 + " kr",
        imgUrl: "/img/ouija-board2.jpg"
    },
    {
        name: "Ouija board",
        price: 10 + " kr",
        imgUrl: "/img/Ouija-board3.jpg"
    },
    {
        name: "Ouija board",
        price: 10 + " kr",
        imgUrl: "/img/ouija-board1.jpg"
    },
    {
        name: "Ouija board",
        price: 10 + " kr",
        imgUrl: "/img/ouija-board4.jpg"
    }
];

router.get('/products', async (req, res) => {
    res.render('shop/products.ejs', {
        products
    })
})

module.exports = router