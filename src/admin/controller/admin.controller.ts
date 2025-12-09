import { Request, Response } from "express";
import "reflect-metadata";
import { AppSuccess } from "../../utils/appSuccess";
import { AppError } from "../../utils/appError";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES,
} from "../../utils/errors";
import { AdminService } from "../services/admin.service";
import { CreateAdminDto } from "../dtos/admin.create.dto";
import { UpdateAdminDto } from "../dtos/admin.update.dto";
import log from "../../utils/logger";
import { plainToInstance } from "class-transformer";
import { validateOrReject } from "class-validator";

export class AdminController {
  public service: AdminService;

  constructor() {
    this.service = new AdminService();
  }

  async create(req: Request, res: Response) {
    try {
      log.info("hello world");
      const dto: CreateAdminDto = req.body;

      const result = await this.service.create(dto);
      const response = new AppSuccess(
        SUCCESS_CODES.ADMIN_CREATED,
        SUCCESS_MESSAGES.ADMIN_CREATED,
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

  async getAll(_req: Request, res: Response) {
    try {
      const result = await this.service.getAll();
      const response = new AppSuccess(
        SUCCESS_CODES.ADMINS_FETCHED,
        SUCCESS_MESSAGES.ADMINS_FETCHED,
        HTTP_STATUS.OK,
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

  async getOne(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      const result = await this.service.getOne(id);
      const response = new AppSuccess(
        SUCCESS_CODES.ADMIN_FETCHED,
        SUCCESS_MESSAGES.ADMIN_FETCHED,
        HTTP_STATUS.OK,
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

  async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const dto = plainToInstance(UpdateAdminDto, req.body);
      await validateOrReject(dto, {
        whitelist: true, // remove fields not in DTO
        forbidNonWhitelisted: true, // throw error on unknown fields
      });

      const result = await this.service.update(id, dto);
      const response = new AppSuccess(
        SUCCESS_CODES.ADMIN_UPDATED,
        SUCCESS_MESSAGES.ADMIN_UPDATED,
        HTTP_STATUS.OK,
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

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);

      await this.service.delete(id);
      const response = new AppSuccess(
        SUCCESS_CODES.ADMIN_DELETED,
        SUCCESS_MESSAGES.ADMIN_DELETED,
        HTTP_STATUS.OK,
        null
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
