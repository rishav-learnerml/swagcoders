import express from "express";
import authChecker from "../middlewares/authChecker";
import RequestWithCookieType from "../types/interfaces";

const requestRouter = express.Router();

requestRouter.get("/", authChecker, async (req: RequestWithCookieType, res) => {
  const user = req.user;

  console.log("sending a connection request...");

  res.send(user.firstName + "sent the Connexction request");
});

export default requestRouter;
