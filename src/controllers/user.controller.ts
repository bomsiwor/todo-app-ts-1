import { Request, Response } from "express";
import userService from "../services/user.service";
import jwt from 'jsonwebtoken'
import { generateResponse } from "../lib/response";

const userController = {
    list: async (req: Request, res: Response) => {
        try {
            const data = await userService.getAll();

            return generateResponse(res, 200, "List of user data", data);
        } catch (e) {
            console.log(e)
            return generateResponse(res, 500, (e as Error).message);
        }
    }
}

export default userController;