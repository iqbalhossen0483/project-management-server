import express from 'express';
import authController from '../controllers/auth.controller';
import validationHandler from '../middlewares/validationHandler';
import { registerSchema } from '../validations/auth.validations';

const router = express.Router();

router.post(
  '/register',
  validationHandler(registerSchema),
  authController.register,
);

export default router;
