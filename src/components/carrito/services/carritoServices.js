let fs = require("fs");
const jwt = require("../../../utils/jwt/jwt.service");
const nodemailer = require("../../../utils/nodemailer/nodemailer");
const { send_whatsapp_twilio } = require("../../../utils/twilio/twilio");
const pino = require("../../../utils/pino/pino"); 

class Carrito {
    constructor(url, db_client, db_collection, db_name){
        this.url = url,
        this.db_client = db_client,
        this.db_collection = db_collection,
        this.db_name = db_name
    }
    async sendNotificationCarrito (req) {
        try {
            const data_user = await jwt.decode(req.headers.authorization.split(" ")[1]);
            const data_carrito = await this.getCarritoProducts(req.params);
            await nodemailer.sendMailCarrito(data_user, data_carrito[0].productos);
            await send_whatsapp_twilio(data_user);
            return {"response":`Email y mensaje por whatsapp enviados a ${data_user.name}`};
        } catch (error) {
            return {"response": "Error, no se pudo enviar email"}
        }
    }
    async getAll(){
        try {
            if (this.db_name === "mongo") {
                return await this.db_client.find({});
            } else if (this.db_name === "sqlite3") {
                return await this.db_client.from(`${this.db_collection}`);
            } else if (this.db_name === "firebase") {
                let getProductos = await this.db_client.collection(`${this.db_collection}`).get();
                let sendData = [];
                getProductos.forEach(element => sendData.push({id:element.id, ...element.data()}))
                return sendData;
            }
            let getAllData = await fs.promises.readFile(`${this.url}`, 'utf-8')
            return JSON.parse(getAllData)
        } catch (error) {
            return {"response": "Error en obtener todos los carritos"};
        }
    }

    async createCarrito(time){
        try {
            let getAllCarrito = await this.getAll();
            let newId = await this.newId(getAllCarrito)
            let newCarrito = {
                "id": newId,
                "timestamp": time,
                "productos": []
            }
            if (this.db_name === "mongo") {
                await this.db_client.create(newCarrito);
                return {"response": `id: ${newId}`}
            } else if (this.db_name === "sqlite3") {
                pino.info("carrito con sqlite3")
            } else if (this.db_name === "firebase") { 
                return await this.db_client.collection(`${this.db_collection}`).doc().set(newCarrito);
            }     
            getAllCarrito.push(newCarrito);
            await fs.promises.writeFile(`${this.url}`, JSON.stringify(getAllCarrito, null, 2));
            return newId;
        } catch (error) {
            return {"response": "Error en crear el carrito"};
        }
    } 
    
    async deleteCarrito (id){
        try {
            id = parseInt(id.id);
            if (id >= 1) {  
                if (this.db_name === "mongo") {
                    return await this.db_client.deleteOne({id: id});
                } else if (this.db_name === "sqlite3") {
                    pino.info("elimino carrito segun id con sqlite3")
                } else if (this.db_name === "firebase") {
                    let getProductos = await this.db_client.collection(`${this.db_collection}`).get();
                    let productoEliminado = false;
                    getProductos.forEach(async element => {
                        if (element.data().id === id) {
                            productoEliminado = true;
                            return await this.db_client.collection(`${this.db_collection}`).doc(element.id).delete();
                        }
                    })
                    return productoEliminado ? {"response": `Carrito eliminado con id: ${id}`} : {"response": `No hay carrito con id: ${id}`}  
                }
                let getAllCarrito = await this.getAll();
                let newAllCarrito = getAllCarrito.filter(data => data.id !== id);
                await fs.promises.writeFile(`${this.url}`, JSON.stringify(newAllCarrito, null, 2))
            } 
            return {"response": `Error: No existe carrito con el id: ${id}`}
        } catch (error) {
            return {"response": "Error en eliminar el carrito"};
        }
    }

    async getCarritoProducts(id){
        try {
            id = parseInt(id.id);
            let getAllCarrito = await this.getAll();
            let newAllCarrito = getAllCarrito.filter(data => data.id === id)
            return newAllCarrito;
        } catch (error) {
            return {"response": "Error en obtener id"}
        }
    }

