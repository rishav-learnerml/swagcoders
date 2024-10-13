import express from "express";
import dotenv from "dotenv";
import { connectToDb } from "./config/db";

dotenv.config();
const app = express();

const PORT = process.env.DEV_PORT;

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
