"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Suburb_1 = __importDefault(require("./routes/Suburb"));
const mongoose_1 = __importDefault(require("mongoose"));
const router = (0, express_1.default)();
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url || 'http://localhost:9090', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: true
})
    .then((db) => {
    Logging_1.default.info('Mongo connected successfully.');
    StartServer();
})
    .catch((err) => {
    console.log('Error Connectiong to the Database');
});
/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging_1.default.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            /** Log the res */
            Logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use('/suburb', Suburb_1.default);
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');
        Logging_1.default.error(error);
        res.status(404).json({
            message: error.message
        });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
};
