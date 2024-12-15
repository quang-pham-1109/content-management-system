import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  getPostById,
  findUserById,
  updatePostById,
  createPost,
  getAllPosts,
  getPostByCategoryId,
} from '../services';
import { getUserIdFromToken } from '../middleware';
import { createPostSchema, updatePostSchema } from '../schemas';

export const createPostHandler = async (req: Request, res: Response) => {
  try {
    const parsedBody = createPostSchema.parse({ body: req.body }).body;

    const { title, content, slug } = parsedBody;
    const userId = getUserIdFromToken(req);

    const user = await findUserById(userId);
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    const post = await createPost(title, userId, content, slug);
    if (post) {
      return res.status(StatusCodes.CREATED).json({ ...post });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getAllPostsHandler = async (req: Request, res: Response) => {
  try {
    const posts = await getAllPosts();

    return res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getPostByIdHandler = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);

    if (Number.isNaN(postId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const post = await getPostById(postId);
    if (!post) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
    }

    return res.status(StatusCodes.OK).json(post);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const updatePostByIdHandler = async (req: Request, res: Response) => {
  try {
    const postId = Number(req.params.postId);

    const parsedBody = updatePostSchema.parse({ body: req.body }).body;

    const { content, status, title, categoryId } = parsedBody;

    if (Number.isNaN(postId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const post = await getPostById(postId);
    if (!post) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'Board not found' });
    }

    const updatedPost = await updatePostById(
      postId,
      content,
      status,
      title,
      categoryId,
    );
    if (updatedPost) {
      return res
        .status(StatusCodes.OK)
        .json({ message: 'Post content updated' });
    }
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getPostByCategoryIdHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const categoryId = Number(req.params.categoryId);

    if (Number.isNaN(categoryId)) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const posts = await getPostByCategoryId(categoryId);

    return res.status(StatusCodes.OK).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
