const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/userDatabase.json');
const users = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

/* ========================== Express-Validator =================== */
const {validationResult} = require('express-validator')

/*========================== bcrypt ========================= */
const bcrypt = require('bcryptjs')
//convierte de numeros yankis a numer arg
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersController = {
    index:(req,res) =>{
        res.render('users/login', {})  
        
        },
    register:(req,res) =>{
         res.render('users/registro', {title: 'Registro'}) 
        },
    store:  (req, res) => {
        console.log(req.body)
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            let oldData = req.body
            return res.render('users/registro.ejs', {errors: errors.mapped(), oldData}) 
        }else {
            let userRegister = req.body
            let newUser = {
                ...userRegister,
                password: bcrypt.hashSync(userRegister.password, 10),
                image: req.file? req.file.filename : 'default-avatar.png'
            }
            console.log(newUser)
            users.push(newUser)
            fs.writeFileSync(productsFilePath, JSON.stringify(users, null, ''))
        }
        res.redirect('/user/login')
    },
    
    login:  (req, res) => {
        const userLogin = users.find(oneUser => oneUser.email === req.body.email)
        if(userLogin){
            const isPasswordCorrect = bcrypt.compareSync(req.body.password, userLogin.password)
            if(isPasswordCorrect){
                delete userLogin.password
                delete userLogin.password_confirm
                req.session.userLogged = userLogin
                if(req.body.recordame != undefined){
                    res.cookie('recordame', req.session.userLogged.email, {maxAge: 100000})/* se guarda la session por 100seg */
                }
                res.redirect('/')
            }/* el session viene del requier en app.js */
        }
        
    }



}

module.exports = usersController