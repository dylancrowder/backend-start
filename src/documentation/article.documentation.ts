/**
 * @swagger
 * tags:
 *   name: Artículos
 *   description: CRUD de artículos.
 */

/**
 * @swagger
 * /api/v1/articles:
 *   get:
 *     summary: Obtiene una lista de artículos filtrada por nombre, estado, y coincidencia exacta
 *     tags: [Artículos]
 *     parameters:
 *       - in: query
 *         name: nombre
 *         schema:
 *           type: string
 *         description: Nombre del artículo a buscar
 *       - in: query
 *         name: is_active
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Estado del artículo (activo o inactivo). Debe ser 'true' o 'false'.
 *       - in: query
 *         name: exact_match
 *         schema:
 *           type: string
 *           enum: [true, false]
 *         description: Si la coincidencia debe ser exacta en el nombre del artículo. Debe ser 'true' o 'false'.
 *     responses:
 *       200:
 *         description: Lista de artículos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID:
 *                     type: integer
 *                     description: ID único del artículo
 *                   NOMBRE:
 *                     type: string
 *                     description: Nombre del artículo
 *                   MARCA:
 *                     type: string
 *                     description: Marca del artículo
 *                   ESTADO:
 *                     type: integer
 *                     description: Estado del artículo (1 para activo, 0 para inactivo)
 *                   FECHA_MODIFICACION:
 *                     type: string
 *                     format: date-time
 *                     description: Fecha y hora de la última modificación del artículo
 *       400:
 *         description: Error de validación en los parámetros de consulta o valores inválidos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Parámetros faltantes en la consulta o error al validar productos."
 *       404:
 *         description: No se encontraron artículos que coincidan con los filtros
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No se encontraron productos con los criterios de búsqueda especificados."
 *       500:
 *         description: Error en la estructura de los datos de respuesta o error interno del servidor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error inesperado"
 */
