import "reflect-metadata";
import { Container } from "inversify";
import TYPES from "./types";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import BookRepository from "../repositories/book.repository";
import BorrowingRepository from "../repositories/borrowing.repository";
import BookService from "../services/book.service";
import BorrowingService from "../services/borrowing.service";
import BookController from "../controllers/book.controller";

const container = new Container();

// Bind Repository
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<BookRepository>(TYPES.BookRepository).to(BookRepository);
container
  .bind<BorrowingRepository>(TYPES.BorrowingRepository)
  .to(BorrowingRepository);

// Bind Service
container.bind<UserService>(TYPES.UserService).to(UserService);
container.bind<BookService>(TYPES.BookService).to(BookService);
container.bind<BorrowingService>(TYPES.BorrowingService).to(BorrowingService);

// Bind Controller
container.bind<UserController>(TYPES.UserController).to(UserController);
container.bind<BookController>(TYPES.BookController).to(BookController);

export default container;
