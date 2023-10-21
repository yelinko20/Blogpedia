import { RequestHandler } from "express";
import randomColor from "randomcolor";
import createHttpError from "http-errors";

import { prisma } from "../../lib/prisma";
import CloudinaryUploadImage from "../../utils/cloudinary-upload";

export const getUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const { username } = req.params;

    if (!username) {
      throw createHttpError(400, "User name is missing");
    }
    const userProfile = await prisma.profile.findUnique({
      where: {
        username,
      },
      include: {
        user: {
          include: {
            posts: true,
          },
        },
      },
    });

    res.status(200).json(userProfile);
  } catch (error) {
    next(error);
  }
};

export const updateUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const { bio, name } = req.body;
    const imagePath = req.file ? req.file.path : "";

    if (!bio || !name) {
      throw createHttpError(400, "Please provide both bio and name parameters");
    }

    const { userId } = req.params;

    if (!userId) {
      throw createHttpError(400, "User ID is missing");
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId,
      },
    });

    let result;
    if (imagePath) {
      const image = await CloudinaryUploadImage(imagePath);
      result = image.secure_url;
    }

    const updatedUserProfile = await prisma.profile.update({
      where: { userId },
      data: {
        bio,
        image: result ?? "",
        user: {
          update: {
            name,
          },
        },
      },
      include: {
        user: true,
      },
    });

    res.status(200).json(updatedUserProfile);
  } catch (error) {
    next(error);
  }
};
