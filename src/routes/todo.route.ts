import { Router } from "express";
import todoController from "../controllers/todo.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const todoRouter = Router();
todoRouter.use(authMiddleware);

todoRouter.get("/", todoController.list)

todoRouter.get("/:todoId", todoController.detail);

todoRouter.post("/", todoController.create);

todoRouter.put("/:todoId", todoController.update)

todoRouter.delete("/:todoId", todoController.delete)