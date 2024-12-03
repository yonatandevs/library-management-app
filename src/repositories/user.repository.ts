import { injectable } from "inversify";
import { AppDataSource } from "../database";
import { User } from "../models/user.model";

@injectable()
export class UserRepository {
  private userRepository = AppDataSource.getRepository(User);

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ select: ["id", "name"] });
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: ["borrowings", "borrowings.book"],
    });
  }

  async create(userData: { name: string; email: string }): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }
}
