// import { StatusCodes } from 'http-status-codes';
// import { Request, Response } from 'express';
// import {
//   getListById,
//   createCard,
//   getCardsByListId,
//   getCardById,
//   updateCardById,
//   deleteCardById,
// } from '../services';

// export const createCardHandler = async (req: Request, res: Response) => {
//   try {
//     const { ListId, Title, DueDate, ReminderDate, Description } = req.body;

//     const list = await getListById(ListId);
//     if (!list) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: 'List not found' });
//     }

//     await createCard(Title, DueDate, ReminderDate, Description, ListId);
//     return res
//       .status(StatusCodes.CREATED)
//       .json({ message: 'Created Successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
//   }
// };

// export const getCardsByListIdHandler = async (req: Request, res: Response) => {
//   try {
//     const { listId } = req.params;

//     const list = await getListById(parseInt(listId));
//     if (!list) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: 'List not found' });
//     }

//     const cards = await getCardsByListId(parseInt(listId));
//     if (!cards) {
//       return res.status(StatusCodes.NOT_FOUND).json({ message: 'Not found' });
//     }

//     return res.status(StatusCodes.OK).json(cards);
//   } catch (error) {
//     console.log(error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
//   }
// };

// export const getCardByIdHandler = async (req: Request, res: Response) => {
//   try {
//     const { cardId } = req.params;

//     const card = await getCardById(parseInt(cardId));
//     if (!card) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: 'Card not found' });
//     }

//     return res.status(StatusCodes.OK).json(card);
//   } catch (error) {
//     console.log(error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
//   }
// };

// export const updateCardByIdHandler = async (req: Request, res: Response) => {
//   try {
//     const { cardId } = req.params;
//     const { Title, DueDate, ReminderDate, Description } = req.body;

//     const card = await getCardById(parseInt(cardId));
//     if (!card) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: 'Card not found' });
//     }

//     await updateCardById(
//       parseInt(cardId),
//       Title,
//       DueDate,
//       ReminderDate,
//       Description,
//     );

//     return res
//       .status(StatusCodes.OK)
//       .json({ message: 'Card updated successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
//   }
// };

// export const deleteCardHandler = async (req: Request, res: Response) => {
//   try {
//     const { cardId } = req.params;

//     const card = await getCardById(parseInt(cardId));
//     if (!card) {
//       return res
//         .status(StatusCodes.NOT_FOUND)
//         .json({ message: 'Card not found' });
//     }

//     await deleteCardById(parseInt(cardId));

//     return res
//       .status(StatusCodes.OK)
//       .json({ message: 'Card deleted successfully' });
//   } catch (error) {
//     console.log(error);
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
//   }
// };
