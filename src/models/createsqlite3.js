const dbSqlite = require("../config/sqlite3");
const pino = require("../utils/pino/pino");
const startSqlite3 = async () => {
    try {
        // create table productos in sqlite3
        let hastable = await dbSqlite.client.schema.hasTable('productos');
        if(!hastable){
            await dbSqlite.client.schema.createTable('productos', table =>{
                table.increments("id").primary(),
                table.string("timestamp"),
                table.string("nombre"),
                table.string("descripcion"),
                table.integer("codigo"),
                table.string("foto"),
                table.integer("precio"),
                table.string("stock")
            });
        } else {
            pino.info("Ya existe la tabla productos")
        }
        
        hastable = await dbSqlite.client.schema.hasTable('carrito');
        if(!hastable){
            await dbSqlite.client.schema.createTable('carrito', table => {
                table.increments("id").primary(),
                table.string("timestamp"),
                table.string("array")
              
            });
        } else {
            pino.info("Ya existe la tabla carrito")
        }

    } catch (error) {
        pino.error("Error: " + error);
    }
};
module.exports = { startSqlite3 };