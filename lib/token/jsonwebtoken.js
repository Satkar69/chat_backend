import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET;

export const generateToken = async (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: "30d" });
};

export const decodeToken = async (token) => {
  return jwt.verify(token, jwtSecret);
};
