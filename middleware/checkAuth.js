const isLoggedIn = (req, res, next) =>{
    if(!req.user)
        return res.status(401).json({
            success: false,
            message: "Access Denied"
        })
    next()
}

module.exports = isLoggedIn