import { Request, Response, NextFunction } from "express";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { AppError } from "../../utils/appError";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
if (!res.locals.user) {
    throw new AppError(
      ERROR_CODES.UNAUTHORIZED,
      ERROR_MESSAGES.UNAUTHORIZED,
      HTTP_STATUS.UNAUTHORIZED
    );
  }

  return next();
};
