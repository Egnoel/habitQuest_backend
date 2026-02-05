import mongoose from 'mongoose';

const userProfileSchema = new mongoose.Schema(
  {
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    email: {
      type: String,
      required: true,
      index: true,
    },

    username: {
      type: String, // display name
      trim: true,
    },

    imageUrl: {
      type: String,
    },

    level: {
      type: Number,
      default: 1,
    },

    xp: {
      type: Number,
      default: 0,
    },

    totalXp: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const UserProfile = mongoose.model(
  'UserProfile',
  userProfileSchema
);
