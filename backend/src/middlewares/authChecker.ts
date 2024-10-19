import { NextFunction, Response } from "express";
import RequestWithCookieType from "../types/interfaces";
import { User } from "../models/user";

const authChecker = async (
  req: RequestWithCookieType,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token } = req.cookies;
    if (!token) throw new Error("Auth Failed! Please Log in Again!");
    const { _id } = token;
    if (_id) throw new Error("Invalid Credentials!");
    const user = User.findById(_id);
    if (!user) throw new Error("User doesn't exists!");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).json({ message: "Auth Failed!" });
  }
};

export default authChecker;