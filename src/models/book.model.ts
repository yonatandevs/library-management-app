import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from "typeorm";
import { Borrowing } from "./borrowing.model";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  author?: string;

  @Column("decimal", { precision: 3, scale: 2, nullable: true, default: null })
  score?: number;

  @OneToMany(() => Borrowing, (borrowing: Borrowing) => borrowing.book)
  borrowings?: Borrowing[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
