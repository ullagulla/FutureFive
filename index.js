const express = require('express')
const mongoose = require('mongoose')
const config = require('./config/config')
const home = require('./router/home')
const admin = require('./router/admin')
const forwarding = require("./router/forwarding")

const app = express();
const path = require('path')

const session = require('express-session');
app.use(session({ secret: `ARaC](NlFW%W{f:~@6:q$:j}Y+'c%D`, saveUninitialized: true, resave: true, cookie: { expires: new Date(Date.now() + (60000 * 60 * 24 * 7)) } })); //session expires one week later

app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, "public")))
app.use(home)
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