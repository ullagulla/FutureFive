const mongoose = require("mongoose")

const adminloginSchema = new mongoose.Schema({
    username: String,
    password: String
})

module.exports = mongoose.model('admin-login', adminloginSchema)