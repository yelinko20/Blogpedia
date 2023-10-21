import jwt from "jsonwebtoken";
import { env } from "./validateEnv";

const createAccessToken = (userId: string) => {
  return jwt.sign({ userId }, env.ACCESS_TOKEN_SECRET, {
    expiresIn: "30s",
  });
};

const createRefreshAccessToken = (userId: string) => {
  return jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: "1d",
  });
};

export { createAccessToken, createRefreshAccessToken };
