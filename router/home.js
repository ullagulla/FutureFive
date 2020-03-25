const express = require('express')
const router = express.Router()
const User = require('../models/user')
const verifyToken = require("./verify")
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');

router.get('/',verifyToken, async (req, res) => {
    
    let user

    if (!req.body.user) {
        user = null
    } else {

        user = await User.findOne({
            _id: req.body.user._id
        })
    }

    res.render('shop/home.ejs', { user })
})




module.exports = router 

