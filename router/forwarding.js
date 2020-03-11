const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { whichpage: "index" });
})

router.get("/orders", (req, res) => {
    res.render("orders", { whichpage: "orders" });
})


router.get("/cart", (req, res) => {
    res.render("cart", { whichpage: "cart" });
})

router.get("/products", (req, res) => {
    res.render("products", { whichpage: "products" });
})


router.get("/main", (req, res) => {
    res.render("main", { whichpage: "main" });
})

module.exports = router;