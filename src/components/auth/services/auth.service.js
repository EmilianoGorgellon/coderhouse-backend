const userService = require("../../users/services/user.services");
const bcrypter = require("../../../utils/crypter/crypter.service");
const jwt = require("../../../utils/jwt/jwt.service");
class AuthService {
    async loginService (data) {
        try {
            const emailExist = await userService.getUserByEmail(data.email);
            if (emailExist.length === 0) throw new Error("Error email no encontrado");
            const matchPassword = await bcrypter.comparePassword(data.password, emailExist[0].password);
            if (!matchPassword) throw new Error("Error contraseña incorrecta");
            return await jwt.generateToken(emailExist[0]);
        } catch (error) {
            return {"response": "Error en el servicio de login"}
        }
    }
}

module.exports = new AuthService();