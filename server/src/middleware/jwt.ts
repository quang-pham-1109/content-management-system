import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

import dotenv from 'dotenv';
import { StatusCodes } from 'http-status-codes';
dotenv.config();

const secretKey = process.env.SECRET_KEY;

type JWTToken = {
  userId: number;
  iat: number;
  exp: number;
  iss: string;
};

export const generateToken = (userId: number) => {
  const issuer = 'cms';
  const expiresIn = '100d';
  const payload = { userId };
  return jwt.sign(payload, secretKey!, { issuer, expiresIn });
};

export const verifyTokenFromHeader = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }

  const decodedToken: JWTToken = jwt.verify(token, secretKey!) as any;
  if (decodedToken.iss !== 'cms' || !decodedToken.userId) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized' });
  }

  next();
};

export const getUserIdFromToken = (req: Request) => {
  const authHeader = req.headers.authorization;

  const token = authHeader!.split(' ')[1];

  const decodedToken = jwt.verify(token, secretKey!) as any;
  return decodedToken.userId;
};
