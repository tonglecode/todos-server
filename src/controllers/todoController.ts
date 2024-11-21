import { Request, Response } from "express";
import { Todo } from "../entities/todo";
import User from "../entities/user";
import { Task } from "../entities/task";

const createTodo = async (req: Request, res: Response) => {
  const { taskId, title, isDone, subTitle } = req.body;

  try {
    const task = await Task.findOne({ where: { id: taskId } });
    if (!task) {
      throw res.status(400).json({ message: "Not found task" });
    }

    const user = await User.findOne({ where: { id: req.user?.id } });
    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }

    const todo = new Todo();

    todo.title = title;
    todo.isDone = isDone;
    todo.subTitle = subTitle;

    todo.task = task;

    todo.user = user;

    await todo.save();

    res.status(200).json({ message: "Todo created successfully", todo });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
};

const getTodos = async (req: Request, res: Response) => {
  try {
    // const todo = Todo.create({ title, isDone });
    const user = await User.findOne({ where: { id: req.user?.id } });

    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }
    const todos = await Todo.findBy({ user, isDone: false });

    res.status(200).json({ message: "Get todos successfully", todos });
  } catch (error) {
    res.status(500).json({ message: "getTodos", error });
  }
};

const updateTodo = async (req: Request, res: Response) => {
  const { id, title, subTitle, isDone } = req.body;

  try {
    const user = await User.findOneBy({ id: req.user?.id });

    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }

    const todo = await Todo.findOneBy({ id, user });
    if (!todo) {
      throw res
        .status(400)
        .json({ message: "Not found todo or don't have permission" });
    }

    const updateFields: Partial<Todo> = {};

    if ((req.body, title !== undefined)) updateFields.title = req.body.title;
    if ((req.body, subTitle !== undefined))
      updateFields.subTitle = req.body.subTitle;
    if ((req.body, isDone !== undefined)) updateFields.isDone = req.body.isDone;

    const newTodo = await Todo.update({ id }, updateFields);

    res.status(200).json({ message: "Update todo successfully", newTodo });
  } catch (error) {
    res.status(500).json({ message: "updateTodo", error });
  }
};

const removeTodo = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const user = await User.findOneBy({ id: req.user?.id });

    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }

    const todo = await Todo.findOneBy({ id, user });
    if (!todo) {
      throw res
        .status(400)
        .json({ message: "Not found todo or don't have permission" });
    }
    console.log("to delete");
    await Todo.delete({ id });
    console.log("deleted");

    res.status(200).json({ message: "deleted todo" });
  } catch (error) {
    res.status(500).json({ message: "removeTodo", error });
  }
};

export { createTodo, getTodos, updateTodo, removeTodo };
