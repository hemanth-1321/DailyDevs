import express from "express";
import { createLogAndUpdateStreak } from "../controllers/Log.controller";
import { middleware } from "../middleware";
import { db } from "../config/db";
import { redis } from "../config/redis";

const router = express.Router();
router.post("/log", middleware, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "User ID missing from token" });
  }
  const { content, repositoryUrl, repository } = req.body;
  console.log("📥 /log endpoint hit with body:", req.body);
  if (!content) {
    return res.status(401).json({
      message: "no content found",
    });
  }
  try {
    const newLog = await createLogAndUpdateStreak(
      userId,
      content,
      repositoryUrl,
      repository
    );
    res.status(200).json(newLog);
  } catch (error) {
    res.status(500).json({
      message: "failed to save log",
    });
    console.log("log failed", error);
  }
});

router.get("/metrics", middleware, async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res.status(401).json({ error: "User ID missing from token" });
  }
  const metricsCacheKey = `user_metrics:${userId}`;

  try {
    const cachedMetrics = await redis.get(metricsCacheKey);
    if (cachedMetrics) {
      console.log("[Cache HIT] /metrics for user:", userId);
      return res.status(200).json(JSON.parse(cachedMetrics));
    }
    console.log("[Cache MISS] /metrics fetching from DB for user:", userId);

    const userMetrics = await db.userMetrics.findFirst({
      where: {
        userId,
      },
      select: {
        totalLogs: true,
        currentStreak: true,
        bestStreak: true,
      },
    });

    if (!userMetrics) {
      return res.status(404).json({ error: "Metrics not found" });
    }
    const secondsUntilMidnight = () => {
      const now = new Date();
      const midnight = new Date(now);
      midnight.setHours(24, 0, 0, 0);
      return Math.floor((midnight.getTime() - now.getTime()) / 1000);
    };

    await redis.set(
      metricsCacheKey,
      JSON.stringify(userMetrics),
      "EX",
      secondsUntilMidnight()
    );

    return res.status(200).json(userMetrics);
  } catch (error) {
    console.error("Error fetching userMetrics:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/userlogs", middleware, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "User ID missing from token" });
  }
  try {
    const logs = await db.log.findMany({
      where: {
        userId,
      },
      select: {
        content: true,
        repository: true,
        repositoryUrl: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json({
      logs,
    });
  } catch (error) {
    console.error("Error fetching logs:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/allMetrics", async (req, res) => {
  try {
    const allMetrics = await db.userMetrics.findMany({
      select: {
        totalLogs: true,
        bestStreak: true,
        currentStreak: true,
        user: {
          select: {
            id: true,
            username: true,
            githubId: true,
            avatarUrl: true,
          },
        },
      },
      orderBy: {
        currentStreak: "desc",
      },
    });
    res.status(201).json(allMetrics);
  } catch (error) {
    console.error("Error fetching metrics:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
export default router;
