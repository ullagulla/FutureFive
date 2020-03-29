const express = require('express')
const router = express.Router()
const verifyToken = require("./verify")
const checkMsg = require('./message')
router.get('/', verifyToken, checkMsg, async (req, res) => {
    res.render('shop/home.ejs', {
        user: req.body.user,
        admin: req.admin
    })
})




module.exports = router