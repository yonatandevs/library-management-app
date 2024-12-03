// src/constants/messages.ts

export const SUCCESS_MESSAGES = {
  DATABASE_CONNECTED: "DB connected successfully.",
  OPERATION_COMPLETED: "Operation completed successfully.",
  USER_CREATED: "User created successfully.",
  BOOK_BORROWED: "Book borrowed successfully.",
  BOOK_CREATED: "Book created successfully",
  BOOK_FETCHED: "Book fetched successfully,",
  BOOKS_FETCHED: "Books fetched successfully",
  USERS_FETCHED: "Users retrieved successfully",
  USER_FETCHED: "User retrieved successfully",
};

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: "User not found.",
  INVALID_CREDENTIALS: "Invalid credentials provided.",
  DATABASE_ERROR: "There was an error connecting to the database.",
  INTERNAL_SERVER_ERROR: "Something went wrong.Internal server error.",
};

export const FAILURE_MESSAGES = {
  BOOK_ALREADY_BORROWED: "The book has already been borrowed.",
  USER_ALREADY_EXISTS: "User with this email already exists.",
};
