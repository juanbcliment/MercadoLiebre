const express = require('express')
const router = express.Router()// requierimos la parte de rutas de express

const userController = require('../controllers/usersController')// los controllers 
//son los que controlan la ruta, desde la imagen que va a llevar, hasta las funciones que qures que hago, por eso se invocan
//los controller son objetos por eso se usa el . despues del nombre

router.get('/login', userController.index)
router.get('/registro', userController.register)

module.exports = router // ahora exportamos el archivo 