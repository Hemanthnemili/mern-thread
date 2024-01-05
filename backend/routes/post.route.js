import express from "express";
import {
  createPost,
  deletePost,
  getFeedPosts,
  getPost,
  likeUnlike,
  reply,
} from "../controllers/post.control.js";
import { protectRoute } from "../middleware/protectedRoute.js";
protectRoute;

const router = express.Router();

router.get("/feed", protectRoute, getFeedPosts);
router.post("/create", protectRoute, createPost);
router.get("/:id", getPost);
router.delete("/:id", protectRoute, deletePost);
router.post("/like/:id", protectRoute, likeUnlike);
router.put("/reply/:id", protectRoute, reply);

export default router;
