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

  @Column()
  borrowedAt!: Date;

  @Column({ nullable: true })
  returnedAt!: Date;

  @Column({ nullable: true })
  dueDate!: Date;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
