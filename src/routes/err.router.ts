// Importa las dependencias necesarias
import express from "express";

const router = express.Router();

// 2. Endpoint para excepción no controlada
router.get("/uncaught-exception", (req, res) => {
  // Esta acción lanzará una excepción no controlada
  setTimeout(() => {
    throw new Error("¡Este es un error no controlado!");
  }, 100);
  res.send("Se lanzó una excepción no controlada, revisa la consola.");
});

// 3. Endpoint para promesa no manejada
router.get("/unhandled-rejection", (req, res) => {
  Promise.reject("Promesa no manejada de prueba"); // Esto provocará un "unhandledRejection"
  res.send("Promesa rechazada sin manejar.");
});

export default router;
