import { Router } from "express";
import { EditorImageUpload } from "../controllers/editor-image-upload";
import upload from "../middleware/image-upload-midleware";

const router = Router();

router.route("/upload").post(upload.single("image"), EditorImageUpload);

export default router;
