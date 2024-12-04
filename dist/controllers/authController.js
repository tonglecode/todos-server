"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutUser = exports.loginUser = exports.registerUser = void 0;
const user_1 = __importDefault(require("../entities/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const redisClient_1 = require("../redisClient");
const registerUser = async (req, res) => {
    const { name, email, password, photoBase64 } = req.body;
    try {
        const user = new user_1.default();
        user.name = name;
        user.email = email;
        user.password = password;
        user.photoBase64 = photoBase64;
        await user.save();
        return res.status(201).json({ message: "User created successfully", user });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error creating user", error });
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }
    try {
        const user = await user_1.default.findOneBy({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, "your_jwt_secret", {
            expiresIn: "7d",
        });
        await redisClient_1.redisClient.set(token, String(user.id), {
            EX: 10 * 60,
        });
        return res.json({ token });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Error logging in", error });
    }
};
exports.loginUser = loginUser;
const logoutUser = async (req, res) => {
    var _a;
    console.log(req.header);
    const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
    if (token) {
        try {
            await redisClient_1.redisClient.set(token, "blacklisted");
            await redisClient_1.redisClient.expire(token, 3600);
            res.status(200).json({ message: "Logged out successfully" });
        }
        catch (error) {
            console.error("Redis error:", error);
            res.status(500).json({ message: "Error logging out", error });
        }
    }
    else {
        res.status(400).json({ message: "No token provided" });
    }
};
exports.logoutUser = logoutUser;
//# sourceMappingURL=authController.js.map