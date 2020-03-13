const express = require('express')
const app = express()
const router = express.Router()
const aboutus = require("../models/aboutus")



router.get('/aboutus', (req, res) => {
    res.render('shop/aboutus.ejs')
})

// router.post('/', (req, res) => {
//     res.render('shop/aboutus.ejs')
// })

module.exports = router 