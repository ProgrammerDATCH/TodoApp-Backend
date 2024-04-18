import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: {
        type: "string",
        required: true
    },
    description: {
        type: "string",
        required: true
    },
    userId: {
        type: "string",
        required: true
    },
    completed: {
        type: "boolean",
        required: true,
        default: false
    }
});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;