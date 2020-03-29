const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    isadmin: {
        type: Boolean,
        required: true,
        default: false
    },
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
    resetToken: String,
    expirationToken: Date,
    wishlist: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        name: {
            type: String,
            require: true
        },
        imageUrl: String,
    }],
    cart: [{
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            require: true
        },
        price: {
            type: Number,
            require: true
        }
    }]
});

UserSchema.methods.addToWishList = function (productId) {

    const foundItem = this.wishlist.find(product => product.productId == productId)

    if (!foundItem) this.wishlist.push({
        productId: productId,
        name: productId.name,
        imageUrl: productId.imageUrl
    })

    return this.save()
}

UserSchema.methods.addToCart = function (productId) {

    const foundItem = this.cart.find(product => product.productId == productId)

        !foundItem ? this.cart.push({
            productId: productId,
            quantity: 1
        }) :
        foundItem.quantity++

    return this.save()
}
UserSchema.methods.removeFromCart = function (productId) {

    const filterItems = this.cart.filter(product => product.productId.toString() !== productId)

    this.cart = filterItems

    return this.save()
}

UserSchema.methods.addProductInCart = function (productId) {

    const foundItem = this.cart.find(product => product.productId == productId)
    foundItem.quantity++

    return this.save()

}

UserSchema.methods.removeProductInCart = function (productId) {

    const foundItem = this.cart.find(product => product.productId == productId)
    foundItem.quantity--

    if (foundItem.quantity == 0) {
        const filterItems = this.cart.filter(product => product.productId.toString() !== productId)

        this.cart = filterItems
    }

    return this.save()

}

const User = mongoose.model("User", UserSchema)

module.exports = User