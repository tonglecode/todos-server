"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redisClient_1 = require("../redisClient");
const user_1 = __importDefault(require("../entities/user"));
const authenticateUser = async (req, res, next) => {
    var _a;
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "No token, authorization denied" });
    }
    try {
        const isBlacklisted = await redisClient_1.redisClient.get(token);
        if (isBlacklisted === "isBlacklisted") {
            return res.status(401).json({ message: "Token is blacklisted" });
        }
        const decoded = jsonwebtoken_1.default.verify(token, "your_jwt_secret");
        const user = await user_1.default.findBy({ id: Number(decoded.id) });
        if (!user || user.length === 0) {
            return res.status(401).json({ message: "User not found" });
        }
        const _b = user[0], { password: PASSWORD } = _b, withoutPASSWORD = __rest(_b, ["password"]);
        req.user = withoutPASSWORD;
        next();
    }
    catch (error) {
        console.error("Token verification error:", error);
        if (error instanceof jsonwebtoken_1.default.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.authenticateUser = authenticateUser;
//# sourceMappingURL=authenticateUser.js.map