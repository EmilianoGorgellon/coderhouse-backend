const bcrypt = require("bcrypt");
const { config } = require("../../config");

class Bcrypter {
    async comparePassword (user_pw, db_pw) {
        try {
            return await bcrypt.compare(user_pw, db_pw);
        } catch (error) {
            console.log(error);
        }
    }

    async hashPassword (user_pw) {
        try {
            return await bcrypt.hash(user_pw, config.salt_rounds_bcrypt);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new Bcrypter();