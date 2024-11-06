const express = require("express");
const app = express();
const path = require("path");

const routerProducto = require("./router/productoRouter");
const bodyParser = require("body-parser");
const methodOverride =  require('method-override');   // Pasar poder usar los métodos PUT y DELETE


app.use(express.static("public"));


app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));


app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('_method'));  // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE



app.listen(3001,()=> console.log("server is running on port 3001"))


app.use("/", routerProducto); 

