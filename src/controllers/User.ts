import db from "@/db";
import apiResponse from "@/modules/api-response";
import argon2, { argon2id } from "argon2";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json(
        apiResponse(
          false,
          await db.user.findMany({
            select: {
              id: true,
              username: true,
              email: true,
            },
          })
        )
      );
      return;
    } catch (error) {
      next(error);
    }
  },
  getOne: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "hello world" });
      return;
    } catch (error) {
      next(error);
    }
  },
  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.user.update({
        data: {
          username: req.body.username,
        },
        select: {
          username: true,
        },
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.json(apiResponse(false, { message: "handled" }));
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // hashing pass
      const hash = await argon2.hash(req.body.password, { type: argon2id });
      const user = await db.user.create({
        data: {
          email: req.body.email,
          password: hash,
          username: req.body.username,
        },
      });
      res.json(apiResponse(false, { message: "created", id: user.id }));
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.user.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.json({ message: "deleted" });
      return;
    } catch (error) {
      next(error);
    }
  },
  login: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Find user with password
      const user = await db.user.findUnique({
        where: { email: req.body.email },
      });
      // comparing hash
      if (!user) {
        throw new Error("user_not_found");
      }
      const valid = await argon2.verify(user?.password, req.body.password);
      if (!valid) {
        throw new Error("user_credentials_invalid");
      }
      // user is valid, creating token
      const token = jwt.sign({ id: user.id }, process.env.NODE_APP_JWT_SECRET!);
      res.json(apiResponse(false, { token }));
    } catch (error) {
      next(error);
    }
  },
};
