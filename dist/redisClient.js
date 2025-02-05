"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectRedis = exports.redisClient = void 0;
const redis_1 = require("redis");
const redisClient = (0, redis_1.createClient)({
    url: process.env.REDIS_URL,
});
exports.redisClient = redisClient;
redisClient.on("error", (err) => {
    console.error("Redis client error:", err);
});
const connectRedis = async () => {
    if (!redisClient.isOpen) {
        await redisClient.connect();
    }
};
exports.connectRedis = connectRedis;
//# sourceMappingURL=redisClient.js.map