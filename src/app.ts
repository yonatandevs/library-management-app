import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "reflect-metadata";
import cors from "cors";

import { errorMiddleware } from "./middlewares/error.middleware";
import UserRoutes from "./routes/user.routes";
import BookRoutes from "./routes/book.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./configs/swagger.config";
import { STATUS_CODES } from "./constants/status-codes";
import { ERROR_MESSAGES } from "./constants/messages";
import helmet from "helmet";
import compression from "compression";
dotenv.config({
  path: "./config.env",
});

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());

//we will add auth , rate limit , security and other  middleware here
// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", message: "API is running!" });
});

// API routes
//We can add API version here for scalability but we have to go  with the requirement
app.use("/users", UserRoutes);
app.use("/books", BookRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler for unmatched routes
app.use((req: Request, res: Response) => {
  res
    .status(STATUS_CODES.NOT_FOUND)
    .json({ error: ERROR_MESSAGES.USER_NOT_FOUND });
});

// Centralized error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

export default app;
