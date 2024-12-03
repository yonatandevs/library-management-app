import { Response } from "express";
import { SUCCESS_STATUS_CODES } from "../constants/status-codes";
import { STATUS_TEXT } from "../constants/status-text";
import { STATUS_CODES } from "../constants/status-codes";
import { ERROR_MESSAGES } from "../constants/messages";
import { logger } from "./logger";

interface ResponsePayload {
  res: Response;
  statusCode: number;
  message: string;
  data?: any;
  error?: any;
}

class ResponseHandler {
  static sendResponse({
    res,
    statusCode,
    message,
    data = null,
    error = null,
  }: ResponsePayload): Response {
    try {
      const isSuccess = SUCCESS_STATUS_CODES.has(statusCode);
      const status = isSuccess ? STATUS_TEXT.SUCCESS : STATUS_TEXT.ERROR;
      // NOTE: While including status, statusCode, message, and error improves readability,
      // the current requirement(postman response sample) specifies that only the `data`  should be returned.
      if (data === null && isSuccess) {
        return res.status(statusCode).send();
      }
      const response = isSuccess
        ? data
        : { status, statusCode, message, error };

      return res.status(statusCode).json(response);
    } catch (err: any) {
      logger.error("Error sending response:", err);
      return res.status(STATUS_CODES.INTERNAL_ERROR).json({
        status: STATUS_TEXT.ERROR,
        statusCode: STATUS_CODES.INTERNAL_ERROR,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        data: null,
        error: err.message,
      });
    }
  }

  static noContent({ res }: { res: Response }): Response {
    try {
      return res.status(STATUS_CODES.NO_CONTENT).json();
    } catch (err: any) {
      logger.error("Error sending no-content response:", err);
      return res.status(STATUS_CODES.INTERNAL_ERROR).json({
        status: STATUS_TEXT.ERROR,
        statusCode: STATUS_CODES.INTERNAL_ERROR,
        message: ERROR_MESSAGES.INTERNAL_SERVER_ERROR,
        data: null,
        error: err.message,
      });
    }
  }
}

export default ResponseHandler;
