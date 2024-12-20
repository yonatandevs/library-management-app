import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.model";
import { Book } from "./book.model";

@Entity()
export class Borrowing {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.borrowings)
  user!: User;

  @ManyToOne(() => Book, (book) => book.borrowings)
  book!: Book;

  @CreateDateColumn()
  borrowedAt!: Date;

  @Column({ nullable: true })
  returnedAt?: Date;

  @Column({ nullable: true, type: "int" })
  userScore!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
