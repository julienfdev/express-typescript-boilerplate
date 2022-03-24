# Express-TypeScript-Boilerplate

Installation : 

```ts
npm install
```

Launch : 

```ts
npm start
```

---


# Fil rouge M1-IoT - Cahier des charges

Ce document liste les endpoints à implémenter pour notre interface commune, ainsi que le type des collections concernées


## Collections

### Users

```ts
type User = {
    id: number | string
    email: string
    password: string
    username: string
}

type UserGet = Omit<User, "password">
type UserPost = Omit<User, "id">
type UserUpdate = Partial<UserPost>
```

### Actuators

```ts
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
```

### Sensors

```ts
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

```

## Interface 

```ts
type ApiResponse = {
    response: string
    data?: Record<string, any>
    error?: Error
}

```

## Endpoints

### Users

| METHOD | Route     | Query? | Body / Response | Description |
| ------ | --------- | ------ | --------------- | ----------- |
| GET    | /user     |        | UserGet[]       |             |
| GET    | /user/:id |        | UserGet         |             |
| POST   | /user     |        | UserPost        |             |
| PATCH  | /user/:id |        | UserUpdate      |             |
| DELETE | /user/:id |        | N/A             |             |

### Actuators

| METHOD | Route         | Query? | Body / Response | Description |
| ------ | ------------- | ------ | --------------- | ----------- |
| GET    | /actuator     | ?type  | Actuator[]      |             |
| GET    | /actuator/:id |        | Actuator        |             |
| POST   | /actuator     |        | ActuatorPost    |             |
| PATCH  | /actuator/:id |        | ActuatorUpdate  |             |
| DELETE | /actuator/:id |        | N/A             |             |

### Sensors

| METHOD | Route       | Query? | Body / Response | Description |
| ------ | ----------- | ------ | --------------- | ----------- |
| GET    | /sensor     | ?type  | Sensor[]        |             |
| GET    | /sensor/:id |        | Sensor          |             |
| POST   | /sensor     |        | SensorPost      |             |
| PATCH  | /sensor/:id |        | SensorUpdate    |             |
| DELETE | /sensor/:id |        | N/A             |             |
