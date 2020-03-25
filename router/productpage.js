const express = require('express')
const router = express.Router()
const Product = require("../models/product")
const verifyToken = require("./verify")
const User = require("../models/user")

router.get('/products', verifyToken, async (req, res) => {
    
    const currentPage = req.query.page || 1;
    const productPerPage = 8;
    const allProducts = await Product.find().countDocuments()
    const allItems = await Product
        .find()
        .skip((currentPage - 1) * productPerPage)
        .limit(productPerPage)
    const pageCount = Math.ceil(allProducts / productPerPage)

    res.render("shop/products.ejs", {
        allItems,
        pageCount,
        currentPage,
        user:null
    })
})

//specific product page below

router.get("/productpage/:id", verifyToken, async (req, res) => {

    let products = []

    let user

    if (!req.body.user) {
        user = null
    } else {

        user = await User.findOne({
            _id: req.body.user._id
        })
    }

    for (let i = 0; i < user.cart.length; i++) {

        let product = await Product.findOne({
            _id: user.cart[i].productId
        })
        product.quantity = user.cart[i].quantity
        products.push(product)

    }

    const product = await Product.findById({
        _id: req.params.id
    })

    res.render("shop/productpage.ejs", {
        product, user
    })
})

module.exports = router