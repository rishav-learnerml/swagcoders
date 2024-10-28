import { Router } from "express";
import authChecker from "../middlewares/authChecker";
import RequestWithCookieType from "../types/interfaces";
import { ConnectionRequest } from "../models/connectionRequest";

const userRouter = Router();

userRouter.get(
  "/requests/received",
  authChecker,
  async (req: RequestWithCookieType, res) => {
    try {
      const loggedInUser = req.user;

      const connectionRequest = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      });

      res.json({
        message: "Data fetched succesfully",
        data: connectionRequest,
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong!", error });
    }
  }
);

export default userRouter;
