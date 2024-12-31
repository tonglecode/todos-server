import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BeforeInsert,
  BaseEntity,
  OneToMany,
} from "typeorm";
import bcrypt from "bcryptjs";
import { Todo } from "./todo";
import { Task } from "./task";

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  PASSWORD: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column({ nullable: true })
  photoBase64: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  studentNum: string;

  @Column({ type: "enum", enum: Gender, nullable: true })
  gender: Gender;

  @BeforeInsert()
  async hashPASSWORD() {
    const salt = await bcrypt.genSalt(10);
    this.PASSWORD = await bcrypt.hash(this.PASSWORD, salt);
  }

  async comparePASSWORD(enteredPASSWORD: string): Promise<boolean> {
    return await bcrypt.compare(enteredPASSWORD, this.PASSWORD);
  }
}

export default User;
