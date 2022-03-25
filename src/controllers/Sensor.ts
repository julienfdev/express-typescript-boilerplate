import { NextFunction, Request, Response } from "express";
import SensorModel from "../models/Sensor"

export default {
  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({ message: "Get Sensor work" });
      return;
    } catch (error) {
      next(error);
    }
  },

  allSensors: async (req: Request, res: Response, next: NextFunction) => {
    const sensors = SensorModel.find((err: any, sensors: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(sensors);
      }
    },)
  },

  oneSensor: async (req: Request, res: Response, next: NextFunction) => {
    const sensor = SensorModel.findById(req.params.id, (err: any, sensor: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(sensor);
      }
    },)
  },

  postSensor: async (req: Request, res: Response, next: NextFunction) => {
    const sensor = new SensorModel(req.body);
    sensor.save((err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send(sensor);
      }
    })
  },
  updateSensor: async (req: Request, res: Response, next: NextFunction) => {
    let sensor = SensorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, sensor: any) => {
        if (err) {
          res.send(err);
        } else {
          res.send(sensor);
        }
      }
    )
  },
  deleteSensor: async (req: Request, res: Response, next: NextFunction) => {
    const sensor = SensorModel.deleteOne({ _id: req.params.id}, (err: any) => {
      if (err) {
        res.send(err);
      } else {
        res.send("Le sensor a été supprimé");
      }
    })
  },
};
