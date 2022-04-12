const jwt = require("jsonwebtoken");
const { config } = require("../../config");

class JWT {
    async verifyToken (token) {
        try {
            const res = await jwt.verify(token, config.authJwtService, {
                algorithm:  [config.algorithmToken]
            })
            console.log("ACA VA LA REPSPUESTA DEL VERIFY TOKEN")
            console.log(res);
            return res;
        } catch (error) {
            console.log(error);
        }
    }

    async generateToken (payloadTokenData) {
        try {
            console.log("veo que hay en payload token data")
            console.log(payloadTokenData);
            return await jwt.sign(payloadTokenData, config.jwt_secret, {
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
            console.log(decodeToken);
            return decodeToken;
        } catch (error) {
            return console.log(error, "error en decode")
        }
    }
}
module.exports = new JWT();