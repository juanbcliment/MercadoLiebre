const express = require('express')
const app = express() //requierimos express y lo utilizamos atravaes de app

const path = require('path')// se utiliza para poder usar EJS

/*======================  Servidor local  ============================    */
 //creamos el servidor local

app.listen(3000, () => {
    console.log('Servidiro corriendo en el puerto 3000')
})


/* ===================  Recursos estáticos  ==================================*/
// vincula los html y ejs con la carpeta css

app.use(express.static(path.resolve (__dirname , "../public")))


/* =========================  EJS  ================================== */
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))// permite que controller sepa que los archivos ejs estan en la carpeta views

/* ===================  CRUD: Create Reed Update Delete  ==========================*/
const methodOverride = require("method-override");
app.use(methodOverride ("_method"));
//body parse, sin esta linea de codigo nunca va a llegar la informacion al formulario, indica que vamos a rabajar en formularios
app.use(express.urlencoded({extended: false}));
//transforma los datos que recive en json, usar json dentro de los archivos
app.use(express.json());

/* ===================  Routing  =======================================*/
// estamos requiendo el archivo que tiene nuestra ruta en la carpeta routers
const mainRoutes = require('./routers/main')
const productsRoutes = require('./routers/products') // requerimos todas la rutas que estan en el archvio y ahora hay que utilizarlas
const usersRoutes = require('./routers/users')


app.use('/', mainRoutes)
app.use('/productos', productsRoutes) //el /productos lo que hace es que todas las rutas que estan en el archivo les agrega una /productos antes, y quedaria /productos/autos
app.use('/user', usersRoutes)




//----------------error (404)--------------------------

app.use((req, res, next) =>{
    res.status(404).render("error.ejs")
});
