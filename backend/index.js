import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.routes.js";
import taskRoute from "./routes/task.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // Allow credentials like cookies
  })
);

app.use(express.json());

app.use(cookieParser()); // Parses the Cookie header in incoming HTTP requests.

app.use(express.urlencoded({ extended: true })); // Parses URL-encoded form data and makes it available in req.body.

app.use("/auth", authRoute);

app.use("/api", taskRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server is running at port ${PORT}`);
});
