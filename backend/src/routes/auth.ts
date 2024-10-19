import express from "express";
import { userLoginSchema, userSchema } from "../../../shared/validations";
import { User } from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authRouter = express.Router();
const JWT_SECRET = process.env.JWT_SECRET as string;

authRouter.post("/signup", async (req, res) => {
  const userData = req.body;
  const { success, error } = userSchema.safeParse(userData);
  if (!success) {
    res.status(403).json({ message: "Invalid Inputs!", error });
    return;
  }

  try {
    const { password } = userData;
    const hashedPassword = bcrypt.hash(password, 10);
    userData.password = hashedPassword;
    const user = new User(userData);
    await user.save();
    console.log("Inserted User Succesfully!", res);
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);

    res.cookie("token", token);
    res.json({ message: "Inserted User Succesfully!" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went Wrong while saving user!", error });
    return;
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

export default authRouter;
