const express = require('express')
const router = express.Router()
const User = require("../models/newuser")
const verifyToken = require("./verify")
const Product = require("../models/product")

router.get("/cart", verifyToken, async (req, res) => {

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


    res.render("shop/cart.ejs", {
        products
    })
})

router.get("/cartAdd/:id", verifyToken, async (req, res) => {

    const user = await User.findOne({
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

    user.cart.forEach((element, index) => {
        console.log(element)
        if (element.productId == req.params.id) {
            return user.cart.splice(index, 1)
        }
    })

    await user.save()

    res.redirect("/cart")

})

router.get("/update-add/:id", verifyToken, async (req, res) => {
    
})

module.exports = router