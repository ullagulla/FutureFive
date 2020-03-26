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
    },
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin"
    },
    adminName: {
        type: String,
        required: true
    }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product