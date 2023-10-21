import { cleanEnv, port, str, email } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port(),
  ACCESS_TOKEN_SECRET: str(),
  EMAIL_USERNAME: email(),
  EMAIL_PASSWORD: str(),
  SESSION_SECRET: str(),
  REFRESH_TOKEN_SECRET: str(),
  // cloudinary
  CLOUD_NAME: str(),
  CLOUD_API_KEY: str(),
  CLOUD_API_SECRET: str(),
  // client url
  CLIENT_URL: str(),
});
