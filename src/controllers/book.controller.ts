import { inject, injectable } from "inversify";
import { RequestHandler } from "express";
import BookService from "../services/book.service";
import BorrowingService from "../services/borrowing.service";
import TYPES from "../configs/types";
import ResponseHandler from "../utils/response-handler";
import AppError from "../utils/AppError";
import { STATUS_CODES } from "../constants/status-codes";
import { SUCCESS_MESSAGES } from "../constants/messages";

@injectable()
class BookController {
  constructor(
    @inject(TYPES.BookService) private bookService: BookService,
    @inject(TYPES.BorrowingService) private borrowingService: BorrowingService
  ) {}

  listBooks: RequestHandler = async (req, res, next) => {
    try {
      const books = await this.bookService.getAllBooks();
      ResponseHandler.sendResponse({
        res,
        statusCode: 200,
        message: SUCCESS_MESSAGES.BOOKS_FETCHED,
        data: books,
      });
    } catch (error) {
      next(error);
    }
  };

  getBook: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await this.bookService.getBookById(Number(id));
      if (book == null) {
        throw new AppError(
          STATUS_CODES.NOT_FOUND,
          `Book with id ${id} not found.`
        );
      }
      ResponseHandler.sendResponse({
        res,
        statusCode: 200,
        message: SUCCESS_MESSAGES.BOOK_FETCHED,
        data: book,
      });
    } catch (error) {
      next(error);
    }
  };

  createBook: RequestHandler = async (req, res, next) => {
    try {
      const { name, author } = req.body;
      const book = await this.bookService.createBook({ name, author });
      ResponseHandler.sendResponse({
        res,
        statusCode: 201,
        message: SUCCESS_MESSAGES.BOOK_CREATED,
        data: book,
      });
    } catch (error) {
      next(error);
    }
  };

  borrowBook: RequestHandler = async (req, res, next) => {
    try {
      const { userId, bookId } = req.params;
      await this.borrowingService.borrowBook(Number(userId), Number(bookId));
      ResponseHandler.noContent({ res });
    } catch (error) {
      next(error);
    }
  };

  returnBook: RequestHandler = async (req, res, next) => {
    try {
      const { userId, bookId } = req.params;
      const { score } = req.body;
      await this.borrowingService.returnBook(
        Number(userId),
        Number(bookId),
        Number(score)
      );
      ResponseHandler.noContent({ res });
    } catch (error) {
      next(error);
    }
  };
}

export default BookController;
