import { Router } from "express";
import userController from "../controllers/user.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export const userRouter = Router();

userRouter.use(authMiddleware);

userRouter.get("/", userController.list);