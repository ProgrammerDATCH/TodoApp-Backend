import express from 'express'
import { addTodo, completeTodo, deleteTodo, getAllTodos, unCompleteTodo, updateTodo } from '../controllers/todoControllers'
import { Auth } from '../middlewares';
const todoRoutes = express.Router();

todoRoutes.post("/add", Auth, addTodo)
todoRoutes.get("/todos", Auth, getAllTodos)
todoRoutes.patch("/update", Auth, updateTodo)
todoRoutes.patch("/complete", Auth, completeTodo)
todoRoutes.patch("/unComplete", Auth, unCompleteTodo)
todoRoutes.delete("/delete", Auth, deleteTodo)

export default todoRoutes;