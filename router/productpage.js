const express = require('express')
const router = express.Router()
const Product = require("../models/product")

const items = 8

router.get('/products', async (req, res) => {
    const page = req.query.page
    const products = await Product
    .find()
    .skip(  (page-1) * items)
    .limit(items)
    res.render('shop/products.ejs', {
        products
    })
})

//specific product page below

router.get("/productpage/:id", async (req, res) =>{ //Uppdaterar data

    const product = await Product.findById({_id:req.params.id})

    res.render("shop/productpage.ejs", {product})
})

module.exports = router