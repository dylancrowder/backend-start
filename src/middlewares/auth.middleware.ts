import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ message: "Debes autentificarte para usar la API" });
};
