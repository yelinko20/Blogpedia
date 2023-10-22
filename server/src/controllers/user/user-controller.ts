import "dotenv/config";
import bcrypt from "bcrypt";
import { Request, Response, NextFunction, RequestHandler } from "express";
import jwt from "jsonwebtoken";
import randomColor from "randomcolor";
import createHttpError from "http-errors"; // Import createHttpError

import { env } from "../../utils/validateEnv";
import { prisma } from "../../lib/prisma";
import { createAccessToken, createRefreshAccessToken } from "../../utils/token";
import generateUsername from "../../utils/generate-username";

type Register = {
  name: string;
  email: string;
  password: string;
};

export const register: RequestHandler<
  unknown,
  unknown,
  Register,
  unknown
> = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name) {
      throw createHttpError(400, "Name is required!");
    }

    if (!email) {
      throw createHttpError(400, "Email is required!");
    }

    if (!password) {
      throw createHttpError(400, "Password is required!");
    }

    const isExistingEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (isExistingEmail) {
      throw createHttpError(409, "This email is already in use.");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    // Generate a unique username
    const username = await generateUsername(name);

    // Create the user without the profile
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
        profile: {
          create: {
            username,
            bgColor: randomColor(),
          },
        }, // Use the generated username
        loginCount: 1, // Set initial loginCount to 1 for a successful register
      },
    });

    const accessToken = createAccessToken(newUser.id);
    const refreshToken = createRefreshAccessToken(newUser.id);
    const greeting = "Hello";
    res.cookie("token", refreshToken, {
      sameSite: "lax",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error); // Create and pass an HTTP error
  }
};

type Login = {
  email: string;
  password: string;
};

const MAX_LOGIN_ATTEMPTS = 5; // Maximum allowed failed attempts
const LOCKOUT_DURATION = 60 * 5; // Lockout duration in seconds (5 minutes)

export const logIn: RequestHandler<unknown, unknown, Login, unknown> = async (
  req,
  res,
  next
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw createHttpError(400, "Email and password are required!");
    }

    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw createHttpError(400, "Invalid email or password!");
    }

    if (
      user.failedLoginAttempts >= MAX_LOGIN_ATTEMPTS &&
      user.lastFailedLogin
    ) {
      const lockoutDuration = Math.floor(
        (Date.now() - user.lastFailedLogin.getTime()) / 1000
      );

      if (lockoutDuration < LOCKOUT_DURATION) {
        const remainingLockoutTime = LOCKOUT_DURATION - lockoutDuration;
        throw createHttpError(
          429,
          `Too many attempts. Please try again after ${
            remainingLockoutTime > 60
              ? `${Math.floor(remainingLockoutTime / 60)} minutes`
              : `${remainingLockoutTime} seconds`
          }`
        );
      } else {
        user = await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            failedLoginAttempts: 0,
            lastFailedLogin: null,
            loginCount: user.loginCount + 1,
          },
        });
      }
    }

    const validatePassword = await bcrypt.compare(password, user.password);
    const validateEmail = user.email === email;

    if (!validatePassword || !validateEmail) {
      user = await prisma.user.update({
        where: {
          id: user.id,
        },
        data: {
          failedLoginAttempts: user.failedLoginAttempts + 1,
          lastFailedLogin: new Date(),
        },
      });
      throw createHttpError(400, "Invalid email or password!");
    }

    user = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        failedLoginAttempts: 0,
        lastFailedLogin: null,
        loginCount: user.loginCount + 1,
      },
    });

    const accessToken = createAccessToken(user.id);
    const refreshToken = createRefreshAccessToken(user.id);

    res.cookie("token", refreshToken, {
      sameSite: "none",
      secure: true,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.status(200).json({ accessToken });
  } catch (error) {
    next(error);
  }
};

export const getUserAuthenticated: RequestHandler = async (req, res, next) => {
  try {
    const authorizationHeader = req.headers["authorization"];

    if (!authorizationHeader) {
      throw createHttpError(401, "Unauthorized");
    }

    const token = authorizationHeader.split(" ")[1];

    const decoded = jwt.verify(token, env.ACCESS_TOKEN_SECRET);

    const user = await prisma.user.findUnique({
      where: {
        // @ts-ignore
        id: decoded.userId,
      },
      include: {
        profile: true,
        posts: true,
        savedPosts: true,
      },
    });

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const logOut = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;
  if (cookies?.token) {
    res.clearCookie("token", { httpOnly: true });
    return res.sendStatus(403);
  }
};

export const handleRefreshToken: RequestHandler = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies?.token) return res.sendStatus(401);
    console.log(cookies.token);

    const refreshToken = cookies.token;

    jwt.verify(
      refreshToken,
      env.REFRESH_TOKEN_SECRET,
      (err: unknown, decoded: any) => {
        if (err) return res.sendStatus(403);
        console.log(decoded);
        const accessToken = createAccessToken(decoded.userId);
        return res.json({ accessToken });
      }
    );
  } catch (error) {
    next(error);
  }
};
