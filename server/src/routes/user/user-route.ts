// User routes

import {
  getUserAuthenticated,
  handleRefreshToken,
  logIn,
  logOut,
  register,
} from "../../controllers/user/user-controller";
import { isUserAuthenticated } from "../../middleware/user-middleware";
import { Router } from "express";

const router = Router();

// auth
router.route("/register").post(register);
router.route("/log-in").post(logIn);
router.route("/log-out").post(logOut);
router.route("/user").get(isUserAuthenticated, getUserAuthenticated);
router.route("/refresh-token").get(handleRefreshToken);

export default router;
