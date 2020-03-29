const express = require('express')
const User = require('../models/user')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const router = express.Router()
const verifyToken = require("./verify")
const checkMsg = require('./message')
const crypto = require("crypto")
const config = require("../config/config")
const nodemailer = require("nodemailer")
const sendGridTransport = require("nodemailer-sendgrid-transport")

const SIGNOUT = '/signout'
const SIGNIN = '/signin'
const SIGNUP = '/signup'

const transport = nodemailer.createTransport(sendGridTransport({
    auth: {
        api_key: config.mail
    }
}))

router.get(SIGNIN, verifyToken, checkMsg, (req, res) => {
    res.render("shop/signin")
})

// Sign in 
router.post(SIGNIN, async (req, res) => {

    const user = await User.findOne({
        email: req.body.email
    })

    if (!user) {
        res.cookie("message", "Din email är inte registrerad", {
            maxAge: 3600000,
            httpOnly: true
        })

        return res.redirect(SIGNIN);
    }
    const validUser = await bcrypt.compare(req.body.password, user.password)

    if (!validUser) {
        res.cookie("message", "Fel lösenord", {
            maxAge: 3600000,
            httpOnly: true
        })

        return res.redirect(SIGNIN);
    }
    jwt.sign({
        user
    }, "secretKey", (err, token) => {

        if (token) {
            const cookie = req.cookies.jsonwebtoken
            if (!cookie) {
                res.cookie("jsonwebtoken", token, {
                    maxAge: 3600000,
                    httpOnly: true
                })
            }
            return res.redirect("/profile")
        }

    })
})

//Skapa användare

const salt = bcrypt.genSaltSync(10)

router.get(SIGNUP, verifyToken, checkMsg, async (req, res) => {

    res.render("shop/signup")
})

router.post(SIGNUP, async (req, res) => {

    if (req.body.name.length < 2) {
        res.cookie('message', 'Ogiltigt namn', {
            maxAge: 3600000,
            httpOnly: true
        })

        return res.redirect(SIGNUP)
    }

    if (req.body.password.length < 6) {
        res.cookie('message', 'Ditt lösenord måste vara minst sex tecken långt', {
            maxAge: 3600000,
            httpOnly: true
        })
        return res.redirect(SIGNUP)
    }

    if (req.body.zipcode.length < 5 || req.body.zipcode.length > 6) {
        res.cookie('message', 'Ogiltigt postnummer', {
            maxAge: 3600000,
            httpOnly: true
        })

        return res.redirect(SIGNUP)
    }

    User.findOne({
        email: req.body.email
    }).then(async user => {
        if (user) {
            res.cookie('message', 'Din email är redan registrerad', {
                maxAge: 3600000,
                httpOnly: true
            })

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

            jwt.sign({
                user
            }, "secretKey", (err, token) => {
                if (token) {
                    const cookie = req.cookies.jsonwebtoken
                    if (!cookie) {
                        res.cookie("jsonwebtoken", token, {
                            maxAge: 3600000,
                            httpOnly: true
                        })
                    }
                    res.cookie('message', 'Woop woop, du är nu registrerad och inloggad', {
                        maxAge: 3600000,
                        httpOnly: true
                    })
                    return res.redirect("/profile")
                }
            })
        }
    })
})

//reset password

router.get("/reset", function (req, res) {

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
            from: "info@mystiskasaker.se",
            subject: "Återställ ditt lösenord",
            html: `<h1> Återställningslänk: <a href="http://localhost:8000/reset/${resetToken}">Här</a></h1><br>
                    <h2>Kontakta kundtjänst om du inte har efterfrågat det här mejlet</h2>`
        })
        res.redirect("/signin")
    })

})

router.get("/reset/:token", verifyToken, checkMsg, async (req, res) => {
    //Om användare har token och den token är giltig då kan användare få ett formulär
    // req.params.token

    const user = await User.findOne({
        resetToken: req.params.token,
        expirationToken: {
            $gt: Date.now()
        }
    })

    if (!user) return res.redirect("/signup")

    res.render("shop/resetform")

})

router.post("/reset/:token", async (req, res) => {

    if (req.body.password !== req.body.password2) {
        res.cookie('message', 'Lösenorden stämmer inte överens', {
            maxAge: 3600000,
            httpOnly: true
        })
        return res.redirect("/reset/" + req.params.token)
    }

    if (req.body.password.length < 6) {
        res.cookie('message', 'Ditt lösenord måste vara minst sex tecken långt', {
            maxAge: 3600000,
            httpOnly: true
        })
        return res.redirect("/reset/" + req.params.token)
    }

    const user = await User.findOne({
        _id: req.body.userId
    })

    user.password = await bcrypt.hash(req.body.password, 10);
    user.resetToken = undefined;
    user.expirationToken = undefined;
    await user.save();

    res.redirect("/signin");
})

//Logga ut

router.get(SIGNOUT, (req, res) => {
    res.clearCookie("jsonwebtoken").redirect(SIGNIN)
})

router.get('/profile', verifyToken, checkMsg, async (req, res) => {
    res.render("shop/profile")
})

module.exports = router