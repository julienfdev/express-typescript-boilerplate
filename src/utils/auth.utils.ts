import jwt from "jsonwebtoken";
import config from "./config";

export function signJwt(_id: string, _email: string) {

    try {
        return jwt.sign({ id: _id, email: _email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
    } catch (error) {
        throw new Error("jwt sign error");
    }
    
};

export function verifyJwt(tokenHeader: string[]) {

    try {
        return jwt.verify(tokenHeader[1], config.jwtSecret);
    } catch (error) {
        throw new Error("jwt verify error");
    } 
};
