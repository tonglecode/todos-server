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
exports.getTasks = exports.updateTask = exports.removeTask = exports.createTask = void 0;
const user_1 = __importDefault(require("../entities/user"));
const task_1 = require("../entities/task");
const getTasks = async (req, res) => {
    var _a;
    try {
        const user = await user_1.default.findOne({ where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!user) {
            throw res.status(400).json({ message: "Not found user" });
        }
        const tasks = await task_1.Task.findBy({ user: user });
        res.status(200).json({ message: "Get tasks successfully", tasks });
    }
    catch (error) {
        res.status(500).json({ message: "getTasks", error });
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res) => {
    var _a, _b;
    const { title, color, icon } = req.body;
    try {
        const user = await user_1.default.findOne({ where: { id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id } });
        if (!user) {
            throw res.status(400).json({ message: "Not found user" });
        }
        const existTask = await task_1.Task.findOne({
            where: { user: (_b = req.user) === null || _b === void 0 ? void 0 : _b.id, title: title },
        });
        if (existTask) {
            throw res.status(400).json({ message: "Already Task" });
        }
        const task = new task_1.Task();
        task.title = title;
        task.color = color;
        task.icon = icon;
        task.user = user;
        await task.save();
        const { user: _ } = task, withoutUser = __rest(task, ["user"]);
        res.status(200).json({ message: "Todo created successfully", withoutUser });
    }
    catch (error) {
        res.status(500).json({ message: "Error creating task", error });
    }
};
exports.createTask = createTask;
const updateTask = async (req, res) => {
    var _a;
    const { id, title, color, icon } = req.body;
    try {
        const user = await user_1.default.findOneBy({ id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!user) {
            throw res.status(400).json({ message: "Not found user" });
        }
        const task = await task_1.Task.findOneBy({ id, user });
        if (!task) {
            throw res
                .status(400)
                .json({ message: "Not found task or don't have permission" });
        }
        const updateFields = {};
        if ((req.body, title !== undefined))
            updateFields.title = req.body.title;
        if ((req.body, color !== undefined))
            updateFields.color = req.body.color;
        if ((req.body, icon !== undefined))
            updateFields.icon = req.body.icon;
        const newTask = await task_1.Task.update({ id }, updateFields);
        console.log(newTask);
        res.status(200).json({ message: "Update task successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "updateTask", error });
    }
};
exports.updateTask = updateTask;
const removeTask = async (req, res) => {
    var _a;
    const { id } = req.body;
    try {
        const user = await user_1.default.findOneBy({ id: (_a = req.user) === null || _a === void 0 ? void 0 : _a.id });
        if (!user) {
            throw res.status(400).json({ message: "Not found user" });
        }
        const task = await task_1.Task.findOneBy({ id, user });
        if (!task) {
            throw res
                .status(400)
                .json({ message: "Not found Task or don't have permission" });
        }
        await task_1.Task.delete({ id });
        res.status(200).json({ message: "deleted task" });
    }
    catch (error) {
        res.status(500).json({ message: "removeTask", error });
    }
};
exports.removeTask = removeTask;
//# sourceMappingURL=taskController.js.map