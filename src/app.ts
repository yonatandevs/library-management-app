import express, { Application, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import "reflect-metadata";
import cors from "cors";
//import routes from "./routes/index"; // Centralized route imports
import { errorMiddleware } from "./middlewares/error.middleware";

// Load environment variables
dotenv.config({
  path: "./config.env",
});

const app: Application = express();

// Middleware setup
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cors()); // Enable CORS
app.use(morgan("dev")); // Logging requests
//Custom Middlewares
// Health check endpoint
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP", message: "API is running!" });
});

// API routes
// app.use("/api", routes);

// 404 handler for unmatched routes
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Route not found" });
});

// Centralized error handling
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  errorMiddleware(err, req, res, next);
});

export default app;
