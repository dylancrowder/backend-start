import app from "./app";
import dotenv from "dotenv";
import logger from "./utilities/pino.logger";

dotenv.config();

const PORT = process.env.APP_PORT || 8080;

app.listen(PORT, () => {
  logger.info(`Servidor corriendo en el puerto: ${PORT}`);
});

process.on("uncaughtException", (err) => {

  logger.error({ err }, "Excepción no controlada");
  process.exit(1);
});

process.on("unhandledRejection", (reason) => {
  logger.error({ reason }, "Promesa no manejada");
  process.exit(1);
});
