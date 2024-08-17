import { auth } from "../models"

const authRepository = {
    checkRefreshToken: async (refreshToken: string) => {
        const data = await auth.Auth.findOne({
            refreshToken
        });

        return data;
    }
}

export default authRepository;