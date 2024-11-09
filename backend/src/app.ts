import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { connectToDb } from "./config/db";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import requestRouter from "./routes/requests";
import userRouter from "./routes/user";

dotenv.config();
const app = express();
// Define your allowed origins
const allowedOrigins = ["http://localhost:5173"];

app.use(
  cors({
    origin: function (origin:any, callback) {
      if (allowedOrigins.includes(origin) || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // Allow credentials
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"], // Add PATCH here
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.DEV_PORT;

//routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/requests", requestRouter);
app.use("/api/v1/user", userRouter);

//main function
const main = async () => {
  try {
    await connectToDb();

    app.listen(PORT, () => {
      console.log(`server listening at port ${PORT}`);
    });
  } catch (error) {
    console.log("Something went wrong!", error);
  }
};

main();
