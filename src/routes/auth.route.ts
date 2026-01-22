import express from 'express';
import {
  getProfile,
  login,
  logout,
  refreshToken,
  register,
  sendInvitationForRegistration,
} from '../controllers/auth.controller';
import { authenticationHandler } from '../middlewares/authenticationHandler';
import authRoleHandler from '../middlewares/authRoleHandler';
import validationHandler from '../middlewares/validationHandler';
import { USER_ROLE } from '../types/common';
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
  authRoleHandler(USER_ROLE.ADMIN),
  validationHandler(sendInvitationForRegistrationSchema),
  sendInvitationForRegistration,
);

router.get('/me', authenticationHandler, getProfile);

router.post('/logout', authenticationHandler, logout);

export default router;
