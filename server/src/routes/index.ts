import { authRouter } from './auth-route';
import { postRouter } from './post-route';
// import { listRouter } from './category-route';

import { Application } from 'express';

export const initRoutes = (app: Application) => {
  app.use('/auth', authRouter);
  app.use('/posts', postRouter);
  // app.use('/board', boardRouter);
  // app.use('/list', listRouter);
  // app.use('/card', cardRouter);
  // app.use('/comment', commentRouter);
  // app.use('/checklist', checkListRouter);
};
