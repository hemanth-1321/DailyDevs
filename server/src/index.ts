import express from "express";
import cors from "cors";
import AuthRoute from "./routes/AuthRoute";
import LogRoutes from "./routes/LogRoutes";
import ActivityRoute from "./routes/activityRoute";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.use("/api/auth", AuthRoute);
app.use("/api/logs", LogRoutes);
app.use("/api/activity", ActivityRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
