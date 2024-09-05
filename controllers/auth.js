import { loginUser, signupUser } from "../services/auth.js";
import { generateToken } from "../lib/token/jsonwebtoken.js";
import asynchandler from "../utils/asyncHandler.js";

export const login = asynchandler(async (req, res, next) => {
  const { username, password } = req.body;
  const token = await loginUser({ username, password });
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true; // cookie is only sent over HTTPS connections, cookie will not be sent if the connection is not secure (HTTP)
  }
  res.status(200).cookie("token", token, options).json({
    status: "success",
    statusCode: 200,
    token,
  });
});

export const signup = asynchandler(async (req, res, next) => {
  const user = await signupUser(req.body);
  const token = await generateToken({ userId: user._id });
  const options = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    httpOnly: true,
  };
  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }
  res.status(201).cookie("token", token, options).json({
    status: "success",
    statusCode: 201,
    token,
  });
});

export const logout = asynchandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(0), httpOnly: true })
    .json({
      status: "success",
      statucCode: 200,
      message: "Logged out successfully!",
    });
});
