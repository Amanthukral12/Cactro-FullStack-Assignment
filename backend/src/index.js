import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import videoRouter from "./routes/video.routes.js";
import logRouter from "./routes/log.routes.js";
dotenv.config();
const PORT = 8000;
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/video", videoRouter);
app.use("/api/logs", logRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
