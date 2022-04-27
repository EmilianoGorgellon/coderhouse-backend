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
}

module.exports = new User();