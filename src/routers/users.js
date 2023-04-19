const express = require('express')
const router = express.Router()// requierimos la parte de rutas de express
const path = require('path')
const userController = require('../controllers/usersController')// los controllers 
//son los que controlan la ruta, desde la imagen que va a llevar, hasta las funciones que qures que hago, por eso se invocan
//los controller son objetos por eso se usa el . despues del nombre

const guestMW = require('../middlewares/guestMW')
const authMW = require('../middlewares/authMW')
/* =========================Express-Vaildator========================= */

const { check } = require('express-validator')

/* ==========================  Multer  ============================== */
//multer permite poder trasferir archivos que se cargan en la web al servidor
const multer = require('multer')

var storage = multer.diskStorage({

    destination: (req, file, callback) => {
        callback(null,'public/img/user')//donde se van a guardar las imagenes en los usuarios nuevos nuevos
    },
    
    filename: (req, file, callback) => {
        callback(null, 'img-'+ Date.now()+path.extname(file.originalname) )
        }//y aca le damos el npombre que va a tener usamos la fecha en segundos + el nombre del archivo para que no se repita
    })
    const upload = multer({storage})


router.get('/login', guestMW, userController.index)
router.post('/login', userController.login)
router.get('/logout', userController.logout)

router.get('/registro', userController.register)
router.post('/registro', upload.single('avatar'), [
    check('nombre').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    check('usuario').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    check('password').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    check('password_confirm').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    check('email').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    check('telefono').isLength({min:1}).withMessage('Debe ingresar un nombre'),
    check('nacimientoFecha').isLength({min:1}).withMessage('Debe ingresar un nombre'),
], userController.store )
router.get('/cheakuser', userController.cheak)

router.get('/profile',authMW, userController.profile)
router.get('/carrito',authMW, userController.carrito)
router.get('/deseos',authMW, userController.deseos)
module.exports = router // ahora exportamos el archivo 