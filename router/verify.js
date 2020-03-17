const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    const token = req.cookies.jsonwebtoken
  console.log(token)
    if(token) {

        const user = jwt.verify(token, "secretKey")
        console.log(user)
        req.body = user

        next()
        
    }
    else{
        res.redirect("/login")

        console.log("You are not worthy, sorry Anakin")
        
    }


}