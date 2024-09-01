import bcrypt from "bcrypt";

const saltRounds = 10;

export const hashPassword = async (plainTextPassword) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hashPassword = await bcrypt.hash(plainTextPassword, salt);
  return hashPassword;
};

export const validatePassword = async (plainTextPassword, hashedPassword) => {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};
