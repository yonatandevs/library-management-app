import Joi from "joi";

export const createBookSchema = Joi.object({
  name: Joi.string().required().min(3).messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
  }),
});

export const getBookParamsSchema = Joi.object({
  id: Joi.number().integer().min(1).required().messages({
    "number.base": "ID must be a number",
    "number.integer": "ID must be an integer",
    "number.min": "ID must be at least 1",
    "any.required": "ID is required",
  }),
});

export const borrowBookSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    "number.base": "User ID must be a number",
    "number.empty": "User ID is required",
  }),
  bookId: Joi.number().integer().required().messages({
    "number.base": "Book ID must be a number",
    "number.empty": "Book ID is required",
  }),
});

export const returnBookBodySchema = Joi.object({
  score: Joi.number().min(0).max(10).required().messages({
    "number.base": "Score must be a valid number.",
    "number.min": "Score cannot be less than 0.",
    "number.max": "Score cannot be greater than 5.",
    "any.required": "Score is required and cannot be empty.",
  }),
});

export const returnBookParamsSchema = Joi.object({
  userId: Joi.number().integer().min(1).required().messages({
    "number.base": "User ID must be a valid number.",
    "number.integer": "User ID must be an integer.",
    "number.min": "User ID must be at least 1.",
    "any.required": "User ID is required and cannot be empty.",
  }),
  bookId: Joi.number().integer().min(1).required().messages({
    "number.base": "Book ID must be a valid number.",
    "number.integer": "Book ID must be an integer.",
    "number.min": "Book ID must be at least 1.",
    "any.required": "Book ID is required and cannot be empty.",
  }),
});
