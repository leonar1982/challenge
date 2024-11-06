const fs = require('fs');
const path = require('path');

const productosFilePath = path.join(__dirname, '../data/productos.json');
const productos = JSON.parse(fs.readFileSync(productosFilePath, 'utf-8'));



const productosController = {
    list: (req, res) => {
        res.render('home', { productos, paginaCSS:"home", devolverPrecio })

    },
    create: (req, res) => {
        res.render('productos/creacionProd', {productos, paginaCSS:"home"})
      
    },
    stock: (req, res) => {
        const { nombre, descripcion, precio, imagen } = req.body;
        const nuevoProductos = {
            id: productos[productos.length - 1].id + 1,
            nombre,
            descripcion,
            precio: parseFloat(precio),
            imagen: req.file ? req.file.filename : "default.jpeg"
        }

        productos.push(nuevoProductos)
        fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, " "))
        res.redirect("/")
    },

    detail: (req, res) => {
		let idProducto = req.params.id;
		let producto = productos.find(producto => producto.id == idProducto)
      
		res.render("productos/detalles", {producto, paginaCSS:"detalles", devolverPrecio}) 
    }, 

    
    

    edit: (req, res) => {
        let id = req.params.id
        let editProducto = productos.find(producto => producto.id == id)
        // let precioFormateado = parseFloat(editProducto.precio.replace('.', ''))
        res.render("productos/editProd", { editProducto})
    },

    update: (req, res) => {
		let id = req.params.id 
		let editProducto = productos.find(producto => producto.id == id) 
		editProducto = {
			id: editProducto.id,
            precio: parseFloat(req.body.precio),
			...req.body,
			imagen: req.file ? req.file.filename : editProducto.imagen
		}; 

		// let newProductos = productos.map(producto => {   
													  
		// 	if (producto.id === editProducto.id) {
		// 		return product = { ...editProducto };  
		// 	}
		// 	    return producto;
		// })

        for (let i = 0; i < productos.length; i++) {
            if (productos[i].id == editProducto.id) {
                productos[i] = editProducto;
                break;
            }
        }
		fs.writeFileSync(productosFilePath, JSON.stringify(productos, null, ' '));
		res.redirect("/")
	},

    destroy: (req, res) => {
		let id = req.params.id  
		let finalProductos = productos.filter(producto => producto.id != id) 

  		fs.writeFileSync(productosFilePath, JSON.stringify(finalProductos, null, ' ')); 
		res.redirect('/'); 
	}


}

function devolverPrecio(precio){
    console.log(precio)
    console.log(typeof precio)
    if(precio>=10000){
        console.log(parseFloat(precio).toLocaleString("es-ES"))
        console.log(typeof parseFloat(precio).toLocaleString("es-ES"))
        return parseFloat(precio).toLocaleString("es-ES")
    }
    else if(precio>=1000){
       let arrPrecio = Array.from(precio)
       for(let i = arrPrecio.length -1; i>=0; i--){
        arrPrecio[i + 1 ] = arrPrecio[i]
       }
       arrPrecio[1] = "."
       return arrPrecio.join("")
    }
    else {
        return precio
    }
}

module.exports = productosController;