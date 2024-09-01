import express from "express";
const app = express();

import "./database/index.js";
import CustomError from "./utils/CustomError.js";
import globalErrorHandler from "./errors/index.js";
import appRouter from "./routes/index.js";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(appRouter);

app.all("*", async (req, res, next) => {
  const error = new CustomError(`can't find ${req.url} on the server!`, 404);
  next(error);
});

app.use(globalErrorHandler);

export default app;
