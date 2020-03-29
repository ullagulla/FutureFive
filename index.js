const express = require('express')
const mongoose = require('mongoose')
const home = require('./router/home')
const aboutus = require('./router/aboutus')
const thankyou = require('./router/thankyou')
const productPage = require('./router/productpage')
const app = express()
const config = require('./config/config')
const user = require("./router/user")
const path = require('path')
const cart = require('./router/cart')
const cookieParser = require("cookie-parser")
const wishlist = require("./router/wishlist")
const checkout = require("./router/checkout")
const admin = require('./router/admin')
app.use(cookieParser())

app.use(express.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.success_msg,
        res.locals.error_msg = req.error_msg,
        res.locals.user = req.body.user
    next()
})

app.use(admin)
app.use(aboutus)
app.use(thankyou)
app.use(home)
app.use(productPage)
app.use(cart)
app.use(wishlist)
app.use(checkout)
app.use(user)
app.use(aboutus)


app.get('*', (req, res) => {
    res.status(404).render('error/404', {
        whichpage: "error/404"
    });
});

const port = process.env.PORT || 8000

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongoose.connect(config.databaseURL, options).then(() => {
    console.log('server started at ' + port)
    app.listen(port)
})

module.exports = app