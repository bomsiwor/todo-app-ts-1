import { User } from "../models/user.schema"

const userRepository = {
    getAll: async () => {
        const data = await User.find();

        return data;
    },

    findById: async (id: string) => {
        const data = await User.findById(id);

        return data;
    },

    findByEmail: async (email: string) => {
        const data = await User.findOne({
            email
        })

        return data;
    }
}

export default userRepository;