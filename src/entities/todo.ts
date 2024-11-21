import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user";
import { Task } from "./task";

@Entity()
export class Todo extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.todos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Task, (task) => task.todos, { onDelete: "CASCADE" })
  @JoinColumn({ name: "taskId" })
  task: Task;

  @Column()
  title: string;

  @Column({ nullable: true })
  subTitle: string;

  @Column({ default: false })
  isDone: boolean;
}
