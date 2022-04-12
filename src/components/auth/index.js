const {Router} = require("express");
const router = Router();
const authController = require("./controllers/auth.controller");
module.exports = app => {
    app.use('/api/auth', router);

    router.post('/login', authController)
}