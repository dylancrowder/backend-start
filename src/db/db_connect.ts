import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

let pool: mysql.Pool | null = null;

async function connectToDatabase(): Promise<mysql.Pool> {
  if (!pool) {
    try {
      pool = mysql.createPool({
        host: process.env.DB_HOST_NAME,
        user: process.env.MYSQL_DATABASE,
        password: process.env.MYSQL_ROOT_PASSWORD,
        port: parseInt(process.env.DB_PORT || "3306"),
      });
      console.log(
        "Conexión al pool de base de datos establecida correctamente."
      );
    } catch (error: any) {
      pool = null;
      throw new Error(
        `Error al conectar con el pool de base de datos: ${error.message}`
      );
    }
  }
  return pool;
}

export { connectToDatabase };
