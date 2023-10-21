import createHttpError from "http-errors";
import cloudinaryV2 from "./cloudinary-config";
import { UploadApiResponse } from "cloudinary";

function CloudinaryUploadImage(image: string): Promise<UploadApiResponse> {
  return cloudinaryV2.uploader.upload(image, function (err, result) {
    if (err) {
      console.log(err);
      throw createHttpError(500, { success: false, message: "Error" });
    }
    return result;
  });
}

export default CloudinaryUploadImage;
