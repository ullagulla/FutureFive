const express = require('express')
const newUser = require('../models/newuser')
const bcrypt = require("bcryptjs")

const router = express.Router()


const salt = bcrypt.genSaltSync(10)

router.get("/signup", async (req, res) =>{
    let user

    res.render("shop/signup", { user })
})

router.post("/signup", async (req, res) => {

    const cryptPassword = await bcrypt.hash(req.body.password, salt)

    await new newUser({
        name: req.body.name,
        email: req.body.email,
        password: cryptPassword,
        zipcode: req.body.zipcode,
        address: req.body.address
    }).save()
    
    const user = await newUser.find({
        name: req.body.name,
        email: req.body.email,
        zipcode: req.body.zipcode,
        address: req.body.address,
        password: cryptPassword
    })

  

    
    res.render("shop/home", {user})
})

module.exports = router