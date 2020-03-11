const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    const token = req.cookies.jsonwebtoken

    if(token) {

        const user = jwt.verify(token, "secretKey")
        console.log(user)
        req = user

        next()
        
    }
    else{
        res.redirect("/login")
        console.log("You are not worthy, sorry Anakin")
        
    }


}