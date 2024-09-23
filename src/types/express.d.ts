import { User } from "@prisma/client";
import { Express } from "express-serve-static-core";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
