require("dotenv").config();
const mongoose = require("mongoose");
const {config} = require("./index");
const pino = require("../utils/pino/pino");
if (config.db_name === "mongo") {
    let connection;
    (async () => {
        try {
            connection = mongoose.connect(config.mongo_atlas, {useNewUrlParser:true, useUnifiedTopology: true})
            pino.info("Coneccion conectada por mongodb")
        } catch (error) {
            pino.error("Error en la coneccion a la base de datos de Mongo DB")
        }
    })()

    module.exports = {connection}
}
