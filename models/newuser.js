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

newUserSchema.methods.addToWishList = function (product) {
    this.wishlist.push({
        productId: product._id
    })
    return this.save()
}

newUserSchema.methods.addToCart = function (productId) {

    const foundItem = this.cart.find( product => product.productId == productId )
    
    !foundItem? this.cart.push({productId: productId, quantity: 1}):
    foundItem.quantity++

    return this.save() 
}

newUserSchema.methods.removeFromCart = function (productId) {

    const filterItems = this.cart.filter( product => product.productId.toString() !== productId )

    this.cart = filterItems

    return this.save()
}

newUserSchema.methods.addProductInCart = function (productId) {

    const foundItem = this.cart.find( product => product.productId == productId )
    foundItem.quantity++

    return this.save()

}

newUserSchema.methods.removeProductInCart = function (productId) {

    const foundItem = this.cart.find( product => product.productId == productId )
    foundItem.quantity--

    if (foundItem.quantity == 0) {
        const filterItems = this.cart.filter( product => product.productId.toString() !== productId )

        this.cart = filterItems
    }

    return this.save()

}

const newUser = mongoose.model("newUser", newUserSchema)

module.exports = newUser;