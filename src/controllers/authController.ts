import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validators/authValidator";
import * as authService from "../services/authService";
import { z } from "zod";

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerSchema.parse(req.body);
    const { token } = await authService.register(validatedData);
    res.status(201).json({ token: token });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: error.errors,
      });
    } else {
      res.status(500).json({ error: error.message || "Internal server error" });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const validatedData = loginSchema.parse(req.body);
    const { token } = await authService.login(validatedData);
    res.status(200).json({ token });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      res.status(400).json({
        error: error.errors,
      });
    } else {
      res.status(401).json({ error: error.message || "Unauthorized" });
    }
  }
};
