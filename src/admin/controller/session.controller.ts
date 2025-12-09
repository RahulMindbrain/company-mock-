import { Request, Response } from "express";
import { AppError } from "../../utils/appError";
import { AppSuccess } from "../../utils/appSuccess";
import { AdminSessionService } from "../services/session.service";
import { CreateSessionDto } from "../dtos/admin.session.dto";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES,
} from "../../utils/errors";
import { getIp } from "../../utils/getIp";
import {parseTTL} from '../../utils/parseTTL';
import config from "../../../config/index";


export class AdminsessionHandler {
  public service: AdminSessionService;

  constructor() {
    this.service = new AdminSessionService();
  }

  async createSession(req: Request, res: Response) {
    try {
      const ip = getIp(req);
      const userAgent = req.get("user-agent") || "";
      const dto: CreateSessionDto = req.body;

      const result = await this.service.createSession(dto,ip,userAgent);
       res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      secure: true,           // ⚠ enable only in HTTPS / production
      sameSite: "strict",
      maxAge: parseTTL(config.ACCESS_TOKEN_TTL), // 15 minutes
    });

    res.cookie("refreshToken", result.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: parseTTL(config.REFRESH_TOKEN_TTL), // 7 days
    });
      const response = new AppSuccess(
        SUCCESS_CODES.SUCCESS,
        SUCCESS_MESSAGES.SUCCESS,
        HTTP_STATUS.CREATED,
        result
      );

      return res.status(response.status).json(response);
    } catch (error: any) {
      const err = new AppError(
        error.code || ERROR_CODES.INTERNAL_ERROR,
        error.message || ERROR_MESSAGES.INTERNAL_ERROR,
        error.status || HTTP_STATUS.INTERNAL_ERROR
      );

      return res.status(err.status).json(err);
    }
  }

async getUserSessionsHandler(req: Request, res: Response) {
  try {
    const userId = res.locals.user.id;

    const sessions = await this.service.findSessions(userId);

    const response = new AppSuccess(
      SUCCESS_CODES.SUCCESS,
      SUCCESS_MESSAGES.SUCCESS,
      HTTP_STATUS.OK,
      sessions
    );

    return res.status(response.status).json(response);

  } catch (error: any) {
    const err = new AppError(
      error.code || ERROR_CODES.INTERNAL_ERROR,
      error.message || ERROR_MESSAGES.INTERNAL_ERROR,
      error.status || HTTP_STATUS.INTERNAL_ERROR
    );

    return res.status(err.status).json(err);
  }
}


async deleteSessionHandler(req: Request, res: Response) {
  try {
    const sessionId = res.locals.user.session;

    await this.service.updateSession(sessionId, { valid: false });

    // Clear cookies
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");

    const response = new AppSuccess(
      SUCCESS_CODES.SUCCESS,
      "Logged out successfully.",
      HTTP_STATUS.OK,
      { accessToken: null, refreshToken: null }
    );

    return res.status(response.status).json(response);

  } catch (error: any) {
    const err = new AppError(
      error.code || ERROR_CODES.INTERNAL_ERROR,
      error.message || ERROR_MESSAGES.INTERNAL_ERROR,
      error.status || HTTP_STATUS.INTERNAL_ERROR
    );

    return res.status(err.status).json(err);
  }
}

}