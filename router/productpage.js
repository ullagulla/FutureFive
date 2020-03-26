const express = require('express')
const router = express.Router()
const Product = require("../models/product")
const verifyToken = require("./verify")
const User = require("../models/user")
const {checkAuthentication} = require('./auth')

router.get('/products', verifyToken, checkAuthentication, async (req, res) => {
    
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
        admin: req.admin,
        user: req.body.user
    })
})

//specific product page below

router.get("/productpage/:id", verifyToken,checkAuthentication, async (req, res) => {

    const product = await Product.findById({
        _id: req.params.id
    })

    res.render("shop/productpage.ejs", {
        product, user:req.body.user, admin: req.admin
    })
})

module.exports = router