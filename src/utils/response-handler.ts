// src/utils/ResponseHandler.ts

import { Response } from "express";
import { SUCCESS_STATUS_CODES } from "../constants/status-codes";
import { STATUS_TEXT } from "../constants/status-text";
import { STATUS_CODES } from "../constants/status-codes";

class ResponseHandler {
  static sendResponse(
    res: Response,
    statusCode: number,
    message: string,
    data?: any,
    error?: any
  ): Response {
    try {
      const status = SUCCESS_STATUS_CODES.has(statusCode)
        ? STATUS_TEXT.SUCCESS
        : STATUS_TEXT.ERROR;

      const response = {
        status,
        statusCode,
        message,
        data,
        error,
      };

      return res.status(statusCode).json(response);
    } catch (err: any) {
      console.error("Error sending response:", err);
      return res.status(STATUS_CODES.INTERNAL_ERROR).json({
        status: STATUS_TEXT.ERROR,
        statusCode: STATUS_CODES.INTERNAL_ERROR,
        message: "Internal Server Error",
        data: null,
        error: err.message,
      });
    }
  }

  // No content response (e.g., for delete or empty responses)
  static noContent(res: Response): Response {
    try {
      return res.status(STATUS_CODES.NO_CONTENT).json();
    } catch (err: any) {
      console.error("Error sending no-content response:", err);
      return res.status(STATUS_CODES.INTERNAL_ERROR).json({
        status: STATUS_TEXT.ERROR,
        statusCode: STATUS_CODES.INTERNAL_ERROR,
        message: "Internal Server Error",
        data: null,
        error: err.message,
      });
    }
  }
}

export default ResponseHandler;
