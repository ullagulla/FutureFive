const express = require('express')
const app = express()
const router = express.Router()


router.get('/', async (req, res) => {
    res.render('shop/main.ejs')
})

module.exports = router