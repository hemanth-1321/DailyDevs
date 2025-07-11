import { db } from "../config/db";

export const createLogAndUpdateStreak = async (
  userId: string,
  content: string
) => {
  try {
    const now = new Date();

    // Start of today (midnight UTC)
    const todayStr = now.toISOString().split("T")[0];
    const todayStart = new Date(todayStr);
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    // Check if user already logged today
    const existingTodayLog = await db.log.findFirst({
      where: {
        userId,
        createdAt: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
    });

    // Create today's log regardless (frontend can choose to hide if already exists)
    const log = await db.log.create({
      data: {
        userId,
        content,
      },
    });

    if (existingTodayLog) {
      return log;
    }

    // Get current metrics
    const metrics = await db.userMetrics.findFirst({
      where: { userId },
    });

    let currentStreak = 1;
    let bestStreak = metrics?.bestStreak || 0;

    // Calculate yesterday's boundaries
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const ydayStr = yesterday.toISOString().split("T")[0];
    const ydayStart = new Date(ydayStr);
    const ydayEnd = new Date(ydayStart.getTime() + 24 * 60 * 60 * 1000);

    // Check if user logged yesterday
    const hadLoggedYesterday = await db.log.findFirst({
      where: {
        userId,
        createdAt: {
          gte: ydayStart,
          lt: ydayEnd,
        },
      },
    });

    // Streak logic
    if (hadLoggedYesterday && metrics?.currentStreak) {
      currentStreak = metrics.currentStreak + 1;
    } else {
      currentStreak = 1;
    }

    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
    }

    // Update or create userMetrics
    await db.userMetrics.upsert({
      where: {
        userId: userId,
      },
      update: {
        currentStreak,
        bestStreak,
        totalLogs: { increment: 1 },
      },
      create: {
        userId,
        currentStreak,
        bestStreak,
        totalLogs: 1,
      },
    });

    return log;
  } catch (error) {
    console.error("Error in createLogAndUpdateStreak:", error);
    throw error;
  }
};
