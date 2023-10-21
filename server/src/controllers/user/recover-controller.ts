import { RequestHandler } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import ejs from "ejs";

import { prisma } from "../../lib/prisma";
import generateOTPCode from "../../utils/generate-otp";
import sendEmail from "../../utils/send-email";
import path from "path";

const otpCodes = new Map<string, { code: string; expiredAt: number }>();
let sharedEmail = "";

export const sendOTPByEmail: RequestHandler = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw createHttpError(400, "User email is required!");
    }

    sharedEmail = email;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw createHttpError(400, "email does not exist!");
    }

    const otpCode = generateOTPCode();
    otpCodes.set(email, {
      code: otpCode,
      expiredAt: Date.now() * 1000 * 60 * 3,
    });

    const data = { user: { username: user.name }, otpCode };

    const html = await ejs.renderFile(
      path.join(__dirname, "../../mail/otp-code.ejs"),
      data
    );

    sendEmail(email, html, "BlogPedia");

    res.status(200).json({ message: "OTP code sent via email" });
  } catch (error) {
    next(error);
  }
};

export const verifyOTPCode: RequestHandler = async (req, res, next) => {
  try {
    const { otpCode } = req.body;

    const email = sharedEmail; // Retrieve the email from the shared variable

    const storedOTP = otpCodes.get(email);

    if (!email) {
      throw createHttpError(400, "Email not found!");
    }

    if (!storedOTP) {
      throw createHttpError(400, "OTP code not found or expired!");
    }

    const { code, expiredAt } = storedOTP;

    if (otpCode !== code || Date.now() > expiredAt) {
      throw createHttpError(400, "Invalid OTP code or expired!");
    }

    res.status(200).json({ message: "OTP code verified!" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword: RequestHandler = async (req, res, next) => {
  try {
    const { newPassword } = req.body;

    let email = sharedEmail;

    // Checking if the user's OTP code has been verified!
    const verifiedOTP = otpCodes.get(email);

    if (!verifiedOTP) {
      throw createHttpError(400, "OTP code verification is required!");
    }

    // Verifying the user exists
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw createHttpError(400, "User not found!");
    }

    // Update user's password and clear the OTP code
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    // Clear OTP code
    otpCodes.delete(email);

    res.status(201).json({ message: "Password reset successful!" });
  } catch (error) {
    next(error);
  }
};
