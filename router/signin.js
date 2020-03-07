const express = require('express')
const bcrypt = require("bcryptjs")
const newUser = require("../models/newuser")
const router = express.Router()
const 

router.get("/signin", (req, res) =>{
    res.render("shop/signin")
})

router.post("/signin", async (req, res) => {

    const user = await newUser.findOne({
        name: req.body.username
    })

    if(!user) return $("#errorMessage").html("Fel email!");

    const validUser = await bcrypt.compare(req.body.password, user.password)

    if (!validUser) return res.redirect("/signin")
    
    res.render("shop/main"), {
        user
    }
})

module.exports = router