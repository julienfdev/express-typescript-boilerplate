import { Schema, model, connect } from "mongoose";
import { type } from "os";

type User = {
    id: number | string
    email: string
    password: string
    username: string
}

type UserGet = Omit<User, "password">
type UserPost = Omit<User, "id">
type UserUpdate = Partial<UserPost>

enum ActuatorType{
    BLINDS,
    LIGHT
}

type Actuator = {
    id: number | string
    type: ActuatorType
    designation: string
    state: boolean
}

type ActuatorPost = Omit<Actuator, "id">
type ActuatorUpdate = Partial<ActuatorPost>

enum SensorType{
    TEMPERATURE,
    HUMIDITY,
    BARO,
    PROXIMITY
}

type Sensor = {
    id: number | string
    type: SensorType
    designation : string
    rawValue: number | boolean
}

type SensorGet = Sensor & {value: string}
type SensorPost = Omit<Sensor, "id">
type SensorUpdate = Partial<SensorPost>

type ApiResponse = {
    response: string
    data?: Record<string, any>
    error?: Error
}