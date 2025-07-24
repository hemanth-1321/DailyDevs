import { subDays, format, startOfWeek } from "date-fns";
import { db } from "../config/db";
import { redis } from "../config/redis";

export const ActivityController = async (githubId: string, period: string) => {
  const cacheKey = `activity:${githubId}:${period}`;
  const cached = await redis.get(cacheKey);

  if (cached) {
    console.log("Serving from cache", cached);

    return JSON.parse(cached);
  }
  let groupByFormat: string;
  let since: Date;

  switch (period) {
    case "weekly":
      groupByFormat = "EEE"; // Mon, Tue, etc.
      since = startOfWeek(new Date(), { weekStartsOn: 1 }); // Week starts on Monday
      break;
    case "monthly":
      groupByFormat = "MMM"; // Jan, Feb, etc.
      since = subDays(new Date(), 30);
      break;
    case "yearly":
      groupByFormat = "yyyy"; // 2024, 2025, etc.
      since = subDays(new Date(), 365 * 3);
      break;
    default:
      throw new Error(
        "Invalid period type. Use 'weekly', 'monthly', or 'yearly'."
      );
  }

  const user = await db.user.findUnique({
    where: { githubId },
    select: { id: true },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const logs = await db.log.findMany({
    where: {
      userId: user.id,
      createdAt: { gte: since },
    },
  });

  const periodMap: Record<string, number> = {};

  logs.forEach((log) => {
    const key = format(new Date(log.createdAt), groupByFormat);
    periodMap[key] = (periodMap[key] || 0) + 1;
  });

  const activityData = Object.entries(periodMap)
    .map(([period, count]) => ({
      period,
      logs: count,
    }))
    .sort((a, b) => a.period.localeCompare(b.period));
  await redis.set(cacheKey, JSON.stringify(activityData), "EX", 300);

  console.log("logs", activityData);
  return activityData;
};
