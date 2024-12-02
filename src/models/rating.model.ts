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
export class Rating {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user: User) => user.ratings)
  user!: User;

  @ManyToOne(() => Book, (book: Book) => book.ratings)
  book!: Book;

  @Column("decimal", { precision: 3, scale: 2 })
  ratingValue!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
