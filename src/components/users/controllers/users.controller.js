const { config } = require("../../../config");
// const {userModel} = require("../../../models/model/user.model");
const userService = require("../services/user.services");
class User {
    async register (req, res, next){
        try {
            const response = await userService.createUser(req.body);
            return res.json(response);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new User();