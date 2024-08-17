import { Request, NextFunction, Response } from "express";

export const requestTime = (req: Request, _: Response, next: NextFunction) => {
    console.log(Date.now());

    next();
}