import { Router } from 'express';
import {
  authenticationStatusHandler,
  loginHandler,
  registerHandler,
} from '../controllers';
import { validate, verifyTokenFromHeader } from '../middleware';
import { loginSchema, registerSchema } from '../schemas';

const authRouter = Router();

authRouter.get('/', verifyTokenFromHeader, authenticationStatusHandler);

authRouter.post('/login', validate(loginSchema), loginHandler);

authRouter.post('/register', validate(registerSchema), registerHandler);

export { authRouter };
