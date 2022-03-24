import Actuator from "@/controllers/Actuator";
import express from "express";
const router = express.Router();

/* actuators page */
router.get("/actuator", Actuator.get);
router.get("/actuator/:id", Actuator.get);
router.post("/actuator", Actuator.post);
router.patch("/actuator/:id", Actuator.patch);
router.delete("/actuator/:id", Actuator.delete);

export default router;
