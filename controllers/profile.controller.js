// controllers/profile.controller.js
import { UserProfile } from '../models/UserProfile.js';

export const getProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOne({
      clerkUserId: req.userId,
    });

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const profile = await UserProfile.findOneAndUpdate(
      { clerkUserId: req.userId },
      req.body,
      { new: true }
    );

    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }

    res.status(200).json(profile);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
