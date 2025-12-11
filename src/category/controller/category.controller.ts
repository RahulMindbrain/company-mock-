import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { CreateCategoryDto } from "../dtos/category.create.dto";
import { UpdateCategoryDto } from "../dtos/category.update.dto";
import { AppSuccess } from "../../utils/appSuccess";
import { AppError } from "../../utils/appError";
import {
  ERROR_CODES,
  ERROR_MESSAGES,
  HTTP_STATUS,
  SUCCESS_CODES,
  SUCCESS_MESSAGES,
} from "../../utils/errors";
import log from "../../utils/logger";
export class CategoryController {
  public service: CategoryService;

  constructor() {
    this.service = new CategoryService();
  }

  async create(req: Request, res: Response) {
    try {
      const dto: CreateCategoryDto = req.body;
      const adminId = res.locals.user.id;
      log.info("admin:"+res.locals.user.id);

      const result = await this.service.create(dto,adminId);
      const response = new AppSuccess(
        SUCCESS_CODES.CATEGORY_CREATED,
        SUCCESS_MESSAGES.CATEGORY_CREATED,
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
        SUCCESS_CODES.CATEGORY_LIST_FETCHED,
        SUCCESS_MESSAGES.CATEGORY_LIST_FETCHED,
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
        SUCCESS_CODES.CATEGORY_FETCHED,
        SUCCESS_MESSAGES.CATEGORY_FETCHED,
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
      const dto: UpdateCategoryDto = req.body;
      const adminId = res.locals.user.id;

      const result = await this.service.update(id, dto,adminId);
      const response = new AppSuccess(
        SUCCESS_CODES.PLAN_UPDATED,
        SUCCESS_MESSAGES.PLAN_UPDATED,
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
        SUCCESS_CODES.PLAN_DELETED,
        SUCCESS_MESSAGES.PLAN_DELETED,
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
