const { Router } = require("express");
const router = Router();
const productosController = require("./controllers/productosController");

module.exports = app =>{
    app.use('/api/productos', router);
    
    router.get('/:id?', productosController.getProducts);
    router.post('/', productosController.sendProduct);
    router.put('/:id', productosController.updateProduct);
    router.delete('/:id', productosController.deleteProduct);
}