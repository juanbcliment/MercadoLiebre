let userAdmin = ['ada', 'greta', 'vim', 'tim']

function admin (req, res, next){
    let user = req.query.user
    if(user){
        userAdmin.forEach(useAdmin => {
            if(useAdmin == user){
                next()
            }
        });
    } 
    return res.send('no tiene privilegios')
    //este middleware hace que si el usuario ingresado no coincide con los de array no te deja ingresar al login
}

module.exports = admin