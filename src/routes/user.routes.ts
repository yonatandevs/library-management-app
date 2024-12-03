import { Router } from "express";
import BookController from "../controllers/book.controller";
import container from "../configs/inversify.config";
import TYPES from "../configs/types";
import { UserController } from "../controllers/user.controller";
import ValidatorMiddleware from "../middlewares/validate.middleware";
import { VALIDATION_TYPE } from "../constants/validation-type";
import {
  createUserBodySchema,
  getUserParamsSchema,
} from "../validations/user.validation";
import {
  borrowBookSchema,
  returnBookBodySchema,
  returnBookParamsSchema,
} from "../validations/book.validation";

const userController = container.get<UserController>(TYPES.UserController);
const bookController = container.get<BookController>(TYPES.BookController);
const router = Router();

// Swagger Docs for the route
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     description: Fetch all users from the database
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 */
router.get("/", userController.listUsers.bind(userController));

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Fetch user details by ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to fetch
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       404:
 *         description: User not found
 */
router.get(
  "/:id",
  ValidatorMiddleware([
    {
      property: VALIDATION_TYPE.PARAMS,
      schema: getUserParamsSchema,
    },
  ]),
  userController.getUser.bind(userController)
);

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user by providing name and email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *             required:
 *               - name
 *               - email
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *       400:
 *         description: Bad request, missing fields
 */
router.post(
  "/",
  ValidatorMiddleware([
    {
      property: VALIDATION_TYPE.BODY,
      schema: createUserBodySchema,
    },
  ]),
  userController.createUser.bind(userController)
);

// Book-related actions for users

/**
 * @swagger
 * /users/{userId}/borrow/{bookId}:
 *   post:
 *     summary: Borrow a book
 *     description: Allows a user to borrow a book by providing user ID and book ID
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: ID of the book to borrow
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Book borrowed successfully
 *       400:
 *         description: Invalid parameters
 */
router.post(
  "/:userId/borrow/:bookId",
  ValidatorMiddleware([
    {
      property: VALIDATION_TYPE.PARAMS,
      schema: borrowBookSchema,
    },
  ]),
  bookController.borrowBook.bind(bookController)
);

/**
 * @swagger
 * /users/{userId}/return/{bookId}:
 *   post:
 *     summary: Return a borrowed book
 *     description: Allows a user to return a borrowed book and provide a score
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID of the user
 *         schema:
 *           type: integer
 *       - name: bookId
 *         in: path
 *         required: true
 *         description: ID of the book to return
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *                 description: User's score for the book (0-5)
 *                 example: 4
 *     responses:
 *       204:
 *         description: Book returned successfully
 *       400:
 *         description: Invalid request parameters or body
 *       404:
 *         description: Book or user not found
 */
router.post(
  "/:userId/return/:bookId",
  ValidatorMiddleware([
    {
      property: VALIDATION_TYPE.PARAMS,
      schema: returnBookParamsSchema,
    },
    {
      property: VALIDATION_TYPE.BODY,
      schema: returnBookBodySchema,
    },
  ]),
  bookController.returnBook.bind(bookController)
);

export default router;
