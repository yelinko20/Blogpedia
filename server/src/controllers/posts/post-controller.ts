import { NextFunction, Request, RequestHandler, Response } from "express";
import { prisma } from "../../lib/prisma";
import createHttpError from "http-errors";

// Create a new post
export const createPost: RequestHandler = async (req, res, next) => {
  try {
    const { title, content, published, authorId, tags } = req.body;
    const imagePath = req.file ? req.file.path : "";

    if (!title) {
      throw createHttpError(400, "title is required!");
    }

    if (!content) {
      throw createHttpError(400, "content is required!");
    }

    if (!authorId) {
      throw createHttpError(400, "User not authenticated!");
    }

    let tagRecords: { name: string }[] = [];

    if (Array.isArray(tags)) {
      // Create tags if tags is an array
      tagRecords = tags.map((tagName) => ({ name: tagName }));
    } else if (tags) {
      // If it's not an array but a single tag, convert it to an array
      tagRecords = [{ name: tags }];
    }

    // Create a new post with tags
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        published,
        authorId,
        tags: {
          create: tagRecords,
        },
        image: imagePath,
      },
      include: {
        tags: true,
      },
    });

    res.status(200).json(newPost);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getPostByTag: RequestHandler = async (req, res, next) => {
  try {
    const tagName = req.query.tagName as string;

    const posts = await prisma.post.findMany({
      where: {
        tags: {
          some: {
            name: {
              contains: tagName,
              mode: "insensitive",
            },
          },
        },
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
    });

    return res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Get all posts
export const getAllPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        tags: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllPublishedPosts: RequestHandler = async (req, res, next) => {
  try {
    const posts = await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: {
        publishedAt: "desc",
      },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
        tags: true,
      },
    });
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};
// Get a single post by ID
export const getPostById: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      throw createHttpError(401, "Post id is required!");
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        author: {
          include: {
            profile: true,
          },
        },
      },
    });

    if (!post) {
      throw createHttpError(404, "Post not found!");
    }

    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const getAllPostsByUsername: RequestHandler = async (req, res, next) => {
  try {
    const username = req.query.username as string;

    if (!username) {
      throw createHttpError(400, "User name is required");
    }

    const user = await prisma.user.findFirst({
      where: {
        profile: {
          username,
        },
      },
      include: {
        posts: {
          include: {
            author: {
              include: {
                profile: true,
              },
            },
            tags: true,
          },
        },
      },
    });

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

// Update a post by ID
export const updatePost = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, content, published } = req.body;
    const { postId } = req.params;
    const imagePath = req.file ? req.file.path : "";

    if (!title) {
      throw createHttpError(400, "title is required!");
    }

    if (!content) {
      throw createHttpError(400, "content is required!");
    }

    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      throw createHttpError(404, "post not found!");
    }

    // Update the post
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
        published,
        image: imagePath,
      },
    });

    res.status(201).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// Delete a post by ID
export const deletePost: RequestHandler = async (req, res, next) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      throw createHttpError(401, "Post ID is required!");
    }

    // Delete the post
    await prisma.post.delete({
      where: { id: postId },
    });

    res.sendStatus(204); // No content
  } catch (error) {
    next(error);
  }
};
