const { config } = require("../../../config");
// const {userModel} = require("../../../models/model/user.model");
const userService = require("../services/user.services");
class User {
    async register (req, res, next){
        try {
            const image = await userService.imageToBase64(req.file);
            const response = await userService.createUser(req.body, image);
            return res.status(201).json(response);
        } catch (error) {
            console.log(error);
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