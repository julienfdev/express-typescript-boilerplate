import db from "@/db";
import { NextFunction, Request, Response } from "express";

export default {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await db.actuator.findMany();
      res.json(result);
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
      await db.actuator.update({
        data: { ...req.body },
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.json({ message: "handled" });
      return;
    } catch (error) {
      console.error(error);
      next(error);
    }
  },
  post: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const actuator = await db.actuator.create({
        data: {
          ...req.body,
        },
      });
      res.status(201).json({ message: "created", id: actuator.id });
      return;
    } catch (error) {
      next(error);
    }
  },
  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      await db.actuator.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.json({ message: "handled" });
      return;
    } catch (error) {
      next(error);
    }
  },
};
