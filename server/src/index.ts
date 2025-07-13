import express from "express";
import cors from "cors";
import AuthRoute from "./routes/AuthRoute";
import LogRoutes from "./routes/LogRoutes";
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());
app.get("/", (req, res) => {
  res.send("Hello, Express!");
});
app.use("/api/auth", AuthRoute);
app.use("/api/logs", LogRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
