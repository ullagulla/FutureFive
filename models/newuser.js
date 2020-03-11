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
       type:Number,
       require: true
    },
    address: {
        type:String,
        require:true
    }
    
});

const newUser = mongoose.model("newUser", newUserSchema)

module.exports = newUser;


// uncomplete