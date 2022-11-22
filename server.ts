import express from 'express';
import http from 'http';
import Logging from './src/library/Logging';
import SuburbRoutes from './src/routes/Suburb';
import mongoose from 'mongoose';

const router = express();

/** Connect to Mongo */
mongoose['connect'](process.env.MONGO_URL || 'mongodb+srv://mohin:mohin123@cluster0.qqhsxp7.mongodb.net/test-application');
mongoose.connection.on('open', () => {
    console.log('Database is Connected');
});

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            /** Log the res */
            Logging.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });

    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

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
    router.use('/suburb', SuburbRoutes);

    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error('Not found');

        Logging.error(error);

        res.status(404).json({
            message: error.message
        });
    });

    http.createServer(router).listen(process.env.SERVER_PORT, () => Logging.info(`Server is running on port ${process.env.SERVER_PORT}`));
};
