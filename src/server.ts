import app from "./app";
import { APP_CONFIG } from "./configs/app.config";
import { AppDataSource } from "./database";
import { logger } from "./utils/logger"; // Importing Winston logger

const PORT = APP_CONFIG.port || 3000;

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    logger.info("Database connected successfully!");

    // Start the server and store the reference to the server instance
    const server = app.listen(PORT, () => {
      logger.info(`Server running on ${APP_CONFIG.server}:${PORT}`);
    });

    // Handle graceful shutdown
    const shutdown = () => {
      logger.info("Closing server...");
      server.close(() => {
        logger.info("Server closed gracefully.");
        AppDataSource.destroy()
          .then(() => {
            logger.info("Database connection closed.");
            process.exit(0); // Exit the process gracefully
          })
          .catch((err: Error) => {
            logger.error("Error while closing the database connection", err);
            process.exit(1); // Exit with an error code
          });
      });
    };

    // Unhandled promise rejection handler
    process.on("unhandledRejection", (reason, promise) => {
      logger.error("Unhandled Rejection at:", promise, "reason:", reason);
      shutdown(); // Gracefully shut down the application
    });

    // Uncaught exception handler
    process.on("uncaughtException", (error) => {
      logger.error("Uncaught Exception:", error);
      shutdown(); // Gracefully shut down the application
    });

    // Handle termination signals (Ctrl+C or kill command)
    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  })
  .catch((err: Error) => {
    logger.error("Error connecting to the database", err);
    process.exit(1); // Exit the process if the database connection fails
  });
