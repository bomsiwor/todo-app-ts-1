import { Application, Request, Response, Router } from "express";
import { authRouter } from "./auth.route";
import { userRouter } from "./user.route";
import { generateResponse } from "../lib/response";
import { todoRouter } from "./todo.route";

// Define versioning
// V1 Route
const v1 = (app: Application): Router => {
    // Define versioning
    const version: string = 'v1';

    const superGroup = Router();
    app.use(createBasePath(version), superGroup);

    // App index
    superGroup.get("/", (_, res: Response) => {
        generateResponse(res, 200, "Hello, Universe!", {
            hype: true
        });
    });

    // Define all routes and bind to version
    // Use modular router
    superGroup.use("/auth", authRouter);
    superGroup.use("/users", userRouter);
    superGroup.use("/todos", todoRouter);

    return superGroup;
}


// Main function to export
function newRouter(app: Application) {
    v1(app);
}

// ==== Helper Function ====== //
function createBasePath(version: string): string {
    return `/api/${version}`;
}

export { newRouter }