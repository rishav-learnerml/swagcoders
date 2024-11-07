import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import RequestWithCookieType from "../types/interfaces";
import { User } from "../models/user";

const authChecker = async (
  req: RequestWithCookieType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ message: "Auth Failed! Please Log in Again!" });
      return;
    }
    const { _id }: any = jwt.decode(token);
    if (!_id) throw new Error("Invalid Token!");
    const user = await User.findById(_id);
    if (!user) throw new Error("User doesn't exists!");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Auth Failed!", error });
  }
};

export default authChecker;
