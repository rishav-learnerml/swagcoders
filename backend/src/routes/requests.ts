import express from "express";
import authChecker from "../middlewares/authChecker";
import RequestWithCookieType from "../types/interfaces";
import { ConnectionRequest } from "../models/connectionRequest";
import { User } from "../models/user";
import { connectionRequestSchema } from "../../../shared/validations";

const requestRouter = express.Router();

requestRouter.get(
  "/send/:status/:toUserId",
  authChecker,
  async (req: RequestWithCookieType, res) => {
    try {
      const user = req.user;
      const fromUserId = user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      const connectionData = {
        fromUserId,
        toUserId,
        status,
      };

      const { success, error } =
        connectionRequestSchema.safeParse(connectionData);

      if (!success) {
        res.status(400).json({ message: "Invalid Inputs", error });
        return;
      }

      //check if the person who has sent the connection request exist in the db

      const toUser = await User.findById(toUserId);

      if (!toUser) {
        res.status(400).json({ message: "User doesn't exists", error });
        return;
      }

      //check if it's an existing connection request or if it is a pending connection request

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId }, //already sent one same request --> duplicate request
          { fromUserId: toUserId, toUserId: fromUserId }, //has got the same request --> you are trying to send cr to same person
        ], //if any one fails returns no user --> or
      });

      if (existingConnectionRequest) {
        res.status(400).json({ message: "request is pending!" });
        return;
      }

      const connectionRequest = new ConnectionRequest(connectionData);

      console.log("sending a connection request...");
      const data = await connectionRequest.save();
      console.log("Connection request sent succesfully!");

      res.json({
        message:
          user.firstName +
          " - " +
          status +
          " connecting with " +
          toUser.firstName,
        data,
      });
    } catch (error) {
      res.status(400).json({
        message: "Error sending connection request! Please try again!",
        error,
      });
    }
  }
);

requestRouter.post(
  "/request/review/:status/:requestId",
  authChecker,
  async (req: RequestWithCookieType, res) => {
    const { status, requestId } = req.params;
    try {
      const loggedInUser = req.user;
      //status should be interested
      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status)) {
        res.status(400).json({ message: "Status is not allowed!" });
        return;
      }

      //request id has to be valid
      //is logged in user the same who was the connection request sent to --> toUserID
      const connectionRequest = await ConnectionRequest.findOne({
        _id:requestId,
        toUserId:loggedInUser._id
      })
    } catch (error) {
      res.status(400).json({ message: "ERROR: " + error });
    }
  }
);

export default requestRouter;
