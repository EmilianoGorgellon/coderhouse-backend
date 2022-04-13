let express = require("express");
let cors = require("cors");
let path = require('path');
const {config} = require("./config");
const multer = require("multer");
const routesServer = require("./routes");
class App {
    constructor() {
        this.app = express();
        this.port = config.port;
        this.settings();
        this.middlewares();
    }
    async settings(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        this.app.use(express.static(path.join(__dirname, "public")));
        const storage = multer.diskStorage({
            destination: path.join(__dirname, "public/uploads"),
            filename: (req, file, cb) => {
                cb(null, new Date().getTime() + path.extname(file.originalname))
            }
        })  
        this.app.use(multer({storage}).single('image'));
    }
    async middlewares(){
        this.app.use(cors(config.cors));
        if (config.db_name === 'mongo') {
            // Activo coneccion a Mongo DB Atlas 
            let {connection} = require("./config/mongodb");
        }
    }
    async routes () {
        routesServer(this.app);
    }
    async listen(){
        // if(cluster.isMaster){
        //     for (let i = 0; i < numCPUs; i++) {
        //         cluster.fork();                
        //     }
        //     cluster.on("exit", (worker, corde, signal)=>{
        //         console.log(`Worker dead ${worker.process.pid}`);
        //         cluster.fork();
        //     })
        // }else{
        //     this.app.listen(this.port, err=>{
        //         console.log(`Server on http://localhost:${this.port}`)
        //     })
        // }

        this.app.listen(this.port, err=>{
            console.log(`Server on http://localhost:${this.port}`)
        })
    }
}

module.exports = new App();

// if (config.db_name === "mongo") {
//     let {connection} = require("./config/mongodb");
// }
// Middlewares
// app.use(express.static(path.join(__dirname, "public", "html")));
// app.use(express.json());
// app.use(express.urlencoded({extended: true}));
// app.use(cors(config.cors));

// // Routes
// app.use('/api/productos', require('./routes/productos'));
// app.use('/api/carrito', require('./routes/carrito'))


// app.listen(config.port);