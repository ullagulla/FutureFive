const express = require("express")
const router = express.Router()
const User = require("../models/newuser")
const verifyToken = require("./verify")
const Product = require("../models/product")

router.get("/wishlist/:id", verifyToken, async (req, res)=>{

    const product = await Product.findOne({_id:req.params.id})
    // console.log("Information från user body " + req.body.user._id)
    const user = await User.findOne({_id:req.body.user._id})

    await user.addToWishList(product)

    // console.log(user)

    res.send("wishlisted")
})

module.exports = router