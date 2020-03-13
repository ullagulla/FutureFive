const mongoose = require('mongoose');

const aboutSchema = mongoose.Schema({
    info: {
        type: String,
        required: true
    }
});
const AboutUs = mongoose.model('AboutUs', aboutSchema);
module.exports = AboutUs 