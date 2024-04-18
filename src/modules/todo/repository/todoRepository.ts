import Todo from "../../../database/models/Todo";

const createTodo = async (body: any) => {
    return await Todo.create(body);
}

const getTodos = async (userId: string) => {
    return await Todo.find({userId})
}

const findTodoById = async (id: string) => {
    return await Todo.findOne({_id: id});
}

const deleteTodoById = async (id: string) => {
    return await Todo.deleteOne({_id: id});
}

const updateTodoById = async (id: string, data: any) => {
    return await Todo.updateOne({_id: id}, data)
}

export {
    createTodo,
    getTodos,
    findTodoById,
    deleteTodoById,
    updateTodoById,
}