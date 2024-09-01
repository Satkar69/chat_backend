import express from "express";
const app = express();

import CustomError from "./utils/CustomError.js";
import globalErrorHandler from "./errors/index.js";
import "./database/index.js";
import db from "./models/index.js";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("uncaught exception occured!!, shutting down...");
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("unhandled rejection occurred!!, shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

global.CHATDB = db;

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use(appRouter);

app.all("*", async (req, res, next) => {
  const error = new CustomError(`can't find ${req.url} on the server!`, 404);
  next(error);
});

app.use(globalErrorHandler);

export default app;
