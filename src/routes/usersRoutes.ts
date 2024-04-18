/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for managing users
 */

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the new user
 *               password:
 *                 type: string
 *                 description: The password of the new user
 *     responses:
 *       '200':
 *         description: Successfully registered user
 *       '400':
 *         description: Bad request
 */

/**
 * @swagger
 * /user/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       '200':
 *         description: A list of users
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/definitions/User'
 *       '401':
 *         description: Unauthorized
 */

// Add definitions/User here for the User schema

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in as a user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               password:
 *                 type: string
 *                 description: The password of the user
 *     responses:
 *       '200':
 *         description: Successfully logged in
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/update:
 *   patch:
 *     summary: Update user information
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username of the user
 *               password:
 *                 type: string
 *                 description: The new password of the user
 *     responses:
 *       '200':
 *         description: Successfully updated user information
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/delete:
 *   delete:
 *     summary: Delete user account
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully deleted user account
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /user/check:
 *   post:
 *     summary: Check user information for logged in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Successfully checked user information
 *       '401':
 *         description: Unauthorized
 */




import express from 'express'
import { registerUser, getAllUsers, loginUser, updateUser, deleteUser } from '../modules/users/controller/userControllers';
import { Auth } from '../middlewares';
import { checkUser } from '../modules/users/controller/userControllers';

const userRoutes = express.Router();

userRoutes.post("/register", registerUser)
userRoutes.get("/users", getAllUsers)
userRoutes.post("/login", loginUser)
userRoutes.patch("/update", Auth, updateUser)
userRoutes.delete("/delete", Auth, deleteUser)
userRoutes.post("/check", Auth, checkUser)

export default userRoutes;