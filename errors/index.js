import { devErrors, prodErrors } from "./environment.js";

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.satus = error.status || "error";

  console.log("Entering globalErrorHandler");
  console.log("Environment:", process.env.NODE_ENV);
  console.log("Error:", error);

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error);
  } else if (process.env.NODE_ENV === "production") {
    prodErrors(res, error);
  }
};

export default globalErrorHandler;
