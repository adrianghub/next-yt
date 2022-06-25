import { initializeDbConnection } from '@utils/db';
import logger from '@utils/logger';
import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

const server = app.listen(PORT, async () => {
  await initializeDbConnection();


  logger.info(`[server] Server listening at http://localhost:${PORT}`);
});

const signals = ["SIGTERM", "SIGINT"];

function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    server.close();

    // disconnect from db

    logger.info("Process killed with signal", signal);

    process.exit(0);
  })
}

for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}