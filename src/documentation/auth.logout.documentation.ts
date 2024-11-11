/**
 * @swagger
 * /auth/logout:
 *   get:
 *     summary: Cerrar sesión
 *     tags: [Autenticación]
 *     description: Permite a un usuario cerrar su sesión en la API.
 *     responses:
 *       200:
 *         description: Cierre de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Cerraste sesión correctamente."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Error al procesar la solicitud de cierre de sesión."
 */
