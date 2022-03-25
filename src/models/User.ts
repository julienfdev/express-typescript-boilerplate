import { Schema, model, connect } from "mongoose";
import { type } from "os";

type User = {
    id: number | string
    email: string
    password: string
    username: string
}

const schema = new Schema<User>({
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
  });

const UserModel = model<User>('User', schema);