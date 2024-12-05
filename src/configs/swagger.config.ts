import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
import { APP_CONFIG } from "./app.config";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Library API",
    version: "1.0.0",
    description: "API Documentation for the Library Management System",
  },
  servers: [
    {
      url: APP_CONFIG.server,
      description: "Local server",
    },
  ],
};

// Options for swagger-jsdoc
const options = {
  definition: swaggerDefinition,
  // Path to the API specs
  apis: ["./src/routes/**/*.ts", "./src/models/**/*.ts"],
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
