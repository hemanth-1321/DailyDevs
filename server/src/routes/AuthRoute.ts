import express from "express";
import { z } from "zod";
import { db } from "../config/db";
import jwt from "jsonwebtoken";
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

    // Check if user already exists
    if (parsed.email) {
      const existingUser = await db.user.findUnique({
        where: { email: parsed.email },
      });

      if (existingUser) {
        const jwtToken = jwt.sign(
          {
            id: existingUser.id,
            email: existingUser.email,
          },
          process.env.JWT_SECRET!,
          { expiresIn: "7d" }
        );

        res.cookie("token", jwtToken, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        console.log("Set-Cookie:", res.getHeaders()["set-cookie"]);

        return res.status(200).json({ user: existingUser });
      }
    }

    // Create new user
    const newUser = await AuthController({
      username: parsed.username,
      email: parsed.email,
      avatarUrl: parsed.avatarUrl,
      githubId: parsed.githubId,
    });

    const jwtToken = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );
    console.log("jwt token", jwtToken);

    res.cookie("token", jwtToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    console.log("✅ Set-Cookie Header:", res.getHeader("Set-Cookie"));
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
