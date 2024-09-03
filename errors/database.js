import CustomError from "../utils/CustomError.js";

export const duplicateKeyErrorHandler = (error) => {
  const keyValue = error.keyValue;
  const message = `a keyValue pair '${Object.keys(keyValue)}: ${Object.values(
    keyValue
  )}' already exists`;
  return new CustomError(message, 400);
};
