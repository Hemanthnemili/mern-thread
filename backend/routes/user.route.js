import express from "express";
import { test, signup, login } from "../controllers/user.control.js";

const router = express.Router();

router.get("/test", test);
router.post("/signup", signup);
router.post("/login", login);

export default router;
