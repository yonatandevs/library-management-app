import app from "./app";
import { APP_CONFIG } from "./configs/app.config";

import { AppDataSource } from "./database";
// Import your AppDataSource initialization

const PORT = APP_CONFIG.port || 3000;

// Initialize the database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Database connected successfully!");
    // Start the server and store the reference to the server instance
    const server = app.listen(PORT, () => {
      console.log(`Server running on ${APP_CONFIG.server}:${PORT}`);
    });

    // Handle graceful shutdown
    const shutdown = () => {
      console.log("Closing server...");
      server.close(() => {
        console.log("Server closed gracefully.");
        AppDataSource.destroy()
          .then(() => {
            console.log("Database connection closed.");
            process.exit(0); // Exit the process
          })
          .catch((err: Error) => {
            console.error("Error while closing the database connection", err);
            process.exit(1);
          });
      });
    };

    process.on("SIGINT", shutdown); // Handle Ctrl+C
    process.on("SIGTERM", shutdown); // Handle termination signal
  })
  .catch((err: Error) => {
    console.error("Error connecting to the database", err);
    process.exit(1); // Exit the process if the database connection fails
  });
