import { db } from "../config/db";

export const createLogAndUpdateStreak = async (
  userId: string,
  content: string,
  repositoryUrl: string,
  repository: string
) => {
  try {
    const now = new Date();

    const todayStr = now.toISOString().split("T")[0];
    const todayStart = new Date(todayStr);
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000);

    const existingTodayLog = await db.log.findFirst({
      where: {
        userId,
        createdAt: {
          gte: todayStart,
          lt: todayEnd,
        },
      },
    });

    const log = await db.log.create({
      data: {
        userId,
        content,
        repository,
        repositoryUrl,
      },
    });

    // Get or create metrics
    const metrics = await db.userMetrics.findFirst({
      where: { userId },
    });

    // Calculate yesterday
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const ydayStr = yesterday.toISOString().split("T")[0];
    const ydayStart = new Date(ydayStr);
    const ydayEnd = new Date(ydayStart.getTime() + 24 * 60 * 60 * 1000);

    const hadLoggedYesterday = await db.log.findFirst({
      where: {
        userId,
        createdAt: {
          gte: ydayStart,
          lt: ydayEnd,
        },
      },
    });

    let currentStreak = 1;
    let bestStreak = metrics?.bestStreak || 0;

    if (metrics?.currentStreak && hadLoggedYesterday) {
      currentStreak = existingTodayLog
        ? metrics.currentStreak
        : metrics.currentStreak + 1;
    }

    if (currentStreak > bestStreak) {
      bestStreak = currentStreak;
    }

    const userMetrics = await db.userMetrics.upsert({
      where: { userId },
      update: {
        currentStreak,
        bestStreak,
        totalLogs: existingTodayLog
          ? metrics?.totalLogs || 1
          : { increment: 1 },
      },
      create: {
        userId,
        currentStreak,
        bestStreak,
        totalLogs: 1,
      },
    });

    console.log("Updated user metrics:", userMetrics);
    return log;
  } catch (error) {
    console.error("Error in createLogAndUpdateStreak:", error);
    throw error;
  }
};

// (async () => {
//   await createLogAndUpdateStreak(
//     "9b70198b-4194-4994-81a9-167fd5797f60",
//     "some random log"
//   );
// })();
