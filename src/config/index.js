require("dotenv").config();
const name = require("../helper/switchDB")
const config = {
    port: process.env.PORT,
    cors: `${process.env.CORS}`,
    mongo_atlas: process.env.MONGO_ATLAS_URI,
    db_name: name.db_name,
    salt_rounds_bcrypt: process.env.SALT_ROUNDS_BCRYPT,
    jwt_secret: process.env.JWT_SECRET,
    jwt_expire_time: process.env.JWT_EXPIRES_IN,
    jwt_algorithm_token: process.env.JWT_ALGORITHM
}

module.exports = {config};