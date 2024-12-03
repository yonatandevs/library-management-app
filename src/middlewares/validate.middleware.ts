import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";
import AppError from "../utils/AppError";
import { STATUS_CODES } from "../constants/status-codes";

interface ValidationTarget {
  property: String;
  schema: ObjectSchema;
}

const ValidatorMiddleware = (validations: ValidationTarget[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      for (const { property, schema } of validations) {
        const { error } = schema.validate(req[property as keyof Request], {
          abortEarly: false,
        });
        if (error) {
          const errors = error.details.map((detail) => detail.message);
          throw new AppError(
            STATUS_CODES.BAD_REQUEST,
            `Validation failed for ${property}: ${errors.join(", ")}`
          );
        }
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default ValidatorMiddleware;
