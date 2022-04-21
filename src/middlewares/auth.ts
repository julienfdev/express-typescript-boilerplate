import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config";

var tokenVerify = async function (req: Request, res: Response, next: NextFunction) {

    let tokenHeader = req.headers.authorization!.split(" ");
    try {
        jwt.verify(tokenHeader[1], config.jwtSecret);
        next();
    } catch (error) {
        console.log(tokenHeader[1]);
        throw new Error("jwt verify error");
    }
};

export default tokenVerify
