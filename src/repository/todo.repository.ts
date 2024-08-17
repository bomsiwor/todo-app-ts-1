import { todo } from '../models';

const userRepository = {
    getAll: async () => {
        const data = await todo.Todo.find();

        return data;
    },

    findById: async (id: string) => {
        const data = await todo.Todo.findById(id);

        return data;
    },

    create: async (data: todo.ITodo) => {
        await todo.Todo.create(data);
    },

    update: async (id: string, data: todo.ITodo) => {
        await todo.Todo.findByIdAndUpdate(id, data);
    },

    delete: async (id: string) => {
        await todo.Todo.findByIdAndDelete(id);
    }
}

export default userRepository;