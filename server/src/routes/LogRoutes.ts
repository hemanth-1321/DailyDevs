import express from "express";
import { createLogAndUpdateStreak } from "../controllers/Log.controller";
import { middleware } from "../middleware";

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

export default router;
