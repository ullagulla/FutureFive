const mongoose = require('mongoose');

const newUserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    zipcode: {
        type: Number,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    wishlist: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    }],
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        }
    }]

});

newUserSchema.methods.addToWishList = function (product) {
    this.wishlist.push({
        productId: product._id
    })
    return this.save()
}

newUserSchema.methods.addToCart = function (product) {
    this.cart.push({
        productId: product._id
    })
    return this.save()
}

const newUser = mongoose.model("newUser", newUserSchema)

module.exports = newUser;


// uncomplete