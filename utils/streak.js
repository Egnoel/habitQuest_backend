// utils/streak.js
export function calculateStreak(dates) {
  if (!dates.length) return 0;

  // normaliza e ordena
  const sorted = dates
    .map((d) => new Date(d))
    .sort((a, b) => b - a);

  let streak = 1;

  for (let i = 0; i < sorted.length - 1; i++) {
    const diff =
      (sorted[i] - sorted[i + 1]) /
      (1000 * 60 * 60 * 24);

    if (diff === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}
