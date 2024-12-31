import { DataSource } from "typeorm";
import User from "./entities/user";
import { Todo } from "./entities/todo";
import { Task } from "./entities/task";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: "todos",
  synchronize: true,
  logging: false,
  entities: [User, Todo, Task], // 엔티티를 추가합니다.
  migrations: [],
  subscribers: [],
});

export default AppDataSource;
