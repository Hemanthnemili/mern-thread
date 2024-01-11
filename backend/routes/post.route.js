import express from "express";
import {
  createPost,
  deletePost,
  getFeedPosts,
  getPost,
  getUserPosts,
  likeUnlike,
  reply,
} from "../controllers/post.control.js";
import { protectRoute } from "../middleware/protectedRoute.js";
protectRoute;

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPost);
router.get("/:id", getPost);
router.get("/user/:username", getUserPosts);
router.delete("/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeUnlike);
router.put("/reply/:id", protectRoute, reply);

export default router;
