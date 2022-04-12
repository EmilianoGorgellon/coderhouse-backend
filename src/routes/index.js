const productosApi = require("../components/productos");
const carritoApi = require("../components/carrito");
const userApi = require("../components/users");
// const authApi = require("")
module.exports = app =>{
    productosApi(app);
    carritoApi(app);
    userApi(app);
    app.get("/", (req, res)=> res.send("Todo ok!!!"));
}