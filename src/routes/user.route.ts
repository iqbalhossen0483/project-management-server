import express from 'express';
import {
  getAllUsers,
  updateUserRole,
  updateUserStatus,
} from '../controllers/user.controller';
import validationHandler from '../middlewares/validationHandler';
import {
  updateUserRoleSchema,
  updateUserStatusSchema,
} from '../validations/auth.validations';

const router = express.Router();

router.get('/all', getAllUsers);
router.patch(
  '/:id/role',
  validationHandler(updateUserRoleSchema),
  updateUserRole,
);
router.patch(
  '/:id/status',
  validationHandler(updateUserStatusSchema),
  updateUserStatus,
);

export default router;
