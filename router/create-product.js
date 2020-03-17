const express = require('express')
const router = express.Router()
const Product = require('../models/product')
const verifyToken = require("./verify")
const CREATE_PRODUCT = '/createproduct'



router.get(CREATE_PRODUCT, (req, res) => {
    res.render('admin/create-product')
})

router.post(CREATE_PRODUCT, verifyToken, async (req, res) => {
    await new Product ({
        name:req.body.name,
        price: req.body.price,
        imageUrl:"/img/" + req.body.imageUrl,
        description: req.body.description,
        user: req.body.user._id
    }).save()
    res.redirect(CREATE_PRODUCT)
})

module.exports = router