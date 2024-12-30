import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  googleLogin,
} from "../controllers/authController";
import { authenticateUser } from "../middleWare/authenticateUser";
import { updateUser } from "../controllers/userController";
import {
  createTodo,
  getTodos,
  removeTodo,
  updateTodo,
} from "../controllers/todoController";
import {
  createTask,
  getTasks,
  removeTask,
  updateTask,
} from "../controllers/taskController";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google", googleLogin);

router.patch("/updateUser", authenticateUser, updateUser);

router.post("/createTodo", authenticateUser, createTodo);
router.get("/getTodos", authenticateUser, getTodos);
router.patch("/updateTodo", authenticateUser, updateTodo);
router.delete("/removeTodo", authenticateUser, removeTodo);

router.post("/createTask", authenticateUser, createTask);
router.get("/getTasks", authenticateUser, getTasks);
router.patch("/updateTask", authenticateUser, updateTask);
router.delete("/removeTask", authenticateUser, removeTask);
export default router;
