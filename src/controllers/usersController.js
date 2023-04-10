const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

//convierte de numeros yankis a numer arg
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const usersController = {
    index:(req,res) =>{
        res.render('users/login', {})  
        
        },
    register:(req,res) =>{
         res.render('users/registro', {title: 'Registro'}) 
        },
    create: function (){},
    delete: function (){},
    update: function (){},
    detail: function (){},
    login: function (){}



}

module.exports = usersController