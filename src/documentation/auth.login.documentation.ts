/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Autenticación]
 *     description: Permite a un usuario iniciar sesión en la API proporcionando su nombre de usuario y contraseña.
 *     requestBody:
 *       required: true
 *       description: Credenciales del usuario para iniciar sesión.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Nombre de usuario del usuario.
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *                 example: "123"
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Iniciaste sesión correctamente, ahora puedes utilizar toda la API."
 *       401:
 *         description: Credenciales incorrectas.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Credenciales incorrectas."
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Error al procesar la solicitud de inicio de sesión."
 */
