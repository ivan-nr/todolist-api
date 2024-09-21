import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters long")
    .max(50, "Name must not exceed 50 characters"),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must not exceed 100 characters"),
  password: z
    .string()
    .min(4, "Password must be at least 4 characters long")
    .max(50, "Password must not exceed 50 characters"),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
