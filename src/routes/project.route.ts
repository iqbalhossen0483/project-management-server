import express from 'express';
import {
  getAllProjects,
  postProject,
  updateProject,
} from '../controllers/project.controller';
import authRoleHandler from '../middlewares/authRoleHandler';
import validationHandler from '../middlewares/validationHandler';
import { USER_ROLE } from '../types/common';
import {
  createProjectSchema,
  updateProjectSchema,
} from '../validations/project.validation';

const router = express.Router();

router.get('/all', getAllProjects);
router.post('/create', validationHandler(createProjectSchema), postProject);
router.put(
  '/update/:id',
  authRoleHandler(USER_ROLE.ADMIN),
  validationHandler(updateProjectSchema),
  updateProject,
);

export default router;
