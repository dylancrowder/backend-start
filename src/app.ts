// app.js
import express from "express";
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

app.get("/", (req, res) => {
  res.send("Hello, Vercel!");
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
