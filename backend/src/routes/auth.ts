import express from "express";
import { userLoginSchema, userSchema } from "../../../shared/validations";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET as string;
const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  const userData = req.body;
  const { success, error } = userSchema.safeParse(userData);

  if (!success) {
    res.status(403).json({ message: "Invalid Inputs!", error });
    return;
  }

  try {
    const { password } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;

    const user = new User(userData);
    await user.save();
    console.log("Inserted User Successfully!", user);

    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    res.cookie("token", token);

    res.json({ message: "Inserted User Successfully!" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error while saving user:", error);

    // Include the error message in the response for better debugging
    res.status(500).json({
      message: "Something went wrong while saving user!",
      error: error || "Unknown error",
    });
  }
});

authRouter.post("/login", async (req, res) => {
  const data = req.body;
  const { error, success } = userLoginSchema.safeParse(data);
  if (!success) {
    res.status(401).json({ message: "Invalid Inputs!", error });
    return;
  }

  try {
    //validate password
    const { emailId, password } = data;
    const user = await User.findOne({ emailId });
    if (!user) {
      res.status(404).json({ message: "Invalid credentials!", error });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials!", error });
      return;
    }
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    res.cookie("token", token);

    res.json({ message: "Logged in succesfully!" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong!" });
  }
});

authRouter.post("/logout", async (req, res) => {
    //modify the token and expire it right now
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });
  res.send();
});

export default authRouter;
