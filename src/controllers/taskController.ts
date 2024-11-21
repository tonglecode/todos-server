import { Request, Response } from "express";
import User from "../entities/user";
import { Task } from "../entities/task";

const getTasks = async (req: Request, res: Response) => {
  try {
    // const todo = Todo.create({ title, isDone });
    const user = await User.findOne({ where: { id: req.user?.id } });

    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }
    const tasks = await Task.findBy({ user: user });

    res.status(200).json({ message: "Get tasks successfully", tasks });
  } catch (error) {
    res.status(500).json({ message: "getTasks", error });
  }
};

const createTask = async (req: Request, res: Response) => {
  const { title, color, icon } = req.body;
  try {
    const user = await User.findOne({ where: { id: req.user?.id } });
    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }

    const existTask = await Task.findOne({
      where: { user: req.user?.id, title: title },
    });

    if (existTask) {
      throw res.status(400).json({ message: "Already Task" });
    }

    const task = new Task();

    task.title = title;
    task.color = color;
    task.icon = icon;

    task.user = user;

    await task.save();
    const { user: _, ...withoutUser } = task;
    res.status(200).json({ message: "Todo created successfully", withoutUser });
  } catch (error) {
    res.status(500).json({ message: "Error creating task", error });
  }
};

const updateTask = async (req: Request, res: Response) => {
  const { id, title, color, icon } = req.body;

  try {
    const user = await User.findOneBy({ id: req.user?.id });

    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }

    const task = await Task.findOneBy({ id, user });
    if (!task) {
      throw res
        .status(400)
        .json({ message: "Not found task or don't have permission" });
    }

    const updateFields: Partial<Task> = {};

    if ((req.body, title !== undefined)) updateFields.title = req.body.title;
    if ((req.body, color !== undefined)) updateFields.color = req.body.color;
    if ((req.body, icon !== undefined)) updateFields.icon = req.body.icon;

    const newTask = await Task.update({ id }, updateFields);
    console.log(newTask);

    res.status(200).json({ message: "Update task successfully" });
  } catch (error) {
    res.status(500).json({ message: "updateTask", error });
  }
};

const removeTask = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    const user = await User.findOneBy({ id: req.user?.id });

    if (!user) {
      throw res.status(400).json({ message: "Not found user" });
    }

    const task = await Task.findOneBy({ id, user });
    if (!task) {
      throw res
        .status(400)
        .json({ message: "Not found Task or don't have permission" });
    }
    await Task.delete({ id });

    res.status(200).json({ message: "deleted task" });
  } catch (error) {
    res.status(500).json({ message: "removeTask", error });
  }
};

export { createTask, removeTask, updateTask, getTasks };
