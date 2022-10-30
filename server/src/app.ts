import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import logger from "@utils/logger";
import { initializeDbConnection } from "@utils/db";
import userRoute from "@modules/user/user-route";
import authRoute from "@modules/auth/auth-route";
import videoRoute from "@modules/video/video.route";
import deserializeUser from "@middleware/deserializeUser";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.ORIGIN || "http://localhost:3000",
    credentials: true,
  })
);
app.use(helmet());
app.use(deserializeUser);

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/videos", videoRoute);

const server = app.listen(PORT, async () => {
  await initializeDbConnection();

  logger.info(`[server] Server listening at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();

    logger.info("Process killed with signal", signal);

    process.exit(0);
  });
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
