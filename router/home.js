const express = require('express')
const router = express.Router()
const verifyToken = require("./verify")
const { checkAuthentication } = require('./auth')

router.get('/',verifyToken, checkAuthentication, async (req, res) => {
    
    res.render('shop/home.ejs', { user:req.body.user, admin: req.admin })
})




module.exports = router 

