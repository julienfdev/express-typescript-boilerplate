import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import ApiResponse from "@/modules/Interface";

export default {
  allUsers: async (req: Request, res: Response, next: NextFunction) => {
    const users = UserModel.find((err: any, users: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", users ,err)
          res.send(resultat);
      } else {
        const resultat = new ApiResponse("Liste des utilisateurs :", users ,err)
        res.send(resultat);
      }
  },)},

  oneUser: async (req: Request, res: Response, next: NextFunction) => {
    const user = UserModel.findById(req.params.id, (err: any, user: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", user ,err)
          res.send(resultat);
      } else {
        const resultat = new ApiResponse("Utilisateur :", user ,err)
        res.send(resultat);
      }
    });
  },
 
  post: async (req: Request, res: Response, next: NextFunction) => {
    const user = new UserModel(req.body);
    user.save((err: any) => {
    if (err) {
      const resultat = new ApiResponse("Erreur :", user ,err)
          res.send(resultat);
    } else {
      const resultat = new ApiResponse("Utilisateur créé :", user._id ,err)
        res.send(resultat);
    }
  });
},

updateUser: async (req: Request, res: Response, next: NextFunction) => {
  let user = UserModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    (err: any, user: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", user ,err)
          res.send(resultat);
      } else {
        const resultat = new ApiResponse("Utilisateur mis à jour :", user.id ,err)
        res.send(resultat);
      }
    }
  );
},

deleteUser: async (req: Request, res: Response, next: NextFunction) => {
  const user = UserModel.deleteOne({ _id: req.params.id }, (err: any) => {
    if (err) {
      const resultat = new ApiResponse("Erreur :", user ,err)
          res.send(resultat);
    } else {
      const resultat = new ApiResponse("Utilisateur supprimé");
      res.send(resultat);
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
