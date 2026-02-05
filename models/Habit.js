import mongoose from 'mongoose';

const habitSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: '',
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    icon: {
      type: String, // emoji
      default: '🔥',
    },

    streak: {
      type: Number,
      default: 0,
    },

    targetStreak: {
      type: Number,
    },

    lastCompleted: {
      type: Date,
      default: null,
    },

    history: [
      {
        type: Date,
      },
    ],

    xp: {
      type: Number,
      default: 0,
    },

    isPaused: {
      type: Boolean,
      default: false,
    },

    userId: {
      type: String, // Clerk userId
      required: true,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Habit = mongoose.model('Habit', habitSchema);
