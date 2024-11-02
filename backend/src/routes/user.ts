import { Router } from "express";
import authChecker from "../middlewares/authChecker";
import RequestWithCookieType from "../types/interfaces";
import { ConnectionRequest } from "../models/connectionRequest";
import { User } from "../models/user";

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

userRouter.get(
  "/feed",
  authChecker,
  async (req: RequestWithCookieType, res) => {
    try {
      const loggedInUser = req.user;
      const page = parseInt(req.query.page as string) || 1;
      let limit = parseInt(req.query.limit as string) || 10;
      limit = limit > 50 ? 50 : limit;
      const skip = (page - 1) * limit;

      const connections = await ConnectionRequest.find({
        $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
      }).select("fromUserId toUserId");

      const hideFromFeed = new Set();

      connections.forEach((req) => {
        hideFromFeed.add(req.fromUserId.toString());
        hideFromFeed.add(req.toUserId.toString());
      });

      const users = await User.find({
        $and: [
          { _id: { $nin: Array.from(hideFromFeed) } },
          { _id: { $ne: loggedInUser._id } },
        ],
      })
        .select(USER_SAFE_DATA)
        .skip(skip)
        .limit(limit);

      res.json({ message: "Success", users });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong!", error });
    }
  }
);

export default userRouter;
