// controllers/habit.controller.js
import mongoose from 'mongoose';
import { Habit } from '../models/Habit.js';
import { UserProfile } from '../models/UserProfile.js';
import { calculateStreak } from '../utils/streak.js';
import { calculateLevel } from '../utils/level.js';

const normalizeDate = (date) =>
  new Date(`${date}T00:00:00.000Z`);

export const getHabits = async (req, res) => {
  try {
    const habits = await Habit.find({ userId: req.userId })
      .populate('category')
      .sort({ createdAt: -1 });

    res.status(200).json(habits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createHabit = async (req, res) => {
  try {
    const habit = await Habit.create({
      ...req.body,
      category: req.body.category_id,
      userId: req.userId,
    });

    res.status(201).json(habit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const updateHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true }
    );

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json(habit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteHabit = async (req, res) => {
  try {
    const habit = await Habit.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    res.status(200).json({ message: 'Habit deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const completeHabit = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { date, xpGained = 0 } = req.body;
    const completionDate = normalizeDate(date);

    // 1️⃣ Buscar hábito (dentro da session)
    const habit = await Habit.findOne(
      {
        _id: req.params.id,
        userId: req.userId,
      },
      null,
      { session }
    );

    if (!habit) {
      throw new Error('Habit not found');
    }

    // 2️⃣ Evitar duplicação
    const alreadyCompleted = habit.history.some(
      (d) => d.getTime() === completionDate.getTime()
    );

    if (alreadyCompleted) {
      throw new Error('Already completed for this date');
    }

    // 3️⃣ Atualizar histórico
    habit.history.push(completionDate);

    habit.streak = calculateStreak(habit.history);
    habit.lastCompleted = completionDate;
    habit.xp += xpGained;

    await habit.save({ session });

    // 4️⃣ Buscar perfil do usuário
    const profile = await UserProfile.findOne(
      { clerkUserId: req.userId },
      null,
      { session }
    );

    if (!profile) {
      throw new Error('User profile not found');
    }

    // 5️⃣ Atualizar XP do usuário
    profile.totalXp += xpGained;
    profile.xp += xpGained;

    const { level, xp } = calculateLevel(
      profile.xp,
      profile.level
    );

    profile.level = level;
    profile.xp = xp;

    await profile.save({ session });

    // 6️⃣ Commit
    await session.commitTransaction();
    session.endSession();

    return res.status(200).json({
      habit,
      profile,
    });
  } catch (err) {
    // 🔁 Rollback automático
    await session.abortTransaction();
    session.endSession();

    // erros esperados → 400 / 404
    if (
      err.message === 'Habit not found' ||
      err.message === 'User profile not found'
    ) {
      return res.status(404).json({ message: err.message });
    }

    if (err.message === 'Already completed for this date') {
      return res.status(400).json({ message: err.message });
    }

    return res.status(500).json({
      message: 'Failed to complete habit',
      error: err.message,
    });
  }
};

export const undoCompletion = async (req, res) => {
  try {
    const completionDate = normalizeDate(req.params.date);

    const habit = await Habit.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!habit) {
      return res.status(404).json({ message: 'Habit not found' });
    }

    const initialLength = habit.history.length;

    habit.history = habit.history.filter(
      (d) => d.getTime() !== completionDate.getTime()
    );

    if (habit.history.length === initialLength) {
      return res
        .status(404)
        .json({ message: 'Completion not found' });
    }

    habit.streak = Math.max(0, habit.streak - 1);
    habit.lastCompleted =
      habit.history.at(-1) || null;

    await habit.save();

    res.status(200).json(habit);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
