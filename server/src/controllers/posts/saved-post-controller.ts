import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import { prisma } from "../../lib/prisma";

// Get all saved posts
export const getAllSavedPosts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      throw createHttpError(400, "User ID is required!");
    }

    const savedPosts = await prisma.savedPost.findMany({
      where: {
        userId,
      },
      include: {
        post: {
          include: {
            tags: true,
            author: {
              include: {
                profile: true,
              },
            },
          },
        },
      },
    });

    res.status(200).json(savedPosts); // Set status code to 200 for a successful response
  } catch (error) {
    next(error); // Pass the error to the next middleware or error handler
  }
};

// Create a new saved post
export const createSavedPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { userId, postId } = req.body;

    // Check if the user is trying to save their own post
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
      select: {
        authorId: true,
      },
    });

    if (post?.authorId === userId) {
      throw createHttpError(400, "You cannot save your owned post");
    }

    const savedPost = await prisma.savedPost.create({
      data: { userId, postId },
    });
    res.status(201).json(savedPost); // Set status code to 201 for resource created successfully
  } catch (error) {
    next(error); // Pass the error to the next middleware or error handler
  }
};

// Delete a saved post by ID
export const deleteSavedPost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw createHttpError(400, "SavedPost ID is missing");
    }
    await prisma.savedPost.delete({
      where: { id },
    });
    res.status(204).json({ message: "post deleted successfully" });
  } catch (error) {
    next(error);
  }
};
