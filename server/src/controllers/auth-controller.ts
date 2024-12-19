import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { findUserByEmail, createUser } from '../services';
import { comparePassword, hashPassword, generateToken } from '../middleware';

export const loginHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (email === null || password === null) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Invalid input' });
    }

    const user = await findUserByEmail(email);
    if (!user || user.password === null) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'User not found' });
    }

    const isPasswordMatch = await comparePassword(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user.id);

    return res.status(StatusCodes.OK).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const registerHandler = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (email === null || password === null) {
      return res.status(StatusCodes.BAD_REQUEST).json();
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: 'User already exists' });
    }

    const hashedPassword = await hashPassword(password);

    const createdUser = await createUser(email, hashedPassword);

    const token = generateToken(createdUser);

    return res.status(StatusCodes.CREATED).json({ token: token });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};

export const authenticationStatusHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    return res
      .status(StatusCodes.OK)
      .json({ message: 'You are authenticated' });
  } catch (error) {
    console.log(error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
