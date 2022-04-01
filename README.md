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

## Changelog
**2020-03-28 :**
- Les énumérations mappent désormais leur valeur sous forme de string
- Les réponses aux POST doivent passer un `id` dans le `data` de l'`ApiResponse`
- Dans le cas de `/user/login`, la réponse doit contenir un `token: string` dans le `data` de l'`ApiResponse`
- Ajout d'un UserLogin et de la route associée
- Ajout du paragraphe Ranges
- Ajout du paragraphe Précisions

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
type UserLogin = Pick<User, "email" | "password">
type UserUpdate = Pick<Partial<UserPost>, "username">
```

### Actuators

```ts
enum ActuatorType{
    BLINDS = "BLINDS",
    LIGHT = "LIGHT"
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
    TEMPERATURE = "TEMPERATURE",
    HUMIDITY = "HUMIDITY",
    BARO = "BARO",
    PROXIMITY = "PROXIMITY"
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

| METHOD | Route       | Query? | Body / Response                                  | Description |
| ------ | ----------- | ------ | ------------------------------------------------ | ----------- |
| GET    | /user       |        | UserGet[]                                        |             |
| GET    | /user/:id   |        | UserGet                                          |             |
| POST   | /user       |        | UserPost / {message: "created", id: number}      |             |
| POST   | /user/login |        | UserLogin  / {message: "success", token: string} |             |
| PATCH  | /user/:id   |        | UserUpdate                                       |             |
| DELETE | /user/:id   |        | N/A                                              |             |

### Actuators

| METHOD | Route         | Query? | Body / Response                                 | Description |
| ------ | ------------- | ------ | ----------------------------------------------- | ----------- |
| GET    | /actuator     | ?type  | Actuator[]                                      |             |
| GET    | /actuator/:id |        | Actuator                                        |             |
| POST   | /actuator     |        | ActuatorPost / {message: "created", id: number} |             |
| PATCH  | /actuator/:id |        | ActuatorUpdate                                  |             |
| DELETE | /actuator/:id |        | N/A                                             |             |

### Sensors

| METHOD | Route       | Query? | Body / Response                               | Description |
| ------ | ----------- | ------ | --------------------------------------------- | ----------- |
| GET    | /sensor     | ?type  | Sensor[]                                      |             |
| GET    | /sensor/:id |        | Sensor                                        |             |
| POST   | /sensor     |        | SensorPost / {message: "created", id: number} |             |
| PATCH  | /sensor/:id |        | SensorUpdate                                  |             |
| DELETE | /sensor/:id |        | N/A                                           |             |

## Ranges

La maison connectée remonte les informations dans un format brut, dans le champ `rawValue`. Ce format devra être converti pour être renvoyé dans le champ `value` de `SensorGet`. Voici les différentes `Range` qui vous serviront pour effectuer votre fonction de conversion :

```
Temperature : 
Raw : uint10 (0-1023)
Correspondance : -20 - 55°C

Humidity :
Raw : uint10 (0-1023)
Correspondance : 0 - 100%HR

Barometer : 
Raw : uint10 (0-1023)
Correspondance : 950 - 1150hPa

Proximity : 
Raw : boolean
Correspondance : "Inactif" / "Actif"

```

## Précisions

### Sumatohomu-baremetal

La maison connectée communique de façon rudimentaire avec votre API : 

- Toutes les 2 secondes, la maison effectue deux requêtes à l'API : 
  - `GET /sensor`
  - `GET /actuator`
- L'état des actuateurs (un seul par type, forcément) est répercuté physiquement à la maison connecté
- La maison parcourt les capteurs et utilise la première instance de chaque type
- La maison utilise ensuite un protocole de communication bas-niveau pour récupérer l'info de ses différents capteurs ([i2c] pour les plus curieux)
- La valeur brute de ces capteurs est passé à votre API par les requêtes `PATCH /actuator/:id`, en passant la valeur dans l'attribut `rawValue`

⚠️ Rappelez-vous qu'il n'existe qu'un capteur de chaque type sur la maison. Ainsi, si vous pouvez rajouter autant de capteurs que vous le souhaitez, un seul de chaque sera utilisé par la maison connectée.

### Frontend

Un frontend lui aussi rudimentaire vous est fourni :

**Sera activé après le cours sur l'authentification :**
- Si l'utilisateur n'est pas connecté, celui-ci affiche la page de login / signup
- Le front envoie sur `POST /user/login` un `UserLogin` en cas de login, ou un `UserPost` sur `POST /user` en cas de signup
- Si l'authentification est validée, celui-ci stocke le token fourni dans le localstorage
- Chaque requête est ensuite passée avec un header `Authorization: Bearer token`
- La page Utilisateurs effectue une requête `GET /user` et affiche une liste d'utilisateurs
- Le clic sur la poubelle supprime un utilisateur avec `DELETE /user/:id`

**Actuellement**
- À l'arrivée sur la page Actuateurs, le front effectue un `GET /actuator` et affiche le nom le type et l'état des actuateurs
- le clic sur un switch déclenche un `PATCH /actuator/:id` avec l'attribut `state` correspondant
- le clic sur la poubelle déclenche un `DELETE /actuator/:id`, le frontend est optimiste et en cas de `200`, supprime l'actuateur du front sans refaire une requête `GET`
- L'ajout d'un actuateur envoie un `ActuatorPost` sur `POST /actuator`
- A l'arrivée sur la page Capteurs, le front effectue un `GET /sensor` et affiche le nom, le type, et la valeur formatée du capteur (champ `value` de `SensorGet`)
- Toutes les 5 secondes, la page met à jour les capteurs avec `GET /sensor`
- le clic sur la poubelle supprime le capteur avec un `DELETE /sensor/:id`

**Test**

Vous pouvez lancer le front en clonant le repo https://github.com/julienfdev/sumatohomu.git

⚠️ Le front se lance sur le port 8080. Pensez également à créer votre `.env` inspiré de l'exemple

⚠️ Pensez à vos réglages CORS

[i2c]: https://fr.wikipedia.org/wiki/I2C