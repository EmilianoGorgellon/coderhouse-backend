const authService = require ("../services/auth.service");
const userService = require("../../users/services/user.services");
const jwt = require("../../../utils/jwt/jwt.service");

// class Auth {
//     async login (req, res, next) {
//         const {email, password} = req.body;
//         const userExist = await userService.getUserByEmail(email);
//         if (userExist.length !== 0) throw new Error("Email no registrado");

//     }

// }