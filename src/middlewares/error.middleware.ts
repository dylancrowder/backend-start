import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utilities/error/httpError";

export const errorHandler: any = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  if (err instanceof HttpError && err.isOperational) {
    console.log("Error controlado:", err.generalError);
    return res.status(err.statusCode).json({ message: err.message });
  }
  req.log.fatal("Error desconocido:", err);
  res.status(500).json({ message: "Ocurrió algo inesperado" });
};
