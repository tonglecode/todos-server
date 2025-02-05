import { DataSource } from "typeorm";
import User from "./entities/user";
import { Todo } from "./entities/todo";
import { Task } from "./entities/task";

const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: false,
  entities: [User, Todo, Task], // 엔티티를 추가합니다.
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
