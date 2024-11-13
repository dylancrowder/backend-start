import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import swaggerUi from "swagger-ui-express";

// Importación de rutas y utilidades
import articleRoutes from "./routes/article.routes";
import { swaggerDocs } from "./documentation/swagger.config";
import { connectToDatabase } from "./db/db_connect";
import errorHandler from "./middlewares/error.middleware";

// Cargar variables de entorno
dotenv.config();

const app = express();

// Configuración de middlewares
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(bodyParser.json());

// Definición de rutas

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const dbPool = await connectToDatabase();
    const [rows]: [any[], any] = await dbPool.query("SELECT NOW()");
    const hora = rows[0]["NOW()"];
    res.json({
      hora: hora,
    });
  } catch (error: any) {
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
