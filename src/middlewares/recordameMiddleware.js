const fs = require('fs')
const path = require('path')
function recordame(req, res, next) {
    if (req.cookies.recordame != undefined && req.session.userLogged == undefined) {
        const usersFilePath = path.join(__dirname, '../database/userDatabase.json');
        const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

        const userLogin = users.find(oneUser => oneUser.email === req.cookies.recordame.value)
        if (userLogin) {
            delete userLogin.password
            delete userLogin.password_confirm
            req.session.userLogged = userLogin/* userLogged lo elegimos nosotros al nombre */
            res.redirect('/')
        }/* el session viene del requier en app.js */


    }
    next()
}
module.exports = recordame