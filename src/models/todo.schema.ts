import { model, Schema } from "mongoose";

// Type
interface ITodo {
    title: string;
    body: string;
    user: string;
}

const todoSchema = new Schema({
    title: String,
    body: String,
    user: { type: Schema.Types.ObjectId, ref: "User" }
})

const Todo = model("Todo", todoSchema);

export {
    Todo,
    ITodo,
}