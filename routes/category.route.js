// routes/category.routes.js
import { Router } from 'express';
import {
  getCategories,
  createCategory,
  deleteCategory,
} from '../controllers/category.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = Router();
router.use(requireAuth);

router.get('/', getCategories);
router.post('/', createCategory);
router.delete('/:id', deleteCategory);

export default router;
