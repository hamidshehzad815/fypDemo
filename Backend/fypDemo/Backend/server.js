import express from "express";
import { configDotenv } from "dotenv";
import cors from "cors"; // ✅ import cors
import routes from "./handler/routes.js";
import connectDatabase from "./config/db.config.js";

// Load .env first
configDotenv();
connectDatabase();

const app = express();

// ✅ Middlewares
app.use(cors()); // allow frontend (Flutter web/mobile) to call backend
app.use(express.json()); // parse JSON body

// Routes
routes(app);

const PORT = process.env.SERVER_PORT || 3400;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🖥️ Server is running on http://0.0.0.0:${PORT}`);
});
