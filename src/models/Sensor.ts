import { Schema, model, connect } from "mongoose";

export enum SensorType {
    TEMPERATURE = "TEMPERATURE",
    HUMIDITY = "HUMIDITY",
    BARO = "BARO",
    PROXIMITY = "PROXIMITY"
}

type Sensor = {
    type?: SensorType
    designation: string
    rawValue: number | boolean
}

type SensorGet = Sensor & { value: string }
type SensorPost = Omit<Sensor, "id">
type SensorUpdate = Partial<SensorPost>

const schemaSensor = new Schema<Sensor>({
    type: { type: String, enum: Object.values(SensorType) },
    designation: { type: String, required: true },
    rawValue: { type: Number, required: true }
});

schemaSensor.set('toJSON', {
    getters: true, virtuals: true, transform: (doc, converted) => {
        delete converted._id;
        delete converted.__v;
    }
});

const SensorModel = model<Sensor>('Sensor', schemaSensor);

export default SensorModel;