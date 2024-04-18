import { Request, Response } from "express";
import { createTodo, deleteTodoById, findTodoById, getTodos, updateTodoById } from "../repository/todoRepository";

const addTodo = async (req: Request, res: Response)=>{
    const {title, description} = req.body;
    const newTodo = {
        title,
        description,
        userId: (req as any).userId
    };
    const newCreatedTodo = await createTodo(newTodo);
    res.json({status: true, message: newCreatedTodo});
}

const getAllTodos = async (req: Request, res: Response)=>{
    const todos = await getTodos((req as any).userId)
    res.json({status: true, message: todos});
}

const deleteTodo = async (req: Request, res: Response)=>{
    const {id} = req.body;
    const todo = await findTodoById(id)
    if(!todo) return res.json({status: false, message: "Todo doesn't exist."});
    const { deletedCount } = await deleteTodoById(id);
    if(deletedCount < 1) res.json({status: false, message: "Failed to delete Todo"});
    else res.json({status: true, message: "Deleted."});
}

const updateTodo = async (req: Request, res: Response)=>{
    const {id, title, description, completed} = req.body;
    const todo = await findTodoById(id);
    if(!todo) return res.json({status: false, message: "Todo doesn't exist."});
    const updatedTodo = await updateTodoById(id, {title, description, completed});
    if(updatedTodo.modifiedCount > 0) res.json({status: true, message: "Todo updated successfully"});
    else res.json({status: false, message: "Failed to update Todo"});
}

const completeTodo = async (req: Request, res: Response)=>{
    const {id} = req.body;
    const todo = await findTodoById(id);
    if(!todo) return res.json({status: false, message: "Todo doesn't exist."});
    const updatedTodo = await updateTodoById(id, {completed: true});
    if(updatedTodo.modifiedCount > 0) res.json({status: true, message: "Todo marked as completed."});
    else res.json({status: false, message: "Failed to update Todo"});
}

const unCompleteTodo = async (req: Request, res: Response)=>{
    const {id} = req.body;
    const todo = await findTodoById(id);
    if(!todo) return res.json({status: false, message: "Todo doesn't exist."});
    const updatedTodo = await updateTodoById(id, {completed: false});
    if(updatedTodo.modifiedCount > 0) res.json({status: true, message: "Todo marked as uncompleted."});
    else res.json({status: false, message: "Failed to update Todo"});
}

export {
    addTodo,
    getAllTodos,
    deleteTodo,
    updateTodo,
    completeTodo,
    unCompleteTodo,
}