import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";

export default {
  allUsers: async (req: Request, res: Response, next: NextFunction) => {
    const users = UserModel.find((err: any, users: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(users);
      }
  },)},
 
  post: async (req: Request, res: Response, next: NextFunction) => {
    const user = new UserModel(req.body);
    user.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
},}


/*
  patch: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "Patch User work" });
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "Delete User work" });
      return;
    } catch (error) {
      next(error);
    }
  },*/
