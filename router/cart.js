const express = require('express')
const router = express.Router()
const Product = require("../models/product")

router.get("/cart", async (req, res) => {
    const products = await Product.findOne()

    res.render("shop/cart.ejs", {
        products
    })
})

module.exports = router