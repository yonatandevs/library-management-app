// src/constants/messages.ts

export const SUCCESS_MESSAGES = {
  DATABASE_CONNECTED: "DB connected successfully.",
  OPERATION_COMPLETED: "Operation completed successfully.",
  USER_CREATED: "User created successfully.",
  BOOK_BORROWED: "Book borrowed successfully.",
};

export const ERROR_MESSAGES = {
  USER_NOT_FOUND: "User not found.",
  INVALID_CREDENTIALS: "Invalid credentials provided.",
  DATABASE_ERROR: "There was an error connecting to the database.",
};

export const FAILURE_MESSAGES = {
  BOOK_ALREADY_BORROWED: "The book has already been borrowed.",
  USER_ALREADY_EXISTS: "User with this email already exists.",
};
