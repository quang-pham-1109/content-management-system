import { Router } from 'express';
import { verifyTokenFromHeader, validate } from '../middleware';
import {
  createPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  updatePostContentByIdHandler,
} from '../controllers';
import { createPostSchema } from '../schemas';

const postRouter = Router();

postRouter.post('/', verifyTokenFromHeader, createPostHandler);

postRouter.get('/', getAllPostsHandler);

postRouter.get('/:postId', getPostByIdHandler);

postRouter.get('/:categoryId/category', verifyTokenFromHeader, getPostByIdHandler);

postRouter.put('/:postId', verifyTokenFromHeader, updatePostContentByIdHandler);


export { postRouter };
