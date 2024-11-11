import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";
import pinoHttp from "pino-http";

// Importación de rutas y utilidades
import articleRoutes from "./routes/article.routes";
import { errorHandler } from "./middlewares/error.middleware";
import { swaggerDocs } from "./documentation/swagger.config";
import { connectToDatabase } from "./db/db_connect";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configuración de middlewares
app.use(pinoHttp());
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

// Definición de rutas

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbPool = await connectToDatabase(); // Obtener el pool de conexiones

    // Ejecutar la consulta SQL y desestructurar correctamente el resultado
    const [rows]: [any[], any] = await dbPool.query("SELECT NOW()");

    // Ahora rows es un arreglo, así que puedes acceder a su primer elemento
    const hora = rows[0]["NOW()"];

    // Enviar la respuesta en formato JSON
    res.json({
   
      hora: hora,
  
    });
  } catch (error: any) {
    // Manejo de errores - Enviar respuesta con código 500
    return next(
      new Error(
        `Error al obtener la hora desde la base de datos: ${error.message}`
      )
    );
  }
});

app.use("/api/v1", articleRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// Middleware de manejo de errores
app.use(errorHandler);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({
    error: "pagina no encontrada",
    message: `No se encontró la ruta ${req.originalUrl}`,
  });
});

export default app;
