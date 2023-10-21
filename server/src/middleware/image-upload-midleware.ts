import multer, { MulterError } from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  filename: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    callback(null, true); // Accept the file
  } else {
    callback(
      new MulterError("LIMIT_UNEXPECTED_FILE", "File type not supported.")
    );
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5, // 5MB file size limit
  },
});

export default upload;
