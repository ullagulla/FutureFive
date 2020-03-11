// const express = require('express')
// const app = express()
// const router = express.Router()
// const newUser = require("../models/newuser")



// router.get("/profile", (req, res) => {
//     res.render("shop/profile")
// })

// router.post("/profile", async (req, res) => {

//     await newUser({
//         email: req.body.email
//     }).save()

//     const user = await newUser.find({
//         email: req.body.email
//     })

//     res.render("shop/profile", {user})

// })
// module.exports = router