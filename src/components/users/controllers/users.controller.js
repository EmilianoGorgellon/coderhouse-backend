const userService = require("../services/user.services");
class User {
    async register (req, res, next){
        try {
            const response = await userService.createUser(req.body, req.file);
            return res.status(201).json(response);
        } catch (error) {
            return res.status(400).json({"response": "Error email ya registrado y/o contraseña invalida"})
        }
    }
    async updateUser (req, res, next) {
        try {
            const response = await userService.updateUser(req.body);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new User();