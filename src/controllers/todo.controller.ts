import { Request, Response } from "express";
import todoService from "../services/todo.service";
import { generateResponse } from "../lib/response";

const todoController = {
    list: async (req: Request, res: Response) => {
        try {
            const data = await todoService.findAll();

            return generateResponse(res, 200, "List of todo data", data);
        } catch (e) {
            return generateResponse(res, 500, (e as Error).message);
        }
    },
    detail: async (req: Request, res: Response) => {
        try {
            const data = await todoService.findById(req.params.todoId);

            return generateResponse(res, 200, "List of user data", data);
        } catch (e) {
            return generateResponse(res, 500, (e as Error).message);
        }
    },
    create: async (req: Request, res: Response) => {
        try {
            const data = {
                ...req.body,
                userId: res.locals.userId
            }
            await todoService.create(data);

            return generateResponse(res, 200, "List of user data", data);
        } catch (e) {
            return generateResponse(res, 500, (e as Error).message);
        }
    },
    update: async (req: Request, res: Response) => {
        try {
            const data = {
                ...req.body,
                userId: res.locals.userId
            }
            await todoService.update(req.params.todoId, data);

            return generateResponse(res, 200, "List of user data", data);
        } catch (e) {
            return generateResponse(res, 500, (e as Error).message);
        }
    },
    delete: async (req: Request, res: Response) => {
        try {
            await todoService.delete(req.params.todoId);

            return generateResponse(res, 200, "Success deleting data");
        } catch (e) {
            return generateResponse(res, 500, (e as Error).message);
        }
    },
}

export default todoController;