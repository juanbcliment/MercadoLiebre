const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../database/userDatabase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

/* ========================== Express-Validator =================== */
const {validationResult} = require('express-validator')

/*========================== bcrypt ========================= */
const bcrypt = require('bcryptjs')
//convierte de numeros yankis a numer arg
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersController = {
    index:(req,res) =>{
        
        res.render('users/login',)  
        
        },
        header: (req, res) => {
            let currentUser = req.session.userLogged;
         res.render('partials/headerPartial.ejs', {currentUser})
        },
    register:(req,res) =>{
        
         res.render('users/registro', {title: 'Registro', }) 
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
            fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ''))
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
                req.session.userLogged = userLogin/* userLogged lo elegimos nosotros al nombre */
                if(req.body.recordame != undefined){
                    res.cookie('recordame', req.session.userLogged.email, {maxAge: 10000})/* se guarda la session por 100seg */
                }
                res.redirect('/user/profile')
            }/* el session viene del requier en app.js */
        }
        
    },
    logout: (req, res) =>{
    req.session.userLogged = undefined
    res.redirect('/')
    },
    cheak: (req, res) => {
        if(req.session.userLogged){

            res.send('el usario logeado es ' + req.session.userLogged.nombre)
        }
        return res.send('No estas logeado')
    },
    profile: (req, res) => {
        res.render('users/miCuenta')
    },
    carrito: (req, res) =>{
       res.send('faltacrear la pagina')
    },
    deseos: (req, res) =>{
        res.send('faltacrear la pagina')
    }



}

module.exports = usersController