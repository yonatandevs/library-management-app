import { inject, injectable } from "inversify";
import BorrowingRepository from "../repositories/borrowing.repository";
import BookRepository from "../repositories/book.repository";
import { UserRepository } from "../repositories/user.repository";
import TYPES from "../configs/types";
import AppError from "../utils/AppError";
import { STATUS_CODES } from "../constants/status-codes";

@injectable()
class BorrowingService {
  constructor(
    @inject(TYPES.BorrowingRepository)
    private borrowingRepository: BorrowingRepository,
    @inject(TYPES.BookRepository) private bookRepository: BookRepository,
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}

  async borrowBook(userId: number, bookId: number): Promise<void> {
    const user = await this.userRepository.findById(userId);
    const book = await this.bookRepository.findById(bookId);

    if (!user || !book) {
      throw new AppError(STATUS_CODES.NOT_FOUND, "User or Book not found");
    }

    const existingBorrowing =
      await this.borrowingRepository.findActiveBorrowing(bookId);

    if (existingBorrowing) {
      throw new AppError(STATUS_CODES.CONFLICT, "Book is already borrowed.");
    }

    const borrowing: any = { user, book, borrowedAt: new Date() };

    await this.borrowingRepository.save(borrowing);
  }

  async returnBook(
    userId: number,
    bookId: number,
    score: number
  ): Promise<void> {
    const borrowing = await this.borrowingRepository.findActiveByUserAndBook(
      userId,
      bookId
    );

    if (!borrowing) {
      throw new AppError(STATUS_CODES.NOT_FOUND, "No active borrowing found.");
    }

    borrowing.returnedAt = new Date();
    borrowing.userScore = score;
    await this.borrowingRepository.save(borrowing);

    await this.updateAverageBookRating(bookId);
  }

  private async updateAverageBookRating(bookId: number): Promise<void> {
    const borrowings = await this.borrowingRepository.findByBookWithScores(
      bookId
    );

    if (borrowings.length === 0) {
      return;
    }

    const totalScore = borrowings.reduce(
      (sum, borrowing) => sum + (borrowing.userScore || 0),
      0
    );
    const averageRating = totalScore / borrowings.length;

    const book = await this.bookRepository.findById(bookId);

    if (book) {
      book.score = averageRating;
      await this.bookRepository.update(book);
    }
  }
}

export default BorrowingService;
