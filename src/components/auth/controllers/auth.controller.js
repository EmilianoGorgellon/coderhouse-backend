const authService = require ("../services/auth.service");

class Auth {
    async login (req, res, next) {
        try {
            const response = await authService.loginService(req.body);
            return await res.status(200).json(response);
        } catch (error) {
            return await res.status(401).json({"response": "Error email y/o contraseña incorrectos"});            
        }
    }

}
module.exports = new Auth();