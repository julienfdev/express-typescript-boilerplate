import db from "@/db";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Getting the token
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new Error("token_not_sent");
    }
    const token = authHeader.replace("Bearer ", "");
    if (!token.length) {
      throw new Error("token_malformed");
    }
    const valid = jwt.verify(token, process.env.NODE_APP_JWT_SECRET!) as {
      id: number;
    };
    if (!valid) {
      throw new Error("token_invalid");
    }
    // now that we have verified the token, we must validate it still belongs to a user
    const user = await db.user.findUnique({ where: { id: valid.id } });
    if (!user) {
      throw new Error("user_invalid");
    }
    // if we're here we're fine
    next();
  } catch (error) {
    next(error);
  }
};
