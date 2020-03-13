const mongoose = require('mongoose');

const thankyouSchema = mongoose.Schema({
    info: {
        type: String,
        required: true
    }
});
const thankyou = mongoose.model('thankyou', thankyouSchema);
module.exports = thankyou 