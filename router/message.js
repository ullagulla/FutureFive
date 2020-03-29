module.exports = async (req, res, next) => {

    const msg = req.cookies.message

    if (msg) {
        res.locals.error_msg = msg
        res.clearCookie("message")
        next()
    } else {
        next()
    }
}