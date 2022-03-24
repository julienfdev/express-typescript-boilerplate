import Sensor from "@/controllers/Sensor";
import express from "express";
const router = express.Router();

/* Sensors page */
router.get("/sensor", Sensor.get);
router.get("/sensor/:id", Sensor.get);
router.post("/sensor", Sensor.post);
router.patch("/sensor/:id", Sensor.patch);
router.delete("/sensor/:id", Sensor.delete);

export default router;
