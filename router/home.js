const express = require('express')
const router = express.Router()
const Product = require("../models/product")
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');



router.get('/', forwardAuthenticated, (req, res) => {
    res.render('shop/main.ejs')
})

module.exports = router 
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        user: req.user
    })
);

module.exports = router
