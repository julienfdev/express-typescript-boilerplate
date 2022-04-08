import { NextFunction, Request, Response } from "express";
import UserModel from "../models/User";
import ApiResponse from "@/modules/Interface";
import argon2 from "argon2";
import { signJwt, verifyJwt } from "@/utils/auth.utils";
import { argon2Hash, argon2Verify } from "@/utils/argon2.utils";

export default {
  allUsers: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));

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

    verifyJwt(req.headers.authorization!.split(" "));

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
      throw new Error("l'Utilisateur est déjà existant");
    }

    user.password = await argon2Hash(password);
    const token = signJwt(user.id, email);

    user.save((err: any) => {
      if (err) {
        const resultat = new ApiResponse("Erreur :", undefined, err as Error)
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("succes", { token: token }, undefined);
        res.send(resultat);
      }
    });
  },

  postLogin: async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error("Utilisateur non existant");
    }

    const token = signJwt(user.id, email);

    try {
      if (await argon2Verify(user.password, password)) {
        const resultat = new ApiResponse("succes", { token: token }, undefined);
        res.send(resultat);
      } else {
        const resultat = new ApiResponse("Erreur :", undefined, password as Error)
        res.send(resultat);
      }
    } catch (error) {
      throw new Error("Erreur de verification");
    }
  },

  updateUser: async (req: Request, res: Response, next: NextFunction) => {

    verifyJwt(req.headers.authorization!.split(" "));

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

    verifyJwt(req.headers.authorization!.split(" "));

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
