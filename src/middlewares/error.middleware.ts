import AppError from "../utilities/error/appError";
import logger from "../utilities/pino.logger";
import { Request, Response, NextFunction } from "express";

function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err instanceof AppError) {
    // Si el error es operacional, responde con el código HTTP y el mensaje.
    if (err.isOperational) {
      res.status(err.httpCode).json({
        status: "error",
        name: err.name,
        message: err.message,
      });
    } else {
      // Si el error no es operacional, lo logueamos como un error más grave.
      logger.error({
        message: "Error no manejado (no operacional):",
        error: err,
      });

      // Devuelve un mensaje genérico para errores no operacionales
      res.status(500).json({
        status: "error",
        message: "Error interno del servidor. Por favor, contacte al soporte.",
      });
    }
  } else {
    // Si el error no es una instancia de AppError, lo tratamos como un error inesperado.
    logger.error({
      message: "Error no manejado:",
      error: err,
      errores: process.env.MYSQL_PORT,  
      db: process.env.MYSQL_PASSWORD
    });

    res.status(500).json({
      status: "error",
      message: "Error interno del servidor.",
    });
  }
}

export default errorHandler;
