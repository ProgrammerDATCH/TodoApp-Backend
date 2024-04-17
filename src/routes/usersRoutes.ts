import express from 'express'
import { registerUser, getAllUsers, loginUser, updateUser, deleteUser } from '../controllers';
import { Auth } from '../middlewares';
import { checkUser } from '../controllers/userControllers';

const userRoutes = express.Router();

userRoutes.post("/register", registerUser)
userRoutes.get("/users", getAllUsers)
userRoutes.post("/login", loginUser)
userRoutes.patch("/update", Auth, updateUser)
userRoutes.delete("/delete", Auth, deleteUser)
userRoutes.post("/check", Auth, checkUser)

export default userRoutes;