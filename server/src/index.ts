import express from "express";
import cors from "cors";
import AuthRoute from "./routes/AuthRoute";
import LogRoutes from "./routes/LogRoutes";
import cookieParser from "cookie-parser";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // 👈 Match exactly with your frontend
    credentials: true, // 👈 Allow sending cookies (withCredentials: true)
  })
);
app.use(cookieParser());
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.use("/api/auth", AuthRoute);
app.use("/api/logs", LogRoutes);
app.get("/api/check", (req, res) => {
  console.log("Cookies on request:", req.cookies);
  res.send("Check console for cookies");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
