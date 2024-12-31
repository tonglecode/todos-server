import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { redisClient } from "../redisClient";
import User from "../entities/user";

interface JwtPayload {
  id: number;
}

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const isBlacklisted = await redisClient.get(token);
    if (isBlacklisted === "isBlacklisted") {
      return res.status(401).json({ message: "Token is blacklisted" });
    }

    const decoded = jwt.verify(token, "your_jwt_secret") as JwtPayload;

    const user = await User.findBy({ id: Number(decoded.id) });
    if (!user || user.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const { PASSWORD, photoBase64, ...withoutPASSWORD } = user[0];
    req.user = withoutPASSWORD;
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ message: "Invalid token" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
};
