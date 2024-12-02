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
  synchronize: false,
  logging: false,
  entities: ["dist/models/*.js"], // compiled models
  migrations:
    process.env.NODE_ENV === "production"
      ? ["dist/migrations/*.js"]
      : ["src/migrations/*.ts"], // conditional migration paths
});

AppDataSource.initialize()
  .then(() => {
    console.log(SUCCESS_MESSAGES.DATABASE_CONNECTED);
  })
  .catch((err) => console.error(ERROR_MESSAGES.DATABASE_ERROR, err));

export { AppDataSource };
