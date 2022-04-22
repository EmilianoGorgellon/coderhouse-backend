const { Router } = require("express");
const router = Router();
const carritoControllers = require("./controllers/carritoControllers");

module.exports = app =>{
    app.use('/api/carrito', router);
    router.post('/', carritoControllers.createCarrito);
    router.delete('/:id', carritoControllers.deleteCarrito)
    router.get('/:id/productos', carritoControllers.getCarritoProducts);
    router.post('/:id/productos/:id_prod', carritoControllers.addProductCarrito);
    router.delete('/:id/productos/:id_prod', carritoControllers.deleteCarritoProductByIds);
    router.post('/:id/send', carritoControllers.sendEmail);
}