import { Router } from "express";
import BookController from "../controllers/book.controller";

import TYPES from "../configs/types";
import container from "../configs/inversify.config";
import ValidatorMiddleware from "../middlewares/validate.middleware";
import {
  createBookSchema,
  getBookParamsSchema,
} from "../validations/book.validation";
import { VALIDATION_TYPE } from "../constants/validation-type";
const bookController = container.get<BookController>(TYPES.BookController);
const router = Router();
router.get(
  "/",
  ValidatorMiddleware([
    {
      property: VALIDATION_TYPE.PARAMS,
      schema: getBookParamsSchema,
    },
  ]),
  bookController.listBooks.bind(bookController)
);
router.get("/:id", bookController.getBook.bind(bookController));
router.post(
  "/",
  ValidatorMiddleware([
    {
      property: VALIDATION_TYPE.BODY,
      schema: createBookSchema,
    },
  ]),
  bookController.createBook.bind(bookController)
);

export default router;
