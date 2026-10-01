import { Router } from "express";
import { asyncHandler } from "../../shared/middlewares/asyncHandler";
import { AuthorController } from "./author.controller";

const router = Router();
const controller = new AuthorController();

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: Gestión de autores de la biblioteca
 */

/**
 * @swagger
 * /api/v1/authors:
 *   post:
 *     summary: Crear un nuevo autor
 *     tags:
 *       - Authors
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - nationality
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre completo del autor
 *                 example: Gabriel García Márquez
 *               nationality:
 *                 type: string
 *                 description: Nacionalidad del autor
 *                 example: Colombiana
 *               birthYear:
 *                 type: integer
 *                 description: Año de nacimiento del autor
 *                 example: 1927
 *     responses:
 *       201:
 *         description: Autor creado correctamente
 *         content:
 *           application/json:
 *             example:
 *               _id: "66f123abc456def789"
 *               name: "Gabriel García Márquez"
 *               nationality: "Colombiana"
 *               birthYear: 1927
 *               createdAt: "2026-09-26T15:30:00.000Z"
 *               updatedAt: "2026-09-26T15:30:00.000Z"
 *       400:
 *         description: Datos inválidos
 */
router.post("/", asyncHandler(controller.create));

/**
 * @swagger
 * /api/v1/authors:
 *   get:
 *     summary: Obtener todos los autores
 *     tags:
 *       - Authors
 *     responses:
 *       200:
 *         description: Lista de autores
 *         content:
 *           application/json:
 *             example:
 *               - _id: "66f123abc456def789"
 *                 name: "Gabriel García Márquez"
 *                 nationality: "Colombiana"
 *                 birthYear: 1927
 *                 createdAt: "2026-09-26T15:30:00.000Z"
 *                 updatedAt: "2026-09-26T15:30:00.000Z"
 *               - _id: "66f987xyz123abc456"
 *                 name: "Jorge Luis Borges"
 *                 nationality: "Argentina"
 *                 birthYear: 1899
 *                 createdAt: "2026-09-26T15:35:00.000Z"
 *                 updatedAt: "2026-09-26T15:35:00.000Z"
 */
router.get("/", asyncHandler(controller.findAll));

/**
 * @swagger
 * /api/v1/authors/{id}:
 *   get:
 *     summary: Obtener un autor por ID
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del autor
 *         schema:
 *           type: string
 *         example: "66f123abc456def789"
 *     responses:
 *       200:
 *         description: Autor encontrado
 *         content:
 *           application/json:
 *             example:
 *               _id: "66f123abc456def789"
 *               name: "Gabriel García Márquez"
 *               nationality: "Colombiana"
 *               birthYear: 1927
 *               createdAt: "2026-09-26T15:30:00.000Z"
 *               updatedAt: "2026-09-26T15:30:00.000Z"
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Autor no encontrado
 */
router.get("/:id", asyncHandler(controller.findById));

/**
 * @swagger
 * /api/v1/authors/{id}/books:
 *   get:
 *     summary: Obtener los libros de un autor
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del autor
 *         schema:
 *           type: string
 *         example: "66f123abc456def789"
 *     responses:
 *       200:
 *         description: Lista de libros pertenecientes al autor
 *         content:
 *           application/json:
 *             example:
 *               - _id: "66abc123456def789"
 *                 title: "Cien años de soledad"
 *                 isbn: "9780307474728"
 *                 authorId: "66f123abc456def789"
 *                 year: 1967
 *                 available: true
 *                 createdAt: "2026-09-26T16:00:00.000Z"
 *                 updatedAt: "2026-09-26T16:00:00.000Z"
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Autor no encontrado
 */
router.get("/:id/books", asyncHandler(controller.findBooksByAuthor));

/**
 * @swagger
 * /api/v1/authors/{id}:
 *   put:
 *     summary: Actualizar un autor
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del autor
 *         schema:
 *           type: string
 *         example: "66f123abc456def789"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Gabriel García Márquez
 *               nationality:
 *                 type: string
 *                 example: Colombiana
 *               birthYear:
 *                 type: integer
 *                 example: 1927
 *           example:
 *             name: "Gabriel García Márquez"
 *             nationality: "Colombiana"
 *             birthYear: 1927
 *     responses:
 *       200:
 *         description: Autor actualizado correctamente
 *         content:
 *           application/json:
 *             example:
 *               _id: "66f123abc456def789"
 *               name: "Gabriel García Márquez"
 *               nationality: "Colombiana"
 *               birthYear: 1927
 *               createdAt: "2026-09-26T15:30:00.000Z"
 *               updatedAt: "2026-09-26T17:00:00.000Z"
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Autor no encontrado
 */
router.put("/:id", asyncHandler(controller.update));

/**
 * @swagger
 * /api/v1/authors/{id}:
 *   delete:
 *     summary: Eliminar un autor
 *     tags:
 *       - Authors
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del autor
 *         schema:
 *           type: string
 *         example: "66f123abc456def789"
 *     responses:
 *       204:
 *         description: Autor eliminado correctamente
 *       400:
 *         description: ID inválido
 *       404:
 *         description: Autor no encontrado
 *       409:
 *         description: No se puede eliminar el autor porque tiene libros asociados
 */
router.delete("/:id", asyncHandler(controller.delete));

export default router;