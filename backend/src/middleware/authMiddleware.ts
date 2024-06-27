import type { User } from "@prisma/client";
import type { Request, Response, NextFunction } from "express";

export const ensureAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ error: "User not authenticated" });
};

//check user role is admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if ((req.user as User).role === "ADMIN") {
    return next();
  }
  res.status(401).json({ error: "User not authorized" });
};
