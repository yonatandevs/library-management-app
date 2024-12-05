jest.mock("../../../src/repositories/user.repository"); // Mock UserRepository

import { UserService } from "../../../src/services/user.service";
import { UserRepository } from "../../../src/repositories/user.repository";
import { User } from "../../../src/models/user.model";
import { Borrowing } from "../../../src/models/borrowing.model";

describe("UserService", () => {
  let userService: UserService;
  let userRepository: jest.Mocked<UserRepository>;

  beforeEach(() => {
    userRepository = new UserRepository() as jest.Mocked<UserRepository>;
    userService = new UserService(userRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should fetch all users", async () => {
    const mockUsers: any = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    userRepository.findAll.mockResolvedValue(mockUsers);

    const users = await userService.getAllUsers();

    expect(userRepository.findAll).toHaveBeenCalledTimes(1);
    expect(users).toEqual(mockUsers);
  });
  it("should fetch a user by ID with past and present books", async () => {
    const mockUser = {
      id: 1,
      name: "Alice",
      borrowings: [
        {
          returnedAt: new Date(),
          userScore: 5,
          book: { name: "Book 1" },
        },
        {
          returnedAt: null,
          book: { name: "Book 2" },
        },
      ],
    };

    userRepository.findById.mockResolvedValue(mockUser as User);

    const user = await userService.getUserById(1);

    expect(userRepository.findById).toHaveBeenCalledWith(1);
    expect(user).toEqual({
      id: 1,
      name: "Alice",
      books: {
        past: [{ name: "Book 1", userScore: 5 }],
        present: [{ name: "Book 2" }],
      },
    });
  });

  it("should return null if user is not found", async () => {
    userRepository.findById.mockResolvedValue(null);

    const user = await userService.getUserById(99);

    expect(userRepository.findById).toHaveBeenCalledWith(99);
    expect(user).toBeNull();
  });
});
