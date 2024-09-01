import { validatePassword, hashPassword } from "../lib/crypto/bcrypt.js";
import { generateToken } from "../lib/token/jsonwebtoken.js";
import CustomError from "../utils/CustomError.js";

export const loginUser = async ({ username, password }) => {
  const user = await CHATDB.User.findOne({ username: username });
  if (!username || !password) {
    const error = new CustomError(
      "username and password are required fields",
      400
    );
    throw error;
  }
  if (!user) {
    const error = new CustomError(
      "User with the given username does not exist",
      404
    );
    throw error;
  }
  const isPasswordMatched = await validatePassword(password, user.password);
  if (!isPasswordMatched) {
    const error = new CustomError("Password did not match", 401);
    throw error;
  }
  const token = await generateToken({ id: user._id });
  return token;
};

export const signupUser = async (userData) => {
  const { password } = userData;
  userData.password = await hashPassword(password);
  userData.profilePic =
    userData.gender === "male"
      ? `https://avatar.iran.liara.run/public/boy?username=${userData.username}`
      : `https://avatar.iran.liara.run/public/girl?username=${userData.username}`;
  const user = await CHATDB.User.create(userData);
  return user;
};
