import mysql from "mysql2/promise";
import dotenv from "dotenv";
import logger from "../utilities/pino.logger";

dotenv.config();

let pool: mysql.Pool | null = null;

async function connectToDatabase(): Promise<mysql.Pool> {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: parseInt(process.env.DB_PORT || "3306"),
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
      });

      logger.info(
        "Conexión al pool de base de datos establecida correctamente."
      );
    } catch (error: any) {
      pool = null;
      logger.error({
        mensaje: "Error al conectar con el pool de base de datos:",
        error: error.message,
      });
      throw new Error(
        `Error al conectar con el pool de base de datos: ${error.message}`
      );
    }
  }
  return pool;
}

export { connectToDatabase };
