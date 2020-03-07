const express = require('express')
const mongoose = require('mongoose')
const newuser = require('./router/newuser')
const home = require('./router/home')
const config = require('./config/config')
const path = require('path')
const app = express()
const signin = require("./router/signin")

app.use(express.urlencoded({
    extended: true
}))


app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

app.use(signin)
app.use(home)
app.use(newuser)

const port = process.env.PORT || 8000

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}


mongoose.connect(config.databaseURL, options).then(() => {
    console.log('server started at ' + port)
    app.listen(port)
})


