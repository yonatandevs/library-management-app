import { Request, Response, NextFunction } from "express";
import AppError from "../utils/AppError";
import ResponseHandler from "../utils/response-handler"; // Import the ResponseHandler
import { ERROR_MESSAGES } from "../constants/messages";
import { logger } from "../utils/logger";

const errorMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = error.statusCode || 500;
  const message = error.message || ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
  const errorDetails = error.errorData || null;

  // Check if the error is a custom AppError
  if (error instanceof AppError) {
    return ResponseHandler.sendResponse({
      res,
      statusCode,
      message,
      data: null,
      error: errorDetails,
    });
  }
  logger.error(error);
  // For unexpected errors, send a generic message using ResponseHandler
  return ResponseHandler.sendResponse({
    res,
    statusCode: 500,
    message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
    data: null,
    error: errorDetails,
  });
};

export { errorMiddleware };
