const joi = require("joi");
const email = joi.string();
const password = joi.string().min(8);
const name = joi.string().min(3);
const direction = joi.string();
const edad = joi.number();
const phone = joi.number()
const photo = joi.string().min(3);
const usersSchema = {
    email: email.required(),
    password: password.required(),
    name: name.required(),
    direction: direction.required(),
    edad: edad.required(),
    phone: phone.required(),
    photo: photo.required()
}

module.exports = {usersSchema}
