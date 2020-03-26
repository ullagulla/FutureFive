const express = require('express')
const router = express.Router()
const {
    checkAuthentication, 
  } = require('./auth')
  const verifyToken = require("./verify")


router.get('/aboutus', verifyToken, checkAuthentication, (req, res) => {
    res.render('shop/aboutus.ejs', {user:req.body.user, admin:req.admin})
})

// router.post('/', (req, res) => {
//     res.render('shop/aboutus.ejs')
// })

module.exports = router 