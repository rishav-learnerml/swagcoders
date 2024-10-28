import { Request } from "express";

export interface RequestWithCookieType extends Request {
  token?: { _id: string };
  user?: any;
}


export default RequestWithCookieType;
