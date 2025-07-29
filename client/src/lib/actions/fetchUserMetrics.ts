import axios from "axios";
import { BACKEND_URL } from "../config";

export const fetchusermetrics = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/logs/metrics`, {
      withCredentials: true,
    });
    return res.data; // { totalLogs, currentStreak, bestStreak }
  } catch (error) {
    console.error("Error fetching user metrics:", error);
    throw error;
  }
};

export const fetchUserActivity = async (githubId: string, period: string) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/api/activity/${githubId}/${period}`
    );
    return res.data;
  } catch (error) {
    console.error("Error fetching user activity :", error);
    throw error;
  }
};
