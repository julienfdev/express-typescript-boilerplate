import { NextFunction, Request, Response } from "express";
import ActuatorModel from "../models/Actuator"
import ApiResponse from "@/modules/Interface";

export default {


  //si requete marche instancier class ApiResponse avec a l'interieur ex : "tableau de actuators" + [actuators]
  //si ca marche pas renvoyer ApiResponse avec error as Error
  allActuators: async (req: Request, res: Response, next: NextFunction) => {
    const sensors = ActuatorModel.find((err: any, actuators: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", actuators ,Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("liste des actuators :", actuators, Error)
        res.send(resultat);
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
        res.send("Created! id: "+actuator._id);
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
