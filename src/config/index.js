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
    jwt_algorithm_token: process.env.JWT_ALGORITHM,
    twilio_account_id: process.env.TWILIO_ACCOUNT_ID,
    twilio_token: process.env.TWILIO_TOKEN,
    twilio_phone_number: process.env.TWILIO_PHONE_NUMBER,
    nodemailer_user: process.env.NODEMAILER_USER,
    nodemailer_pw: process.env.NODEMAILER_PW
}

module.exports = {config};