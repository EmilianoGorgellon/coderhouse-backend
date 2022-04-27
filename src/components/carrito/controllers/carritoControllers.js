let moment = require("moment");
// config
const { config } = require("../../../config");
// mongo db
let {carritoModel} = require("../../../models/model/carrito.model");
// sqlite3
let dbSqlite = require("../../../config/sqlite3");
// firebase
let {db:firebaseDB} = require("../../../utils/firebase/index");
let Carrito = require("../services/carritoServices");
let carrito;
if (config.db_name === "mongo") {
    carrito = new Carrito(null, carritoModel, null, config.db_name);
} else if (config.db_name === "sqlite3") {
    carrito = new Carrito(null, dbSqlite, "carrito", config.db_name);
} else if (config.db_name === "firebase") {
    carrito = new Carrito(null, firebaseDB, "carrito", config.db_name);
} else {
    carrito = new Carrito("./data/carrito.txt", null, null, null);
}
class Controller_carrito {
    async createCarrito(req, res) {
        try {
            let time = moment().format('MMMM Do YYYY, h:mm:ss a');
            return await res.status(200).json(await carrito.createCarrito(time));
        } catch (error) {
            return res.status(400).json({"response": "Error en crear carrito"});
        }
        
    }
    
    async deleteCarrito (req, res) {
        try {
            return await res.status(200).json(await carrito.deleteCarrito(req.params));
        } catch (error) {
            return res.status(400).json({"response": "Error en eliminar carrito"})   
        }
    }

    async getCarritoProducts (req, res) {
        try {
            return await res.status(200).json(await carrito.getCarritoProducts(req.params));
        } catch (error) {
            return res.status(400).json({"response": "Error en obtener carrito"})   
        }
    }

    async addProductCarrito (req, res) {
        try {
            return await res.status(200).json(await carrito.addProductCarrito(req.params));
        } catch (error) {
            return res.status(400).json({"response": "Error en agregar carrito"})
        }
    }

    async deleteCarritoProductByIds (req, res) {
        try {
            let time = moment().format('MMMM Do YYYY, h:mm:ss a');
            return await res.status(200).json(await carrito.deleteCarritoProductByIds(req.params, time));   
        } catch (error) {
            return await res.status(400).json({"response": "Error en eliminar producto en el carrito por ID"})
        }
    }

    async sendNotification (req, res) {
        try {
            return await res.status(200).json(await carrito.sendNotificationCarrito(req));
        } catch (error) {
            return await res.status(400).json({"response": "Error en enviar notificacion por email y mensaje por whatsapp"})
        }
    }
}

module.exports = new Controller_carrito();