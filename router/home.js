const express = require('express')
const app = express()
const router = express.Router()
const Product = require("../models/product")


router.get('/', async (req, res) => {

    res.render('shop/main.ejs')
})

//Ullis kod nedan

const productsArray = [
{
        name: "Voodoo doll",
        price: 5 + " kr",
        imageUrl: "/img/voodoo1.jpg"
    },
    {
        name: "Voodoo dolls 3-pack",
        price: 10 + " kr",
        imageUrl: "/img/voodoo2.jpg"
    },
    {
        name: "Voodoo doll döskalle",
        price: 10 + " kr",
        imageUrl: "/img/voodoo3.jpg"
    }, 
    {
        name: "Drömfångare",
        price: 10 + " kr",
        imageUrl: "/img/dreamcatcher2.jpg"
    },
    {
        name: "Shrunken head",
        price: 10 + " kr",
        imageUrl: "/img/shrunkenhead1.jpg"
    },
    {
        name: "Shrunken head",
        price: 10 + " kr",
        imageUrl: "/img/shrunkenhead2.jpg"
    },
    {
        name: "Love potion",
        price: 10 + " kr",
        imageUrl: "/img/potion1.jpg"
    },
    {
        name: "Potion kit",
        price: 10 + " kr",
        imageUrl: "/img/potion3.jpg"
    },
    {
        name: "Ouija board",
        price: 10 + " kr",
        imageUrl: "/img/ouija-board2.jpg"
    },
    {
        name: "Ouija board",
        price: 10 + " kr",
        imageUrl: "/img/Ouija-board3.jpg"
    },
    {
        name: "Ouija board",
        price: 10 + " kr",
        imageUrl: "/img/ouija-board1.jpg"
    },
    {
        name: "Ouija board",
        price: 10 + " kr",
        imageUrl: "/img/ouija-board4.jpg"
    },
]

const products = new Product(productsArray)

products.save(function (err) {
    if (err) return console.log(err);

    console.log('tmp saved to the database');
    return res.redirect('/products');
})

router.get('/products', async (req, res) => {
    /*const sorted = req.query.sort;
    const page = req.query.page;
    const ourProducts = await Product.find().sort({name:sorted})
    .skip(  (page-1) * items)
    .limit(items)*/
    res.render('shop/products.ejs', {
        productsArray
    })
})

module.exports = router