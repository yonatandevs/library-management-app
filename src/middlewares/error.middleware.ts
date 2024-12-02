// src/middleware/errorMiddleware.ts

import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import ResponseHandler from "../utils/response-handler"; // Import the ResponseHandler

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || "Internal Server Error";
  const errorDetails = error.errorData || null;

  // Check if the error is a custom AppError
  if (error instanceof AppError) {
    return ResponseHandler.sendResponse(res, statusCode, message, errorDetails);
  }

  // For unexpected errors, send a generic message using ResponseHandler
  return ResponseHandler.sendResponse(
    res,
    500,
    "Something went wrong. Internal server error.",
    null
  );
};

export { errorMiddleware };
