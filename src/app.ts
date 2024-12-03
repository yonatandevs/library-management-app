import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "reflect-metadata";
import cors from "cors";
//import routes from "./routes/index"; // Centralized route imports
import { errorMiddleware } from "./middlewares/error.middleware";
import UserRoutes from "./routes/user.routes";
import BookRoutes from "./routes/book.routes";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./configs/swagger.config";
// Load environment variables
dotenv.config({
  path: "./config.env",
});

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", message: "API is running!" });
});

// API routes
//We can add API version here for scalability
app.use("/users", UserRoutes);
app.use("/books", BookRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Centralized error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

export default app;
