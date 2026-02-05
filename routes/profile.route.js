// routes/profile.routes.js
import { Router } from 'express';
import {
  getProfile,
  updateProfile,
} from '../controllers/profile.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = Router();

router.use(requireAuth);

router.get('/', getProfile);
router.patch('/', updateProfile);

export default router;
