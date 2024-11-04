"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const authenticateUser_1 = require("../middleWare/authenticateUser");
const userController_1 = require("../controllers/userController");
const todoController_1 = require("../controllers/todoController");
const router = express_1.default.Router();
router.post("/register", authController_1.registerUser);
router.post("/login", authController_1.loginUser);
router.post("/logout", authController_1.logoutUser);
router.patch("/updateUser", authenticateUser_1.authenticateUser, userController_1.updateUser);
router.post("/createTodo", authenticateUser_1.authenticateUser, todoController_1.createTodo);
router.get("/getTodos", authenticateUser_1.authenticateUser, todoController_1.getTodos);
router.patch("/updateTodoIsDone", authenticateUser_1.authenticateUser, todoController_1.updateTodoIsDone);
router.patch("/updateTodo", authenticateUser_1.authenticateUser, todoController_1.updateTodo);
router.delete("/removeTodo", authenticateUser_1.authenticateUser, todoController_1.removeTodo);
exports.default = router;
//# sourceMappingURL=authRouter.js.map