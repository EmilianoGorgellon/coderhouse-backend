const {userModel} = require("../../../models/model/user.model");
const bcrypter = require("../../../utils/crypter/crypter.service");
const jwt = require("../../../utils/jwt/jwt.service");
const nodemailer = require("../../../utils/nodemailer/nodemailer");
const fs = require('fs');
class UserService {
    async createUser (dataBody, imageFile) {
        let {password, email} = dataBody;
        const userExist = await this.getUserByEmail(email); 
        if (userExist.length !== 0) throw new Error ("email ya registrado");
        password = await bcrypter.hashPassword(password);
        const photo = await this.imageToBase64(imageFile);
        const new_user = await userModel.create({...dataBody, password, photo});
        await nodemailer.sendMail(new_user);
        return await jwt.generateToken({...dataBody, photo});
    }
    async imageToBase64 (file) {
        try {
            const image = fs.readFileSync(file.path, {encoding: 'base64'});
            fs.unlinkSync(file.path);
            return image;
        } catch (error) {
            console.log(error)
            return "Error en imagen a base 64"
        }
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