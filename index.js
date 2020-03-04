const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/config')
const home = require('./router/home')
const app = express();
const path = require('path')

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "public")))
app.use(home)

const port = process.env.PORT || 8000

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}

mongoose.connect(config.databaseURL, options).then(() => {
    console.log('server started at ' + port)
    app.listen(port)
})