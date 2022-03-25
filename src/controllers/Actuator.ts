import { NextFunction, Request, Response } from "express";
import ActuatorModel from "../models/Actuator"
export default {
  allActuators: async (req: Request, res: Response, next: NextFunction) => {
    const sensors = ActuatorModel.find((err: any, actuators: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(actuators);
      }
    },)
  },

  oneActuator: async (req: Request, res: Response, next: NextFunction) => {
    const sensor = ActuatorModel.findById(req.params.id, (err: any, actuator: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(actuator);
      }
    },)
  },

  postActuator: async (req: Request, res: Response, next: NextFunction) => {
    const actuator = new ActuatorModel(req.body);
    actuator.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(actuator);
      }
    })
  },

  updateActuator: async (req: Request, res: Response, next: NextFunction) => {
    let actuator = ActuatorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, actuator: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send(actuator);
        }
      }
    )
  },

  deleteActuator: async (req: Request, res: Response, next: NextFunction) => {
    const actuator = ActuatorModel.deleteOne({ _id: req.params.id}, (err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Le sensor a été supprimé");
      }
    })
  },
};
