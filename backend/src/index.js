import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import videoRouter from "./routes/video.routes.js";
dotenv.config();
const PORT = 8000;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/video", videoRouter);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
