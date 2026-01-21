import express from 'express';
import authRoute from './auth.route';
const router = express.Router();

router.get('/', (_req, res) => {
  res.status(200).json({ message: 'Welcome to the API' });
});

// Routes
router.use('/auth', authRoute);

export default router;
