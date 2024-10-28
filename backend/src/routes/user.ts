import { Router } from "express";
import authChecker from "../middlewares/authChecker";
import RequestWithCookieType from "../types/interfaces";
import { ConnectionRequest } from "../models/connectionRequest";

const userRouter = Router();

const USER_SAFE_DATA = [
  "firstName",
  "lastName",
  "photoUrl",
  "age",
  "gender",
  "about",
];

userRouter.get(
  "/requests/received",
  authChecker,
  async (req: RequestWithCookieType, res) => {
    try {
      const loggedInUser = req.user;

      const connectionRequest = await ConnectionRequest.find({
        toUserId: loggedInUser._id,
        status: "interested",
      }).populate("fromUserId", USER_SAFE_DATA);

      res.json({
        message: "Data fetched succesfully",
        data: connectionRequest,
      });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong!", error });
    }
  }
);

userRouter.get(
  "/connections",
  authChecker,
  async (req: RequestWithCookieType, res) => {
    try {
      const loggedInUser = req.user;

      const connectionRequests = await ConnectionRequest.find({
        $or: [
          { toUserId: loggedInUser._id, status: "accepted" },
          { fromUserId: loggedInUser._id, status: "accepted" },
        ],
      })
        .populate("fromUserId", USER_SAFE_DATA)
        .populate("toUserId", USER_SAFE_DATA);

      const data = connectionRequests.map((row) => {
        if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
          return row.toUserId;
        }
        return row.fromUserId;
      });

      res.json({ message: "Success", data });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong!", error });
    }
  }
);

export default userRouter;
