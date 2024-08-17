import { ITodo } from "../models/todo.schema";
import todoRepository from "../repository/todo.repository"

const todoService = {
    findAll: async function () {
        const data = await todoRepository.getAll();

        return data;
    },

    findById: async function (id: string) {
        const data = await todoRepository.findById(id);

        if (!data) {
            throw new Error("Data not found");
        }

        return data;
    },

    create: async function (raw: ITodo) {
        await todoRepository.create(raw);

    },

    update: async function (id: string, raw: ITodo) {
        await todoRepository.update(id, raw);
    },

    delete: async function (id: string) {
        await todoRepository.delete(id);
    },
}

export default todoService;