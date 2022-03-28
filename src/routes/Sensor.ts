import Sensor from "@/controllers/Sensor";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", Sensor.getAll);
router.post("/", Sensor.post);
router.get("/:id", Sensor.getOne);
router.patch("/:id", Sensor.update);
router.delete("/:id", Sensor.delete);

export default router;
