import { Schema, model, connect } from "mongoose";
import { type } from "os";

export enum ActuatorType{
    BLINDS,
    LIGHT
}

type Actuator = {
    id: number | string
    type?: ActuatorType
    designation: string
    state: boolean
}

type ActuatorPost = Omit<Actuator, "id">
type ActuatorUpdate = Partial<ActuatorPost>

const schemaActuator = new Schema<Actuator>({
    id: { type: String, required: true },
    type: { type: String, enum: Object.values(ActuatorType) },
    designation: { type: String, required: true },
    state: { type: Boolean, required: true }
  });

const ActuatorModel = model<Actuator>('Actuator', schemaActuator);