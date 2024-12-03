import { injectable } from "inversify";
import { AppDataSource } from "../database";
import { Borrowing } from "../models/borrowing.model";
import { IsNull, Not } from "typeorm";

@injectable()
class BorrowingRepository {
  private repository = AppDataSource.getRepository(Borrowing);

  async findActiveBorrowing(bookId: number) {
    return this.repository.findOne({
      where: {
        book: { id: bookId },
        returnedAt: IsNull(),
      },
      relations: ["book", "user"],
    });
  }

  async save(borrowing: Borrowing) {
    return this.repository.save(borrowing);
  }

  async findActiveByUserAndBook(userId: number, bookId: number) {
    return this.repository.findOne({
      where: {
        user: { id: userId },
        book: { id: bookId },
        returnedAt: IsNull(),
      },
    });
  }
  async findByBookWithScores(bookId: number): Promise<Borrowing[]> {
    return this.repository.find({
      where: { book: { id: bookId }, userScore: Not(IsNull()) },
      relations: ["book"],
    });
  }
}

export default BorrowingRepository;
