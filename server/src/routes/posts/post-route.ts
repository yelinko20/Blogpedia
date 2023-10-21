// postRoutes.ts
import express from "express";
import {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
  getAllPublishedPosts,
  getPostByTag,
  getAllPostsByUsername,
} from "../../controllers/posts/post-controller";
import upload from "../../middleware/image-upload-midleware";
import { isUserAuthenticated } from "../../middleware/user-middleware";

const router = express.Router();

// Create a new post
router.route("/posts").post(upload.single("postImage"), createPost);

// Get all posts
router.route("/posts").get(getAllPosts);

// Get all published posts
router.route("/published-posts").get(getAllPublishedPosts);

// Get all posts by username
router.route("/username-posts").get(getAllPostsByUsername);

// Get a single post by ID
router.route("/posts/:postId").get(getPostById);

// Get Posts by Tag
router.route("/post/tag").get(getPostByTag);

// Update a post by ID
router
  .route("/posts/:postId")
  .patch(upload.single("postImage"), isUserAuthenticated, updatePost);

// Delete a post by ID
router.route("/posts/:postId").delete(deletePost);

export default router;
