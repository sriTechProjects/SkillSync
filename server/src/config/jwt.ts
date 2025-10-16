import jwt from "jsonwebtoken";

export const generateToken = (userId: string): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT secret is not defined in environment variables.");
  }

  return jwt.sign(
    { id: userId },
    secret,
    { expiresIn: "1d" } // fallback to "1d" if not set
  );
};
