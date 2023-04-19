function authMW (req, res, next){
    if (req.session.userLogged == undefined){
        res.redirect('/user/login')
    }
    next()
}

module.exports = authMW