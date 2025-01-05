import { Sequelize } from "sequelize";
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USERNAME } from "../config/dotenv.js";

const sequelize = new Sequelize({
  database: DATABASE_NAME,
  dialect: "mysql",
  username: DATABASE_USERNAME,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
});

sequelize.authenticate()
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
  });

sequelize.sync({ force: true })
  .then(() => {
    console.log("Models are synced");
  });

export default sequelize;
