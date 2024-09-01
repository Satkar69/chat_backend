import { generateToken, decodeToken } from "../lib/token/jsonwebtoken.js";
import { hashPassword, validatePassword } from "../lib/crypto/bcrypt.js";
import asynchandler from "../utils/asyncHandler.js";

export const authenticate = asynchandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }

  try {
  } catch (error) {}
});
