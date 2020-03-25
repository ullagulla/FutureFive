const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    const token = req.cookies.jsonwebtoken
    if (token) {

        const user = jwt.verify(token, "secretKey")
        req.body = user

        next()

    } else {
        next() 
    }


}