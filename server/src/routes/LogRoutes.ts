import express from "express";
import { createLogAndUpdateStreak } from "../controllers/Log.controller";

const router = express.Router();
router.post("/log", async (req, res) => {
  const { userId, content } = req.body;

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
