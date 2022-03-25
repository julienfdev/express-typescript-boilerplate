import Actuator from "@/controllers/Actuator";
import express from "express";
const router = express.Router();

/* actuators page */
router.get("/actuator", Actuator.allActuators);
router.get("/actuator/:id", Actuator.oneActuator);
router.post("/actuator", Actuator.postActuator);
router.patch("/actuator/:id", Actuator.updateActuator);
router.delete("/actuator/:id", Actuator.deleteActuator);

export default router;
