import Joi from "joi";
export const getUserParamsSchema = Joi.object({
  id: Joi.number().integer().min(1).required().messages({
    "number.base": "ID must be a number",
    "number.integer": "ID must be an integer",
    "number.min": "ID must be at least 1",
    "any.required": "ID is required",
  }),
});

export const createUserBodySchema = Joi.object({
  name: Joi.string().min(3).max(50).required().messages({
    "string.base": "Name must be a string",
    "string.min": "Name must have at least 3 characters",
    "string.max": "Name cannot exceed 50 characters",
    "any.required": "Name is required",
  }),
});
