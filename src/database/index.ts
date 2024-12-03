import { DataSource } from "typeorm";

import { ERROR_MESSAGES, SUCCESS_MESSAGES } from "../constants/messages";
import { DB_CONFIG } from "../configs/db.config";

const AppDataSource = new DataSource({
  type: "mysql",
  host: DB_CONFIG.host,
  port: DB_CONFIG.port,
  username: DB_CONFIG.username,
  password: DB_CONFIG.password,
  database: DB_CONFIG.database,
  synchronize: true,
  logging: false,
  entities:
    process.env.NODE_ENV === "production"
      ? ["dist/models/*.js"]
      : ["src/models/*.ts"],
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migrations/*.js"]
      : ["src/migrations/*.ts"],
});

AppDataSource.initialize()
  .then(() => {
    console.log(SUCCESS_MESSAGES.DATABASE_CONNECTED);
  })
  .catch((err) => console.error(ERROR_MESSAGES.DATABASE_ERROR, err));

export { AppDataSource };
