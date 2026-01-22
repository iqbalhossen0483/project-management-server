import express from 'express';
import {
  getAllProjects,
  getSingleProject,
  postProject,
  softDeleteProject,
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
router.get('/get-single/:id', getSingleProject);
router.post('/create', validationHandler(createProjectSchema), postProject);
router.put(
  '/update/:id',
  authRoleHandler(USER_ROLE.ADMIN),
  validationHandler(updateProjectSchema),
  updateProject,
);

router.delete(
  '/delete/:id',
  authRoleHandler(USER_ROLE.ADMIN),
  softDeleteProject,
);

export default router;
