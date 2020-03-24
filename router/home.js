const express = require('express')
const router = express.Router()
const User = require('../models/newuser')
const verifyToken = require("./verify")

router.get('/',verifyToken, async (req, res) => {
    
    let user

    if (!req.body.user) {

        user = undefined

    } else {

        user = await User.findOne({
            _id: req.body.user._id
        })
    }

    res.render('shop/home.ejs',{ user })
})

module.exports = router 