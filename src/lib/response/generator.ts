import { Response } from "express";
import { ResponseStructure } from "./types/response.type";
import { StatusCodes, getReasonPhrase } from "http-status-codes";

export function generateResponse<T>(res: Response, status: number, message?: string, data?: T | null): Response {
    // Generate message if not defined
    message = message ?? getReasonPhrase(status);

    if (!data) {
        data = null;
    }

    // Construct response structure
    const response: ResponseStructure = { message: message as string, code: status, data }

    // Return response
    // Return this to make this instance is extendable
    return res
        .status(status)
        .json(response)
}

export function successResponse<T>(res: Response, data: T | null, status?: number, message?: string) {
    // Default status code
    if (!status) {
        status = StatusCodes.OK;
    }

    return generateResponse(res, status, message, data);
}

export function errorResponse<T>(res: Response, data?: T | null, status?: number, message?: string) {
    // Default status code
    if (!status) {
        status = StatusCodes.INTERNAL_SERVER_ERROR;
    }

    return generateResponse(res, status, message, data);
}