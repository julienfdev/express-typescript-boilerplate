import jwt from "jsonwebtoken";
import config from "./config";

export function signJwt(_id: string, _email: string) {

    return jwt.sign({ id: _id, email: _email }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};

export function verifyJwt(tokenHeader: string[]) {

    return jwt.verify(tokenHeader[1], config.jwtSecret);
};
