import { levelFor, minutesStudied, predictGrade, streakFor, xpFor } from "./study-engine.mjs";

// A compact progress summary of one study record, for the admin user table.
export function summarizeStudy(data) {
  if (!data || typeof data !== "object") return null;
  try {
    const attempts = Array.isArray(data.attempts) ? data.attempts : [];
    const level = levelFor(xpFor(data));
    const grade = predictGrade(data);
    return {
      lessons: Array.isArray(data.completedLessons) ? data.completedLessons.length : 0,
      attempts: attempts.length,
      latest: attempts[0]?.percent ?? null,
      best: attempts.length ? Math.max(...attempts.map((item) => item.percent || 0)) : null,
      level: level.level, rank: level.rank, xp: level.xp,
      streak: streakFor(data).current,
      minutes7: minutesStudied(data, 7),
      grade: grade?.grade || null,
      mistakes: Array.isArray(data.mistakes) ? data.mistakes.length : 0,
    };
  } catch { return null; }
}
