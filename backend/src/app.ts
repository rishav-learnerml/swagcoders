import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth";
import profileRouter from "./routes/profile";
import requestRouter from "./routes/requests";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.DEV_PORT;

//routes
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/requests", requestRouter);

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
