
function userLoggedMidleware ( req, res, next){
    if(req.session.userLogged != undefined){
        let currentUser = req.session.userLogged;
        res.locals.currentUser = currentUser;
        /* le mandamos a todo el archivo que existe currentUser */
    }
    next()
}
module.exports = userLoggedMidleware