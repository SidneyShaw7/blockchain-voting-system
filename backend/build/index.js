"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./api/routes");
const middleware_1 = require("./api/middleware");
const config_1 = require("./api/config");
// Load environment variables
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// app.use(logger);  // Ensure all requests are logged
// Connect to MongoDB
mongoose_1.default.connect(config_1.config.mongo.url, { retryWrites: true, w: 'majority' })
    .then(() => {
    middleware_1.logger.info('Connected to MongoDB.');
    startServer(); // Start the server after DB connection is established
})
    .catch((error) => {
    middleware_1.logger.error('Unable to connect to MongoDB.');
    middleware_1.logger.error(error.message); // Log the error message for better clarity
});
// Function to start the Express server
function startServer() {
    app.listen(PORT, () => {
        middleware_1.logger.info(`Server running on port ${PORT}`);
    });
}
// Basic ping-pong route for simple live checks
app.get('/pingpong', (_req, res) => {
    middleware_1.logger.info('Ping received, pong sent.');
    res.send('pong');
});
// User-related routes from the router
app.use('/api/users', routes_1.userRouter);
exports.default = app;
