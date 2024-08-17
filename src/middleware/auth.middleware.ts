import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { errorResponse, generateResponse } from "../lib/response";
import { authService } from "../services/auth.service";

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
    // Get access token & refresh token from cookie
    const { accessToken, refreshToken } = req.cookies;

    // If no access token is provided
    // Throw error
    if (!accessToken) {
        return generateResponse(res, 401, "Unauthorized. Please login!");
    }

    // Verify token
    // If failed to verify token, check for refres token from DB
    // If refresh token isn't exists, throw error
    // If exsits, issue new token
    try {
        jwt.verify(accessToken, process.env.APP_KEY as string)
    } catch (error) {
        if (!refreshToken) {
            return generateResponse(res, 401, "Unauthorized. Please login!");
        }
        // Generate new access token
        try {
            const newAccessToken = await authService.refresh(refreshToken);

            res.cookie("accessToken", newAccessToken);
        } catch (error) {
            return generateResponse(res, 401, (error as Error).message);
        }
    }

    const tokenData = jwt.decode(accessToken);

    res.locals.userId = tokenData?.sub;

    next();
}

export { authMiddleware };