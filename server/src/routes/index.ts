import { authRouter } from './auth-route';
import { postRouter } from './post-route';
import { categoryRouter } from './category-route';

import { Application } from 'express';

export const initRoutes = (app: Application) => {
  app.use('/auth', authRouter);
  app.use('/posts', postRouter);
  app.use('/categories', categoryRouter);
};
