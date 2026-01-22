import express from 'express';
import { authenticationHandler } from '../middlewares/authenticationHandler';
import authRoleHandler from '../middlewares/authRoleHandler';
import { USER_ROLE } from '../types/common';
import authRoute from './auth.route';
import userRoute from './user.route';
const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// Routes
router.use('/auth', authRoute);

// Protected and admin routes
router.use(
  '/user',
  authenticationHandler,
  authRoleHandler(USER_ROLE.ADMIN),
  userRoute,
);

export default router;
