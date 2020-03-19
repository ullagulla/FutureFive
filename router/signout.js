const express = require('express')
const router = express.Router()
const SIGNOUT = '/signout'
const SIGNIN = '/signin'

router.get(SIGNOUT, (req, res) => {
    res.clearCookie("jsonwebtoken").redirect(SIGNIN)
})

module.exports = router