import { inject, injectable } from "inversify";
import BookRepository from "../repositories/book.repository";
import TYPES from "../configs/types";

@injectable()
class BookService {
  constructor(
    @inject(TYPES.BookRepository) private bookRepository: BookRepository
  ) {}

  async getAllBooks() {
    return this.bookRepository.findAll();
  }

  async getBookById(id: number) {
    const book = await this.bookRepository.findById(id);
    if (book) {
      book.score = Number(book.score);
    }
    return book;
  }

  async createBook(data: { name: string; author?: string }) {
    this.bookRepository.create(data);
    return;
  }
}

export default BookService;
