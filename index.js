const express = require('express')
const mongoose = require('mongoose')
const newuser = require('./router/newuser')
const home = require('./router/home')
const productPage = require('./router/productpage')
const app = express();
const config = require('./config/config')
const path = require('path')
const signin = require("./router/signin")
// const profile = require("./router/profile")
const cookieParser = require("cookie-parser")

app.use(cookieParser())


app.use(express.urlencoded({
    extended: true
}))


app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

// app.use(profile)
app.use(signin)
app.use(home)
app.use(productPage)
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


