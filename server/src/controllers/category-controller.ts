import { StatusCodes } from 'http-status-codes';
import { Request, Response } from 'express';
import { createCategorySchema } from '../schemas/category-schema';
import { createCategory, getAllCategory } from '../services/category-service';

export const createCategoryHandler = async (req: Request, res: Response) => {
  try {
    const parsedBody = createCategorySchema.parse({ body: req.body }).body;

    const { name, description } = parsedBody;

    const newCategory = await createCategory(name, description);
    if (!newCategory) {
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Failed to create category' });
    }

    return res
      .status(StatusCodes.CREATED)
      .json({ message: 'Created Successfully' });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const getAllCategoryHandler = async (req: Request, res: Response) => {
  try {
    const categories = await getAllCategory();

    return res.status(StatusCodes.OK).json(categories);
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
