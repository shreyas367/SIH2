import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const getUserFromToken = (token?: string) => {
  if (!token) return null;
  try {
    return jwt.verify(token, JWT_SECRET) as { name: string; role: string; id: string };
  } catch {
    return null;
  }
};
