import axios from "axios";
import { BACKEND_URL } from "../config";

export const fetchusermetrics = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/logs/log`, {
      withCredentials: true, // ✅ important for cookie-based auth
    });
    return res.data; // { totalLogs, currentStreak, bestStreak }
  } catch (error) {
    console.error("Error fetching user metrics:", error);
    throw error;
  }
};
