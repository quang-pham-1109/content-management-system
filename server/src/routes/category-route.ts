import { Router } from 'express';
import { verifyTokenFromHeader, validate } from '../middleware';
import {
  createCategoryHandler,
  getAllCategoryHandler,
} from '../controllers';

const categoryRouter = Router();

categoryRouter.post('/', verifyTokenFromHeader, createCategoryHandler);

categoryRouter.get(
  '/',
  getAllCategoryHandler,
);

export { categoryRouter };
