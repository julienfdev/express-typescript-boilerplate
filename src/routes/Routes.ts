import User from "@/controllers/User";
import Index from "@/controllers/Index";
import Actuator from "@/controllers/Actuator";
import Sensor from "@/controllers/Sensor";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", Index.get);

/* user page. */
router.get("/user", User.get);
router.get("/user/:id", User.get);
router.post("/user", User.post);
router.patch("/user/:id", User.patch);
router.delete("/user/:id", User.delete);

/* actuators page */
router.get("/actuator", Actuator.get);
router.get("/actuator/:id", Actuator.get);
router.post("/actuator", Actuator.post);
router.patch("/actuator/:id", Actuator.patch);
router.delete("/actuator/:id", Actuator.delete);


/* Sensors page */
router.get("/sensor", Sensor.get);
router.get("/sensor/:id", Sensor.get);
router.post("/sensor", Sensor.post);
router.patch("/sensor/:id", Sensor.patch);
router.delete("/sensor/:id", Sensor.delete);

export default router;
