// import { Router } from 'express';
// import { verifyTokenFromHeader, validate } from '../middleware';
// import { listSchema } from '../schemas';
// import {
//   createListHandler,
//   getListsByBoardIdHandler,
//   getListByIdHandler,
//   updateListHandler,
//   deleteListHandler,
// } from '../controllers';

// const listRouter = Router();

// listRouter.post(
//   '/',
//   validate(listSchema),
//   verifyTokenFromHeader,
//   createListHandler,
// );

// listRouter.get(
//   '/:boardId/board',
//   verifyTokenFromHeader,
//   getListsByBoardIdHandler,
// );

// listRouter.get('/:listId', verifyTokenFromHeader, getListByIdHandler);

// listRouter.put('/:listId', verifyTokenFromHeader, updateListHandler);

// listRouter.delete('/:listId', verifyTokenFromHeader, deleteListHandler);

// export { listRouter };
