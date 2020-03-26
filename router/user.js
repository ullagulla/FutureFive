const express = require('express')
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const verifyToken = require("./verify")
const crypto = require("crypto")
const config = require("../config/config")
const nodemailer = require("nodemailer")
const sendGridTransport = require("nodemailer-sendgrid-transport")
const { checkAuthentication } = require('./auth')

const SIGNOUT = '/signout'
const SIGNIN = '/signin'
const SIGNUP = '/signup'

const transport = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: config.mail
    }
}))

router.get(SIGNIN, verifyToken, checkAuthentication,  (req, res) =>{

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

router.get(SIGNUP,verifyToken, checkAuthentication, async (req, res) =>{
    
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

//reset password

router.get("/reset", function(req, res) {

})

router.post("/reset", async (req, res) => {

    const user = await User.findOne({
        email: req.body.resetMail
    })
    if (!user) return res.redirect("/signup")

    crypto.randomBytes(32, async (err, token) => { //Skapar ett randomBytes token med 32 bytes
        if (err) return res.redirect("/signup")
        const resetToken = token.toString("hex")
        user.resetToken = resetToken
        user.expirationToken = Date.now() + 400000000
        await user.save()

        transport.sendMail({
            to: user.email,
            from: "ulrika.alm@medieinistitutet.se",
            subject: "reset password",
            html: `<h1> Reset password: <a href="http://localhost:8000/reset/${resetToken}">Here</a></h1>`
        })
        res.redirect("/signin")
    })

})

router.get("/reset/:token", async (req, res) => {
    //Om användare har token och den token är giltig då kan användare få ett formulär
    // req.params.token

    const user = await User.findOne({
        resetToken: req.params.token,
        expirationToken: {
            $gt: Date.now()
        }
    })

    if (!user) return res.redirect("/signup")

    res.render("shop/resetform", {
        user
    })

})

router.post("/reset/:token", async(req, res)=>{

    if(req.body.password !== req.body.password2) {
        req.flash('error_msg', "Lösenorden stämmer inte överens")
        return res.redirect("/reset/" + req.params.token)
    }

    if ( req.body.password.length < 6 ) {
        req.flash('error_msg', 'Ditt lösenord måste vara minst sex tecken långt')
        return res.redirect("/reset/" + req.params.token)
    }

    const user = await User.findOne({_id:req.body.userId})

    user.password = await bcrypt.hash(req.body.password, 10) ;
    user.resetToken= undefined;
    user.expirationToken= undefined;
     await user.save();

res.redirect("/signin"); 
//aws ses
})



//Logga ut

router.get(SIGNOUT, (req, res) => {
    res.clearCookie("jsonwebtoken").redirect(SIGNIN)
})

router.get('/profile',verifyToken, async (req, res) => {

    res.render("shop/profile", {user:req.body.user, admin: req.admin})
})

module.exports = router