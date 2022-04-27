let express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
let cors = require("cors");
let path = require('path');
const {config} = require("./config");
const multer = require("multer");
const routesServer = require("./routes");
const isCluster = true;

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
        if (isCluster) {
            if(cluster.isMaster){
                for (let i = 0; i < numCPUs; i++) {
                    cluster.fork();                
                }
                cluster.on("exit", (worker, corde, signal)=>{
                    console.log(`Worker dead ${worker.process.pid}`);
                    cluster.fork();
                })
            }else{
                this.app.listen(this.port, err=>{
                    console.log(`Con Cluster: Server on http://localhost:${this.port}`)
                })
            }
        } else {
            this.app.listen(this.port, err=>{
                console.log(`SIN CLUSTER: Server on http://localhost:${this.port}`)
            })
        }   
    }
}

module.exports = new App();