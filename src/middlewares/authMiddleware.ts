import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db";

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
    };
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    if (!user) {
      throw new Error();
    }

    req.user = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
