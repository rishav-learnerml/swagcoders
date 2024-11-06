import jwt from "jsonwebtoken";
import { NextFunction, Response } from "express";
import { User } from "../models/user";

const JWT_SECRET = process.env.JWT_SECRET as string;

const authChecker = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token!");
    }
    const { _id }: any = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Invalid User!");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Auth failed!" });
  }
};

export default authChecker;
