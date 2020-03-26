const express = require('express')
const router = express.Router()
const Product = require("../models/product")

router.get("/products", async (req, res) => {
    const currentPage = req.query.page || 1;
    const productPerPage = 8;
    const allProducts = await Product.find()
    const allItems = await Product
        .find()
        .skip((currentPage - 1) * productPerPage)
        .limit(productPerPage)
    const pageCount = Math.ceil(allProducts.length / productPerPage)

    
    res.render("shop/products.ejs", {
        allItems,
        pageCount,
        currentPage
    })
    // const page = req.query.page
    // const products = await Product
    // .find()
    // .skip(  (page-1) * items)
    // .limit(items)
    // res.render('shop/products.ejs', {
    //     products
    // })
})

//specific product page below

router.get("/productpage/:id", async (req, res) => {

    const product = await Product.findById({
        _id: req.params.id
    })

    res.render("shop/productpage.ejs", {
        product
    })
})

module.exports = router