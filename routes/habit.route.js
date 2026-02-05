// routes/habit.routes.js
import { Router } from 'express';
import {
  getHabits,
  createHabit,
  updateHabit,
  deleteHabit,
  completeHabit,
  undoCompletion,
} from '../controllers/habit.controller.js';
import { requireAuth } from '../middlewares/requireAuth.js';

const router = Router();
router.use(requireAuth);

router.get('/', getHabits);
router.post('/', createHabit);
router.patch('/:id', updateHabit);
router.delete('/:id', deleteHabit);

// completions
router.post('/:id/complete', completeHabit);
router.delete('/:id/complete/:date', undoCompletion);

export default router;
