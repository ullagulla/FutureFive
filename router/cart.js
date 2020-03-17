const express = require('express')
const router = express.Router()
const User = require("../models/newuser")
const verifyToken = require("./verify")
const Product = require("../models/product")

router.get("/cart", verifyToken, async (req, res) => {

    let products = []
    console.log("hejhej")
    setTimeout(() => {
        console.log(req.body.user)
        
    }, 1000);
    for (let i = 0; i < req.body.user.cart.length; i++) {
        const product = await Product.findOne({_id:req.body.user.cart[i].productId})
        console.log(product)
        products.push(product)
        
    }
    
    res.render("shop/cart.ejs", {products})
})

router.get("/cartAdd/:id", verifyToken, async (req, res) => {

    const user = await User.findOne({_id:req.body.user._id})
    await user.addToCart({_id:req.params.id})

    res.redirect("/cart")

})

module.exports = router