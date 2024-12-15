import { Router } from 'express';
import { loginHandler, registerHandler } from '../controllers';
import { validate } from '../middleware';
import { loginSchema, registerSchema } from '../schemas';

const authRouter = Router();

authRouter.post('/login', validate(loginSchema), loginHandler);

authRouter.post('/register', validate(registerSchema), registerHandler);

export { authRouter };
