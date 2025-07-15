import axios from "axios";
import { BACKEND_URL } from "../config";

export const registerUser = async (user: {
  name: string;
  login: string;
  email?: string;
  avatarUrl: string;
}) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/api/auth/register`,
      {
        username: user.name,
        githubId: user.login,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Registration failed:", error);
  }
};
