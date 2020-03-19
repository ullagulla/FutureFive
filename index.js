const express = require('express')
const mongoose = require('mongoose')
const newuser = require('./router/newuser')
const home = require('./router/home')
const productPage = require('./router/productpage')
const admin = require('./router/admin')
const forwarding = require("./router/forwarding")
const app = express()
const createProduct = require('./router/create-product')
const config = require('./config/config')
const path = require('path')
const signin = require("./router/signin")
const cart = require('./router/cart')
const signout = require('./router/signout')
// const profile = require("./router/profile")
const cookieParser = require("cookie-parser")
const aboutUs = require("./router/aboutus")
const thankYou = require("./router/thankyou")
const wishlist = require("./router/wishlist")

app.use(cookieParser())


app.use(express.urlencoded({
    extended: true
}))

//const session = require('express-session');
//app.use(session({ secret: `ARaC](NlFW%W{f:~@6:q$:j}Y+'c%D`, saveUninitialized: true, resave: true, cookie: { expires: new Date(Date.now() + (60000 * 60 * 24 * 7)) } })); //session expires one week later


app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

// app.use(profile)
app.use(aboutUs)
app.use(thankYou)
app.use(signin)
app.use(home)
app.use(productPage)
app.use(newuser)
app.use(cart)
app.use(wishlist)
app.use(signout)

app.use(createProduct)
app.use(admin)
app.use(forwarding)

app.get('*', (req, res) => {
    res.status(404).render('error/404', { whichpage: "error/404" });
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


