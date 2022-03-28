import Actuator from "@/controllers/Actuator";
import auth from "@/middlewares/auth";
import express from "express";
const router = express.Router();

/* GET home page. */
router.use(auth);
router.get("/", Actuator.getAll);
router.post("/", Actuator.post);
router.get("/:id", Actuator.getOne);
router.patch("/:id", Actuator.update);
router.delete("/:id", Actuator.delete);

export default router;
