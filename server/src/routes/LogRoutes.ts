import express from "express";
import { createLogAndUpdateStreak } from "../controllers/Log.controller";
import { middleware } from "../middleware";
import { db } from "../config/db";

const router = express.Router();
router.post("/log", middleware, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "User ID missing from token" });
  }
  const { content } = req.body;

  try {
    const newLog = await createLogAndUpdateStreak(userId, content);
    res.status(200).json(newLog);
  } catch (error) {
    res.status(500).json({
      message: "failed to save log",
    });
    console.log("log failed", error);
  }
});

router.get("/log", middleware, async (req, res) => {
  const userId = req.user?.id;
  if (!userId) {
    return res.status(401).json({ error: "User ID missing from token" });
  }

  try {
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
    return res.status(200).json(userMetrics);
  } catch (error) {
    console.error("Error fetching logs:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});
export default router;