    async addProductCarrito (id){
        try {
            let id_carrito = parseInt(id.id);
            let id_prod = parseInt(id.id_prod);
            let getAllCarrito = await this.getAll();
            let Producto = require("../../productos/services/productosService");
            if (this.db_name === "mongo") { 
                let {productoModel} = require("../../../models/model/producto.model")
                let producto = new Producto(this.url, productoModel, "productos", this.db_name);
                let carritoById = getAllCarrito.filter(data => data.id === id_carrito);
                let prodById = await producto.getProductById({"id": id_prod});
                if (typeof prodById === 'string') return prodById;
                carritoById[0].productos.push(prodById[0]);
                return await this.db_client.updateOne({id: id_carrito}, {productos: carritoById[0].productos})
            } else if (this.db_name === "sqlite3") {
                pino.info("falta agregar producot con sqlite3")
            } else if (this.db_name === "firebase") {
                let producto = new Producto(this.url, this.db_client, "productos", this.db_name);
                let getCarritoFirebase = await this.db_client.collection(`${this.db_collection}`).get();
                let carritoById = getAllCarrito.filter(data => data.id === id_carrito);
                let prodById = await producto.getProductById({"id": id_prod});
                if (typeof prodById === 'string') return prodById;
                carritoById[0].productos.push(prodById[0]);
                getCarritoFirebase.forEach(async (element) => {
                    if (element.data().id === id_carrito) {
                        return await this.db_client.collection(`${this.db_collection}`).doc(element.id).set({...carritoById[0]})
                    }
                })
                return {"response" : `Producto con id ${id_prod} se agrego al carrito con id ${id_carrito}`}
            }
            
            let getProduct = await producto.getProductById({"id": id});
            getAllCarrito[0].productos.push(getProduct[0]);
            await fs.promises.writeFile(`${this.url}`, JSON.stringify(getAllCarrito, null, 2));
        } catch (error) {
            return {"response": "Error no se pudo agregar producto al carrito"}
        }
    }

    async deleteCarritoProductByIds(id, time){
        try {
            let id_carrito = parseInt(id.id);
            let id_prod = parseInt(id.id_prod);
            let getAllCarrito = await this.getAll();

            if (this.db_name === "mongo") {
                let getCarrito = getAllCarrito.filter(data => data.id === id_carrito);
                let deleteProductById = getCarrito.map(data => data.productos.filter(dato => dato.id !== id_prod));
                let getProductToDelete = getCarrito.map(data => data.productos.filter(dato => dato.id === id_prod));
                return getProductToDelete[0].length !== 0 ? 
                    await this.db_client.updateOne({id: id_carrito}, {productos: deleteProductById[0]}) :
                   { "response" : `No hay producto con id ${id_prod} en carrito id ${id_carrito}`}

            } else if (this.db_name === "sqlite3") {
                return pino.info("Sqlite3")
            } else if (this.db_name === "firebase") {
                let getFirebase = await this.db_client.collection(`${this.db_collection}`);
                let getCarritoFirebaseId = await getFirebase.get();
                let getCarritoById = getAllCarrito.filter(data => data.id === id_carrito);
                let getProductById = getCarritoById.map(data => data.productos.filter(dato => dato.id !== id_prod));
                getCarritoFirebaseId.forEach(async (element) => {
                    if (element.data().id === id_carrito) {
                        return await getFirebase.doc(element.id).set({...getProductById});
                    }
                })
                return {"response": `Productos eliminados con id ${id_prod} en carrito ${id_carrito}`}
            }
            let getCarritoById = getAllCarrito.filter(data => data.id === id_carrito);
            if (getCarritoById.length !== 0) {
                let getNewListProduct = getCarritoById.map(data => data.productos.filter(data => data.id !== id_prod))[0]
                let sendData = {
                    "id": getCarritoById[0].id,
                    "timestamp": time,
                    "productos": getNewListProduct
                }
                getAllCarrito.splice(id_carrito - 1, 1);
                getAllCarrito.push(sendData);
                getAllCarrito.sort((prev, current) => (prev.id - current.id))
                await fs.promises.writeFile(`${this.url}`, JSON.stringify(getAllCarrito, null, 2))
            } else {
                return {"Error": `No hay carrito con id ${id_carrito}`}
            }    
        } catch (error) {
            return {"response": "Error en eliminar producto por id de carrito"}
        }
    }

    async newId(data) {
        try {
            if (data.length === 0 || data.length === 1) {
                return data.length + 1;
            }
            let idMax = data.reduce((prev, current) => {
                let valorId = isNaN(prev) ? prev.id : prev 
                if (valorId > current.id){
                    return valorId;
                } else {
                    return current.id;
                }
            })
            return idMax + 1;
        } catch (error) {
            return "Error en obtener nuevo ID"
        }
    }

}

module.exports = Carrito;