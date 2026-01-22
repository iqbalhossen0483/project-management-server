import express from 'express';
import { getAllProjects, postProject } from '../controllers/project.controller';
import validationHandler from '../middlewares/validationHandler';
import { createProjectSchema } from '../validations/project.validation';

const router = express.Router();

router.get('/all', getAllProjects);
router.post('/create', validationHandler(createProjectSchema), postProject);

export default router;
