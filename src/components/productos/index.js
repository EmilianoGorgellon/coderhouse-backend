const { Router } = require("express");
const router = Router();
const productosController = require("./controllers/productosController");
const { verifyToken } = require("../../utils/jwt/jwt.service")
module.exports = app =>{
    app.use('/api/productos', router);
    
    router.get('/:id?', productosController.getProducts);
    router.post('/', verifyToken, productosController.sendProduct);
    router.put('/:id', verifyToken, productosController.updateProduct);
    router.delete('/:id', verifyToken, productosController.deleteProduct);
}