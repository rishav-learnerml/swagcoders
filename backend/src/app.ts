import express from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();

const PORT = process.env.DEV_PORT;

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(PORT, () => {
  console.log(`server listening at port ${PORT}`);
});
