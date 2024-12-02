import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Borrowing } from "./borrowing.model";
import { Rating } from "./rating.model";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  title!: string;

  @Column()
  author!: string;

  @Column("decimal", { precision: 3, scale: 2, default: 0 })
  averageRating!: number;

  @OneToMany(() => Borrowing, (borrowing: Borrowing) => borrowing.book)
  borrowings!: Borrowing[];

  @OneToMany(() => Rating, (rating: Rating) => rating.book)
  ratings!: Rating[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
