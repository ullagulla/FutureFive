const express = require('express')
const router = express.Router()

const verifyToken = require("./verify")


router.get('/aboutus', verifyToken, (req, res) => {
    res.render('shop/aboutus.ejs')
})

module.exports = router