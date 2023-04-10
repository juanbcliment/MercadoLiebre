const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../database/products.json');// le indicamos donde esta el archivo json
const producta = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//lo lee y lo convierte en una const
//convierte de numeros yankis a numer arg
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const inSale = producta.filter(function(product){
    return product.category == 'in-sale'
})

const productController = {
    index: (req, res) => {
        res.render('productos.ejs', { title: 'Productos',productos1: producta ,   toThousand })
    },                                                   //al escribir productos1, le puedo cambiar el nombre de como mando el array
    oferta: (req, res) => {
        res.render('products/oferta.ejs',{ title: 'Ofertas', inSale: inSale, toThousand})

    },
    aviones: (req, res) => {
        return res.send('LEGGASTE AL AVIONES')

    },


    //CREACION DE UN PRODUCTO
    create: (req, res) => {
        res.render('products/productCreate.ejs', { title: 'Crear' })
    },
    store: (req, res) => {
        console.log(req.file)
        console.log(req.body)
        let newProduct = {
            id: producta[producta.length - 1].id + 1,
            name: req.body.name,
            price: req.body.price,
            discount: req.body.discount,
            category: req.body.category,
            description: req.body.description,
            image: req.file? req.file.filename : 'default-image.png'
        }
        producta.push(newProduct)
        fs.writeFileSync(productsFilePath, JSON.stringify(producta, null, ''))
           /* convertimos el array en formato json y la pusheamos a la database */
        res.redirect('/')
    },

    //EDITAR PRODUCTO
    edit: (req, res) => {
        const producti = producta.find(oneProduct => oneProduct.id == req.params.id)
        res.render('products/productEdit.ejs', { title: 'Editando ' + producti.name, producti, toThousand })

    },
    update: (req, res) => {
        console.log(req.file)
        console.log(req.body)
        let id = req.params.id
        let productEdit = producta.find(product => product.id == id)
        productEdit = {
            id: productEdit.id,
            ...req.body,
            image: productEdit.image
        }
       let editProduct = producta.map(product =>{
        if(product.id == productEdit.id){
            return product = {...productEdit}
        }
        return product
       })
       fs.writeFileSync(productsFilePath, JSON.stringify(editProduct, null, ''))
       res.redirect('/productos/detail/'+id)
    },
    delete: (req, res) => {
        let id = req.params.id
        let eliminarProducto = producta.filter(product => product.id != id)
        fs.writeFileSync(productsFilePath, JSON.stringify(eliminarProducto, null, ''))
        res.redirect('/productos/')
     
    },


    detail: (req, res) => {
        const producti = producta.find(oneProduct => oneProduct.id == req.params.id)//en la variablre product, hago que busque en el array de productos, un producto que su id sea igual al id que viene en el parametro de la ruta
        res.render('productoDetail.ejs', { title: 'Producto', producti, toThousand })
    },                                                       //aca le estoy mandando el nombre del array a la vista de detail
    //tambien le pondria mandar otro nombre poniendo el nombre y dos puntos adelante
    login: function () { }



}

module.exports = productController