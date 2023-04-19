function guestMW (req, res, next){
    if (req.session.userLogged != undefined){
        res.redirect('/user/profile')
    }
    next()
}
module.exports = guestMW