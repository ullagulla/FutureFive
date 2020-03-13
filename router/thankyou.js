const express = require('express')
const app = express()
const router = express.Router()
const thankyou = require("../models/thankyou")



router.get('/thankyou', (req, res) => {
    res.render('shop/thankyou.ejs')
})

// router.post('/', (req, res) => {
//     res.render('shop/thankyou.ejs')
// })

module.exports = router 