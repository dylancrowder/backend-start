import app from "./app";
import dotenv from "dotenv";
import pino from "pino";

// tu objeto logger centralizado

dotenv.config();
const logger = pino();
const PORT = process.env.PORT || 8080;

// Iniciar el servidor
const server = app.listen(PORT, () => {
  logger.info(`El servidor esta corriendo en el puerto: ${PORT}`);
});

// Manejo de excepciones no controladas
process.on("uncaughtException", (err) => {
  logger.fatal(`exepcion no controlada: ${err}`);
  process.exit(1);
});

// Manejo de promesas no manejadas
process.on("unhandledRejection", (reason) => {
  logger.fatal("Promesa no manejada:", reason);
  process.exit(1);
});
