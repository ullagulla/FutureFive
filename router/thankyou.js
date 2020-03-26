const express = require('express')
const router = express.Router()
const {
    checkAuthentication, 
  } = require('./auth')
  const verifyToken = require("./verify")


router.get('/thankyou',checkAuthentication, verifyToken, (req, res) => {
    res.render('shop/thankyou.ejs', {user: req.body.user, admin: req.admin})
})


module.exports = router 