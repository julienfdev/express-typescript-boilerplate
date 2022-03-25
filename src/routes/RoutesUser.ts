import User from "@/controllers/User";
import express from "express";
const router = express.Router();

/* user page. */
router.get("/user", User.allUsers);
//router.get("/user/:id", User.get);
router.post("/user", User.post);
//router.patch("/user/:id", User.patch);
//router.delete("/user/:id", User.delete);

export default router;
