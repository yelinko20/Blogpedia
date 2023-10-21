import {
  resetPassword,
  sendOTPByEmail,
  verifyOTPCode,
} from "../../controllers/user/recover-controller";
import { Router } from "express";

const router = Router();

router.route("/send-otp").post(sendOTPByEmail);
router.route("/verify-otp").post(verifyOTPCode);
router.route("/password-reset").post(resetPassword);

export default router;
