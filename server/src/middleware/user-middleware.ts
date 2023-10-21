import { RequestHandler } from "express";
import createHttpError from "http-errors";

export const isUserAuthenticated: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    next();
  } else {
    next(createHttpError(401, "User not authenticated"));
  }
};
