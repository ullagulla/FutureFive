const express = require('express')
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const verfiyToken = require("./verify")
const { checkAuthentication } = require('./auth')

const SIGNOUT = '/signout'
const SIGNIN = '/signin'
const SIGNUP = '/signup'

router.get(SIGNIN, verfiyToken, checkAuthentication,  (req, res) =>{

    res.render("shop/signin", { user:req.body.user, admin: req.admin })
})

// Sign in 
router.post(SIGNIN, async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    })

    if(!user) {
        req.flash(
            'error_msg',
            'Din email är inte registrerad'
        )
        return res.redirect(SIGNIN);
    }
    const validUser = await bcrypt.compare(req.body.password, user.password)

    if (!validUser) {
        req.flash(
            'error_msg',
            'Fel lösenord'
        )
        return res.redirect(SIGNIN);
    }
    jwt.sign({user}, "secretKey", (err, token) => {
        
        if(token) {
            const cookie = req.cookies.jsonwebtoken
            if(!cookie) {
                res.cookie("jsonwebtoken", token, {maxAge: 3600000, httpOnly:true})
            }
            req.flash('success_msg', 'Du är inloggad!')
            return res.redirect("/profile")
        }

    })
})

//Skapa användare

const salt = bcrypt.genSaltSync(10)

router.get(SIGNUP,verfiyToken, checkAuthentication, async (req, res) =>{
    
    res.render("shop/signup", { user:req.body.user, admin: req.admin })
})

router.post(SIGNUP, async (req, res) => {
    
    if ( req.body.name.length < 2 ) {
        req.flash('error_msg', 'Ogiltigt namn')
        return res.redirect(SIGNUP)
    }

    if ( req.body.password.length < 6 ) {
        req.flash('error_msg', 'Ditt lösenord måste vara minst sex tecken långt')
        return res.redirect(SIGNUP)
    }
     
    if ( req.body.zipcode.length < 5 || req.body.zipcode.length > 6) {
        req.flash('error_msg', 'Ogiltigt postnummer')
        return res.redirect(SIGNUP)
    }

    User.findOne({
        email:req.body.email
    }).then( async user => {
        if(user) {
            req.flash('error_msg', 'Din email är redan registrerad')
            return res.redirect(SIGNUP)
        } else {
            const cryptPassword = await bcrypt.hash(req.body.password, salt)
            user = await new User({
            name: req.body.name,
            email: req.body.email,
            password: cryptPassword,
            zipcode: req.body.zipcode,
            address: req.body.address
            }).save()

            jwt.sign({user}, "secretKey", (err, token) => {
                console.log(token)
                if(token) {
                    const cookie = req.cookies.jsonwebtoken
                    if(!cookie) {
                        res.cookie("jsonwebtoken", token, {maxAge: 3600000, httpOnly:true})
                    }
                    req.flash('success_msg', 'Woop woop, du är nu registrerad och inloggad')
                    return res.redirect("/profile")
                }
            })
        }
    })
})

//Logga ut

router.get(SIGNOUT, (req, res) => {
    res.clearCookie("jsonwebtoken").redirect(SIGNIN)
})

router.get('/profile',verfiyToken, async (req, res) => {

    res.render("shop/profile", {user:req.body.user, admin: req.admin})
})

module.exports = router