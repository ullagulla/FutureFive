const express = require('express')
const router = express.Router()
const User = require("../models/user")
const verifyToken = require("./verify")
const Product = require("../models/product")

router.get("/checkout", verifyToken, async (req, res) => {

    let products = []

    const user = await User.findOne({
        _id: req.body.user._id
    })
    for (let i = 0; i < user.cart.length; i++) {

        let product = await Product.findOne({
            _id: user.cart[i].productId
        })
        product.quantity = user.cart[i].quantity
        products.push(product)

    }

    res.render("shop/checkout.ejs", {
        products
    })
})

router.post("/checkout", verifyToken, (req, res) => {

    res.redirect("/thankyou")
})

module.exports = router