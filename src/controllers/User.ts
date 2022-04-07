import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import ApiResponse from "@/modules/Interface";
import argon2 from "argon2";

export default {
  allUsers: async (req: Request, res: Response, next: NextFunction) => {
    const users = UserModel.find((err: any, users: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Liste des utilisateurs :", users, undefined)
        res.send(resultat);
      }
    })
  },

  oneUser: async (req: Request, res: Response, next: NextFunction) => {
    const user = UserModel.findById(req.params.id, (err: any, user: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Utilisateur :", user, undefined)
        res.send(resultat);
      }
    });
  },

  post: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = new UserModel(req.body);
    const oldUser = await UserModel.findOne({ email });

    if (oldUser) {
      return res.status(409).send("l'Utilisateur est déjà existant");
      //const resultat = new ApiResponse("User Already Exist. Please Login", undefined, email as Error);
      //res.send(resultat);
    }

    try {
      const hash = await argon2.hash(password);
      user.password = hash;
    } catch {
      return res.status(409).send("Erreur de Hashage");
      //res.send(resultat);
    }

    user.save((err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Utilisateur créé :", user, undefined)
        res.send(resultat);
      }
    });
  },

  postLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(409).send("Utilisateur non existant");
    }

    try {
      if (await argon2.verify(user.password, password)) {
        const resultat = new ApiResponse("Connexion Etablie !", undefined);
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Erreur :", undefined, password as Error)
        res.send(resultat);
      }
    } catch (error) {
      return res.status(409).send("Erreur de verification");
      //const resultat = new ApiResponse("Erreur interne", undefined)
      //res.send(resultat);
    }

    //const user = new UserModel(req.body);
    //user.save((err: any) => {
      //if (err) {
        //const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        //res.send(resultat);
      //} else {
        //const resultat = new ApiResponse("Utilisateur créé :", user, undefined)
        //res.send(resultat);
      //}
    //});
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {
    let user = UserModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      (err: any, user: any) => {
        if (err) {
          const resultat = new ApiResponse("Erreur :", undefined, err as Error)
          res.send(resultat);
        } else {
          const resultat = new ApiResponse("Utilisateur mis à jour :", user, undefined)
          res.send(resultat);
        }
      }
    );
  },

  deleteUser: async (req: Request, res: Response, next: NextFunction) => {
    const user = UserModel.deleteOne({ _id: req.params.id }, (err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Utilisateur supprimé", undefined, undefined);
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
