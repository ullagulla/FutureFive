const express = require('express')
const router = express.Router()
const User = require("../models/newuser")
const verifyToken = require("./verify")
const Product = require("../models/product")

router.get("/cart", verifyToken, async (req, res) => {

    let products = []
    
    const user = await User.findOne({_id:req.body.user._id})
    for (let i = 0; i < user.cart.length; i++) {
        const product = await Product.findOne(user.cart[i].productId)
       
        products.push(product)
        
    }
    
    res.render("shop/cart.ejs", {products})
})

router.get("/cartAdd/:id", verifyToken, async (req, res) => {

    const user = await User.findOne({_id:req.body.user._id})
    await user.addToCart({_id:req.params.id})

    res.redirect("/cart")

})

// router.get("/delete/:id", verifyToken, async (req, res)=> { //Tar bort data från databasen
//     const user = await User.findOne({ _id: req.body.user._id });

//     for (let i = 0; i < user.cart.length; i++) {

//         const userCart = user.cart;
//         console.log(userCart);
//         userCart.splice(req.params.id[i]);
//         console.log(userCart);
//         await user.save();
//         console.log(user);
        
//     }


//     res.redirect("/cart")

// })

module.exports = router