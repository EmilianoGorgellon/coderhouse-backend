const { Router } = require("express");
const router = Router();
const userController = require("./controllers/users.controller");
module.exports = app => {
    app.use('/api/user', router);
    router.post('/', userController.register);
}