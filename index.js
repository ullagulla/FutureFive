const express = require('express')
const mongoose = require('mongoose')
const users = require('./router/users')
const home = require('./router/home')
const productPage = require('./router/productpage')
const forwarding = require("./router/forwarding")
const app = express()
const createProduct = require('./router/create-product')
const passport = require('passport');
const flash = require('connect-flash');
const config = require('./config/config')
const newUser = require("./router/newuser")

const path = require('path')
const signin = require("./router/signin")
const cart = require('./router/cart')
const aboutUs = require("./router/aboutus")
const thankYou = require("./router/thankyou")
const wishlist = require("./router/wishlist")
const checkout = require("./router/checkout")
const cookieParser = require("cookie-parser")
require('./config/passport')(passport);

app.use(cookieParser())

app.use(express.urlencoded({
    extended: true
}))

const session = require('express-session');
app.use(session({
    secret: `ARaC](NlFW%W{f:~@6:q$:j}Y+'c%D`,
    saveUninitialized: true,
    resave: true,
    cookie: {
        expires: new Date(Date.now() + (60000 * 60 * 24 * 7))
    }
})); //session expires one week later

app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/users', require('./router/home.js'));
app.use('/users', require('./router/users.js'));

// app.use(profile)
app.use(aboutUs)
app.use(thankYou)
app.use(signin)
app.use(cart)
app.use(wishlist)
app.use(checkout)
app.use(newUser)

app.use(createProduct)
// app.use(admin)

app.use(home)
app.use(productPage)
app.use(users)
app.use(forwarding)

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