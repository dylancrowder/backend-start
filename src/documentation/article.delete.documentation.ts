/**
 * @swagger
 * /api/v1/articles/{id}:
 *   delete:
 *     summary: Desactivar un artículo
 *     tags: [Artículos]
 *     description: Desactiva un artículo existente proporcionando el ID del artículo.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del artículo que se desea desactivar.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Artículo desactivado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Artículo desactivado exitosamente."
 *                 article:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: "Nombre del artículo"
 *                     marca:
 *                       type: string
 *                       example: "Marca del artículo"
 *                     estado:
 *                       type: string
 *                       example: "desactivado"
 *       400:
 *         description: Error de validación del ID.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El ID debe ser un número válido."
 *       404:
 *         description: Artículo no encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Artículo no encontrado."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error al desactivar el artículo: detalles del error."
 */
