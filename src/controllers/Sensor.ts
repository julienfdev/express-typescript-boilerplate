import { NextFunction, Request, Response } from "express";
import SensorModel from "../models/Sensor"
import ApiResponse from "@/modules/Interface";
export default {
  
  allSensors: async (req: Request, res: Response, next: NextFunction) => {
    const sensors = SensorModel.find((err: any, sensors: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", sensors ,err)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Liste des sensors :", sensors, err)
        res.send(resultat);
      }
    },)
  },

  oneSensor: async (req: Request, res: Response, next: NextFunction) => {
    const sensor = SensorModel.findById(req.params.id, (err: any, sensor: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", sensor ,err)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Sensor :", sensor, err)
        res.send(resultat);
      }
    },)
  },

  postSensor: async (req: Request, res: Response, next: NextFunction) => {
    const sensor = new SensorModel(req.body);
    sensor.save((err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", sensor ,err)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Sensor créé :", sensor, err)
        res.send(resultat);
      }
    })
  },
  updateSensor: async (req: Request, res: Response, next: NextFunction) => {
    let sensor = SensorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, sensor: any) => {
        if (err) {
          const resultat = new ApiResponse("Erreur :", sensor ,err)
        res.send(resultat);
        } else {
          const resultat = new ApiResponse("Sensor modifié :", sensor, err)
        res.send(resultat);
        }
      }
    )
  },
  deleteSensor: async (req: Request, res: Response, next: NextFunction) => {
    const sensor = SensorModel.deleteOne({ _id: req.params.id}, (err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", sensor ,err)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Sensor supprimé.", err)
        res.send(resultat);
      }
    })
  },
};
