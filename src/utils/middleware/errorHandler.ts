import { Request, Response, NextFunction } from "express";
import { AppError } from "../appError";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../errors";

export function errorHandler(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (error instanceof AppError) {
    return res.status(error.status).json({
      code: error.code,
      message: error.message,
      status: error.status,
    });
  }

  // Fallback for unknown errors
  return res.status(500).json({
    code: ERROR_CODES.INTERNAL_ERROR,
    message: ERROR_MESSAGES.INTERNAL_ERROR,
    status: HTTP_STATUS.INTERNAL_ERROR,
  });
}
