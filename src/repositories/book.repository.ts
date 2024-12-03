import { injectable } from "inversify";
import { AppDataSource } from "../database";
import { Book } from "../models/book.model";

@injectable()
class BookRepository {
  private repository = AppDataSource.getRepository(Book);

  async findAll() {
    return this.repository
      .createQueryBuilder("book")
      .select(["book.id", "book.name"])
      .orderBy("book.id", "DESC")
      .getMany();
  }

  async findById(id: number) {
    return this.repository
      .createQueryBuilder("book")
      .select([
        "book.id AS id",
        "book.name AS name",
        "COALESCE(CAST(book.score AS DECIMAL), -1) AS score",
      ])
      .where("book.id = :id", { id })
      .getRawOne();
  }

  async create(data: { name: string; author?: string }) {
    const book = this.repository.create(data);
    return this.repository.save(book);
  }

  async update(book: Book) {
    return this.repository.save(book);
  }
}

export default BookRepository;
