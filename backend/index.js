import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// local import
import connectDataBase from "./db/ConnectDatabase.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";

// code
// dotenv.config();
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectDataBase();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.listen(5000, () => {
  console.log("server is running 5000!!!");
});

// middleware

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    status: false,
    statusCode,
    message,
  });
});
