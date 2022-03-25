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

  oneUser: async (req: Request, res: Response, next: NextFunction) => {
    const user = UserModel.findById(req.params.id, (err: any, user: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    });
  },
 
  post: async (req: Request, res: Response, next: NextFunction) => {
    const user = new UserModel(req.body);
    user.save((err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send(user);
    }
  });
},

updateUser: async (req: Request, res: Response, next: NextFunction) => {
  let user = UserModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, user: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(user);
      }
    }
  );
},

deleteUser: async (req: Request, res: Response, next: NextFunction) => {
  const user = UserModel.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      res.send(err);
    } else {
      res.send("L'utlisateur a été supprimé");
    }
  });
},


}


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
