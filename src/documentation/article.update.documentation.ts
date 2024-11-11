/**
 * @swagger
 * /api/v1/articles/{id}:
 *   put:
 *     summary: Actualiza un artículo
 *     tags: [Artículos]
 *     description: Permite actualizar un artículo existente proporcionando el ID del artículo y los datos a actualizar.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del artículo a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: false
 *       description: Datos del artículo a actualizar
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del artículo (opcional).
 *               marca:
 *                 type: string
 *                 description: Marca del artículo (opcional).
 *               estado:
 *                 type: integer
 *                 enum: [0, 1]
 *                 description: Estado del artículo, debe ser 0 o 1 (opcional).
 *     responses:
 *       200:
 *         description: Artículo actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Artículo actualizado exitosamente."
 *       400:
 *         description: Error en los parámetros enviados.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error en los parametros enviados."
 *       404:
 *         description: No se encontró el artículo para actualizar.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No se encontró el artículo para actualizar."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al actualizar el artículo: detalles del error."
 */
