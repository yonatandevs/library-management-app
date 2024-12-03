class AppError extends Error {
  statusCode: number;
  errorData?: any;

  constructor(statusCode: number, message: string, errorData?: any) {
    super(message);
    this.statusCode = statusCode;
    this.errorData = errorData;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
