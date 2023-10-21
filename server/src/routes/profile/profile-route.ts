import { Router } from "express";
import {
  getUserProfile,
  updateUserProfile,
} from "../../controllers/profile/profile-controller";
import upload from "../../middleware/image-upload-midleware";

const router = Router();

router.route("/profile/:username").get(getUserProfile);
router
  .route("/profile/:userId")
  .patch(upload.single("image"), updateUserProfile);

export default router;
