import { db } from "../config/db";

interface User {
  username: string;
  email?: string;
  avatarUrl?: string;
  githubId?: string;
}

export const AuthController = async ({
  username,
  email,
  avatarUrl,
  githubId,
}: User) => {
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("User already exists");
    }

    const newUser = await db.user.create({
      data: {
        username,
        email: email ?? null,
        avatarUrl: avatarUrl ?? null,
        githubId: githubId ?? null,
      },
    });

    return newUser;
  } catch (error) {
    console.error("Error in Login:", error);
    throw error;
  }
};
