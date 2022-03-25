import User from "@/controllers/User";
import express from "express";
const router = express.Router();

/* user page. */
router.get("/user", User.allUsers);
router.get("/user/:id", User.oneUser);
router.post("/user", User.post);
router.patch("/user/:id", User.updateUser);
router.delete("/user/:id", User.deleteUser);

export default router;
