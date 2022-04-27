let moment = require("moment");
let admin = true;
const { config } = require("../../../config");
let Products = require("../services/productosService");
let products;
if (config.db_name === "mongo") {
    // Conexión mongodb
    let {productoModel} = require("../../../models/model/producto.model");
    products = new Products(null, productoModel, null, config.db_name);
} else if (config.db_name === "sqlite3") {
    // Conexión sqlite3
    let dbSqlite = require("../../../config/sqlite3");
    const {startSqlite3} = require("../../../models/createsqlite3")
    products = new Products(null, dbSqlite.client, "productos", config.db_name);
    startSqlite3()
} else if (config.db_name === "firebase") {
    // Conexión firebase
    let {db:firebaseDB} = require("../../../utils/firebase/index");
    products = new Products(null, firebaseDB, "productos", config.db_name);
} else {
    // Conexión fs
    products = new Products("./data/productos.txt", null, null, null);
}

class Controller_producto {
    async getProducts (req, res) {
        try {
            return res.json(await products.getProductById(req.params));
        } catch (error) {
            return "Error en obtener productos"
        }
    }

    async sendProduct (req, res) {
        try {
            if (admin) {
                let newProduct = {
                    "timestamp": moment().format('MMMM Do YYYY, h:mm:ss a'),
                    "nombre": req.body.nombre,
                    "descripcion": req.body.descripcion,
                    "codigo": req.body.codigo,
                    "foto": req.body.foto,
                    "precio": req.body.precio,
                    "stock": req.body.stock
                }
                return res.json(await products.sendProduct(newProduct))
            }
            return res.status(401).json({"response": "Error, necesitas ser administrador para acceder a este contenido"});  
        } catch (error) {
            return res.json({"response": "Error en enviar productos"})
        }
    }

    async updateProduct(req, res) {
        try {
            if (admin) {
                let updateData = {
                    "timestamp": moment().format('MMMM Do YYYY, h:mm:ss a'),
                    "nombre": req.body.nombre,
                    "descripcion": req.body.descripcion,
                    "codigo": req.body.codigo,
                    "foto": req.body.foto,
                    "precio": req.body.precio,
                    "stock": req.body.stock
                }
                return res.json(await products.updateProduct(req.params, updateData))
            }
            return {"response": "Error, necesitas ser administrador para acceder a este contenido"}
        } catch (error) {
            return {"response": "Error, no se pudo actualizar el producto"}
        }
    }

    async deleteProduct (req, res) {
        try {
            if (admin){
                return res.json(await products.deleteProduct(req.params))
            }
            return {"response": "Error, necesitas ser administrador para acceder a este contenido"}
        } catch (error) {
            return {"response": "Error en eliminar producto"}
        }
    }

}

module.exports = new Controller_producto();
