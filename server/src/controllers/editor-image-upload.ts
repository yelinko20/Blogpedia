import { RequestHandler } from "express";
import CloudinaryUploadImage from "../utils/cloudinary-upload";

export const EditorImageUpload: RequestHandler = async (req, res, next) => {
  try {
    const imagePath = req.file ? req.file.path : "";
    const result = await CloudinaryUploadImage(imagePath);
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
