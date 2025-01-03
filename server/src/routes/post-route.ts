import { Router } from 'express';
import { verifyTokenFromHeader, validate } from '../middleware';
import {
  createPostHandler,
  getAllPostsHandler,
  getPostByIdHandler,
  updatePostByIdHandler,
} from '../controllers';

const postRouter = Router();

postRouter.post('/', verifyTokenFromHeader, createPostHandler);

postRouter.get('/', getAllPostsHandler);

postRouter.get('/:postId', getPostByIdHandler);

postRouter.get(
  '/:categoryId/category',
  verifyTokenFromHeader,
  getPostByIdHandler,
);

postRouter.put('/:postId', verifyTokenFromHeader, updatePostByIdHandler);

export { postRouter };
