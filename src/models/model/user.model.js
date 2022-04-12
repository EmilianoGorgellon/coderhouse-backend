const {Schema, model} = require("mongoose");
const {usersSchema} = require("../schema/user.schema");
const userSchema = new Schema(usersSchema);
const userModel = new model("users", userSchema);

module.exports = {userModel};