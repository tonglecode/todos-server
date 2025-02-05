"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRouter_1 = __importDefault(require("./routes/authRouter"));
const data_source_1 = __importDefault(require("./data-source"));
const redisClient_1 = require("./redisClient");
const authenticateUser_1 = require("./middleWare/authenticateUser");
const cors = require("cors");
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
data_source_1.default.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization:", err);
});
(0, redisClient_1.connectRedis)()
    .then(() => {
    console.log("Redis client connected!");
})
    .catch((err) => {
    console.error("Error connecting to Redis:", err);
});
app.use(cors({
    origin: [
        "https://mytodos.tongle.kr",
        "http://localhost:3003",
    ],
}));
app.get("/protected", authenticateUser_1.authenticateUser, (req, res) => {
    res.json(req.user);
});
app.use(express_1.default.json());
app.use(authRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
//# sourceMappingURL=index.js.map