import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default {
  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const result = await prisma.actuator.findMany();
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
      await prisma.actuator.update({
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
      const actuator = await prisma.actuator.create({
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
      await prisma.actuator.delete({
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
