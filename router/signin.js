const express = require('express')
const bcrypt = require("bcryptjs")
const newUser = require("../models/newuser")
const router = express.Router()
const jwt = require("jsonwebtoken")
const verifyToken = require("./verify")


router.get("/signin", (req, res) =>{
    let user = undefined
    res.render("shop/signin", { user })
})

// Sign in 
router.post("/signin", async (req, res) => {

    
    const user = await newUser.findOne({
        email: req.body.email
    })


    if(!user) return res.redirect("/createuser")

    const validUser = await bcrypt.compare(req.body.passwordLogin, user.password)

    if (!validUser) return res.redirect("/signin")
    
    jwt.sign({user}, "secretKey", (err, token) => {
        
        if(token) {
            const cookie = req.cookies.jsonwebtoken
            if(!cookie) {
                res.cookie("jsonwebtoken", token, {maxAge: 3600000, httpOnly:true})
            }
            res.render("shop/profile", {user})
         }

    })
})

module.exports = router