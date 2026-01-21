import express from 'express';
import {
  login,
  logout,
  refreshToken,
  register,
  sendInvitationForRegistration,
} from '../controllers/auth.controller';
import { authenticationHandler } from '../middlewares/authenticationHandler';
import validationHandler from '../middlewares/validationHandler';
import {
  loginSchema,
  registerSchema,
  sendInvitationForRegistrationSchema,
} from '../validations/auth.validations';

const router = express.Router();

router.post('/register', validationHandler(registerSchema), register);

router.post('/login', validationHandler(loginSchema), login);

router.post('/refresh', refreshToken);

router.post(
  '/send-invitation',
  authenticationHandler,
  validationHandler(sendInvitationForRegistrationSchema),
  sendInvitationForRegistration,
);

router.post('/logout', authenticationHandler, logout);

export default router;
