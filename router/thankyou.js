const express = require('express')
const router = express.Router()
const verifyToken = require("./verify")


router.get('/thankyou', verifyToken, (req, res) => {
    res.render('shop/thankyou.ejs')
})


module.exports = router