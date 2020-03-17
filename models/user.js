const mongoose = require('mongoose');
// const Product = require('./product');
const Schema = require('mongoose').Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true
            }
        }]
    },
    wishlist: [{
        productId: {type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
        }
    }]
});

userSchema.methods.addToWishList = function(product) {
    this.wishlist.push({productId: product._id})
    return this.save()
}

const User = mongoose.model("User", userSchema);

module.exports = User;


// uncomplete