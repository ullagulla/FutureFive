const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const checkMsg = require('./message')
const ADD_PRODUCT = '/addproducts'

const verifyToken = require("./verify")

router.get(ADD_PRODUCT, verifyToken, checkMsg, (req, res) => {
    if (req.body.user.isadmin) return res.render('admin/add-product')
    else return res.redirect('/')
})

router.post(ADD_PRODUCT, verifyToken, async (req, res) => {

    await new Product({
        name: req.body.productName,
        price: req.body.productPrice,
        imageUrl: "/img/" + req.body.imageUrl,
        description: req.body.productDescription,
        adminId: req.body.user,
        adminName: req.body.user.name
    }).save()

    return res.redirect(ADD_PRODUCT)
})

router.get("/edit/:id", verifyToken, checkMsg, async (req, res) => {

    const product = await Product.findById({
        _id: req.params.id
    })

    res.render("admin/edit-product", {
        product
    })

})

router.post("/edit/:id", verifyToken, async (req, res) => {

    await Product.updateOne({
        _id: req.params.id
    }, {
        $set: {
            name: req.body.productName,
            price: req.body.productPrice,
            description: req.body.productDescription,
            adminId: req.body.user,
            adminName: req.body.user.name
        }
    })

    res.redirect("/products")

})


module.exports = router;