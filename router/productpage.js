const express = require('express')
const router = express.Router()
const Product = require("../models/product")
const verifyToken = require("./verify")
const User = require("../models/user")
const {checkAuthentication} = require('./auth')

router.get('/products', verifyToken, checkAuthentication, async (req, res) => {

    let admin 

    if (!req.user) {
        admin = null
    }
    else {
        admin = req.user
    }
    
    const page = req.query.page || 1;
    const productsPerPage = 8;
    const products = await Product.find().countDocuments()
    const allProducts = await Product
        .find()
        .skip((page - 1) * productsPerPage)
        .limit(productsPerPage)
    const pageCount = Math.ceil(products / productsPerPage)

    res.render("shop/products.ejs", {
        allProducts,
        pageCount,
        page,
        admin,
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

    const product = await Product.findById({
        _id: req.params.id
    })

    res.render("shop/productpage.ejs", {
        product, user
    })
})

module.exports = router