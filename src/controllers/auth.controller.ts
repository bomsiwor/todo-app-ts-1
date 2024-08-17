import { Request, Response } from 'express'
import { errorResponse, generateResponse, successResponse } from '../lib/response';

// Service
import userService from '../services/user.service';
import { authService } from '../services/auth.service';

const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // Process data via service
        try {
            const { token, refreshToken } = await authService.login({ email, password });

            res
                .status(200)
                .cookie("accessToken", token, { httpOnly: true })
                .cookie("refreshToken", refreshToken, { httpOnly: true })
                .json({
                    message: "Succesfully login",
                    accessToken: token,
                    refreshToken,
                });
        } catch (error) {
            return errorResponse(res, null, 400, String(error))
        }
    },

    register: async (req: Request, res: Response) => {
        // Get user registration data from request body
        const { email, password, name } = req.body;

        try {
            await userService.createUser({ email, password, name });

            return successResponse(res, null, 201, "Successfully register user");
        } catch (error) {
            return errorResponse(res, null, 400, String(error));
        }
    },
}

export default authController;