import { NextFunction, Request, Response } from "express";

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "Get User work" });
      return;
    } catch (error) {
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "Post User work" });
      return;
    } catch (error) {
      next(error);
    }
  },
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
  },
};
