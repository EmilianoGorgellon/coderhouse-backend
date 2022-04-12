const {userModel} = require("../../../models/model/user.model");
const bcrypter = require("../../../utils/crypter/crypter.service");
const jwt = require("../../../utils/jwt/jwt.service");
const fs = require('fs');
class UserService {
    async createUser (dataBody, image) {
        let {password, email} = dataBody;
        const userExist = await this.getUserByEmail(email); 
        if (userExist.length !== 0) throw new Error ("email ya registrado")
        password = await bcrypter.hashPassword(password);
        await userModel.create({...data, password, image});
        return await jwt.generateToken({...data, password, image});
    }
    async updateUser (data) {
        const userExist = await this.getUserByEmail(data.email);
        if (userExist.length !== 1) throw new Error("Email desconocido");
        // actualizo usuario con user model
    }
    async imageToBase64 (file) {
        return "data:image/gif;base64," + fs.readFileSync(file, 'base64');
    }

    async getUserByEmail (email) {
        try {
            return await userModel.find({email: email})
        } catch (error) {
            return new Error("Error in get user by email")
        }
    }
}

module.exports = new UserService();