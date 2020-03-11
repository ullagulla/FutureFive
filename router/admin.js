const express = require('express')
const app = express()
const router = express.Router()
var session;


router.get('/', async(req, res) => {
    res.render('admin/admin.ejs')
})

router.get("/admin-login", async(req, res) => {
    res.render("admin/admin-login");
})

router.get("/change", (req, res) => {
    sessionControl(req, res, "admin/admin-changepass", req.query.state);
})

let sessionControl = (req, res, page, state = 0) => {
    session = req.session;
    if (session.username) {
        if (page === "admin/admin-changepass") res.render(`${page}`, { state: state });
        else res.render(`${page}`);
    } else
        res.render("admin/admin-login", { state: req.query.state });
}


module.exports = router