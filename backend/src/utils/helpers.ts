import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// generating JWT for the passing data
export const generateToken = (data: any): string => {
  const token: string = jwt.sign(data, process.env.JWT_SECRET || "secret", {
    expiresIn: data.role == "user" ? "21min" : "1d"
  });
  return token;
};
// encrypt the password
export const hashPassword = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};
// checking if the entered password is correct
export const correctPassword = async (
  candidatePassword: string,
  userPassword: string
) => {
  return await bcrypt.compare(candidatePassword, userPassword);
};