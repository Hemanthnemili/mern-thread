import express from "express";
import {
  test,
  profile,
  signup,
  login,
  logout,
  follow,
  update,
} from "../controllers/user.control.js";
import { protectRoute } from "../middleware/protectedRoute.js";

const router = express.Router();

router.get("/test", test);
router.get("/profile/:query", profile);
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/follow/:id", protectRoute, follow);
router.put("/update/:id", protectRoute, update);

export default router;
