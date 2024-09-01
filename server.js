import express from "express";
import dotenv from "dotenv";
import globalErrorHandler from "./errors/index.js";
const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(globalErrorHandler);

export default app;
