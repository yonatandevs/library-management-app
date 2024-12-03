import { injectable } from "inversify";
import { AppDataSource } from "../database";
import { Book } from "../models/book.model";
import cache from "../utils/cache";

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
    const cacheKey = `book:${id}`;

    // Check if the book is in the cache
    const cachedBook = cache.get(cacheKey);
    if (cachedBook) {
      return cachedBook;
    }

    // Cache miss: fetch from database

    const book = await this.repository
      .createQueryBuilder("book")
      .select([
        "book.id AS id",
        "book.name AS name",
        "COALESCE(CAST(book.score AS DECIMAL(10, 2)), -1) AS score",
      ])
      .where("book.id = :id", { id })
      .getRawOne();

    if (book) {
      cache.set(cacheKey, book);
    }

    return book;
  }

  // Invalidate the cache for a specific book
  async invalidateCache(id: number) {
    const cacheKey = `book:${id}`;
    cache.del(cacheKey);
  }

  async create(data: { name: string; author?: string }) {
    const book = this.repository.create(data);
    return this.repository.save(book);
  }

  async update(book: Book) {
    this.invalidateCache(book.id);
    return this.repository.save(book);
  }
}

export default BookRepository;
