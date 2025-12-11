import { Request, Response, NextFunction } from "express";
import { ERROR_CODES, ERROR_MESSAGES, HTTP_STATUS } from "../../utils/errors";
import { AppError } from "../../utils/appError";

export const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!res.locals.user) {
    return res.status(HTTP_STATUS.UNAUTHORIZED).json({
      code: ERROR_CODES.UNAUTHORIZED,
      message: ERROR_MESSAGES.UNAUTHORIZED
    });
  }

  return next();
};

