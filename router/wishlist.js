const express = require("express")
const router = express.Router()
const User = require("../models/user")
const verifyToken = require("./verify")
const Product = require("../models/product")

router.get("/wishlist", verifyToken, async (req, res) => {

})

router.get("/wishlist/:id", verifyToken, async (req, res) => {

    if (!req.body.user) {
        req.flash("error_msg", "Du måste logga in för att lägga till i wishlist")
        return res.redirect("/productpage/" + req.params.id)
    }

    const product = await Product.findOne({
        _id: req.params.id
    })
    // console.log("Information från user body " + req.body.user._id)
    const user = await User.findOne({
        _id: req.body.user._id
    })

    await user.addToWishList(product)

    res.redirect("/productpage/" + req.params.id)

})

module.exports = router