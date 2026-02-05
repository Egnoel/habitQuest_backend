// utils/level.js
export function calculateLevel(xp, currentLevel) {
  let level = currentLevel;
  let remainingXp = xp;

  while (remainingXp >= level * 100) {
    remainingXp -= level * 100;
    level++;
  }

  return {
    level,
    xp: remainingXp,
  };
}
