const express = require('express')
const mongoose = require('mongoose')
const admin = require('./router/admin')
const home = require('./router/home')
const productPage = require('./router/productpage')
const forwarding = require("./router/forwarding")
const session = require('express-session');
const app = express()
const passport = require('passport');
const flash = require('connect-flash');
const config = require('./config/config')
const user = require("./router/user")
const path = require('path')
const cart = require('./router/cart')
const cookieParser = require("cookie-parser")
const wishlist = require("./router/wishlist")
const checkout = require("./router/checkout")
require('./config/passport')(passport);

app.use(cookieParser())

app.use(express.urlencoded({
    extended: true
}))

// app.use(forwarding)



app.use(session({
    secret: `ARaC](NlFW%W{f:~@6:q$:j}Y+'c%D`,
    saveUninitialized: true,
    resave: true,
    cookie: {
        expires: new Date(Date.now() + (60000 * 60 * 24 * 7))
    }
})) //session expires one week later

app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Connect flash
app.use(flash())

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    next()
})

// Routes
// app.use('/admin', require('./router/home.js'));
// app.use('/admin', require('./router/admin.js'));

app.use(home)
app.use(productPage)
app.use(cart)
app.use(wishlist)
app.use(checkout)
app.use(user)
app.use(admin)


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