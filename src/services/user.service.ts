import bcrypt from 'bcrypt';
import { user } from "../models"
import userRepository from "../repository/user.repository"

const userService = {
    getAll: async () => {
        const result = await userRepository.getAll()

        return result
    },

    createUser: async (raw: user.IRegisterRequest) => {
        // Check for duplicate email (collition check)
        const existingEmail = await userRepository.findByEmail(raw.email);

        if (existingEmail) {
            throw new Error("Email already exist, try a new one.");
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(raw.password, 10);

        // Create new user object
        const newUser = {
            name: raw.name,
            email: raw.email,
            password: hashedPassword
        }

        // Store to DB
        await user.User.create(newUser);
    }
}

export default userService;