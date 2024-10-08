const express = require('express')
const router = express.Router() // requierimos la parte de rutas de express
const path = require('path')
const productController = require('../controllers/productsController') // los controllers 
//son los que controlan la ruta, desde la imagen que va a llevar, hasta las funciones que qures que hago, por eso se invocan
//los controller son objetos por eso se usa el . despues del nombre

/* =========================Express-Vaildator========================= */

const { check } = require('express-validator')

/* ==========================  Multer  ============================== */
//multer permite poder trasferir archivos que se cargan en la web al servidor
const multer = require('multer')

var storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null,'public/img/products')//donde se van a guardar las imagenes en los productos nuevos
    },
    
    filename: (req, file, callback) => {
        callback(null, 'img-'+ Date.now()+path.extname(file.originalname) )
        }//y aca le damos el npombre que va a tener usamos la fecha en segundos + el nombre del archivo para que no se repita
    })
    const upload = multer({storage})



/* =======================  Rutas de productos  =========================*/
// se crea la ruta del servidor que deseamos
router.get('/', productController.index)
router.get('/detail/:id', productController.detail)//el : permite que se cree cualuiqer cantidad de rutas con los id del producto
router.get('/ofertas', productController.oferta)
//CREACION DE UN PRODUCTO necesita dos rutas, una de la vista, para poder interactuar, y otra de que manda los datos al servidor
router.get('/create', productController.create)
router.post('/', upload.single('productImage'),[
    check('name').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    check('price').isLength({min:1}).withMessage('Debe ingresar un precio'),
    check('description').isLength({min:1}).withMessage('Debe ingresar una descripcion')
],productController.store)
                 //aca conectamos toda la configuracion del multer 
//EDITAR PRODUCTO
router.get('/edit/:id', productController.edit)
router.put('/:id', productController.update)
//ELIMINAR PRODUCTO utiliza la misma vista que edit
router.delete('/:id', productController.delete)





module.exports = router// ahora exportamos el archivo 