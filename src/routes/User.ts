import User from "@/controllers/User";
import auth from "@/middlewares/auth";
import express from "express";
const router = express.Router();

/* GET home page. */
router.get("/", auth, User.getAll);
router.post("/", User.post);
router.post("/login", User.login);
router.get("/:id", User.getOne);
router.patch("/:id", User.update);
router.delete("/:id", User.delete);

export default router;
