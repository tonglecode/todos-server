"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
const typeorm_1 = require("typeorm");
const user_1 = __importDefault(require("./user"));
const task_1 = require("./task");
let Todo = class Todo extends typeorm_1.BaseEntity {
};
exports.Todo = Todo;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Todo.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_1.default, (user) => user.todos, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", user_1.default)
], Todo.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => task_1.Task, (task) => task.todos, {
        onDelete: "CASCADE",
    }),
    (0, typeorm_1.JoinColumn)({ name: "taskId" }),
    __metadata("design:type", task_1.Task)
], Todo.prototype, "task", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Todo.prototype, "taskId", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Todo.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Todo.prototype, "subTitle", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Todo.prototype, "isDone", void 0);
exports.Todo = Todo = __decorate([
    (0, typeorm_1.Entity)()
], Todo);
//# sourceMappingURL=todo.js.map