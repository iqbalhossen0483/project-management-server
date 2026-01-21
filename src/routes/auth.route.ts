import express from 'express';
import { login, logout, register } from '../controllers/auth.controller';
import validationHandler from '../middlewares/validationHandler';
import { loginSchema, registerSchema } from '../validations/auth.validations';

const router = express.Router();

router.post('/register', validationHandler(registerSchema), register);

router.post('/login', validationHandler(loginSchema), login);

router.post('/logout', logout);

export default router;
