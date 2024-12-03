import { inject, injectable } from "inversify";
import TYPES from "../configs/types";
import { UserRepository } from "../repositories/user.repository";
import { User } from "../models/user.model";
import { Borrowing } from "../models/borrowing.model";
import AppError from "../utils/AppError";
import { STATUS_CODES } from "../constants/status-codes";
import { ERROR_MESSAGES, FAILURE_MESSAGES } from "../constants/messages";

@injectable()
export class UserService {
  constructor(
    @inject(TYPES.UserRepository) private userRepository: UserRepository
  ) {}

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserById(id: number) {
    const user: any = await this.userRepository.findById(id);
    console.log(user);

    if (!user) {
      throw new AppError(STATUS_CODES.NOT_FOUND, ERROR_MESSAGES.USER_NOT_FOUND);
    }

    const books = {
      past: user.borrowings
        .filter((borrowing: Borrowing) => borrowing.returnedAt)
        .map((borrowing: any) => ({
          name: borrowing.book.name,
          userScore: borrowing.userScore || null,
        })),
      present: user.borrowings
        .filter((borrowing: Borrowing) => !borrowing.returnedAt)
        .map((borrowing: any) => ({
          name: borrowing.book.name,
        })),
    };

    return {
      id: user.id,
      name: user.name,
      books,
    };
  }

  async createUser(data: { name: string; email: string }) {
    this.userRepository.create(data);
    return;
  }
}
