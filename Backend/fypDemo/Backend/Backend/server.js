import express from "express";
import { configDotenv } from "dotenv";
import routes from "./handler/routes.js";
import connectDatabase from "./config/db.config.js";

connectDatabase();
configDotenv();
const app = express();
routes(app);

app.listen(process.env.SERVER_PORT, () => {
  console.log(`🖥️ Server is running on port ${process.env.SERVER_PORT}`);
});
