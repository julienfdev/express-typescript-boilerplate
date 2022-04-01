import { Schema, model, connect } from "mongoose";

export enum ActuatorType{
    BLINDS = "BLINDS",
    LIGHT = "LIGHT"
}

type Actuator = {
    type?: ActuatorType
    designation: string
    state: boolean
}

type ActuatorPost = Omit<Actuator, "id">
type ActuatorUpdate = Partial<ActuatorPost>

const schemaActuator = new Schema<Actuator>({
    type: { type: String, enum: Object.values(ActuatorType) },
    designation: { type: String, required: true },
    state: { type: Boolean, required: true }
  });

const ActuatorModel = model<Actuator>('Actuator', schemaActuator);

export default ActuatorModel;