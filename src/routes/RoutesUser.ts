import User from "@/controllers/User";
import express from "express";
import auth from "@/middlewares/auth"
const router = express.Router();

/* user page. */

router.post("/user", User.post);
router.post("/user/login", User.postLogin);

router.get("/user", auth, User.allUsers);
router.get("/user/:id", auth, User.oneUser);

router.patch("/user/:id", auth, User.updateUser);
router.delete("/user/:id", auth, User.deleteUser);

export default router;
