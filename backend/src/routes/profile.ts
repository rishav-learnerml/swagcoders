import express from "express";
import authChecker from "../middlewares/authChecker";
import RequestWithCookieType from "../types/interfaces";

const profileRouter = express.Router();

profileRouter.get("/", authChecker, async (req: RequestWithCookieType, res) => {
  try {
    const user = req.user;
    res.json({ user });
  } catch (error) {
    res.status(400).json({ message: "Invalid Session!" });
  }
});

export default profileRouter;
