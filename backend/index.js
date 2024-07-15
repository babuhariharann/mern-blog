import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// local import
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import ConnectDataBase from "./db/ConnectDataBase.js";


// dotenv.config();
dotenv.config();

// code
const corsOptions = {
  origin: 'http://localhost:3000', // Your frontend's URL
  credentials: true, // Allow credentials (cookies) to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser())

ConnectDataBase();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/post", authRouter);


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
