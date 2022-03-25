import { Schema, model, connect } from "mongoose";
import { type } from "os";

export enum SensorType{
    TEMPERATURE,
    HUMIDITY,
    BARO,
    PROXIMITY
}

type Sensor = {
    id: number | string
    type?: SensorType
    designation : string
    rawValue: number | boolean
}

type SensorGet = Sensor & {value: string}
type SensorPost = Omit<Sensor, "id">
type SensorUpdate = Partial<SensorPost>

const schemaSensor = new Schema<Sensor>({
    id: { type: String, required: true },
    type: { type: String, enum: Object.values(SensorType) },
    designation: { type: String, required: true },
    rawValue: { type: Number, required: true }
  });

const SensorModel = model<Sensor>('Sensor', schemaSensor);