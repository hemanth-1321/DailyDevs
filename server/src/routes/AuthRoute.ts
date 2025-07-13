import express from "express";
import { z } from "zod";
import { db } from "../config/db";
import { AuthController } from "../controllers/auth.controller";

const router = express.Router();

// Zod schema for request body validation
const registerSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email").optional(),
  avatarUrl: z.string().url("Invalid URL").optional(),
  githubId: z.string().optional(),
});

router.post("/register", async (req, res) => {
  try {
    const parsed = registerSchema.parse(req.body);

    // Check if email is provided and already exists
    if (parsed.email) {
      const existingUser = await db.user.findUnique({
        where: { email: parsed.email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Email already in use" });
      }
    }

    // Call AuthController and await the result
    const newUser = await AuthController({
      username: parsed.username,
      email: parsed.email,
      avatarUrl: parsed.avatarUrl,
      githubId: parsed.githubId,
    });

    res.status(201).json({ user: newUser });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error });
    }
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
