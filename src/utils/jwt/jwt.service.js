const jwt = require("jsonwebtoken");
const { config } = require("../../config");

class JWT {
    async verifyToken (req, res, next) {
        try {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, config.jwt_secret, {
                algorithm:  [config.algorithmToken]
            });
            next();
        } catch (error) {
            return res.status(401).json({"response": "No dispones de un token valido"})
        }
    }

    async generateToken (payloadTokenData) {
        try {
            const objectToToken = {
                email: payloadTokenData.email,
                name: payloadTokenData.name,
                direction: payloadTokenData.direction,
                edad: payloadTokenData.edad,
                phone: payloadTokenData.phone,
                // photo: payloadTokenData.photo
            }
            return jwt.sign(objectToToken, config.jwt_secret, {
                expiresIn: config.jwt_expire_time * 1000 || 600000,
                algorithm: config.jwt_algorithm_token || 'HS256'
            });
        } catch (error) {
            console.log(error);
            return "error en generate token";
        }
    }

    async decode (token) {
        try {
            const decodeToken = await jwt.decode(token, config.jwt_secret, {
                algorithm: [config.algorithm || 'HS256']
            })
            return decodeToken;
        } catch (error) {
            return console.log(error, "error en decode")
        }
    }
}
module.exports = new JWT();