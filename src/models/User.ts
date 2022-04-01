import { Schema, model, connect } from "mongoose";

type User = {
    email: string
    password: string
    username: string
}

const schema = new Schema<User>({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true }
  });

const UserModel = model<User>('User', schema);

type UserGet = Omit<User, "password">
type UserPost = Omit<User, "id">
type UserLogin = Pick<User, "email" | "password">
type UserUpdate = Pick<Partial<UserPost>, "username">

export default UserModel;