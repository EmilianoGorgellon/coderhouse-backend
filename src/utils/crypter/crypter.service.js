const bcrypt = require("bcrypt");
const { config } = require("../../config");
const pino = require("../pino/pino");
class Bcrypter {
    async comparePassword (user_pw, db_pw) {
        try {
            return await bcrypt.compare(user_pw, db_pw);
        } catch (error) {
            pino.error(`Error en comparacion de contraseñas: ${error}`);
        }
    }

    async hashPassword (user_pw) {
        try {
            return await bcrypt.hash(user_pw, config.salt_rounds_bcrypt);
        } catch (error) {
            pino.error(`Error en hashear la contraseña: ${error}`);
        }
    }
}

module.exports = new Bcrypter();