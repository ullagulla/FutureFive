const express = require('express')
const router = express.Router()



router.get('/aboutus', (req, res) => {
    res.render('shop/aboutus.ejs')
})

// router.post('/', (req, res) => {
//     res.render('shop/aboutus.ejs')
// })

module.exports = router 