const {userModel} = require("../../../models/model/user.model");
const bcrypter = require("../../../utils/crypter/crypter.service");
const jwt = require("../../../utils/jwt/jwt.service");

class UserService {
    async createUser (data) {
        let {password, email} = data;
        const userExist = await this.getUserByEmail(email);
        if (userExist.length !== 0) throw new Error ("email ya registrado")
        password = await bcrypter.hashPassword(password);
        await userModel.create({...data, password});
        return await jwt.generateToken({...data, password});
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