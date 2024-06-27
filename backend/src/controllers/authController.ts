import type { Request, Response } from "express";
import prisma from "../../prisma/db";
import bcrypt from "bcryptjs";
import passport from "passport";
import type { User } from "@prisma/client";

export const register = async (req: Request, res: Response) => {
  const { email, password, role, address } = req.body;
  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user: User = await prisma.user.create({
      data: { email, password: hashPassword, role, address },
    });
    res.status(201).json({ success: "User created successfully!", user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const login = (req: Request, res: Response, next: Function) => {
  passport.authenticate("local", (err: Error, user: User, info: any) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ error: info.message });
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      return res.json({ success: "User logged in successfully", user });
    });
  })(req, res, next);
};

export const logout = (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json({ success: "User logged out successfully" });
  });
};

export const getDashboard = (req: Request, res: Response) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ error: "User not authenticated" });
  }
};
