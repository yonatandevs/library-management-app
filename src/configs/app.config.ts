import dotenv from "dotenv";
// Load environment variables
dotenv.config({
  path: "./config.env",
});
export const APP_CONFIG = {
  endpoint: process.env.API_ENDPOINT || "",
  apiKey: process.env.API_KEY || "",
  port: process.env.PORT,
  server: process.env.SERVER,
};
