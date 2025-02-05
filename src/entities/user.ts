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
import { convertImageUrlToBase64 } from "../utilities/convertImageUrlToBase64";

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
  password: string;

  @OneToMany(() => Todo, (todo) => todo.user)
  todos: Todo[];

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[];

  @Column({ nullable: true })
  photoBase64: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  studentNum: string;

  @Column({ type: "enum", enum: Gender, nullable: true })
  gender: Gender;

  @BeforeInsert()
  async beforeInsert(): Promise<void> {
    // 비밀번호 해시화
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    // 이미지 변환
    if (this.picture) {
      const base64Image = await convertImageUrlToBase64(this.picture);
      if (base64Image !== null) {
        this.photoBase64 = base64Image;
      }
    }
  }

  async comparePASSWORD(enteredPASSWORD: string): Promise<boolean> {
    return await bcrypt.compare(enteredPASSWORD, this.password);
  }
}

export default User;
