import { subDays, format } from "date-fns";
import { db } from "../config/db";

export const ActivityController = async (githubId: string, period: string) => {
  let groupByFormat: string;
  let rangeDays: number;

  switch (period) {
    case "weekly":
      groupByFormat = "EEE"; // e.g., Mon, Tue, etc.
      rangeDays = 7;
      break;
    case "monthly":
      groupByFormat = "MMM"; // e.g., Jan, Feb, etc.
      rangeDays = 30;
      break;
    case "yearly":
      groupByFormat = "yyyy"; // e.g., 2024, 2025, etc.
      rangeDays = 365 * 3;
      break;
    default:
      throw new Error(
        "Invalid period type. Use 'weekly', 'monthly', or 'yearly'."
      );
  }

  const since = subDays(new Date(), rangeDays);
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

  console.log("logs", activityData);
  return activityData;
};
