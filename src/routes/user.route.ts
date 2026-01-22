import express from 'express';
import { getAllUsers, updateUserRole } from '../controllers/user.controller';
import validationHandler from '../middlewares/validationHandler';
import { updateUserRoleSchema } from '../validations/auth.validations';

const router = express.Router();

router.get('/all', getAllUsers);
router.patch(
  '/:id/role',
  validationHandler(updateUserRoleSchema),
  updateUserRole,
);

export default router;
