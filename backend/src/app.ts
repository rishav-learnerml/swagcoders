import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.DEV_PORT;

app.use("/", (req, res) => {
  res.send("Hello");
});

app.listen(3000, () => {
  console.log(`server listening at port ${PORT}`);
});
