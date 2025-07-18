import axios from "axios";
import { BACKEND_URL } from "../config";

export const fetchUserLogs = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/api/logs/userlogs`, {
      withCredentials: true,
    });
    return res.data.logs;
  } catch (error) {
    console.log("error fetching logs");
    throw error;
  }
};
