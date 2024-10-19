import express from "express";
import authChecker from "../middlewares/authChecker";
import RequestWithCookieType from "../types/interfaces";
import { userUpdateSchema } from "../../../shared/validations";

const profileRouter = express.Router();

profileRouter.get(
  "/view",
  authChecker,
  async (req: RequestWithCookieType, res) => {
    try {
      const user = req.user;
      res.json({ user });
    } catch (error) {
      res.status(400).json({ message: "Invalid Session!", error });
    }
  }
);

profileRouter.patch(
  "/edit",
  authChecker,
  async (req: RequestWithCookieType, res) => {
    try {
      const updateData = req.body;
      const { success, error } = userUpdateSchema.safeParse(updateData);
      if (!success) {
        res.status(400).json({ message: "Invalid Inputs!", error });
        return;
      }
      const loggedInUser = req.user;

      Object.keys(updateData).forEach(
        (key) => (loggedInUser[key] = updateData[key])
      );

      await loggedInUser.save();

      res.json({
        message: `${req.user.firstName} Your Profile is updated Succesfully!`,
        loggedInUser,
      });
    } catch (error) {
      res.status(400).json({ message: "Error editing user details!", error });
    }
  }
);

export default profileRouter;
