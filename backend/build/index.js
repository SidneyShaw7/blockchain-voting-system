"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const helmet_1 = __importDefault(require("helmet"));
const routes_1 = require("./api/routes");
const middleware_1 = require("./api/middleware");
const config_1 = require("./api/config");
const middleware_2 = require("./api/middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)(config_1.corsConfig));
app.use(express_1.default.json());
// app.use(logger);  // Ensure all requests are logged
if (!config_1.config.mongo.url) {
    middleware_1.logger.error('MongoDB URL is not configured. Please check your environment variables.');
    process.exit(1); // (optioally )exit if cannot connect to database
}
// Connect to MongoDB
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: 'majority',
})
    .then(() => {
    middleware_1.logger.info('Connected to MongoDB.');
    startServer();
})
    .catch((error) => {
    middleware_1.logger.error('Unable to connect to MongoDB.', { error: error.message });
    process.exit(1);
});
// func to start the Express server
function startServer() {
    app.listen(config_1.config.server.port, () => {
        middleware_1.logger.info(`Server running on port ${config_1.config.server.port}`);
    });
}
// HTTP auth middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    else {
        return next();
    }
});
// req logging middleware
app.use((req, res, next) => {
    middleware_1.logger.info(`Incoming -> Method: [${req.method}] - URL: [${req.path}] - IP: [${req.ip}]`);
    res.on('finish', () => {
        middleware_1.logger.info(`Outgoing -> Method: [${req.method}] - URL: [${req.path}] - Status: [${res.statusCode}] - IP: [${req.ip}]`);
    });
    next();
});
// Basic ping route for simple live checks
app.get('/ping', (_req, res) => {
    middleware_1.logger.info('Ping received, pong sent.');
    res.send('pong');
});
// User-related routes from the router
app.use('/api/register', routes_1.userRouter);
app.use('/api/login', routes_1.userRouter);
app.use(middleware_2.errorHandler);
exports.default = app;
