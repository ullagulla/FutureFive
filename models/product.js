const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    imageUrl: String,
    date: {
        type: Date,
        default: Date.now
    }
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User',
    //     required: true
    // },
    // categories: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category',
    //     required: true
    // }]
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product 