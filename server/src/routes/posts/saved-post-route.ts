import { Router } from "express";
import {
  getAllSavedPosts,
  createSavedPost,
  deleteSavedPost,
} from "../../controllers/posts/saved-post-controller";

const router = Router();

// Route to get all saved posts
router.get("/savedPosts/:userId", getAllSavedPosts);

// Route to create a new saved post
router.post("/savedPosts", createSavedPost);

// Route to delete a saved post by ID
router.delete("/savedPosts/:id", deleteSavedPost);

export default router;
