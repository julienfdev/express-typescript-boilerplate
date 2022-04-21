import Sensor from "@/controllers/Sensor";
import express from "express";
import auth from "@/middlewares/auth"
const router = express.Router();

/* Sensors page */
router.use("/sensor", auth);
router.get("/sensor", Sensor.allSensors);
router.get("/sensor/:id", Sensor.oneSensor);
router.post("/sensor", Sensor.postSensor);
router.patch("/sensor/:id", Sensor.updateSensor);
router.delete("/sensor/:id", Sensor.deleteSensor);

export default router;
