const express = require('express')
const mongoose = require('mongoose')
const users = require('./router/users')
const home = require('./router/home')
const productPage = require('./router/productpage')
const forwarding = require("./router/forwarding")
const passport = require('passport');
const flash = require('connect-flash');
const config = require('./config/config')

const path = require('path')
const cookieParser = require("cookie-parser")
const app = express()
require('./config/passport')(passport);

app.use(cookieParser())

app.use(express.urlencoded({
    extended: true
}))

const session = require('express-session');
app.use(session({ secret: `ARaC](NlFW%W{f:~@6:q$:j}Y+'c%D`, saveUninitialized: true, resave: true, cookie: { expires: new Date(Date.now() + (60000 * 60 * 24 * 7)) } })); //session expires one week later

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "public")))
app.set('view engine', 'ejs')

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});

// Routes
app.use('/users', require('./router/home.js'));
app.use('/users', require('./router/users.js'));

// app.use(profile)

app.use(home)
app.use(productPage)
app.use(users)
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