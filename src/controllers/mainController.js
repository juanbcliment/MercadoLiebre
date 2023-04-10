
const fs = require('fs'); //libreria faill system nos permite trabajar con cualquier tipo de archivos, en este caso json
const path = require('path');// libreria path, que nos permite manejar las rutas

const productsFilePath = path.join(__dirname, '../database/products.json');
const producta = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//convierte de numeros yankis a numer arg
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const visited = producta.filter(function(product){
    return product.category == 'visited'
})
const inSale = producta.filter(function(product){
    return product.category == 'in-sale'
})

const mainController = {
    index: (req, res) => {
        res.render("home", { title: 'cambiado desde le home', visited, inSale, toThousand })// vinculamos el ejs que esta en views con el link de la pag
    },  // se crea la imagen de la pagina, o lo que querramos que haga
    register: function () { },
    create: function () { },
    delete: function () { },
    update: function () { },
    detail: function () { },
    login: function () { }
}
module.exports = mainController