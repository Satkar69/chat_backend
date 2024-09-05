import { decodeToken } from "../lib/token/jsonwebtoken.js";
import asynchandler from "../utils/asyncHandler.js";
import CustomError from "../utils/CustomError.js";

export const authenticate = asynchandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    const error = new CustomError("Authentication token is missing", 401);
    return next(error);
  }

  try {
    const decoded = await decodeToken(token);
    const userId = decoded.userId;
    const user = await CHATDB.User.findById(userId).select("-password -__V");

    if (!user) {
      const error = new CustomError("User not found", 404);
      return next(error);
    }
    req.user = user;
    next();
  } catch (error) {
    const message = "Invalid token";
    console.log(error);
    const err = new CustomError(message, 401);
    return next(err);
  }
});

export default authenticate;
