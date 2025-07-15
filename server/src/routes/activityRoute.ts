import express from "express";
import { ActivityController } from "../controllers/activityController";

const router = express.Router();

router.get("/:githubId/:period", async (req, res) => {
  const { githubId, period } = req.params;

  try {
    const data = await ActivityController(githubId, period);
    res.json(data);
  } catch (err: any) {
    console.error(err);
    res
      .status(500)
      .json({ error: err.message || "Failed to fetch activity data." });
  }
});

export default router;
