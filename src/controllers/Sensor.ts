import { NextFunction, Request, Response } from "express";
import SensorModel from "../models/Sensor"
import ApiResponse from "@/modules/Interface";
import { verifyJwt } from "@/middlewares/auth";
import { convert } from "@/converter/Converter";
export default {
  
  allSensors: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));


    const sensors = SensorModel.find((err: any, sensors: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
        res.send(resultat);
      } else {
        //utilisation du mapping pour afficher la valeur convertie dans json
        const map = sensors.map((convertSensor: { _id: any; type: String; designation: any; rawValue: number | boolean; }) => {
          return {
            id: convertSensor._id,
            type: convertSensor.type,
            designation: convertSensor.designation,
            rawValue: convertSensor.rawValue,
            value: convert(convertSensor.rawValue,convertSensor.type), //conversion de la rawvalue en valeur selon le type
          };
        });
        const resultat = new ApiResponse("Liste des sensors :", map, undefined)
        res.send(resultat);
      }
    },)
  },

  oneSensor: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));

    const sensor = SensorModel.findById(req.params.id, (err: any, sensor: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Sensor :", sensor, undefined)
        res.send(resultat);
      }
    },)
  },

  postSensor: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));

    const sensor = new SensorModel(req.body);
    sensor.save((err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Sensor créé :", sensor, undefined)
        res.send(resultat);
      }
    })
  },
  updateSensor: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));

    let sensor = SensorModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, sensor: any) => {
        if (err) {
          const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
        res.send(resultat);
        } else {
          const resultat = new ApiResponse("Sensor modifié :", sensor, undefined)
        res.send(resultat);
        }
      }
    )
  },
  deleteSensor: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));
    
    const sensor = SensorModel.deleteOne({ _id: req.params.id}, (err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined ,err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Sensor supprimé.", undefined, undefined)
        res.send(resultat);
      }
    })
  },
};
