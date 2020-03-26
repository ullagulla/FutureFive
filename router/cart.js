const express = require('express')
const router = express.Router()
const User = require("../models/user")
const verifyToken = require("./verify")
const Product = require("../models/product")
const {checkAuthentication} = require('./auth')

router.get("/cart", verifyToken, checkAuthentication, async (req, res) => {

    let products = []

    if (!req.body.user) {
        req.flash(
            'error_msg',
            'Du måste vara inloggad'
        )
        return res.redirect("/products")
    }

    user = await User.findOne({
        _id: req.body.user._id
    })
    for (let i = 0; i < user.cart.length; i++) {

        let product = await Product.findOne({
            _id: user.cart[i].productId
        })
        product.quantity = user.cart[i].quantity
        products.push(product)

    }

    res.render("shop/cart.ejs", {
        products, user, admin:req.admin
    })
})

router.get("/cartAdd/:id", verifyToken, async (req, res) => {

    let user

    if (!req.body.user) {
        user = null

        req.flash(
            'error_msg',
            'Du måste vara inloggad'
          )

        return res.redirect("/products")

    }

    user = await User.findOne({
        _id: req.body.user._id
    })
    await user.addToCart(req.params.id)

    res.redirect("/cart")

})

//tar bort produkt från varukorg

router.get("/delete/:id", verifyToken, async (req, res) => {

    const user = await User.findOne({
        _id: req.body.user._id
    })

    await user.removeFromCart(req.params.id)

    res.redirect("/cart")

})

router.get("/update-add/:id", verifyToken, async (req, res) => {

    const user = await User.findOne({
        _id: req.body.user._id
    })

    await user.addProductInCart(req.params.id)

    res.redirect("/cart")

})

router.get("/update-remove/:id", verifyToken, async (req, res) => {

    const user = await User.findOne({
        _id: req.body.user._id
    })

    await user.removeProductInCart(req.params.id)

    res.redirect("/cart")

})

module.exports = router