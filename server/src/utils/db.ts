import mongoose from "mongoose";
import logger from "./logger";

export async function initializeDbConnection() {
  try {
    await mongoose.connect(
      `${process.env.DB_CONNECTION_STRING}:${process.env.DB_CONNECTION_PORT}` ||
        ""
    );
    logger.info("Sucessfully connected to database.");
  } catch (error) {
    logger.error(error, "Connection to database failed.");
    process.exit(1);
  }
}

export async function closeDbConnection() {
  await mongoose.connection.close();

  logger.info("Disconnected from database.");

  return;
}
