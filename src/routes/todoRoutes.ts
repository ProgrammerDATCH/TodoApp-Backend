/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: API endpoints for managing todos
 */

/**
 * @swagger
 * /todo/add:
 *   post:
 *     summary: Add a new todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the todo
 *               description:
 *                 type: string
 *                 description: The description of the todo
 *     responses:
 *       '200':
 *         description: Successfully added todo
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /todo/todos:
 *   get:
 *     summary: Get all todos
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: A list of todos
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/Todo'
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /todo/update:
 *   patch:
 *     summary: Update a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the todo to update
 *               title:
 *                 type: string
 *                 description: The new title of the todo
 *               description:
 *                 type: string
 *                 description: The new description of the todo
 *     responses:
 *       '200':
 *         description: Successfully updated todo
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /todo/complete:
 *   patch:
 *     summary: Complete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the todo to complete
 *     responses:
 *       '200':
 *         description: Successfully completed todo
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /todo/unComplete:
 *   patch:
 *     summary: Uncomplete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the todo to uncomplete
 *     responses:
 *       '200':
 *         description: Successfully uncompleted todo
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /todo/delete:
 *   delete:
 *     summary: Delete a todo
 *     tags: [Todos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: The ID of the todo to delete
 *     responses:
 *       '200':
 *         description: Successfully deleted todo
 *       '401':
 *         description: Unauthorized
 */

import express from 'express'
import { addTodo, completeTodo, deleteTodo, getAllTodos, unCompleteTodo, updateTodo } from '../modules/todo/controller/todoControllers'
import { Auth } from '../middlewares';
const todoRoutes = express.Router();

todoRoutes.post("/add", Auth, addTodo)
todoRoutes.get("/todos", Auth, getAllTodos)
todoRoutes.patch("/update", Auth, updateTodo)
todoRoutes.patch("/complete", Auth, completeTodo)
todoRoutes.patch("/unComplete", Auth, unCompleteTodo)
todoRoutes.delete("/delete", Auth, deleteTodo)

export default todoRoutes;