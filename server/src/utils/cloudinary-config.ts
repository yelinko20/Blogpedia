import cloudinary from "cloudinary";
import { env } from "./validateEnv";

const cloudinaryV2 = cloudinary.v2;

cloudinaryV2.config({
  cloud_name: env.CLOUD_NAME,
  api_key: env.CLOUD_API_KEY,
  api_secret: env.CLOUD_API_SECRET,
});

export default cloudinaryV2;
