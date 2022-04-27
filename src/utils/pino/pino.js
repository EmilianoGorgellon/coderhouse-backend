const pino = require("pino")({
    transport: {
        target: "pino-pretty",
        options: {
            translateTime: true
        }
    }
});

module.exports = pino;